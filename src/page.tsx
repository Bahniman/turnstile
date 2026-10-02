import { TrafficGateVisualizer } from "@/components/traffic-gate-visualizer";
import { TrafficRoutingBoard } from "@/components/traffic-routing-board";
import { JargonDecoder } from "@/components/jargon-decoder";
import { SuiteHeader } from "@/components/suite-header";
import { SuiteNext } from "@/components/suite-next";

export default function LandingPage() {
  return (
    <div className="turnstile-page pk relative min-h-screen bg-surface text-on-surface font-sans">

      <SuiteHeader name="Turnstile" sections={[
        { label: "Try the gate", href: "#demo" },
        { label: "The gap", href: "#problem" },
        { label: "How it works", href: "#how" },
        { label: "Weak spots", href: "#limits" },
        { label: "Sources", href: "#sources" },
      ]} />

      <main id="main" className="suite-main">

        {/* ------------------------------ the poster ------------------------------ */}
        <section className="pk-wrap pk-hero">
          <div className="pk-hero-copy">
            <p className="pk-kick"><span className="n">03</span> Prototype · Commerce</p>
            <h1 className="pk-big">
              <span className="a">Who's</span>
              <span className="b">buying?</span>
              <span className="c">A store used to know. Now an AI assistant can shop for you.</span>
            </h1>
            <p className="pk-dek">
              Turnstile sorts a store's visitors into <b>people</b>, <b>shopping agents</b> and <b>scrapers</b>,
              then gives each one what it should get: the normal page, a clean product feed, or a closed door.
            </p>
            <div className="pk-cta">
              <a href="#demo" className="pk-btn pri">Try the gate ↓</a>
              <a href="#problem" className="pk-btn">Why it matters</a>
            </div>
          </div>

          <div className="pk-board">
            <span className="pk-sticker">6 sessions<small>try it below</small></span>
            <TrafficRoutingBoard />
          </div>
        </section>

        <div className="pk-wrap">
          <div className="pk-glance">
            <dl className="pk-facts">
              <div><dt>3</dt><dd>kinds of visitor it tells apart</dd></div>
              <div><dt>2</dt><dd>rules you can tune in the demo</dd></div>
              <div><dt>60+</dt><dd>launch partners for Google's agent payments protocol <a className="lnk" href="#sources">[2]</a></dd></div>
              <div><dt>Sep '25</dt><dd>agent checkout protocols go public <a className="lnk" href="#sources">[1]</a></dd></div>
            </dl>
            <ul className="pk-rows">
              <li><span>What</span><b>A traffic classifier and a storefront agents can read</b></li>
              <li><span>Built</span><b>Python classifier, plus the browser demo on this page</b></li>
              <li><span>For</span><b>Online stores deciding how to treat AI shoppers</b></li>
              <li><span>Stage</span><b>Prototype, running on six sample sessions</b></li>
            </ul>
          </div>
        </div>

        {/* ------------------------------- the band ------------------------------- */}
        <section className="pk-band">
          <div className="pk-wrap">
            <p className="pk-kick on-blue"><span className="n">The bet</span></p>
            <p className="line">Agents can already pay. <em>Most stores can't tell one from a scraper.</em></p>
            <p className="by">The payment side got built first. The front door, where a store decides who it is talking to, did not.</p>
          </div>
        </section>

        {/* -------------------------------- the demo -------------------------------- */}
        <section className="pk-wrap pk-sec" id="demo">
          <div className="pk-head">
            <p className="pk-kick"><span className="dot" /> Try it</p>
            <h2>Run the <em>gate.</em></h2>
            <p className="pk-lede">Six sessions walk up to the store. Play the stream, move the two rules, and click any session to see exactly what it was served.</p>
          </div>
          <div className="pk-stage">
            <span className="pk-stage-tag">Live in your browser</span>
            <TrafficGateVisualizer />
          </div>
        </section>

        {/* ------------------------------- the gap -------------------------------- */}
        <section className="pk-wrap pk-sec" id="problem">
          <div className="pk-head">
            <p className="pk-kick"><span className="dot" /> The gap</p>
            <h2>The rails came first. <em>The door didn't.</em></h2>
          </div>
          <div className="pk-split">
            <div className="pk-prose">
              <p>
                In September 2025 two payment protocols for AI shoppers went public within two weeks.
                Google announced the <b>Agent Payments Protocol</b> on 16 September with more than sixty
                partners, among them Mastercard, PayPal, American Express and Adyen, and later handed it to
                the FIDO Alliance. OpenAI and Stripe published the <b>Agentic Commerce Protocol</b> on
                29 September, alongside checkout inside ChatGPT.
              </p>
              <p>
                Both answer how an agent pays. Neither answers the question a store faces first: is this
                visit a person, an assistant buying for a person, or a bot copying the catalogue?
              </p>
              <p>
                Get that wrong one way and the store turns away a paying customer. Get it wrong the other way
                and it hands its prices to a competitor's scraper. Most bot filters were built to block
                anything that isn't a human, which is exactly the wrong default once some bots arrive with a wallet.
              </p>
            </div>
            <figure className="pk-quote">
              <p>A bot filter that blocks every agent is now <em>blocking customers.</em></p>
              <small>The idea Turnstile is built around</small>
            </figure>
          </div>
        </section>

        {/* ------------------------------- how it works ------------------------------- */}
        <section className="pk-wrap pk-sec" id="how">
          <div className="pk-head">
            <p className="pk-kick"><span className="dot" /> How it works</p>
            <h2>Three jobs at <em>the door.</em></h2>
          </div>
          <ol className="pk-cards pk-cards--tickets">
            <li>
              <p className="pk-kick"><span className="n">1</span> Sort</p>
              <h3>Tell them apart</h3>
              <p>Read how a session behaves: mouse movement, request speed, what it says it is. Weigh the signals together, because any one of them can be faked.</p>
              <span className="eg">Human: 87 activity, 0.8 req/s</span>
            </li>
            <li>
              <p className="pk-kick"><span className="n">2</span> Protect</p>
              <h3>Don't lose the buyer</h3>
              <p>An agent buying for someone is a customer. It gets let in. Only traffic that looks like bulk copying gets stopped.</p>
              <span className="eg">Scraper: 38 req/s, blocked</span>
            </li>
            <li>
              <p className="pk-kick"><span className="n">3</span> Serve</p>
              <h3>Speak its language</h3>
              <p>A page built for eyes is hard for software to read. Agents get price, stock and specs as clean data instead of guessing from the layout.</p>
              <span className="eg">Agent: served a JSON product feed</span>
            </li>
          </ol>
        </section>

        {/* ------------------------------- weak spots ------------------------------- */}
        <section className="pk-wrap pk-sec" id="limits">
          <div className="pk-head">
            <p className="pk-kick"><span className="dot" /> Where this is weakest</p>
            <h2>What a merchant <em>would ask.</em></h2>
          </div>
          <ul className="pk-weak">
            <li>
              <p className="q">Do shoppers even want an assistant buying for them?</p>
              <p className="ans">Not proven yet. My bet is that clear controls and a visible receipt would earn that trust, but it needs shopper research before anyone builds on it.</p>
            </li>
            <li>
              <p className="q">Behaviour signals can be copied.</p>
              <p className="ans">True. That's why the design pairs behaviour with what an agent declares about itself, and signed identity where the protocols offer it. No single signal decides.</p>
            </li>
            <li>
              <p className="q">Cloudflare and Akamai already sell bot management.</p>
              <p className="ans">They do, and Turnstile shouldn't compete on detection. The gap is what happens after: serving an agent a clean product feed instead of a page meant for people.</p>
            </li>
          </ul>
        </section>

        {/* ---------------------------- decoder + sources ---------------------------- */}
        <section className="pk-wrap pk-sec" id="sources">
          <div className="pk-two">
            <div>
              <div className="pk-head">
                <p className="pk-kick"><span className="dot" /> Plain English</p>
                <h2>The <em>words.</em></h2>
              </div>
              <JargonDecoder />
            </div>
            <div>
              <div className="pk-head">
                <p className="pk-kick"><span className="dot" /> Checkable</p>
                <h2><em>Sources.</em></h2>
              </div>
              <ol className="pk-src">
                <li>
                  Agentic Commerce Protocol, published by OpenAI and Stripe, 29 September 2025.{" "}
                  <a href="https://agenticcommerce.dev" target="_blank" rel="noreferrer">agenticcommerce.dev</a>
                </li>
                <li>
                  Agent Payments Protocol, announced by Google with 60+ partners, 16 September 2025; donated to the FIDO Alliance, 28 April 2026.{" "}
                  <a href="https://cloud.google.com/blog/products/ai-machine-learning/announcing-agents-to-payments-ap2-protocol" target="_blank" rel="noreferrer">Google Cloud</a>
                </li>
                <li>
                  OpenAI, shopping and Instant Checkout in ChatGPT.{" "}
                  <a href="https://openai.com/index/buy-it-in-chatgpt/" target="_blank" rel="noreferrer">OpenAI</a>
                </li>
              </ol>
            </div>
          </div>
        </section>

        <SuiteNext current="Turnstile" />
      </main>
    </div>
  );
}
