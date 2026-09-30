import { useState, useEffect, useRef } from "react";
import { Play, Pause, RotateCcw, EyeOff, ShoppingCart } from "lucide-react";
import { classifySampleSession, reclassifySampleSessions, summarizeVisibleSessions, type VisitorSession } from "@/lib/traffic-model";

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
  const [sessions, setSessions] = useState<VisitorSession[]>(() => reclassifySampleSessions(INITIAL_SESSIONS, 10, 30));
  const [selectedId, setSelectedId] = useState<string>(INITIAL_SESSIONS[1]!.id);
  const [entropyThreshold, setEntropyThreshold] = useState<number>(10);
  const [rateLimitThreshold, setRateLimitThreshold] = useState<number>(30);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const stats = summarizeVisibleSessions(sessions);
  const selectedSession = sessions.find(session => session.id === selectedId) ?? sessions[0] ?? null;
  const isJson = selectedSession?.status === "served_json";
  const isBlocked = selectedSession?.status === "blocked";
  const kindLabel = selectedSession ? {
    human: "Person sample", agent: "Shopping-agent sample", crawler: "Crawler sample", scraper: "Scraper sample",
  }[selectedSession.kind] : "";
  const nextId = useRef(9000);

  // Simulator interval to pipe new sessions
  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;
    if (isPlaying) {
      interval = setInterval(() => {
        const poolItem = NEW_VISITOR_POOL[Math.floor(Math.random() * NEW_VISITOR_POOL.length)]!;
        nextId.current += 1;
        const randomId = "SES-" + nextId.current;
        const now = new Date();
        const timeStr = now.toTimeString().split(" ")[0]!;
        
        const newSession: VisitorSession = {
          ...poolItem,
          id: randomId,
          time: timeStr,
          status: classifySampleSession(poolItem, entropyThreshold, rateLimitThreshold),
        };

        setSessions(prev => [newSession, ...prev.slice(0, 7)]);
        setSelectedId(newSession.id);

      }, 3500);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying, entropyThreshold, rateLimitThreshold]);

  // Handle manual threshold overrides in the list in real-time
  useEffect(() => {
    setSessions(prev => reclassifySampleSessions(prev, entropyThreshold, rateLimitThreshold));
  }, [entropyThreshold, rateLimitThreshold]);

  const resetSimulator = () => {
    setSessions(reclassifySampleSessions(INITIAL_SESSIONS, 10, 30));
    setSelectedId(INITIAL_SESSIONS[1]!.id);
    setEntropyThreshold(10);
    setRateLimitThreshold(30);
    setIsPlaying(false);
    nextId.current = 9000;
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
      checkout: "Not simulated in this prototype"
    }, null, 2);
  };

  return (
    <div className="traffic-demo grid grid-cols-1 lg:grid-cols-12 gap-6 w-full">
      {/* Left Panel: Traffic Gate Dashboard */}
      <div className="lg:col-span-7 flex flex-col gap-5">
        <div className="flex items-center justify-between border-b border-border pb-3.5">
          <div>
            <h3 className="font-sans text-lg font-bold text-foreground">Sample traffic gate</h3>
            <p className="text-xs text-muted-foreground">Fixed examples · local rules · no live requests</p>
            <p className="sr-only" role="status" aria-live="polite">
              {selectedSession ? `Selected ${selectedSession.id}: ${kindLabel}, ${isBlocked ? "blocked by sample rule" : isJson ? "JSON mockup" : "HTML mockup"}.` : "No sample selected."}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setIsPlaying(value => !value)}
              aria-pressed={isPlaying}
              className={`flex h-8 items-center gap-1.5 rounded-lg px-3 text-xs font-bold transition-all ${
                isPlaying 
                  ? "border border-error bg-error-container text-on-error-container"
                  : "border border-outline bg-primary text-on-primary hover:bg-primary/90 active:bg-primary/80"
              }`}
            >
              {isPlaying ? <Pause aria-hidden="true" className="h-3.5 w-3.5" /> : <Play aria-hidden="true" className="h-3.5 w-3.5" />}
              {isPlaying ? "Pause sample" : "Play sample stream"}
            </button>
            <button
              type="button"
              onClick={resetSimulator}
              className="border border-outline-variant bg-surface-container-low hover:bg-on-surface/8 text-on-surface-variant hover:text-on-surface h-8 w-8 rounded-lg flex items-center justify-center transition-colors"
              title="Reset sample stream"
              aria-label="Reset sample stream"
            >
              <RotateCcw aria-hidden="true" className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="traffic-stats grid grid-cols-2 sm:grid-cols-4 gap-2 text-center" aria-label="Summary of visible sample sessions">
          <div className="border border-outline-variant rounded-lg p-2 bg-surface-container-low">
            <span className="text-[10px] text-on-surface-variant block font-bold uppercase tracking-wider">People · HTML</span>
            <span className="text-lg font-bold text-on-surface">{stats.humansServed}</span>
          </div>
          <div className="border border-outline-variant rounded-lg p-2 bg-surface-container-low">
            <span className="text-[10px] text-on-surface-variant block font-bold uppercase tracking-wider">Shopping agents · JSON</span>
            <span className="text-lg font-bold text-primary">{stats.agentsServed}</span>
          </div>
          <div className="border border-outline-variant rounded-lg p-2 bg-surface-container-low">
            <span className="text-[10px] text-on-surface-variant block font-bold uppercase tracking-wider">Other automation</span>
            <span className="text-lg font-bold text-error">{stats.otherAutomated}</span>
          </div>
          <div className="border border-outline-variant rounded-lg p-2 bg-surface-container-low">
            <span className="text-[10px] text-on-surface-variant block font-bold uppercase tracking-wider">Sample order value</span>
            <span className="text-sm font-bold text-primary block truncate mt-1">₹{stats.sampleOrderValue.toLocaleString("en-IN")}</span>
          </div>
        </div>
        <p className="traffic-window text-xs text-muted-foreground">Counts and sample order value use the {sessions.length} visible rows only; changing a threshold reclassifies those rows.</p>

        {/* Threshold Rules */}
        <div className="border border-outline-variant rounded-lg p-4 bg-surface-container-low space-y-4 font-mono text-xs">
          <div className="flex items-center justify-between border-b border-outline-variant/60 pb-2">
            <span className="font-bold text-foreground">Sample rules</span>
            <span className="text-[9px] text-on-surface-variant">Illustrative only</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Slider 1 */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-[11px]">
                <label htmlFor="entropyThreshold" className="text-on-surface-variant">Low mouse-activity threshold</label>
                <span className="text-foreground font-bold">{entropyThreshold}%</span>
              </div>
              <input 
                id="entropyThreshold"
                type="range" 
                min="0" 
                max="50" 
                value={entropyThreshold} 
                onChange={(e) => setEntropyThreshold(Number(e.target.value))}
                aria-describedby="entropyHelp"
                className="w-full accent-primary h-1 bg-outline-variant rounded-lg appearance-none cursor-pointer"
              />
              <span id="entropyHelp" className="text-[9px] text-on-surface-variant/60 block">Below this sample value, the rule routes non-scraper visits to the JSON mockup.</span>
            </div>

            {/* Slider 2 */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-[11px]">
                <label htmlFor="rateThreshold" className="text-on-surface-variant">Request-rate block threshold</label>
                <span className="text-foreground font-bold">{rateLimitThreshold} req/s</span>
              </div>
              <input 
                id="rateThreshold"
                type="range" 
                min="5" 
                max="50" 
                value={rateLimitThreshold} 
                onChange={(e) => setRateLimitThreshold(Number(e.target.value))}
                aria-describedby="rateHelp"
                className="w-full accent-error h-1 bg-outline-variant rounded-lg appearance-none cursor-pointer"
              />
              <span id="rateHelp" className="text-[9px] text-on-surface-variant/60 block">Any sample above this rate is marked blocked by this rule; no request is actually blocked.</span>
            </div>
          </div>
        </div>

        {/* Live Logs */}
        <div className="traffic-log border border-outline-variant rounded-lg p-3 bg-surface-container-high flex-1 min-h-[220px]">
          <div className="flex items-center justify-between border-b border-outline-variant/60 pb-1.5 mb-2">
            <span className="font-mono text-[9px] uppercase font-bold text-on-surface-variant">Sample session log</span>
            <span className="font-mono text-[9px] text-on-surface-variant">{sessions.length} shown</span>
          </div>
          <div className="space-y-2 max-h-[240px] overflow-y-auto pr-1">
            {sessions.map((s) => {
              const isSelected = selectedSession?.id === s.id;
              return (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setSelectedId(s.id)}
                  aria-pressed={isSelected}
                  className={`w-full text-left p-2.5 rounded-lg border font-mono text-[11px] flex items-center justify-between transition-colors ${
                    isSelected
                      ? "border-primary bg-primary-container text-on-primary-container font-semibold"
                      : "border-outline-variant hover:bg-on-surface/8 text-on-surface-variant hover:text-on-surface"
                  }`}
                >
                  <span className="traffic-row-main flex items-center gap-3 min-w-0">
                    <span className="text-on-surface-variant/60">{s.time}</span>
                    <span className="text-foreground font-bold">{s.id}</span>
                    <span className="truncate max-w-[120px] sm:max-w-[180px]">{s.userAgent}</span>
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="hidden sm:inline text-[9px] text-on-surface-variant/70">
                      Ent: {s.mouseEntropy}% | {s.requestRate} r/s
                    </span>
                    {s.status === "served_html" ? (
                      <span className="route-tag route-html border border-transparent text-on-primary-container bg-primary-container px-1.5 py-0.5 rounded text-[9px] font-bold">HTML</span>
                    ) : s.status === "served_json" ? (
                      <span className="route-tag route-json border border-primary/30 text-primary bg-primary/5 px-1.5 py-0.5 rounded text-[9px] font-bold">JSON</span>
                    ) : (
                      <span className="route-tag route-block border border-error/30 text-error bg-error/5 px-1.5 py-0.5 rounded text-[9px] font-bold">BLOCKED</span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Right Panel: Content Negotiation Showcase */}
      <aside className="traffic-preview lg:col-span-5 border border-outline-variant rounded-2xl p-4 bg-surface-container-low relative flex flex-col min-h-[460px] text-on-surface" aria-label="Selected sample outcome">
        {selectedSession ? (
            <div className="h-full flex flex-col space-y-4">
              <div className="border-b border-outline-variant pb-3 flex items-center justify-between">
                <span className="font-mono font-medium text-on-surface text-xs">{selectedSession.id} · sample outcome</span>
                <span className="font-mono text-[9px] uppercase border border-outline-variant px-2 py-0.5 rounded font-medium text-on-surface-variant">
                  {kindLabel}
                </span>
              </div>

              {/* Note */}
              <div className="rounded-lg bg-surface-container-highest border border-transparent p-2.5 font-mono text-[10px] text-on-surface-variant">
                <span className="text-on-surface font-medium">Sample note:</span> {selectedSession.note}
              </div>

              {/* Viewport content */}
              <div className="flex-1 bg-surface-container-highest border border-transparent rounded-lg p-3 relative overflow-hidden min-h-[220px] flex items-center justify-center">
                {isBlocked ? (
                  <div className="text-center font-mono space-y-2 p-4 animate-pulse">
                    <EyeOff className="h-8 w-8 mx-auto text-error" />
                    <p className="font-bold text-error">Blocked by sample rule</p>
                    <p className="text-[10px] text-on-surface-variant">This local example crosses the selected request-rate threshold. No request is sent or blocked.</p>
                  </div>
                ) : isJson ? (
                  <div className="w-full h-full flex flex-col font-mono text-[10px] text-on-surface-variant">
                    <div className="flex items-center justify-between border-b border-outline-variant/60 pb-1.5 mb-2">
                      <span>Illustrative offer payload · JSON</span>
                      <span className="text-[9px] text-primary font-bold">NOT A LIVE ENDPOINT</span>
                    </div>
                    <pre className="flex-1 overflow-auto max-h-[230px] scrollbar-thin select-all">
                      {getProductJSON(selectedSession)}
                    </pre>
                  </div>
                ) : (
                  <div className="w-full h-full flex flex-col">
                    <div className="flex items-center justify-between border-b border-outline-variant pb-1.5 mb-3 font-mono text-[9px] text-on-surface-variant">
                      <span>Illustrative storefront view</span>
                      <span className="text-[9px] text-primary font-medium">MOCKUP</span>
                    </div>
                    
                    {/* Render visual mockup of storefront */}
                    <div className="bg-surface-container-high border border-transparent rounded-xl p-3.5 space-y-3.5 font-sans max-w-sm mx-auto text-on-surface">
                      <div className="bg-surface-container aspect-video rounded-lg flex items-center justify-center border border-outline-variant relative">
                        <ShoppingCart className="h-10 w-10 text-on-surface-variant" />
                        <span className="absolute top-2 left-2 bg-primary text-on-primary text-[9px] font-bold px-2 py-0.5 rounded">NEW ARRIVAL</span>
                      </div>
                      
                      <div className="space-y-1">
                        <div className="flex items-center justify-between">
                          <h4 className="text-on-surface text-xs font-medium font-sans">Apex Dune Runner v5</h4>
                          <span className="text-primary text-xs font-bold">₹7,600</span>
                        </div>
                        <p className="text-[10px] text-on-surface-variant">Pro-grade running shoes featuring vulcanized dual soles and carbon plates.</p>
                      </div>

                      <p className="sample-checkout w-full rounded-lg p-2.5 text-center text-xs font-bold">Checkout is not part of this demo</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Interface signature details */}
              <div className="font-mono text-[9px] flex flex-col gap-1 text-on-surface-variant border-t border-outline-variant pt-3">
                <span>Sample route: {isBlocked ? "blocked by threshold" : isJson ? "JSON mockup" : "HTML mockup"}</span>
                <span>Live detection, traffic collection, and checkout: not implemented</span>
              </div>
            </div>
        ) : (
          <div className="h-full flex items-center justify-center text-center text-muted-foreground font-mono text-xs">
            <span>Select a sample log row to inspect its illustrative outcome.</span>
          </div>
        )}
      </aside>
    </div>
  );
}
