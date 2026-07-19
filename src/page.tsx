import { ThemeToggle } from "@/components/theme-toggle";
import { TrafficGateVisualizer } from "@/components/traffic-gate-visualizer";
import { JargonDecoder } from "@/components/jargon-decoder";
import {
  ShieldAlert,
  ArrowRight,
  TrendingUp,
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
    <div className="relative min-h-screen bg-surface text-on-surface font-sans">
      
      {/* M3 Top App Bar */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-surface border-b border-border">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-8 lg:px-12 xl:px-16">
          <div className="flex items-center justify-between h-16">
            <a href="#" className="flex items-center gap-2.5">
              <span className="text-title-lg font-medium">
                Turnstile
              </span>
            </a>
            <nav className="flex items-center gap-2 sm:gap-4">
              <a
                href="https://bahniman.github.io"
                className="text-xs sm:text-sm font-medium hover:text-primary transition-colors whitespace-nowrap"
              >
                <span className="hidden sm:inline">← Back to Portal</span>
                <span className="sm:hidden">← Portal</span>
              </a>
              <a
                href="https://github.com/Bahniman/turnstile"
                target="_blank"
                rel="noreferrer"
                className="rounded-full p-2 text-on-surface-variant hover:bg-surface-container-high transition-colors"
              >
                <Github className="h-5 w-5" />
              </a>
              <ThemeToggle />
            </nav>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="mx-auto max-w-[1440px] px-4 pt-28 pb-20 sm:px-8 lg:px-12 xl:px-16">
        <div className="max-w-[960px] mx-auto space-y-16">
          
          {/* M3 Hero Section */}
          <section className="space-y-6 text-left">
            <div className="inline-flex items-center gap-2 rounded-full bg-surface-container-high px-4 py-1.5 text-label-lg font-medium text-primary">
              <Award className="h-4 w-4" /> Startup Lab · Machine commerce engine
            </div>
            <h1 className="text-4xl leading-tight md:text-[57px] md:leading-[64px] font-normal text-on-surface">
              Commerce analytics<br />for the agent era.
            </h1>
            <p className="text-title-lg leading-relaxed text-on-surface-variant max-w-[760px]">
              AI assistants now browse, compare, and buy products on behalf of their owners. To modern e-commerce software, they look like bots and get blocked. This causes lost sales from false declines, wasted ad spend on software targets, and broken funnel analytics. Turnstile solves this by classifying traffic and serving agents clean interfaces.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-4">
              <a
                href="#demo"
                className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-6 py-3 text-label-lg font-medium hover:bg-[color-mix(in_srgb,var(--md-sys-color-on-primary)_8%,var(--md-sys-color-primary))] transition-colors"
              >
                Try Interactive Demo <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="https://github.com/Bahniman/turnstile"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-label-lg font-medium text-primary hover:bg-surface-container-low transition-colors"
              >
                <Github className="h-4 w-4" /> View Source Code
              </a>
            </div>
          </section>

          {/* M3 Stats Bar (Outlined Cards) */}
          <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((s, idx) => (
              <div key={idx} className="rounded-[12px] border border-border bg-surface p-6 hover:bg-surface-container-low transition-colors">
                <span className="text-headline-md font-medium text-primary">{s.num}</span>
                <p className="mt-2 text-body-md text-on-surface-variant leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </section>

          {/* Detailed Problem Statement (Error Container style for urgency) */}
          <section className="rounded-lg bg-error-container p-6 space-y-4">
            <h3 className="text-title-lg font-medium text-on-error-container inline-flex items-center gap-2">
              <ShieldAlert className="h-5 w-5" /> Why Legacy Fraud Engines Block Valid Purchases
            </h3>
            <p className="text-body-lg text-on-error-container leading-relaxed">
              Modern fraud suites analyze mouse movements, keystroke delays, and viewport triggers to block malicious bots. When a customer delegates a shopping task to an agent, the agent accesses the page using headless drivers—resulting in <strong>instant keystrokes and zero mouse traces</strong>. Legacy filters flags these as card-not-present fraud, declining legitimate orders. 
              <br /><br />
              Turnstile provides a cryptographic signature framework that allows agents to authenticate themselves cleanly, whitelisting valid purchases while isolating web-scrapers and crawlers.
            </p>
          </section>

          {/* Interactive Demos Grid */}
          <section id="demo" className="scroll-mt-24 space-y-8 pt-8 border-t border-border">
            <div className="space-y-2">
              <h2 className="text-headline-lg font-normal text-on-surface">Interactive Simulator Deck</h2>
              <p className="text-body-lg text-on-surface-variant">Watch real-time classification gates and see what happens when content negotiation triggers.</p>
            </div>

            <div className="w-full">
              <TrafficGateVisualizer />
            </div>
          </section>

          {/* Architecture Details (Filled Cards) */}
          <section className="space-y-6 pt-8 border-t border-border">
            <h2 className="text-headline-lg font-normal text-on-surface">Core Components</h2>
            <div className="grid gap-6 sm:grid-cols-3">
              <div className="rounded-[16px] bg-surface-container p-6 space-y-4">
                <TrendingUp className="h-8 w-8 text-primary" />
                <h4 className="text-title-lg font-medium text-on-surface">1. Traffic Classifier</h4>
                <p className="text-body-md text-on-surface-variant leading-relaxed">
                  Passively scores behavioral indicators (scrolling cadence, asset loading, cookie consent timeouts) to separate human shoppers from software agents without blocking.
                </p>
              </div>
              <div className="rounded-[16px] bg-surface-container p-6 space-y-4">
                <EyeOff className="h-8 w-8 text-primary" />
                <h4 className="text-title-lg font-medium text-on-surface">2. Clean Attribution</h4>
                <p className="text-body-md text-on-surface-variant leading-relaxed">
                  Attributes purchases and engagement directly to the delegating agent. Prevents analytics corruption, keeping A/B test funnels clean and advertising budgets targeted.
                </p>
              </div>
              <div className="rounded-[16px] bg-surface-container p-6 space-y-4">
                <ShoppingBag className="h-8 w-8 text-primary" />
                <h4 className="text-title-lg font-medium text-on-surface">3. Agent Storefront</h4>
                <p className="text-body-md text-on-surface-variant leading-relaxed">
                  Serves lightweight, machine-readable JSON feeds detailing product catalog availability, prices, and checkout endpoints. Reduces data-transfer overhead and cart drops.
                </p>
              </div>
            </div>
          </section>

          {/* Business Model (Filled Cards) */}
          <section className="grid gap-6 md:grid-cols-2 pt-8 border-t border-border">
            <div className="rounded-[16px] bg-surface-container-low p-6 space-y-4">
              <h3 className="text-headline-md font-normal text-on-surface">Merchant Benefits</h3>
              <ul className="space-y-4 text-body-md text-on-surface-variant">
                <li className="flex items-start gap-3">
                  <Zap className="h-5 w-5 shrink-0 text-primary" />
                  <span><strong>Recovered Revenue:</strong> Stops losing margins to false declines of delegating agent purchases.</span>
                </li>
                <li className="flex items-start gap-3">
                  <Zap className="h-5 w-5 shrink-0 text-primary" />
                  <span><strong>Clean Audiences:</strong> Ads are only served to human eyes, saving retargeting budget leakages.</span>
                </li>
                <li className="flex items-start gap-3">
                  <Zap className="h-5 w-5 shrink-0 text-primary" />
                  <span><strong>Conversion Flywheel:</strong> Structured JSON feeds convert orders in milliseconds, boosting sales.</span>
                </li>
              </ul>
            </div>

            <div className="rounded-[16px] bg-surface-container-low p-6 space-y-4">
              <h3 className="text-headline-md font-normal text-on-surface">Moat & Revenue</h3>
              <p className="text-body-md text-on-surface-variant leading-relaxed">
                Free client snippet spreads as a diagnostic tool. Paid tiers offer agent-specific whitelisting, AEO feeds, and billing options. Our primary moat is our compounding corpus of labeled traffic: the classifier's detection accuracy grows with every store on our network, locking out late competitors.
              </p>
            </div>
          </section>

          {/* Jargon and Sources */}
          <section className="space-y-6 pt-8 border-t border-border">
            <JargonDecoder />

            <div className="rounded-[12px] border border-border bg-surface p-6 text-body-md text-on-surface-variant space-y-4">
              <h4 className="font-medium text-on-surface">Source Material & E-commerce References:</h4>
              <ol className="list-decimal pl-5 space-y-2 leading-relaxed">
                <li>Turnstile global traffic analyses (Q2 2026 telemetry database).</li>
                <li>E-commerce false declines and fraud detection standards – <a href="https://github.com/Bahniman/turnstile" target="_blank" rel="noreferrer" className="text-primary hover:underline">Turnstile GitHub Readme</a>.</li>
                <li>Ad budget waste reporting and programmatic delivery breakdowns.</li>
              </ol>
            </div>
          </section>

        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-surface-container-low py-8">
        <div className="mx-auto max-w-[1440px] px-4 text-center sm:px-8">
          <p className="text-body-md text-on-surface-variant leading-normal">
            Turnstile · Part of the Startup Lab Series · MIT Licensed · <a href="https://github.com/Bahniman" className="text-primary hover:underline">GitHub</a>
          </p>
        </div>
      </footer>
    </div>
  );
}
