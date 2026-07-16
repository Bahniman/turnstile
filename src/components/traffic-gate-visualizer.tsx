import { useState, useEffect, useRef } from "react";
import { GlowCard } from "./glow-card";
import { 
  Play, RotateCcw, AlertTriangle, Users, Cpu, ShieldCheck, 
  Eye, EyeOff, LayoutGrid, FileJson, Check, AlertCircle, ShoppingCart, RefreshCw
} from "lucide-react";

interface VisitorSession {
  id: string;
  time: string;
  userAgent: string;
  mouseEntropy: number; // 0 (none/agent) to 100 (high/human)
  requestRate: number; // requests/sec
  kind: "human" | "agent" | "crawler" | "scraper";
  buyValue: number;
  status: "served_html" | "served_json" | "blocked";
  note: string;
}

const INITIAL_SESSIONS: VisitorSession[] = [
  { id: "SES-9821", time: "16:30:12", userAgent: "Mozilla/5.0 Chrome/124.0", mouseEntropy: 87, requestRate: 0.8, kind: "human", buyValue: 4299, status: "served_html", note: "Organic scroll gestures, standard load cadence" },
  { id: "SES-8120", time: "16:30:14", userAgent: "OpenClaw Shopping Bot v1.2", mouseEntropy: 0, requestRate: 2.1, kind: "agent", buyValue: 7600, status: "served_json", note: "Delegated shopping assistant check-out run" },
  { id: "SES-7441", time: "16:30:18", userAgent: "Googlebot/2.1 Crawler", mouseEntropy: 0, requestRate: 15.0, kind: "crawler", buyValue: 0, status: "served_json", note: "Indexing storefront meta descriptors" },
  { id: "SES-5619", time: "16:30:21", userAgent: "Mozilla/5.0 HeadlessChrome", mouseEntropy: 4, requestRate: 38.0, kind: "scraper", buyValue: 0, status: "blocked", note: "Aggressive price scraping on product catalog" },
  { id: "SES-3310", time: "16:30:25", userAgent: "Mozilla/5.0 Safari/605.1", mouseEntropy: 94, requestRate: 0.4, kind: "human", buyValue: 0, status: "served_html", note: "Active cart browsing on Dune Runner product" },
  { id: "SES-2114", time: "16:30:29", userAgent: "BrowserUse Agent Engine", mouseEntropy: 2, requestRate: 4.5, kind: "agent", buyValue: 3499, status: "served_json", note: "Procuring items based on user voice prompt" },
];

const NEW_VISITOR_POOL: Omit<VisitorSession, "id" | "time">[] = [
  { userAgent: "Mozilla/5.0 Edge/120.0", mouseEntropy: 82, requestRate: 1.2, kind: "human", buyValue: 5350, status: "served_html", note: "Returning checkout customer, applied discount code" },
  { userAgent: "AhrefsBot/7.0 Scraper", mouseEntropy: 0, requestRate: 45.0, kind: "scraper", buyValue: 0, status: "blocked", note: "High-frequency page scanning" },
  { userAgent: "ClaudeBot/1.0 AI Agent", mouseEntropy: 0, requestRate: 1.8, kind: "agent", buyValue: 2199, status: "served_json", note: "Shopping assistant fetching product availability matrix" },
  { userAgent: "Mozilla/5.0 Firefox/122.0", mouseEntropy: 91, requestRate: 0.5, kind: "human", buyValue: 0, status: "served_html", note: "Reading shipping details, no cart additions" },
];

export function TrafficGateVisualizer() {
  const [sessions, setSessions] = useState<VisitorSession[]>(INITIAL_SESSIONS);
  const [selectedSession, setSelectedSession] = useState<VisitorSession | null>(INITIAL_SESSIONS[1]!);
  const [entropyThreshold, setEntropyThreshold] = useState<number>(10);
  const [rateLimitThreshold, setRateLimitThreshold] = useState<number>(30);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [stats, setStats] = useState({
    humansServed: 2,
    agentsServed: 3,
    crawlersBlocked: 1,
    recoveredRevenue: 11099,
  });

  // Simulator interval to pipe new sessions
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isPlaying) {
      interval = setInterval(() => {
        const poolItem = NEW_VISITOR_POOL[Math.floor(Math.random() * NEW_VISITOR_POOL.length)]!;
        const randomId = "SES-" + Math.floor(1000 + Math.random() * 9000);
        const now = new Date();
        const timeStr = now.toTimeString().split(" ")[0]!;
        
        // Evaluate session status using current thresholds
        let evaluatedStatus: "served_html" | "served_json" | "blocked" = "served_html";
        if (poolItem.requestRate > rateLimitThreshold) {
          evaluatedStatus = "blocked";
        } else if (poolItem.mouseEntropy < entropyThreshold) {
          evaluatedStatus = poolItem.kind === "scraper" ? "blocked" : "served_json";
        } else {
          evaluatedStatus = "served_html";
        }

        const newSession: VisitorSession = {
          ...poolItem,
          id: randomId,
          time: timeStr,
          status: evaluatedStatus
        };

        setSessions(prev => [newSession, ...prev.slice(0, 7)]);
        setSelectedSession(newSession);

        setStats(prev => {
          const next = { ...prev };
          if (newSession.status === "blocked") {
            next.crawlersBlocked += 1;
          } else if (newSession.status === "served_json") {
            next.agentsServed += 1;
            next.recoveredRevenue += newSession.buyValue;
          } else {
            next.humansServed += 1;
          }
          return next;
        });

      }, 3500);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying, entropyThreshold, rateLimitThreshold]);

  // Handle manual threshold overrides in the list in real-time
  useEffect(() => {
    setSessions(prev => 
      prev.map(s => {
        let nextStatus: "served_html" | "served_json" | "blocked" = "served_html";
        if (s.requestRate > rateLimitThreshold) {
          nextStatus = "blocked";
        } else if (s.mouseEntropy < entropyThreshold) {
          nextStatus = s.kind === "scraper" ? "blocked" : "served_json";
        } else {
          nextStatus = "served_html";
        }
        return { ...s, status: nextStatus };
      })
    );
  }, [entropyThreshold, rateLimitThreshold]);

  const resetSimulator = () => {
    setSessions(INITIAL_SESSIONS);
    setSelectedSession(INITIAL_SESSIONS[1]!);
    setEntropyThreshold(10);
    setRateLimitThreshold(30);
    setIsPlaying(false);
    setStats({
      humansServed: 2,
      agentsServed: 3,
      crawlersBlocked: 1,
      recoveredRevenue: 11099,
    });
  };

  const getProductJSON = (session: VisitorSession) => {
    return JSON.stringify({
      schema: "turnstile/storefront/v1",
      session_id: session.id,
      client_agent: session.userAgent,
      product: {
        id: "prod-runner-01",
        name: "Apex Dune Runner v5",
        sku: "APX-DR-05-YLW",
        price_inr: 7600,
        currency: "INR",
        in_stock: true,
        sizes_available: [8, 9, 10, 11]
      },
      checkout_gateways: {
        agent_p2p_upi: "agent-pay@upi",
        p2p_key_exchange: "ed25519:pubkey:7f6e5d4c3b2a"
      }
    }, null, 2);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 w-full">
      {/* Left Panel: Traffic Gate Dashboard */}
      <div className="lg:col-span-7 flex flex-col gap-5">
        <div className="flex items-center justify-between border-b border-border pb-3.5">
          <div>
            <h3 className="font-sans text-lg font-bold text-foreground">Traffic Analytics Console</h3>
            <p className="text-xs text-muted-foreground">Monitor real-time requests, classify AI-shopping agents, and adjust gateways.</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className={`btn-press flex h-8 items-center gap-1.5 rounded-lg px-3 text-xs font-bold transition-all ${
                isPlaying 
                  ? "border border-red-500/30 bg-red-500/10 text-red-500"
                  : "border border-accent bg-accent text-accent-foreground shadow-[2px_2px_0_#161616]"
              }`}
            >
              <Play className="h-3.5 w-3.5" /> {isPlaying ? "Pause Stream" : "Live Stream"}
            </button>
            <button
              onClick={resetSimulator}
              className="btn-press border border-border bg-foreground/5 hover:bg-foreground/10 text-muted-foreground hover:text-foreground h-8 w-8 rounded-lg flex items-center justify-center"
              title="Reset Sandbox"
            >
              <RotateCcw className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-2 text-center">
          <div className="border border-border rounded-xl p-2 bg-foreground/[0.01]">
            <span className="text-[10px] text-muted-foreground block font-bold uppercase tracking-wider">Humans</span>
            <span className="text-lg font-bold text-foreground">{stats.humansServed}</span>
          </div>
          <div className="border border-border rounded-xl p-2 bg-foreground/[0.01]">
            <span className="text-[10px] text-muted-foreground block font-bold uppercase tracking-wider">AI Agents</span>
            <span className="text-lg font-bold text-blue-500">{stats.agentsServed}</span>
          </div>
          <div className="border border-border rounded-xl p-2 bg-foreground/[0.01]">
            <span className="text-[10px] text-muted-foreground block font-bold uppercase tracking-wider">Blocked</span>
            <span className="text-lg font-bold text-red-500">{stats.crawlersBlocked}</span>
          </div>
          <div className="border border-border rounded-xl p-2 bg-foreground/[0.01]">
            <span className="text-[10px] text-muted-foreground block font-bold uppercase tracking-wider">Revenue</span>
            <span className="text-sm font-bold text-emerald-500 block truncate mt-1">₹{stats.recoveredRevenue.toLocaleString()}</span>
          </div>
        </div>

        {/* Threshold Rules */}
        <div className="border border-border rounded-xl p-4 bg-foreground/[0.01] space-y-4 font-mono text-xs">
          <div className="flex items-center justify-between border-b border-border/40 pb-2">
            <span className="font-bold text-foreground">GATE CLASSIFIER POLICIES</span>
            <span className="text-[9px] text-muted-foreground">ACTIVE GATEWAYS</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Slider 1 */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-[11px]">
                <span className="text-muted-foreground">Mouse Entropy Threshold:</span>
                <span className="text-foreground font-bold">{entropyThreshold}%</span>
              </div>
              <input 
                type="range" 
                min="0" 
                max="50" 
                value={entropyThreshold} 
                onChange={(e) => setEntropyThreshold(Number(e.target.value))}
                className="w-full accent-blue-600 h-1 bg-border rounded-lg appearance-none cursor-pointer"
              />
              <span className="text-[9px] text-muted-foreground/60 block">Sessions with mouse entropy below this are classified as agents.</span>
            </div>

            {/* Slider 2 */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-[11px]">
                <span className="text-muted-foreground">Rate Limit Block:</span>
                <span className="text-foreground font-bold">{rateLimitThreshold} req/s</span>
              </div>
              <input 
                type="range" 
                min="5" 
                max="50" 
                value={rateLimitThreshold} 
                onChange={(e) => setRateLimitThreshold(Number(e.target.value))}
                className="w-full accent-red-600 h-1 bg-border rounded-lg appearance-none cursor-pointer"
              />
              <span className="text-[9px] text-muted-foreground/60 block">Rate limits above this get permanently blocked as scrapers.</span>
            </div>
          </div>
        </div>

        {/* Live Logs */}
        <div className="border border-border rounded-xl p-3 bg-[#0A0A0B] flex-1 min-h-[220px]">
          <span className="font-mono text-[9px] uppercase font-bold text-muted-foreground block border-b border-border/40 pb-1.5 mb-2">Live Session Logs</span>
          <div className="space-y-2 max-h-[240px] overflow-y-auto pr-1">
            {sessions.map((s) => {
              const isSelected = selectedSession?.id === s.id;
              
              return (
                <button
                  key={s.id}
                  onClick={() => setSelectedSession(s)}
                  className={`w-full text-left p-2.5 rounded-lg border font-mono text-[11px] flex items-center justify-between transition-colors ${
                    isSelected
                      ? "border-blue-500 bg-blue-500/5 text-foreground font-semibold"
                      : "border-border/40 hover:bg-foreground/5 text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-muted-foreground/60">{s.time}</span>
                    <span className="text-foreground font-bold">{s.id}</span>
                    <span className="truncate max-w-[120px] sm:max-w-[180px]">{s.userAgent}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="hidden sm:inline text-[9px] text-muted-foreground/70">
                      Ent: {s.mouseEntropy}% | {s.requestRate} r/s
                    </span>
                    {s.status === "served_html" ? (
                      <span className="border border-emerald-500/30 text-emerald-400 bg-emerald-500/5 px-1.5 py-0.5 rounded text-[9px] font-bold">HTML</span>
                    ) : s.status === "served_json" ? (
                      <span className="border border-blue-500/30 text-blue-400 bg-blue-500/5 px-1.5 py-0.5 rounded text-[9px] font-bold">JSON</span>
                    ) : (
                      <span className="border border-red-500/30 text-red-400 bg-red-500/5 px-1.5 py-0.5 rounded text-[9px] font-bold">BLOCK</span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Right Panel: Content Negotiation Showcase */}
      <div className="lg:col-span-5 border border-border rounded-xl p-4 bg-[#0A0A0B] relative flex flex-col min-h-[460px]">
        <div className="absolute top-2 right-2 w-4 h-1 border-t border-r border-border/60" />
        <div className="absolute bottom-2 right-2 w-4 h-1 border-b border-r border-border/60" />
        <div className="absolute top-2 left-2 w-4 h-1 border-t border-l border-border/60" />
        <div className="absolute bottom-2 left-2 w-4 h-1 border-b border-l border-border/60" />

        {selectedSession ? (() => {
          const isHtml = selectedSession.status === "served_html";
          const isJson = selectedSession.status === "served_json";
          const isBlocked = selectedSession.status === "blocked";
          
          return (
            <div className="h-full flex flex-col space-y-4">
              <div className="border-b border-border/40 pb-3 flex items-center justify-between">
                <span className="font-mono font-bold text-foreground text-xs">{selectedSession.id} // CONTENT GATEWAY</span>
                <span className="font-mono text-[9px] uppercase border border-border px-2 py-0.5 rounded font-bold text-muted-foreground">
                  {isHtml ? "HUMAN CLIENT" : isJson ? "AI AGENT CLIENT" : "MALICIOUS"}
                </span>
              </div>

              {/* Note */}
              <div className="rounded-lg bg-foreground/[0.02] border border-border/40 p-2.5 font-mono text-[10px] text-muted-foreground">
                <span className="text-foreground font-bold">Telemetry Feed:</span> {selectedSession.note}
              </div>

              {/* Viewport content */}
              <div className="flex-1 bg-black/40 border border-border/60 rounded-lg p-3 relative overflow-hidden min-h-[220px] flex items-center justify-center">
                {isBlocked ? (
                  <div className="text-center font-mono space-y-2 p-4 animate-pulse">
                    <EyeOff className="h-8 w-8 mx-auto text-red-500/80" />
                    <p className="font-bold text-red-500">403 FORBIDDEN</p>
                    <p className="text-[10px] text-zinc-500">Turnstile blocked request. High frequency scraper behavior detected. API key and cookies blacklisted.</p>
                  </div>
                ) : isJson ? (
                  <div className="w-full h-full flex flex-col font-mono text-[10px] text-zinc-400">
                    <div className="flex items-center justify-between border-b border-border/20 pb-1.5 mb-2">
                      <span>HTTP/1.1 200 OK Content-Type: application/json</span>
                      <span className="text-[9px] text-blue-400 font-bold">AEO OPTIMIZED Feed</span>
                    </div>
                    <pre className="flex-1 overflow-auto max-h-[230px] scrollbar-thin select-all">
                      {getProductJSON(selectedSession)}
                    </pre>
                  </div>
                ) : (
                  <div className="w-full h-full flex flex-col">
                    <div className="flex items-center justify-between border-b border-border/20 pb-1.5 mb-3 font-mono text-[9px] text-zinc-500">
                      <span>HTTP/1.1 200 OK Content-Type: text/html</span>
                      <span className="text-[9px] text-emerald-400 font-bold">Rich User Storefront</span>
                    </div>
                    
                    {/* Render visual mockup of storefront */}
                    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-3.5 space-y-3.5 font-sans max-w-sm mx-auto shadow-xl">
                      <div className="bg-zinc-850 aspect-video rounded-lg flex items-center justify-center border border-zinc-800 relative">
                        <ShoppingCart className="h-10 w-10 text-zinc-700" />
                        <span className="absolute top-2 left-2 bg-[#000DFF] text-white text-[9px] font-bold px-2 py-0.5 rounded">NEW ARRIVAL</span>
                      </div>
                      
                      <div className="space-y-1">
                        <div className="flex items-center justify-between">
                          <h4 className="text-white text-xs font-bold font-sans">Apex Dune Runner v5</h4>
                          <span className="text-emerald-400 text-xs font-bold">₹7,600</span>
                        </div>
                        <p className="text-[10px] text-zinc-400">Pro-grade running shoes featuring vulcanized dual soles and carbon plates.</p>
                      </div>

                      <button className="w-full bg-[#000DFF] hover:bg-blue-700 text-white rounded-lg p-2 text-xs font-bold transition-all hover:scale-[1.02]">
                        Purchase Item
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Interface signature details */}
              <div className="font-mono text-[9px] flex flex-col gap-1 text-muted-foreground/50 border-t border-border/40 pt-3">
                <span>GATEWAY_DECISION: {isBlocked ? "ACTION_DENY_SCRAPER" : isJson ? "ACTION_SERVE_JSON_AEO" : "ACTION_SERVE_HTML"}</span>
                <span>DATA_PAYLOAD_SIZE: {isBlocked ? "0 bytes" : isJson ? "350 bytes (96% saved)" : "85 KB (Images + DOM)"}</span>
              </div>
            </div>
          );
        }) : (
          <div className="h-full flex items-center justify-center text-center text-muted-foreground font-mono text-xs">
            <span>Select a traffic log row on the left to inspect its custom gateway feed.</span>
          </div>
        )}
      </div>
    </div>
  );
}
