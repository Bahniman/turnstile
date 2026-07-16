import { useState, useEffect } from "react";
import { GlowCard } from "./glow-card";
import { Play, RotateCcw, AlertTriangle, Users, Cpu, ShieldCheck } from "lucide-react";

interface Visitor {
  em: string;
  kind: "h" | "a";
  buy: number;
  plat?: string;
  note: string;
  alert?: boolean;
}

const VISITORS: Visitor[] = [
  { em: "🧍", kind: "h", buy: 0, note: "Chrome, organic mouse, slow scroll" },
  { em: "🤖", kind: "a", buy: 0, plat: "OpenClaw", note: "Declares itself; zero mouse; acted in 210 ms" },
  { em: "🧍", kind: "h", buy: 4299, note: "iPhone Safari, buys the Dune Runner" },
  { em: "👾", kind: "a", buy: 0, plat: "Scraper", note: "No JS execution, no assets fetched" },
  { em: "🤖", kind: "a", buy: 7600, plat: "BrowserUse", note: "Delegated purchase — the fraud-filter trap", alert: true },
  { em: "🧍", kind: "h", buy: 0, note: "Firefox, long browse, no purchase" },
  { em: "🤖", kind: "a", buy: 0, plat: "Headless", note: "Webdriver=true, skipped images" },
  { em: "🧍", kind: "h", buy: 5350, note: "Returning customer, coupon applied" },
  { em: "🤖", kind: "a", buy: 2199, plat: "OpenClaw", note: "Price-checked 3 stores, bought here" },
  { em: "🧍", kind: "h", buy: 0, note: "Android Chrome, cart abandoned" },
  { em: "👾", kind: "a", buy: 0, plat: "Unknown Bot", note: "No beacon, no assets, 90 ms actions" },
  { em: "🤖", kind: "a", buy: 3499, plat: "BrowserUse", note: "Completes checkout via offer feed" },
];

export function TrafficGateVisualizer() {
  const [running, setRunning] = useState(false);
  const [currentVisitorIdx, setCurrentVisitorIdx] = useState<number | null>(null);
  const [currentVisitorPos, setCurrentVisitorPos] = useState<"start" | "gate" | "end">("start");
  const [currentClassification, setCurrentClassification] = useState<string>("CLASSIFYING...");
  const [alertText, setAlertText] = useState<string | null>(null);

  const [stats, setStats] = useState({
    humanCount: 0,
    humanRev: 0,
    agentCount: 0,
    agentRev: 0,
    humanHistory: "",
    agentHistory: ""
  });

  const [showSummary, setShowSummary] = useState(false);

  const formatCurrency = (val: number) => "₹" + val.toLocaleString("en-IN");

  const runSimulation = async () => {
    if (running) return;
    setRunning(true);
    setShowSummary(false);
    setAlertText(null);
    setStats({
      humanCount: 0,
      humanRev: 0,
      agentCount: 0,
      agentRev: 0,
      humanHistory: "",
      agentHistory: ""
    });

    for (let i = 0; i < VISITORS.length; i++) {
      const v = VISITORS[i];
      setCurrentVisitorIdx(i);
      setCurrentVisitorPos("start");
      setCurrentClassification("SCANNED");

      // Move to gate
      await new Promise((res) => setTimeout(res, 50));
      setCurrentVisitorPos("gate");
      setCurrentClassification("PROCESSING...");

      // Classify at gate
      await new Promise((res) => setTimeout(res, 800));
      const label = v.kind === "h" ? "HUMAN" : `AGENT: ${v.plat}`;
      setCurrentClassification(label);

      // Move past gate & record
      await new Promise((res) => setTimeout(res, 600));
      setCurrentVisitorPos("end");

      setStats((prev) => {
        const next = { ...prev };
        if (v.kind === "h") {
          next.humanCount += 1;
          next.humanRev += v.buy;
          next.humanHistory += v.em;
        } else {
          next.agentCount += 1;
          next.agentRev += v.buy;
          next.agentHistory += v.em;
        }
        return next;
      });

      if (v.alert) {
        setAlertText(
          `⚠️ Order #1042 — ₹7,600, paid, shipping address matches the delegating customer.\n` +
          `No mouse movement + instant checkout: Current fraud filters DECLINE this order.\n` +
          `Turnstile reads the delegation signature: Legitimate agent purchase — APPROVED and ATTRIBUTED.`
        );
      }

      await new Promise((res) => setTimeout(res, 400));
    }

    setCurrentVisitorIdx(null);
    setShowSummary(true);
    setRunning(false);
  };

  const reset = () => {
    if (running) return;
    setAlertText(null);
    setShowSummary(false);
    setCurrentVisitorIdx(null);
    setStats({
      humanCount: 0,
      humanRev: 0,
      agentCount: 0,
      agentRev: 0,
      humanHistory: "",
      agentHistory: ""
    });
  };

  const totalRev = stats.humanRev + stats.agentRev;
  const agentSessionShare = Math.round((stats.agentCount / VISITORS.length) * 100) || 0;
  const agentRevShare = Math.round((stats.agentRev / (totalRev || 1)) * 100) || 0;

  return (
    <GlowCard className="flex flex-col gap-6" showTechBrackets={true}>
      <div className="flex flex-col gap-4 border-b border-border/40 pb-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h3 className="font-sans text-lg font-bold text-foreground">Live Traffic Gate Simulator</h3>
          <p className="text-xs text-muted-foreground font-sans">Simulate incoming traffic in real-time and observe classifier logic.</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={runSimulation}
            disabled={running}
            className="btn-press flex h-8 items-center gap-1.5 rounded-lg bg-accent px-4 text-xs font-bold text-accent-foreground disabled:opacity-40"
          >
            <Play className="h-3.5 w-3.5 fill-current" /> Open Gate
          </button>
          <button
            onClick={reset}
            disabled={running}
            className="btn-press flex h-8 items-center gap-1.5 rounded-lg border border-border bg-foreground/5 px-3 text-xs text-muted-foreground hover:text-foreground"
          >
            <RotateCcw className="h-3.5 w-3.5" /> Reset
          </button>
        </div>
      </div>

      {/* Traffic Lane */}
      <div className="relative h-20 w-full overflow-hidden rounded-xl border border-border bg-black/60">
        {/* Classifier Scanner Gate */}
        <div className="absolute top-0 bottom-0 left-1/2 w-1 bg-gradient-to-b from-accent/0 via-accent to-accent/0" />
        <div className="absolute top-1 left-[calc(50%-12px)] rounded border border-accent/20 bg-accent/10 px-1 text-[8px] font-bold text-accent font-sans">GATE</div>

        {currentVisitorIdx !== null && (
          <div
            className={`absolute top-5 flex items-center gap-2 transition-all duration-[600ms] ease-linear ${
              currentVisitorPos === "start"
                ? "left-4"
                : currentVisitorPos === "gate"
                ? "left-[calc(50%-22px)]"
                : "left-[90%] opacity-0"
            }`}
          >
            <span className="text-3xl">{VISITORS[currentVisitorIdx].em}</span>
            {currentVisitorPos === "gate" && (
              <span className={`rounded-full px-2 py-0.5 font-mono text-[9px] font-bold uppercase tracking-wider ${
                VISITORS[currentVisitorIdx].kind === "h"
                  ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                  : "bg-blue-500/20 text-blue-400 border border-blue-500/30"
              }`}>
                {currentClassification}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Segment Bins */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/[0.02] p-4 space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-400">
            <Users className="h-4 w-4" /> HUMAN SHOPPERS
          </div>
          <div className="font-mono text-2xl font-bold text-foreground">{stats.humanCount}</div>
          <div className="text-xs text-muted-foreground font-sans">
            Revenue: <span className="font-semibold text-foreground">{formatCurrency(stats.humanRev)}</span>
          </div>
          <div className="min-h-[20px] text-lg tracking-wider">{stats.humanHistory}</div>
        </div>

        <div className="rounded-xl border border-blue-500/20 bg-blue-500/[0.02] p-4 space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-blue-400">
            <Cpu className="h-4 w-4" /> AI SHOPPING AGENTS
          </div>
          <div className="font-mono text-2xl font-bold text-foreground">{stats.agentCount}</div>
          <div className="text-xs text-muted-foreground font-sans">
            Revenue: <span className="font-semibold text-foreground">{formatCurrency(stats.agentRev)}</span>
          </div>
          <div className="min-h-[20px] text-lg tracking-wider">{stats.agentHistory}</div>
        </div>
      </div>

      {/* Alert Block */}
      {alertText && (
        <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-4 text-xs leading-relaxed text-amber-400 font-mono flex items-start gap-2.5 animate-slide-in">
          <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5" />
          <div className="whitespace-pre-line">{alertText}</div>
        </div>
      )}

      {/* Summary Stats */}
      {showSummary && (
        <div className="border-t border-border/40 pt-4 space-y-4 animate-slide-in">
          <div className="grid gap-3 sm:grid-cols-4 font-sans text-xs">
            <div className="rounded-lg border border-border bg-foreground/[0.02] p-3 text-center">
              <span className="text-muted-foreground">Agent Session Share</span>
              <p className="mt-1 text-lg font-bold text-accent">{agentSessionShare}%</p>
            </div>
            <div className="rounded-lg border border-border bg-foreground/[0.02] p-3 text-center">
              <span className="text-muted-foreground">Agent Revenue Share</span>
              <p className="mt-1 text-lg font-bold text-accent">{agentRevShare}%</p>
            </div>
            <div className="rounded-lg border border-border bg-foreground/[0.02] p-3 text-center">
              <span className="text-muted-foreground">Fraud Declines Recovered</span>
              <p className="mt-1 text-lg font-bold text-emerald-400">₹7,600</p>
            </div>
            <div className="rounded-lg border border-border bg-foreground/[0.02] p-3 text-center">
              <span className="text-muted-foreground">Wasted Ad Retargeting</span>
              <p className="mt-1 text-lg font-bold text-red-400">42%</p>
            </div>
          </div>
          <p className="text-xs text-muted-foreground font-sans leading-relaxed">
            <strong>The Outcome:</strong> {agentSessionShare}% of sessions and {agentRevShare}% of revenue ({formatCurrency(stats.agentRev)} of {formatCurrency(totalRev)}) came from software during this simulated hour. Your storefront, pricing widgets, and A/B test funnels are optimization models built only for the other {100 - agentSessionShare}% of your traffic.
          </p>
        </div>
      )}
    </GlowCard>
  );
}
