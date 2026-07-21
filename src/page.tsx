import { ThemeToggle } from "@/components/theme-toggle";
import { TrafficGateVisualizer } from "@/components/traffic-gate-visualizer";
import { JargonDecoder } from "@/components/jargon-decoder";

export default function LandingPage() {
  return (
    <div className="relative min-h-screen bg-surface text-on-surface font-sans">

      {/* ------------------------------ masthead ------------------------------ */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-outline-variant/50 bg-surface/80 backdrop-blur-xl backdrop-saturate-150">
        <div className="shell">
          <div className="flex items-center justify-between h-16">
            <a href="https://bahniman.github.io" className="flex items-center gap-2.5">
              <span className="inline-block h-[7px] w-[7px] bg-primary" />
              <span className="text-[1.0625rem] font-extrabold tracking-[-0.02em]">Turnstile</span>
            </a>
            <nav className="flex items-center gap-5">
              <a href="https://bahniman.github.io" className="mono hover:text-on-surface transition-colors">&larr; Portfolio</a>
              <a href="https://github.com/Bahniman/turnstile" target="_blank" rel="noreferrer" className="mono hover:text-on-surface transition-colors">Source</a>
              <ThemeToggle />
            </nav>
          </div>
        </div>
      </header>

      <main className="pt-16">

        {/* ------------------------------ opening ----------------------------- */}
        <section className="shell section hero-grid">
          <div>
            <h1 className="display">Commerce analytics<br />for the agent era.</h1>
            <p className="lede" style={{ marginTop: "2rem" }}>
              AI assistants now browse and buy on behalf of their owners. To most storefronts they
              look like bots and get blocked, which turns a real sale into a false decline and
              leaves the funnel analytics reading nonsense. Turnstile tells the two apart, then
              serves each one an interface it can actually use.
            </p>
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", marginTop: "2.5rem" }}>
              <a href="#demo" className="inline-flex items-center gap-2 rounded bg-primary px-6 py-3 text-label-lg font-medium text-on-primary">
                Try the gate
              </a>
              <a href="#problem" className="inline-flex items-center gap-2 rounded border border-outline px-6 py-3 text-label-lg font-medium">
                Read the argument
              </a>
            </div>
          </div>

          <dl className="meta">
            <div><dt>Layer</dt><dd>Commerce</dd></div>
            <div><dt>Status</dt><dd>Working prototype, MIT licensed</dd></div>
            <div><dt>Context</dt><dd>Sits above ACP and AP2, not against them</dd></div>
            <div><dt>Part of</dt><dd>Four protocols for the agent economy</dd></div>
          </dl>
        </section>

        {/* ----------------------------- statement ---------------------------- */}
        <section className="statement">
          <div className="shell">
            <p className="line">The payment rails for agent commerce shipped. The first flagship storefront using them was switched off with almost no sales.</p>
            <p className="by">
              That result is the interesting one. It says the hard part was never taking the
              money.
            </p>
          </div>
        </section>

        {/* ------------------------------ problem ----------------------------- */}
        <section className="shell section band" id="problem">
          <div className="section-head">
            <span className="idx">The gap</span>
            <h2 className="h2">Everyone solved payment. Nobody solved recognition.</h2>
            <p className="note">Two facts from the same eighteen months.</p>
          </div>

          <div className="rows">
            <article className="row">
              <span className="num">01</span>
              <div>
                <h3 className="title">The rails were built fast, by everyone</h3>
                <p className="role">ACP, AP2, and a standards body</p>
              </div>
              <div>
                <p className="desc">
                  OpenAI and Stripe published the Agentic Commerce Protocol on 29 September 2025
                  and open-sourced it. Google announced the Agent Payments Protocol on 16
                  September 2025 with more than sixty launch partners including Mastercard,
                  PayPal, American Express and Adyen, then donated it to the FIDO Alliance on 28
                  April 2026. PayPal joined ACP that October, and Stripe shipped an Agentic
                  Commerce Suite in December 2025. Within about a year, letting an agent pay
                  stopped being the hard part.
                </p>
              </div>
            </article>

            <article className="row">
              <span className="num">02</span>
              <div>
                <h3 className="title">The demand did not arrive</h3>
                <p className="role">Instant Checkout, switched off</p>
              </div>
              <div>
                <p className="desc">
                  ACP&rsquo;s first live deployment was Instant Checkout inside ChatGPT, with Etsy
                  as the launch merchant and more than a million Shopify merchants announced as
                  following. OpenAI shut it down after roughly five months with near-zero sales.
                  The rails worked. What was missing was everything either side of the
                  transaction: the merchant could not reliably tell an agent from a scraper, and
                  the agent could not reliably read a storefront built for human eyes.
                </p>
              </div>
            </article>
          </div>

          <div className="table-wrap" style={{ marginTop: "3rem" }}>
            <table className="table">
              <thead>
                <tr><th>The gap between forecast and result</th><th>Source</th><th className="n">Figure</th></tr>
              </thead>
              <tbody>
                <tr>
                  <td>Global commerce agentic buying could influence by 2030<span className="sub">The forecast everyone is building against</span></td>
                  <td>McKinsey</td>
                  <td className="n">$3&ndash;5T</td>
                </tr>
                <tr>
                  <td>Orchestrated US B2C retail revenue in the same forecast</td>
                  <td>McKinsey</td>
                  <td className="n">~$1T</td>
                </tr>
                <tr>
                  <td>Launch partners behind AP2 at announcement</td>
                  <td>Google</td>
                  <td className="n">60+</td>
                </tr>
                <tr>
                  <td>Months Instant Checkout ran before being switched off<span className="sub">Reported as near-zero sales</span></td>
                  <td>OpenAI</td>
                  <td className="n">~5</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* ----------------------------- mechanism ---------------------------- */}
        <section className="shell section band">
          <div className="section-head">
            <span className="idx">3 parts</span>
            <h2 className="h2">What sits above the rails</h2>
            <p className="note">Turnstile assumes ACP and AP2 win. It solves the two ends they do not touch.</p>
          </div>

          <div className="rows">
            <article className="row">
              <span className="num">01</span>
              <div><h3 className="title">Tell them apart</h3><p className="role">Session classification</p></div>
              <div>
                <p className="desc">
                  A delegated shopping agent and a scraper look almost identical to a rules engine
                  written in 2019. Turnstile classifies the session on behaviour rather than a
                  blocklist, so a legitimate agent is recognised as a customer instead of being
                  treated as an attack.
                </p>
              </div>
            </article>
            <article className="row">
              <span className="num">02</span>
              <div><h3 className="title">Recover the false declines</h3><p className="role">The revenue already being lost</p></div>
              <div>
                <p className="desc">
                  A false decline is worse than a lost sale, because the customer was willing and
                  the system said no. This is not a hypothetical class of error: it is the
                  ordinary failure mode of every bot defence, and it now fires on paying
                  customers whose assistant did the clicking.
                </p>
              </div>
            </article>
            <article className="row">
              <span className="num">03</span>
              <div><h3 className="title">Serve a readable storefront</h3><p className="role">Machine-readable, not scraped</p></div>
              <div>
                <p className="desc">
                  Once a session is known to be an agent, sending it a page built for human eyes
                  is wasteful for both sides. Turnstile serves structured product data instead, so
                  the agent stops guessing at the DOM and the merchant stops paying to render a
                  page nobody looks at.
                </p>
              </div>
            </article>
          </div>
        </section>

        {/* ------------------------------- demo ------------------------------- */}
        <section className="shell section band" id="demo">
          <div className="section-head">
            <span className="idx">Sandbox</span>
            <h2 className="h2">Watch the gate sort a session</h2>
            <p className="note">Twelve visitors, mixed human and agent. The numbers in this demo are illustrative, not measured traffic.</p>
          </div>
          <TrafficGateVisualizer />
        </section>

        {/* ---------------------------- the objection -------------------------- */}
        <section className="shell section band">
          <div className="section-head">
            <span className="idx">Honest</span>
            <h2 className="h2">Where this is weakest</h2>
            <p className="note">The objections a merchant would actually raise.</p>
          </div>
          <div className="prose" style={{ display: "grid", gap: "1.25rem" }}>
            <p>
              <strong>The market may simply not be here yet.</strong> Instant Checkout is the
              evidence against my own thesis, and I would rather state it than bury it. It is
              possible people do not want an assistant buying for them, in which case
              classification solves a problem nobody has. My read is that it failed on interface
              and trust rather than on desire, but that is a judgement, not a measurement.
            </p>
            <p>
              <strong>Behavioural classification invites an arms race.</strong> Anything that
              distinguishes a good agent from a bad one becomes a target for imitation. The
              durable version of this leans on signed agent identity, which is exactly what the
              emerging bot-authentication work is trying to standardise, rather than on
              heuristics I maintain alone.
            </p>
            <p>
              <strong>Cloudflare and Akamai are one product decision away.</strong> They already
              sit in front of the traffic and already do the classification. The honest wedge is
              the commerce-specific half, recovering declined checkouts and serving structured
              catalogue data, not competing on raw bot detection.
            </p>
          </div>
        </section>

        {/* ------------------------------ decoder ----------------------------- */}
        <section className="shell section band">
          <div className="section-head">
            <span className="idx">Plain</span>
            <h2 className="h2">The words, without the jargon</h2>
            <p className="note">For anyone reading this who does not build software.</p>
          </div>
          <JargonDecoder />
        </section>

        {/* ------------------------------ sources ----------------------------- */}
        <section className="shell section band">
          <div className="section-head">
            <span className="idx">Checkable</span>
            <h2 className="h2">Sources</h2>
            <p className="note">Every date and figure above, traceable.</p>
          </div>
          <ol className="src">
            <li>
              Agentic Commerce Protocol, published by OpenAI and Stripe, 29 September 2025.{" "}
              <a href="https://agenticcommerce.dev" target="_blank" rel="noreferrer">agenticcommerce.dev</a>
            </li>
            <li>
              Agent Payments Protocol announced by Google with 60+ partners, 16 September 2025;
              donated to the FIDO Alliance, 28 April 2026.{" "}
              <a href="https://cloud.google.com/blog/products/ai-machine-learning/announcing-agents-to-payments-ap2-protocol" target="_blank" rel="noreferrer">Google Cloud</a>
            </li>
            <li>
              McKinsey on agentic commerce influencing $3&ndash;5 trillion of global commerce by
              2030.{" "}
              <a href="https://www.mckinsey.com/capabilities/growth-marketing-and-sales/our-insights" target="_blank" rel="noreferrer">McKinsey &amp; Company</a>
            </li>
            <li>
              Instant Checkout launched with Etsy and withdrawn after roughly five months.{" "}
              <a href="https://openai.com/index/buy-it-in-chatgpt/" target="_blank" rel="noreferrer">OpenAI</a>
            </li>
          </ol>
          <p className="prose" style={{ marginTop: "2rem", fontSize: "0.875rem" }}>
            An earlier version of this page carried four traffic statistics attributed to
            &ldquo;Turnstile telemetry&rdquo;. Turnstile is a prototype and has never observed
            production traffic, so those numbers were not real and have been removed. Everything
            above is either externally sourced or labelled as illustrative.
          </p>
        </section>

        {/* ------------------------------- footer ----------------------------- */}
        <footer className="shell section band">
          <div>
            <h2 className="h2" style={{ fontSize: "1.5rem" }}>Built by Bahniman Talukdar</h2>
            <p className="prose" style={{ marginTop: "0.75rem", fontSize: "0.9375rem" }}>
              One of four protocols for the agent economy. A prototype and an argument, not a
              company.
            </p>
            <p style={{ display: "flex", gap: "1.5rem", marginTop: "1.5rem", flexWrap: "wrap" }}>
              <a className="lnk" href="https://bahniman.github.io">Portfolio</a>
              <a className="lnk" href="https://github.com/Bahniman/turnstile" target="_blank" rel="noreferrer">Source</a>
            </p>
          </div>
        </footer>
      </main>
    </div>
  );
}
