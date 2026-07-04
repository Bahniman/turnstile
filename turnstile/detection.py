"""Agent-traffic classification.

A session is scored from two sides:
  - server signals: user agent, header shape, fetch pattern
  - client signals: what the JS beacon reports (or the absence of a beacon)

Scores are transparent: every verdict carries the evidence that produced it,
because merchants will not act on a black box. Real deployments add
behavioral sequences and network heuristics; the scoring frame stays.
"""
from dataclasses import dataclass, field

KNOWN_AGENT_UA = {
    "openclaw": "OpenClaw",
    "gptbot": "OpenAI",
    "claude": "Anthropic",
    "browser-use": "BrowserUse",
    "python-requests": "python-requests",
    "python-urllib": "python-urllib",
    "headlesschrome": "HeadlessChrome",
    "playwright": "Playwright",
    "puppeteer": "Puppeteer",
    "curl": "curl",
}


@dataclass
class Signals:
    user_agent: str = ""
    sent_beacon: bool = False           # did the JS snippet ever phone home?
    webdriver: bool = False             # navigator.webdriver
    mouse_events_3s: int = 0            # human hands are noisy
    plugins: int = 0                    # headless browsers report none
    accept_language: str = ""
    fetched_assets: bool = True         # humans' browsers pull css/img; scripts often don't
    time_to_action_ms: int = 5000       # instant "add to cart" is not a person
    extra: dict = field(default_factory=dict)


def classify(s: Signals) -> dict:
    """Returns {verdict, platform, score, evidence[]}; score>0 leans agent."""
    score, evidence = 0, []
    ua = (s.user_agent or "").lower()

    platform = None
    for marker, name in KNOWN_AGENT_UA.items():
        if marker in ua:
            platform = name
            score += 4
            evidence.append(f"user agent declares '{marker}'")
            break

    if not s.sent_beacon:
        score += 2
        evidence.append("no JS beacon (client never executed the page)")
    if s.webdriver:
        score += 3
        evidence.append("navigator.webdriver = true")
    if s.sent_beacon and s.mouse_events_3s == 0:
        score += 2
        evidence.append("zero mouse activity in first 3s")
    if s.sent_beacon and s.plugins == 0:
        score += 1
        evidence.append("no browser plugins reported")
    if not s.fetched_assets:
        score += 2
        evidence.append("did not fetch page assets")
    if s.time_to_action_ms < 400:
        score += 2
        evidence.append(f"acted in {s.time_to_action_ms} ms")

    if s.sent_beacon and s.mouse_events_3s > 5 and not s.webdriver:
        score -= 3
        evidence.append("organic mouse activity")

    verdict = "agent" if score >= 4 else ("suspect" if score >= 2 else "human")
    return {"verdict": verdict, "platform": platform or ("unknown-agent" if verdict == "agent" else None),
            "score": score, "evidence": evidence}
