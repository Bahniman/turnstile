import { motion, useReducedMotion } from "framer-motion";
import { Bot, Search, UserRound } from "lucide-react";

const routes = [
  {
    kind: "Person sample",
    Icon: UserRound,
    signal: "87 activity · 0.8 req/s",
    outcome: "HTML",
    detail: "storefront mockup",
    tone: "person",
  },
  {
    kind: "Shopping agent",
    Icon: Bot,
    signal: "0 activity · 2.1 req/s",
    outcome: "JSON",
    detail: "offer preview mockup",
    tone: "agent",
  },
  {
    kind: "Scraper sample",
    Icon: Search,
    signal: "4 activity · 38 req/s",
    outcome: "Blocked",
    detail: "rate rule crossed",
    tone: "blocked",
  },
] as const;

export function TrafficRoutingBoard() {
  const reduceMotion = useReducedMotion();

  return (
    <figure className="route-board" aria-labelledby="route-board-title">
      <div className="route-board-head">
        <div>
          <p className="route-board-label">Sample traffic · default rules</p>
          <h2 id="route-board-title">Three visits. Three <em>outcomes.</em></h2>
        </div>
        <span className="route-board-stamp">Sample only</span>
      </div>

      <div className="route-ruleline">
        <span>Mouse-activity threshold: 10</span>
        <span>Request-rate limit: 30 req/s</span>
      </div>

      <ol className="route-lanes">
        {routes.map(({ kind, Icon, signal, outcome, detail, tone }, index) => (
          <li className={`route-lane route-lane--${tone}`} key={kind}>
            <div className="route-input">
              <span className="route-icon" aria-hidden="true"><Icon size={17} strokeWidth={1.8} /></span>
              <span className="route-copy">
                <strong>{kind}</strong>
                <small>{signal}</small>
              </span>
            </div>
            <span className="route-link" aria-hidden="true">
              <motion.span
                className="route-link-ink"
                initial={reduceMotion ? false : { scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={reduceMotion ? { duration: 0 } : { duration: 0.48, delay: index * 0.09, ease: [0.16, 1, 0.3, 1] }}
              />
              <span className="route-link-arrow" />
            </span>
            <div className="route-output">
              <strong>{outcome}</strong>
              <small>{detail}</small>
            </div>
          </li>
        ))}
      </ol>

      <figcaption className="route-board-foot">
        Six fixed fixtures · local rules · no live requests or policy action.
      </figcaption>
    </figure>
  );
}
