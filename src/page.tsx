import { TrafficGateVisualizer } from "@/components/traffic-gate-visualizer";
import { TrafficRoutingBoard } from "@/components/traffic-routing-board";
import { JargonDecoder } from "@/components/jargon-decoder";
import { SuiteHeader } from "@/components/suite-header";

export default function LandingPage() {
  return (
    <div className="turnstile-page relative min-h-screen bg-surface text-on-surface font-sans">

      <SuiteHeader name="Turnstile" sections={[
        { label: "The gap", href: "#problem" },
        { label: "Sample gate", href: "#demo" },
        { label: "Limits", href: "#limits" },
        { label: "Sources", href: "#sources" },
      ]} />

      <main id="main" className="suite-main">

        {/* ------------------------------ opening ----------------------------- */}
        <section className="shell section hero-grid">
          <div>
            <h1 className="display">Commerce <span className="headline-ink">analytics</span><span className="hero-accent">for the agent era.</span></h1>
            <p className="lede">
              Shopping assistants can browse for people. Stores may need ways to distinguish
              delegated shopping from other automated visits.
            </p>
            <p className="hero-note">Concept demo · fixed sample sessions · no live traffic or checkout.</p>
            <div className="hero-cta">
              <a href="#demo" className="suite-press inline-flex items-center gap-2 rounded bg-primary px-6 py-3 text-label-lg font-medium text-on-primary">
                Try the gate
              </a>
              <a href="#problem" className="suite-press inline-flex items-center gap-2 rounded border border-outline px-6 py-3 text-label-lg font-medium">
                Read the argument
              </a>
            </div>
          </div>

          <TrafficRoutingBoard />
        </section>

        {/* ----------------------------- statement ---------------------------- */}
        <section className="statement suite-reveal">
          <div className="shell">
            <p className="line">Payment rails exist. Recognising delegated traffic is a separate task.</p>
            <p className="by">
              A product hypothesis: storefronts may need clearer ways to distinguish delegated shopping from other automated traffic.
            </p>
          </div>
        </section>

        {/* ------------------------------ problem ----------------------------- */}
        <section className="shell section band" id="problem">
          <div className="section-head">
            <span className="idx">The gap</span>
            <h2 className="h2">Payment protocols leave other storefront questions open.</h2>
            <p className="note">Protocol milestones, then the separate task of presenting offers to agents.</p>
          </div>

          <div className="rows">
            <article className="row">
              <span className="num">01</span>
              <div>
                <h3 className="title">Payment protocols are developing quickly</h3>
                <p className="role">ACP, AP2, and a standards body</p>
              </div>
              <div>
                <p className="desc">
                  OpenAI and Stripe published the Agentic Commerce Protocol on 29 September 2025
                  and open-sourced it. Google announced the Agent Payments Protocol on 16
                  September 2025 with more than sixty launch partners including Mastercard,
                  PayPal, American Express and Adyen, then donated it to the FIDO Alliance on 28
                  April 2026. PayPal joined ACP that October, and Stripe shipped an Agentic
                  Commerce Suite in December 2025. These announcements show continuing work on
                  payment protocols; recognition and readable product information are separate
                  questions for this concept to explore.
                </p>
              </div>
            </article>

            <article className="row">
              <span className="num">02</span>
              <div>
                <h3 className="title">Product flows keep evolving</h3>
                <p className="role">Public announcements don't explain causes</p>
              </div>
              <div>
                <p className="desc">
                  OpenAI and Stripe introduced ACP, with an initial ChatGPT shopping flow and Etsy
                  as a launch merchant. OpenAI later described shopping research as a way to help
                  people compare products. These public materials do not establish why individual
                  product flows changed or how much they sold. Recognition and machine-readable
                  offers remain hypotheses for this concept to explore.
                </p>
              </div>
            </article>
          </div>

        </section>

        {/* ----------------------------- mechanism ---------------------------- */}
        <section className="shell section band">
          <div className="section-head">
            <span className="idx">3 parts</span>
            <h2 className="h2">What sits above the rails</h2>
            <p className="note">A product hypothesis: explore storefront work alongside payment protocols.</p>
          </div>

          <div className="rows">
            <article className="row">
              <span className="num">01</span>
              <div><h3 className="title">Tell them apart</h3><p className="role">Session classification</p></div>
              <div>
                <p className="desc">
                  Storefront rules may have limited signals for distinguishing delegated shopping
                  from scraping. A production concept could explore behavioral and declared
                  identity signals while accounting for uncertainty and the risk of mistaken
                  classifications.
                </p>
              </div>
            </article>
            <article className="row">
              <span className="num">02</span>
              <div><h3 className="title">Explore possible false declines</h3><p className="role">A merchant-side hypothesis</p></div>
              <div>
                <p className="desc">
                  A false decline can prevent a willing customer from completing a purchase.
                  Whether delegated assistants encounter this in a particular store requires
                  measurement; the prototype does not establish its frequency or revenue impact.
                </p>
              </div>
            </article>
            <article className="row">
              <span className="num">03</span>
              <div><h3 className="title">Serve a readable storefront</h3><p className="role">Machine-readable, not scraped</p></div>
              <div>
                <p className="desc">
                  Once a session is known to be an agent, sending it a page built for human eyes
                  may be hard for software to parse. A production version could offer structured
                  product data alongside the human storefront, rather than requiring an agent to
                  infer product details from page markup.
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
            <p className="note">Six fixed sample sessions. Adjust the sample rules and inspect the illustrative outcomes.</p>
          </div>
          <TrafficGateVisualizer />
        </section>

        {/* ---------------------------- the objection -------------------------- */}
        <section className="shell section band" id="limits">
          <div className="section-head">
            <span className="idx">Honest</span>
            <h2 className="h2">Where this is weakest</h2>
            <p className="note">The objections a merchant would actually raise.</p>
          </div>
          <div className="prose" style={{ display: "grid", gap: "1.25rem" }}>
            <p>
              <strong>Demand and trust need evidence.</strong> Public product changes alone do not
              establish why a shopping feature changed or whether shoppers want delegated checkout.
              The concept needs user and merchant research before its market hypothesis can be tested.
            </p>
            <p>
              <strong>Behavioral signals can be imitated.</strong> A design could combine them
              with declared or signed identity where available, and should treat each signal as
              uncertain rather than as proof of intent.
            </p>
            <p>
              <strong>Existing traffic tools shape the product boundary.</strong> Providers such
              as Cloudflare and Akamai already offer bot-management capabilities. A commerce
              concept would need to demonstrate a distinct use case, such as serving structured
              catalog data, rather than assume general bot detection is missing.
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
        <section className="shell section band" id="sources">
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
              OpenAI's announcement of shopping in ChatGPT and Instant Checkout.{" "}
              <a href="https://openai.com/index/buy-it-in-chatgpt/" target="_blank" rel="noreferrer">OpenAI</a>
            </li>
          </ol>
        </section>

        {/* ------------------------------- footer ----------------------------- */}
        <footer className="shell section band">
          <div>
            <h2 className="h2" style={{ fontSize: "1.5rem" }}>Built by Bahniman Talukdar</h2>
            <p className="prose" style={{ marginTop: "0.75rem", fontSize: "0.9375rem" }}>
              One of four prototypes exploring changes in the agent economy.
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
