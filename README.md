# Turnstile

**Analytics and storefronts for the agent-driven web.**

### ▶ Try the live demo (no installation): https://bahniman.github.io/turnstile.html

---

## In plain English (no jargon)

More and more online shopping is being done by **AI assistants on people's behalf** — they browse, compare prices, and buy. But every online store's analytics quietly assumes its visitors are humans. So stores can't answer a basic question that's becoming very expensive: *how many of my visitors are actually software, and are they buying?*

**Turnstile spots the AI visitors**, shows the store the real breakdown (how many, from which AI platforms, how much they spent), and then serves those AI visitors a clean machine-readable price list instead of a human web page full of pop-ups. The store gets correctly-counted sales; the AI gets clean data and makes fewer mistakes.

The comparison that makes it click: Google search traffic created an $80 billion industry (SEO) built around measuring and optimizing for it. AI-shopper traffic is at that same starting line right now, and nobody is measuring it yet.

## The business, concretely

Three expensive failures are already happening on every store, and each one is a paying product:

1. **Recovered false declines.** Fraud filters see "no mouse movement + instant checkout" and decline legitimate delegated purchases. Every one of those is pure lost margin. Turnstile reads the agent's delegation signals and whitelists the verified purchase — recovered revenue the merchant can count.
2. **Unpolluted data.** Agent sessions poison funnels, A/B tests and ad audiences; retargeting budgets are spent showing ads to software. Filtering the software out means the store optimizes against humans again — and stops paying to advertise to robots.
3. **A new attributed channel.** Once agent purchases are detected and credited to their platforms, "agent revenue" becomes a line item the merchant can deliberately grow — with the machine-readable offer feed as its storefront.

**Go-to-market:** the free snippet answers one irresistible question — *"what % of your traffic is agents?"* — and a published quarterly benchmark makes every merchant want their own number. Paid tiers: platform attribution + fraud whitelist + offer feed; long-term, basis points on feed-attributed revenue.

**The moat is the labeled corpus:** detection is adversarial and improves with every store on the network. Ten thousand storefronts of labeled agent behavior is not something a latecomer — or a platform building it as a side feature — can download. And the offer feed converts the arms race: being detected gets the agent *better* data than scraping, so adversaries become users.

<details>
<summary><b>Jargon decoder</b> (click to expand)</summary>

| Term | What it actually means |
|---|---|
| **Agent traffic** | Website visits made by AI software, not a human clicking around. |
| **Classifier** | The logic that decides "human or AI?" from clues in how the visit behaves. |
| **Signals** | The clues: does the mouse move? did it load images? how fast did it act? does it announce itself? |
| **Attribution** | Correctly crediting a sale to its source — e.g. "this purchase came via an AI assistant." |
| **AEO (Agent Experience Optimization)** | Like SEO, but for AI shoppers: giving them a clean offer they can read, instead of a human page. |
| **Offer feed** | A simple price + stock list built for machines, at a fixed web address. |
| **Beacon / snippet** | One line of code a store adds to its site to collect the human-or-AI clues. |

</details>

---

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
