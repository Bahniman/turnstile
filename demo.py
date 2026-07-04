"""Turnstile demo: a day of storefront traffic, humans and agents mixed,
classified with evidence, and the numbers no merchant has today.

Run:  python demo.py     (zero dependencies)
"""
from turnstile import classify, Signals, Analytics
from turnstile.offers import offer_feed

W = 74


def banner(t):
    print("\n" + "=" * W + "\n" + t + "\n" + "=" * W)


VISITORS = [
    ("human on Chrome, browsing",
     Signals(user_agent="Mozilla/5.0 (Windows NT 10.0) Chrome/126", sent_beacon=True,
             mouse_events_3s=14, plugins=3, fetched_assets=True,
             time_to_action_ms=6200), "browse", 0),
    ("human on mobile Safari, buys a bottle",
     Signals(user_agent="Mozilla/5.0 (iPhone) Safari/605", sent_beacon=True,
             mouse_events_3s=9, plugins=1, fetched_assets=True,
             time_to_action_ms=8400), "buy", 1499),
    ("OpenClaw personal agent, price-checking",
     Signals(user_agent="Mozilla/5.0 OpenClaw/1.4 (+user-delegated)", sent_beacon=True,
             webdriver=True, mouse_events_3s=0, plugins=0, fetched_assets=True,
             time_to_action_ms=220), "browse", 0),
    ("headless browser, adds to cart instantly",
     Signals(user_agent="Mozilla/5.0 HeadlessChrome/126", sent_beacon=True,
             webdriver=True, mouse_events_3s=0, plugins=0, fetched_assets=False,
             time_to_action_ms=180), "buy", 2199),
    ("python-requests script, scraping prices",
     Signals(user_agent="python-requests/2.32", sent_beacon=False,
             fetched_assets=False, time_to_action_ms=90), "browse", 0),
    ("Browser-Use agent, completes a purchase",
     Signals(user_agent="Mozilla/5.0 browser-use/0.9", sent_beacon=True,
             webdriver=True, mouse_events_3s=0, plugins=0, fetched_assets=True,
             time_to_action_ms=350), "buy", 3499),
    ("human on Firefox, long browse, no purchase",
     Signals(user_agent="Mozilla/5.0 (X11; Linux) Firefox/127", sent_beacon=True,
             mouse_events_3s=22, plugins=2, fetched_assets=True,
             time_to_action_ms=15000), "browse", 0),
    ("unknown bot, no beacon, no assets",
     Signals(user_agent="Mozilla/5.0 (compatible)", sent_beacon=False,
             fetched_assets=False, time_to_action_ms=120), "browse", 0),
]


def main():
    banner("TURNSTILE DEMO: who is actually visiting your store?")
    analytics = Analytics()

    print()
    for i, (label, sig, intent, revenue) in enumerate(VISITORS):
        c = classify(sig)
        analytics.track(f"s{i}", c, intent=intent, revenue=revenue)
        plat = f" ({c['platform']})" if c["platform"] else ""
        print(f"  {label:<48} -> {c['verdict'].upper():<7}{plat}")
        for ev in c["evidence"][:2]:
            print(f"      . {ev}")

    banner("The dashboard a merchant has never seen")
    r = analytics.report()
    print(f"""
  total sessions        : {r['total_sessions']}
  agent sessions        : {r['agent_sessions']}  ({r['agent_share']}% of traffic)
  suspect sessions      : {r['suspect_sessions']}
  agent platform mix    : {r['platform_mix']}
  agents with buy intent: {r['agent_buy_intent']}
  agent revenue         : Rs {r['agent_revenue']:,.0f}
  human revenue         : Rs {r['human_revenue']:,.0f}
""")
    print("  Most of today's revenue came from software, not people. Your ads,")
    print("  pop-ups and A/B tests were invisible to all of it.")

    banner("So stop showing agents a carousel: the offer feed (AEO)")
    feed = offer_feed("Demo D2C Store", [
        {"sku": "BTL-01", "name": "Insulated bottle 750ml", "price": 1499},
        {"sku": "BTL-02", "name": "Insulated bottle 1L", "price": 2199,
         "ships_in_days": 5},
    ])
    print("\n  GET /.well-known/agent-offers.json ->\n")
    for line in feed.splitlines()[:16]:
        print("  " + line)
    print("  ...")
    print("""
  Detected agents get machine-obvious data instead of a human UI. Agents buy
  with fewer errors; merchants get attributed revenue. Both sides win, which
  is what makes the standard stick. That is Turnstile.
""")


if __name__ == "__main__":
    main()
