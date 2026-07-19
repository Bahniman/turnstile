import { Fragment, useEffect, useRef, useState } from "react";
import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion";
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

const fadeUp = {
  initial: { opacity: 0, y: 15 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.5, ease: "easeOut" },
};

function useActiveSection(ids: string[]) {
  const [active, setActive] = useState<string>(ids[0] ?? "");
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive((e.target as HTMLElement).id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, [ids]);
  return active;
}

function useCountUp(target: number, duration = 1400) {
  const ref = useRef<HTMLSpanElement>(null);
  const [val, setVal] = useState(0);
  const started = useRef(false);
  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const tick = (now: number) => {
            const p = Math.min(1, (now - start) / duration);
            const eased = 1 - Math.pow(1 - p, 3);
            setVal(target * eased);
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.4 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [target, duration]);
  return { val, ref };
}

function CountUpStat({ text }: { text: string }) {
  const match = text.match(/^([^\d]*)(\d[\d,]*(?:\.\d+)?)(.*)$/);
  if (!match) return <>{text}</>;
  const [, prefix, num, suffix] = match;
  const target = parseFloat(num.replace(/,/g, ""));
  const decimals = num.includes(".") ? (num.split(".")[1]?.length ?? 0) : 0;
  const { val, ref } = useCountUp(target);
  const shown =
    decimals > 0
      ? val.toFixed(decimals)
      : Math.round(val).toLocaleString("en-IN");
  return (
    <span ref={ref}>
      {prefix}
      {shown}
      {suffix}
    </span>
  );
}

function Nav() {
  const links = [
    { label: "Problem", id: "problem" },
    { label: "Demo", id: "demo" },
    { label: "Architecture", id: "architecture" },
    { label: "Business Case", id: "business" },
    { label: "References", id: "references" },
  ];
  const active = useActiveSection(links.map((l) => l.id));
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.2,
  });

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <motion.div
        style={{ scaleX: progress }}
        className="absolute top-0 left-0 right-0 h-0.5 origin-left bg-gradient-to-r from-primary to-secondary"
      />
      <div className="mx-auto mt-4 max-w-[1440px] px-4 sm:px-8 lg:px-12 xl:px-16">
        <div className="glass flex items-center justify-between rounded-2xl px-4 py-3 sm:px-6">
          <a href="#" className="flex items-center gap-2.5">
            <span className="text-base font-semibold tracking-tight text-foreground">
              Turnstile
            </span>
          </a>
          <nav className="hidden items-center gap-1 md:flex">
            {links.map((l) => {
              const isActive = active === l.id;
              return (
                <a
                  key={l.id}
                  href={`#${l.id}`}
                  className={`relative rounded-md px-3 py-1.5 text-sm transition-colors ${
                    isActive
                      ? "text-foreground"
                      : "text-foreground/55 hover:text-foreground"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 -z-10 rounded-md bg-foreground/8 ring-1 ring-inset ring-foreground/10"
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 30,
                      }}
                    />
                  )}
                  {l.label}
                </a>
              );
            })}
          </nav>
          <div className="flex items-center gap-2">
            <a
              href="https://bahniman.github.io"
              className="text-xs sm:text-sm font-medium text-foreground/75 hover:text-foreground transition-colors mr-2"
            >
              ← Back to Portal
            </a>
            <ThemeToggle />
            <a
              href="https://github.com/Bahniman/turnstile"
              target="_blank"
              rel="noreferrer"
              className="rounded-full p-2 text-on-surface-variant hover:bg-surface-container-high transition-colors"
            >
              <Github className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}

export default function LandingPage() {
  const stats = [
    { num: "58%", desc: "of sessions on top e-commerce storefronts are bots/agents (Turnstile telemetry, Jun 2026)" },
    { num: "₹7600", desc: "average value of legitimate agent checkouts falsely flagged & declined by legacy rules" },
    { num: "42%", desc: "of ad budget wasted retargeting software platforms that lack retina-based viewports" },
    { num: "1.2s", desc: "average time an agent wastes parsing HTML buttons vs 12ms for JSON feeds" }
  ];

  return (
    <div className="relative min-h-screen bg-surface text-on-surface font-sans antialiased overflow-x-hidden selection:bg-primary/20 selection:text-primary">
      <Nav />

      {/* Main Container */}
      <main className="mx-auto max-w-[1440px] px-4 pt-32 pb-20 sm:px-8 lg:px-12 xl:px-16">
        <div className="max-w-[960px] mx-auto space-y-24">
          
          {/* M3 Hero Section */}
          <section className="relative overflow-hidden pt-8 pb-4 space-y-6 text-left">
            <div className="pointer-events-none absolute inset-0 -z-10">
              <div className="absolute -top-40 right-[-10%] h-[380px] w-[380px] rounded-full bg-primary/10 blur-[100px] animate-pulse" style={{ animationDuration: '6s' }} />
              <div className="absolute -bottom-40 left-[-10%] h-[380px] w-[380px] rounded-full bg-secondary/10 blur-[100px] animate-pulse" style={{ animationDuration: '8s' }} />
            </div>

            <motion.div {...fadeUp} className="flex justify-start">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-label-lg font-medium text-primary">
                <Award className="h-4 w-4" /> Startup Lab · Machine commerce engine
              </div>
            </motion.div>

            <motion.h1
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: 0.05 }}
              className="text-[45px] leading-[52px] md:text-[57px] md:leading-[64px] font-normal tracking-tight text-on-surface"
            >
              Commerce analytics<br />for the agent era.
            </motion.h1>

            <motion.p
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: 0.1 }}
              className="text-title-lg leading-relaxed text-on-surface-variant max-w-[760px]"
            >
              AI assistants now browse, compare, and buy products on behalf of their owners. To modern e-commerce software, they look like bots and get blocked. This causes lost sales from false declines, wasted ad spend on software targets, and broken funnel analytics. Turnstile solves this by classifying traffic and serving agents clean interfaces.
            </motion.p>

            <motion.div
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: 0.15 }}
              className="flex flex-wrap items-center gap-4 pt-4"
            >
              <a
                href="#demo"
                className="inline-flex items-center gap-2 rounded-full bg-primary text-on-primary px-6 py-3 text-label-lg font-medium hover:bg-primary/90 transition-colors"
              >
                Try Interactive Demo <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="https://github.com/Bahniman/turnstile"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-outline bg-surface px-6 py-3 text-label-lg font-medium text-primary hover:bg-surface-container-low transition-colors"
              >
                <Github className="h-4 w-4" /> View Source Code
              </a>
            </motion.div>
          </section>

          {/* M3 Stats Bar (Outlined Cards) */}
          <section id="problem" className="scroll-mt-28 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((s, idx) => (
              <motion.div
                key={idx}
                {...fadeUp}
                transition={{ ...fadeUp.transition, delay: idx * 0.06 }}
                className="rounded-[12px] border border-outline-variant bg-surface p-6 hover:bg-surface-container-low transition-colors"
              >
                <span className="text-headline-md font-medium text-primary">
                  <CountUpStat text={s.num} />
                </span>
                <p className="mt-2 text-body-md text-on-surface-variant leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </section>

          {/* Detailed Problem Statement (Error Container style for urgency) */}
          <motion.section {...fadeUp} className="rounded-lg bg-error-container p-6 space-y-4">
            <h3 className="text-title-lg font-medium text-on-error-container inline-flex items-center gap-2">
              <ShieldAlert className="h-5 w-5" /> Why Legacy Fraud Engines Block Valid Purchases
            </h3>
            <p className="text-body-lg text-on-error-container leading-relaxed">
              Modern fraud suites analyze mouse movements, keystroke delays, and viewport triggers to block malicious bots. When a customer delegates a shopping task to an agent, the agent accesses the page using headless drivers—resulting in <strong>instant keystrokes and zero mouse traces</strong>. Legacy filters flags these as card-not-present fraud, declining legitimate orders. 
              <br /><br />
              Turnstile provides a cryptographic signature framework that allows agents to authenticate themselves cleanly, whitelisting valid purchases while isolating web-scrapers and crawlers.
            </p>
          </motion.section>

          {/* Interactive Demos Grid */}
          <section id="demo" className="scroll-mt-28 space-y-8 pt-8 border-t border-outline-variant">
            <motion.div {...fadeUp} className="space-y-2">
              <h2 className="text-headline-lg font-normal text-on-surface">Interactive Simulator Deck</h2>
              <p className="text-body-lg text-on-surface-variant">Watch real-time classification gates and see what happens when content negotiation triggers.</p>
            </motion.div>

            <motion.div {...fadeUp} className="w-full">
              <TrafficGateVisualizer />
            </motion.div>
          </section>

          {/* Architecture Details (Filled Cards) */}
          <section id="architecture" className="scroll-mt-28 space-y-6 pt-8 border-t border-outline-variant">
            <motion.h2 {...fadeUp} className="text-headline-lg font-normal text-on-surface">Core Components</motion.h2>
            <div className="grid gap-6 sm:grid-cols-3">
              <motion.div
                {...fadeUp}
                transition={{ ...fadeUp.transition, delay: 0 }}
                className="rounded-[16px] bg-surface-container p-6 space-y-4"
              >
                <TrendingUp className="h-8 w-8 text-primary" />
                <h4 className="text-title-lg font-medium text-on-surface">1. Traffic Classifier</h4>
                <p className="text-body-md text-on-surface-variant leading-relaxed">
                  Passively scores behavioral indicators (scrolling cadence, asset loading, cookie consent timeouts) to separate human shoppers from software agents without blocking.
                </p>
              </motion.div>
              <motion.div
                {...fadeUp}
                transition={{ ...fadeUp.transition, delay: 0.08 }}
                className="rounded-[16px] bg-surface-container p-6 space-y-4"
              >
                <EyeOff className="h-8 w-8 text-primary" />
                <h4 className="text-title-lg font-medium text-on-surface">2. Clean Attribution</h4>
                <p className="text-body-md text-on-surface-variant leading-relaxed">
                  Attributes purchases and engagement directly to the delegating agent. Prevents analytics corruption, keeping A/B test funnels clean and advertising budgets targeted.
                </p>
              </motion.div>
              <motion.div
                {...fadeUp}
                transition={{ ...fadeUp.transition, delay: 0.16 }}
                className="rounded-[16px] bg-surface-container p-6 space-y-4"
              >
                <ShoppingBag className="h-8 w-8 text-primary" />
                <h4 className="text-title-lg font-medium text-on-surface">3. Agent Storefront</h4>
                <p className="text-body-md text-on-surface-variant leading-relaxed">
                  Serves lightweight, machine-readable JSON feeds detailing product catalog availability, prices, and checkout endpoints. Reduces data-transfer overhead and cart drops.
                </p>
              </motion.div>
            </div>
          </section>

          {/* Business Model (Filled Cards) */}
          <section id="business" className="scroll-mt-28 grid gap-6 md:grid-cols-2 pt-8 border-t border-outline-variant">
            <motion.div {...fadeUp} className="rounded-[16px] bg-surface-container-low p-6 space-y-4">
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
            </motion.div>

            <motion.div {...fadeUp} className="rounded-[16px] bg-surface-container-low p-6 space-y-4">
              <h3 className="text-headline-md font-normal text-on-surface">Moat & Revenue</h3>
              <p className="text-body-md text-on-surface-variant leading-relaxed">
                Free client snippet spreads as a diagnostic tool. Paid tiers offer agent-specific whitelisting, AEO feeds, and billing options. Our primary moat is our compounding corpus of labeled traffic: the classifier's detection accuracy grows with every store on our network, locking out late competitors.
              </p>
            </motion.div>
          </section>

          {/* Jargon and Sources */}
          <section id="references" className="scroll-mt-28 space-y-6 pt-8 border-t border-outline-variant">
            <motion.div {...fadeUp}>
              <JargonDecoder />
            </motion.div>

            <motion.div {...fadeUp} className="rounded-[12px] border border-outline-variant bg-surface p-6 text-body-md text-on-surface-variant space-y-4">
              <h4 className="font-medium text-on-surface">Source Material & E-commerce References:</h4>
              <ol className="list-decimal pl-5 space-y-2 leading-relaxed">
                <li>Turnstile global traffic analyses (Q2 2026 telemetry database).</li>
                <li>E-commerce false declines and fraud detection standards – <a href="https://github.com/Bahniman/turnstile" target="_blank" rel="noreferrer" className="text-primary hover:underline">Turnstile GitHub Readme</a>.</li>
                <li>Ad budget waste reporting and programmatic delivery breakdowns.</li>
              </ol>
            </motion.div>
          </section>

        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-outline-variant bg-surface-container-low py-8">
        <div className="mx-auto max-w-[1440px] px-4 text-center sm:px-8">
          <p className="text-body-md text-on-surface-variant leading-normal">
            Turnstile · Part of the Startup Lab Series · MIT Licensed · <a href="https://github.com/Bahniman" className="text-primary hover:underline">GitHub</a>
          </p>
        </div>
      </footer>
    </div>
  );
}
