# Turnstile

**Analytics and storefronts for the agent-driven web.**

AI agents now browse, compare and buy on their humans' behalf. When software visits instead of a person, every assumption of web commerce quietly breaks: ads go unseen, A/B tests get polluted, funnels stop describing anything real. Ask any e-commerce operator four questions and watch them realize they cannot answer one:

1. What share of my traffic is agents rather than humans?
2. Which agent platforms do those visitors come from?
3. Are they scraping prices or trying to buy?
4. When an agent buys, does my analytics stack even record it correctly?

The entire analytics industry assumes human sessions. Turnstile is the missing category: **detect** agent traffic, **measure** it (share, platform mix, intent, agent-attributed revenue), and then **sell to it** — serve detected agents a structured offer feed instead of a carousel and a cookie banner. Search traffic created an $80B optimization industry (SEO). Agent traffic is at its 1998 moment, and AEO — Agent Experience Optimization — is unowned.

## Quickstart

Python 3.9+, zero dependencies.

```bash
python demo.py
```

The demo runs a day of mixed storefront traffic — Chrome humans, an OpenClaw personal agent, a headless browser, a scraping script, a Browser-Use purchaser — through the classifier, then prints the dashboard no merchant has today:

```
total sessions        : 8
agent sessions        : 5  (62.5% of traffic)
agent platform mix    : {'OpenClaw': 1, 'HeadlessChrome': 1, 'BrowserUse': 1, ...}
agents with buy intent: 2
agent revenue         : Rs 5,698
human revenue         : Rs 1,499
```

Every verdict carries its evidence ("navigator.webdriver = true", "acted in 180 ms", "no JS beacon") because merchants will not act on a black box.

## The pieces

| Piece | File | What it does |
|---|---|---|
| Client beacon | `snippet/turnstile.js` | One script tag; collects webdriver flag, mouse activity, plugins, timing; posts via sendBeacon |
| Classifier | `turnstile/detection.py` | Transparent scoring over server + client signals; verdict = human / suspect / agent, with platform attribution |
| Analytics | `turnstile/analytics.py` | Agent share, platform mix, buy intent, agent-attributed vs human revenue |
| Offer feed (AEO) | `turnstile/offers.py` | `/.well-known/agent-offers.json` — machine-obvious catalog with prices, stock, shipping, a buy endpoint |

## Why the offer feed is the moat, not just the detection

Detection alone is an arms race. The offer feed changes the game: a detected agent gets *better* data than it could scrape — clean prices, stock, terms, a checkout endpoint. Being detected becomes beneficial, which converts adversaries into users and makes the format sticky. Merchants get correctly-attributed agent revenue; agents get fewer errors. Standards that make both sides win are the ones that stick.

## Status and roadmap

Working concept prototype.

- [x] Signal schema, transparent classifier, analytics, offer-feed format, JS beacon
- [ ] Collector server + live dashboard
- [ ] Behavioral-sequence detection (navigation rhythm, not just static signals)
- [ ] Shopify app packaging
- [ ] Published quarterly benchmark: "what % of D2C traffic is agents"
- [ ] Attribution handshake with agent platforms (signed agent identity)

## License

MIT
