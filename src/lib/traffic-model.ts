export type SessionKind = "human" | "agent" | "crawler" | "scraper";
export type Delivery = "served_html" | "served_json" | "blocked";

export interface VisitorSession {
  id: string;
  time: string;
  userAgent: string;
  mouseEntropy: number;
  requestRate: number;
  kind: SessionKind;
  buyValue: number;
  status: Delivery;
  note: string;
}

export interface TrafficSummary {
  humansServed: number;
  agentsServed: number;
  otherAutomated: number;
  sampleOrderValue: number;
}

export function classifySampleSession(
  session: Pick<VisitorSession, "requestRate" | "mouseEntropy" | "kind">,
  entropyThreshold: number,
  rateLimitThreshold: number,
): Delivery {
  if (session.requestRate > rateLimitThreshold) return "blocked";
  if (session.mouseEntropy < entropyThreshold) {
    return session.kind === "scraper" ? "blocked" : "served_json";
  }
  return "served_html";
}

export function reclassifySampleSessions(
  sessions: VisitorSession[],
  entropyThreshold: number,
  rateLimitThreshold: number,
): VisitorSession[] {
  return sessions.map(session => ({
    ...session,
    status: classifySampleSession(session, entropyThreshold, rateLimitThreshold),
  }));
}

export function summarizeVisibleSessions(sessions: VisitorSession[]): TrafficSummary {
  return sessions.reduce<TrafficSummary>((summary, session) => {
    if (session.kind === "human" && session.status === "served_html") summary.humansServed++;
    if (session.kind === "agent" && session.status === "served_json") {
      summary.agentsServed++;
      summary.sampleOrderValue += session.buyValue;
    }
    if (session.kind === "crawler" || session.kind === "scraper") summary.otherAutomated++;
    return summary;
  }, { humansServed: 0, agentsServed: 0, otherAutomated: 0, sampleOrderValue: 0 });
}
