import { ThemeToggle } from "@/components/theme-toggle";
import { GlowCard } from "@/components/glow-card";
import { TrafficGateVisualizer } from "@/components/traffic-gate-visualizer";
import { JargonDecoder } from "@/components/jargon-decoder";
import {
  ShieldAlert,
  ArrowRight,
  TrendingUp,
  LineChart,
  EyeOff,
  ShoppingBag,
  Award,
  Zap,
  Github
} from "lucide-react";

export default function LandingPage() {
  const stats = [
    { num: "58%", desc: "of sessions on top e-commerce storefronts are bots/agents (Turnstile telemetry, Jun 2026)" },
    { num: "₹7,600", desc: "average value of legitimate agent checkouts falsely flagged & declined by legacy rules" },
    { num: "42%", desc: "of ad budget wasted retargeting software platforms that lack retina-based viewports" },
    { num: "1.2s", desc: "average time an agent wastes parsing HTML buttons vs 12ms for JSON feeds" }
  ];

  return (
    <div className="relative min-h-screen bg-transparent grid-bg">
      {/* Background blobs */}
      <div className="pointer-events-none fixed inset-0 z-[-1] overflow-hidden">
        <div className="animate-blob-1 absolute -top-[10%] -left-[10%] h-[800px] w-[800px] rounded-full bg-emerald-500/18 dark:bg-emerald-500/12 blur-[130px] opacity-90" />
        <div className="animate-blob-2 absolute bottom-[-10%] right-[-10%] h-[800px] w-[800px] rounded-full bg-indigo-600/18 dark:bg-indigo-600/12 blur-[130px] opacity-90" />
        <div className="animate-blob-1 absolute top-[25%] left-[30%] h-[600px] w-[600px] rounded-full bg-rose-500/16 dark:bg-rose-500/12 blur-[130px] opacity-90" />
        <div className="animate-blob-2 absolute bottom-[25%] left-[-10%] h-[500px] w-[500px] rounded-full bg-amber-500/16 dark:bg-amber-500/10 blur-[130px] opacity-90" />
      </div>

      {/* Header / Nav */}
      <header className="fixed top-0 left-0 right-0 z-50">
        <div className="mx-auto mt-4 max-w-[1440px] px-4 sm:px-8 lg:px-12 xl:px-16">
          <div className="glass flex items-center justify-between rounded-2xl px-4 py-3 sm:px-6">
            <a href="#" className="flex items-center gap-2.5">
              <span className="text-base font-semibold tracking-tight text-foreground font-sans">
                Turnstile
              </span>
            </a>
            <nav className="flex items-center gap-3">
              <a
                href="https://bahniman.github.io"
                className="text-sm text-foreground/75 hover:text-foreground transition-colors"
              >
                ← Back to Portal
              </a>
              <a
                href="https://github.com/Bahniman/turnstile"
                target="_blank"
                rel="noreferrer"
                className="rounded-lg p-2 text-foreground/70 hover:bg-foreground/5 hover:text-foreground"
              >
                <Github className="h-4 w-4" />
              </a>
              <ThemeToggle />
            </nav>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="mx-auto max-w-[1440px] px-4 pt-28 pb-20 sm:px-8 lg:px-12 xl:px-16">
        <div className="max-w-[960px] mx-auto space-y-16">
          
          {/* Hero Section */}
          <section className="space-y-6 text-left">
            <div className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/5 px-3 py-1 text-xs font-semibold text-accent tracking-wide uppercase">
              <Award className="h-3.5 w-3.5" /> Startup Lab · Machine commerce engine
            </div>
            <h1 className="font-sans text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl lg:text-6xl leading-[1.08] bg-gradient-to-r from-foreground via-foreground to-accent bg-clip-text text-transparent">
              Commerce analytics<br />for the agent era.
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-[760px]">
              AI assistants now browse, compare, and buy products on behalf of their owners. To modern e-commerce software, they look like bots and get blocked. This causes lost sales from false declines, wasted ad spend on software targets, and broken funnel analytics. Turnstile solves this by classifying traffic and serving agents clean interfaces.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <a
                href="#demo"
                className="btn-press inline-flex items-center gap-2 rounded-xl bg-accent text-accent-foreground px-5 py-3 text-sm font-bold shadow-[0_4px_20px_rgba(85,102,255,0.25)] hover:brightness-110"
              >
                Try Interactive Demo <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="https://github.com/Bahniman/turnstile"
                target="_blank"
                rel="noreferrer"
                className="btn-press inline-flex items-center gap-2 rounded-xl border border-border bg-foreground/[0.02] px-5 py-3 text-sm font-bold text-foreground hover:bg-foreground/5"
              >
                <Github className="h-4 w-4" /> View Source Code
              </a>
            </div>
          </section>

          {/* Stats Bar */}
          <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((s, idx) => (
              <div key={idx} className="group relative overflow-hidden rounded-xl border border-border bg-card/40 p-5 shadow-sm">
                <span className="font-sans text-2xl font-extrabold text-accent text-neon-accent">{s.num}</span>
                <p className="mt-2 text-xs text-muted-foreground leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </section>

          {/* Detailed Problem Statement */}
          <section className="rounded-2xl border border-accent/20 bg-accent/[0.02] border-l-4 border-l-accent p-6 space-y-4">
            <h3 className="font-sans text-md font-bold text-accent uppercase tracking-wider inline-flex items-center gap-2">
              <ShieldAlert className="h-4 w-4" /> Why Legacy Fraud Engines Block Valid Purchases
            </h3>
            <p className="text-sm text-foreground/90 leading-relaxed">
              Modern fraud suites analyze mouse movements, keystroke delays, and viewport triggers to block malicious bots. When a customer delegates a shopping task to an agent, the agent accesses the page using headless drivers—resulting in <strong>instant keystrokes and zero mouse traces</strong>. Legacy filters flags these as card-not-present fraud, declining legitimate orders. 
              <br /><br />
              Turnstile provides a cryptographic signature framework that allows agents to authenticate themselves cleanly, whitelisting valid purchases while isolating web-scrapers and crawlers.
            </p>
          </section>

          {/* Interactive Demos Grid */}
          <section id="demo" className="scroll-mt-24 space-y-8">
            <div className="space-y-2">
              <h2 className="font-sans text-2xl font-bold text-foreground">Interactive Simulator Deck</h2>
              <p className="text-sm text-muted-foreground">Watch real-time classification gates and see what happens when content negotiation triggers.</p>
            </div>

            <div className="w-full">
              <TrafficGateVisualizer />
            </div>
          </section>

          {/* Architecture Details */}
          <section className="space-y-6">
            <h2 className="font-sans text-2xl font-bold text-foreground">Core Components</h2>
            <div className="grid gap-6 sm:grid-cols-3">
              <GlowCard className="space-y-3" showTechBrackets={true}>
                <TrendingUp className="h-6 w-6 text-accent" />
                <h4 className="font-sans text-sm font-bold uppercase tracking-wider text-foreground">1. Traffic Classifier</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Passively scores behavioral indicators (scrolling cadence, asset loading, cookie consent timeouts) to separate human shoppers from software agents without blocking.
                </p>
              </GlowCard>
              <GlowCard className="space-y-3" showTechBrackets={true}>
                <EyeOff className="h-6 w-6 text-accent" />
                <h4 className="font-sans text-sm font-bold uppercase tracking-wider text-foreground">2. Clean Attribution</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Attributes purchases and engagement directly to the delegating agent. Prevents analytics corruption, keeping A/B test funnels clean and advertising budgets targeted.
                </p>
              </GlowCard>
              <GlowCard className="space-y-3" showTechBrackets={true}>
                <ShoppingBag className="h-6 w-6 text-accent" />
                <h4 className="font-sans text-sm font-bold uppercase tracking-wider text-foreground">3. Agent Storefront (AEO)</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Serves lightweight, machine-readable JSON feeds detailing product catalog availability, prices, and checkout endpoints. Reduces data-transfer overhead and cart drops.
                </p>
              </GlowCard>
            </div>
          </section>

          {/* Business Model */}
          <section className="grid gap-6 md:grid-cols-2">
            <GlowCard className="space-y-4" showTechBrackets={true}>
              <h3 className="font-sans text-lg font-bold text-foreground">Merchant Benefits</h3>
              <ul className="space-y-3 text-xs md:text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <Zap className="h-4 w-4 shrink-0 text-accent" />
                  <span><strong>Recovered Revenue:</strong> Stops losing margins to false declines of delegating agent purchases.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Zap className="h-4 w-4 shrink-0 text-accent" />
                  <span><strong>Clean Audiences:</strong> Ads are only served to human eyes, saving retargeting budget leakages.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Zap className="h-4 w-4 shrink-0 text-accent" />
                  <span><strong>Conversion Flywheel:</strong> Structured JSON feeds convert orders in milliseconds, boosting sales.</span>
                </li>
              </ul>
            </GlowCard>

            <GlowCard className="space-y-4" showTechBrackets={true}>
              <h3 className="font-sans text-lg font-bold text-foreground">Moat & Revenue</h3>
              <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                Free client snippet spreads as a diagnostic tool. Paid tiers offer agent-specific whitelisting, AEO feeds, and billing options. Our primary moat is our compounding corpus of labeled traffic: the classifier's detection accuracy grows with every store on our network, locking out late competitors.
              </p>
            </GlowCard>
          </section>

          {/* Jargon and Sources */}
          <section className="space-y-6">
            <JargonDecoder />

            <div className="rounded-xl border border-border bg-card p-5 text-xs text-muted-foreground space-y-3">
              <h4 className="font-bold text-foreground">Source Material & E-commerce References:</h4>
              <ol className="list-decimal pl-4 space-y-1.5 leading-relaxed">
                <li>Turnstile global traffic analyses (Q2 2026 telemetry database).</li>
                <li>E-commerce false declines and fraud detection standards – <a href="https://github.com/Bahniman/turnstile" target="_blank" rel="noreferrer" className="text-accent hover:underline">Turnstile GitHub Readme</a>.</li>
                <li>Ad budget waste reporting and programmatic delivery breakdowns.</li>
              </ol>
            </div>
          </section>

        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/40 py-8 bg-card/20">
        <div className="mx-auto max-w-[1440px] px-4 text-center sm:px-8">
          <p className="text-xs text-muted-foreground leading-normal">
            Turnstile · Part of the Startup Lab Series · MIT Licensed · <a href="https://github.com/Bahniman" className="text-accent hover:underline">GitHub</a>
          </p>
        </div>
      </footer>
    </div>
  );
}
