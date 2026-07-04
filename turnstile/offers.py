"""Agent Experience Optimization: when the visitor is an agent, don't show it
a carousel and a cookie banner. Give it the structured feed it came for.

Served at /.well-known/agent-offers.json in the demo server; the format is a
deliberately boring, machine-obvious catalog. Boring is the feature."""
import json
import time


def offer_feed(store_name: str, products: list) -> str:
    return json.dumps({
        "format": "agent-offers/v0",
        "store": store_name,
        "generated_at": int(time.time()),
        "currency": "INR",
        "products": [
            {
                "sku": p["sku"],
                "name": p["name"],
                "price": p["price"],
                "in_stock": p.get("in_stock", True),
                "ships_in_days": p.get("ships_in_days", 3),
                "returns": p.get("returns", "7-day"),
                "buy_endpoint": f"/api/checkout?sku={p['sku']}",
            } for p in products
        ],
        "policies": {"payment": ["upi", "card"], "max_order_value": 50000},
    }, indent=2)
