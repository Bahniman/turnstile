import { motion, useReducedMotion } from "framer-motion";
import { Bot, Search, UserRound } from "lucide-react";

const routes = [
  {
    kind: "Person",
    Icon: UserRound,
    signal: "87 activity · 0.8 req/s",
    outcome: "HTML",
    detail: "the normal storefront",
    tone: "person",
  },
  {
    kind: "Shopping agent",
    Icon: Bot,
    signal: "0 activity · 2.1 req/s",
    outcome: "JSON",
    detail: "a clean product feed",
    tone: "agent",
  },
  {
    kind: "Scraper",
    Icon: Search,
    signal: "4 activity · 38 req/s",
    outcome: "Blocked",
    detail: "too fast to be human",
    tone: "blocked",
  },
] as const;

export function TrafficRoutingBoard() {
  const reduceMotion = useReducedMotion();

  return (
    <figure className="route-board pk-board-inner" aria-labelledby="route-board-title">
      <div className="route-board-head">
        <div>
          <p className="route-board-label">At the door · default rules</p>
          <h2 id="route-board-title">Three visitors. Three <em>answers.</em></h2>
        </div>
        
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
        Move the two rules in the demo below and watch these change.
      </figcaption>
    </figure>
  );
}
