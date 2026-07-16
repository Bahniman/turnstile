import { useState } from "react";
import { GlowCard } from "./glow-card";
import { FileCode, Layout, Code } from "lucide-react";

export function AgentFeedPreview() {
  const [tab, setTab] = useState<"html" | "json">("json");

  return (
    <GlowCard className="flex flex-col gap-4" showTechBrackets={true}>
      <div className="flex items-center justify-between border-b border-border/40 pb-4">
        <div>
          <h3 className="font-sans text-lg font-bold text-foreground">Content-Negotiated Storefronts</h3>
          <p className="text-xs text-muted-foreground font-sans">Stop forcing machines to read human interfaces. Serve clean representations.</p>
        </div>
        <div className="flex rounded-lg border border-border bg-foreground/5 p-0.5">
          <button
            onClick={() => setTab("html")}
            className={`flex items-center gap-1.5 rounded-md px-3 py-1 text-xs font-semibold font-sans transition-all ${
              tab === "html"
                ? "bg-accent text-accent-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Layout className="h-3.5 w-3.5" /> Cluttered HTML
          </button>
          <button
            onClick={() => setTab("json")}
            className={`flex items-center gap-1.5 rounded-md px-3 py-1 text-xs font-semibold font-sans transition-all ${
              tab === "json"
                ? "bg-accent text-accent-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Code className="h-3.5 w-3.5" /> Agent JSON Feed
          </button>
        </div>
      </div>

      {tab === "html" ? (
        <div className="space-y-4 animate-fade-in">
          <div className="rounded-xl border border-red-500/20 bg-red-500/[0.02] p-4 text-xs space-y-3 font-sans">
            <span className="font-bold text-red-400">WHAT AN AGENT SEES TODAY:</span>
            <div className="space-y-2 text-muted-foreground">
              <div className="rounded border border-border bg-card p-2 text-center text-foreground font-semibold">
                🍪 Cookie Banner & Pop-ups (Requires JS solve)
              </div>
              <div className="rounded border border-border bg-card p-2 text-center text-foreground font-semibold">
                🎠 Hero Carousel Slider (Dynamic image asset load)
              </div>
              <div className="rounded border border-border bg-card p-2 text-center text-foreground font-semibold">
                📧 Newsletter Form & Help Chat Widget (Obscuring element focus)
              </div>
              <div className="rounded border border-border bg-card p-2 text-center text-foreground">
                Price hidden inside interactive size selector dropdowns
              </div>
            </div>
            <p className="text-[11px] leading-relaxed text-muted-foreground/80 pt-2 border-t border-border/40">
              <strong>Failure Vectors:</strong> High latencies, mis-parsed prices, selector timeouts, cart abandonment, and incorrect sizing variants.
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-4 animate-fade-in font-mono text-xs md:text-sm">
          <div className="flex items-center justify-between text-[11px] text-muted-foreground">
            <span>GET /.well-known/agent-offers.json</span>
            <span className="text-emerald-400">HTTP/2 200 OK</span>
          </div>
          <div className="rounded-xl border border-border bg-black/60 p-4 leading-relaxed text-emerald-400">
            {`{
  "sku": "SNK-DUNE-42",
  "name": "Dune Runner sneaker, UK 8",
  "price": 4299,
  "currency": "INR",
  "in_stock": true,
  "ships_in_days": 2,
  "returns": "14-day replacement",
  "delegated_checkout_api": "/api/checkout?sku=SNK-DUNE-42"
}`}
          </div>
          <p className="font-sans text-xs text-muted-foreground leading-relaxed pt-2">
            <strong>The Solution:</strong> Serving a semantic, structured, JSON payload makes the shopping journey deterministic, reducing latency from seconds to milliseconds, and maximizing agent checkout conversion rates.
          </p>
        </div>
      )}
    </GlowCard>
  );
}
