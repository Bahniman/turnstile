# Turnstile — architecture

## Flow

```
visitor (human or agent)
   |
   |-- page loads snippet/turnstile.js --> beacon: client signals
   |-- server sees: UA, headers, asset fetches, timing
   v
classifier (transparent scoring, evidence attached)
   |                       |
   |  verdict=human        |  verdict=agent (+platform)
   v                       v
normal analytics        agent analytics + AEO:
                        redirect to /.well-known/agent-offers.json
                        attribute any purchase to the agent platform
```

## Design decisions

1. **Transparent scoring.** Every verdict ships with its evidence list.
   Merchants price decisions on these numbers; a black box would die in the
   first billing dispute.
2. **Absence is a signal.** No beacon + no asset fetches is stronger evidence
   than any user-agent string, and much harder to fake cheaply.
3. **Score both directions.** Organic mouse activity subtracts; the goal is
   calibrated, not paranoid.
4. **AEO converts the arms race.** Detection alone invites evasion. The offer
   feed makes detection beneficial to the detected: cleaner data than
   scraping, a working buy endpoint. Adversaries become users.

## Production path

| Prototype | Production |
|---|---|
| Static signal snapshot | Behavioral sequences (navigation rhythm, scroll physics, revisit patterns) |
| Single-site classifier | Cross-network model: 10,000 storefronts of labeled traffic is the data moat |
| UA-based platform attribution | Signed agent identity handshake (ties into delegation certificates: see the Surety project) |
| JSON offer feed | Negotiated capabilities: stock reservations, agent-specific pricing, return policies as code |

## The business

Freemium snippet answers "what % of my traffic is agents?" free. Paid tiers:
platform attribution, buy-intent analytics, the offer feed. Long-term: a
small share of agent-attributed revenue. Distribution: a quarterly public
benchmark report that makes every merchant want their own number.
