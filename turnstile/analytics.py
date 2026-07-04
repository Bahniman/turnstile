"""Session analytics: the numbers a merchant has never seen before.
Agent share, platform mix, intent, and agent-attributed revenue."""
from collections import Counter


class Analytics:
    def __init__(self):
        self.sessions = []

    def track(self, session_id: str, classification: dict, *,
              intent: str = "browse", revenue: float = 0.0):
        self.sessions.append({"id": session_id, **classification,
                              "intent": intent, "revenue": revenue})

    def report(self) -> dict:
        total = len(self.sessions)
        agents = [s for s in self.sessions if s["verdict"] == "agent"]
        humans = [s for s in self.sessions if s["verdict"] == "human"]
        platforms = Counter(s["platform"] for s in agents if s["platform"])
        return {
            "total_sessions": total,
            "agent_sessions": len(agents),
            "agent_share": round(len(agents) / total * 100, 1) if total else 0,
            "suspect_sessions": total - len(agents) - len(humans),
            "platform_mix": dict(platforms.most_common()),
            "agent_buy_intent": sum(1 for s in agents if s["intent"] == "buy"),
            "agent_revenue": round(sum(s["revenue"] for s in agents), 2),
            "human_revenue": round(sum(s["revenue"] for s in humans), 2),
        }
