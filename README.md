# Turnstile

*Last updated: 2 October 2026*

**Live site:** <https://bahniman.github.io/turnstile/>

**Who's buying?** Turnstile sorts a store's visitors into people, AI shopping agents and scrapers, then serves each one what it should get: the normal page, a clean product feed, or a closed door.

## Explore the site

- **The argument:** agent payment protocols (Google's AP2, OpenAI and Stripe's ACP) went public in September 2025, but none of them tells a store who it is talking to.
- **The gate:** six sessions walk up to a store. Play the stream, move the mouse-activity and request-rate rules, and click a session to see the HTML page, JSON product feed or block it received.
- **Weak spots:** the three questions a merchant would ask, each with an answer.

The gate runs in the browser on six sample sessions. The Python classifier, analytics and offer-feed modules are in `turnstile/`.

## Design

The site uses the Riso Poster system shared with [the portfolio](https://bahniman.github.io/): cream paper (dark ink in dark mode), blue and pink overprinted inks, yellow stickers, 2.5px ink outlines and hard offset shadows; Bricolage Grotesque, Newsreader and Space Mono. Every project page is built from the same poster kit (`src/poster.css`): an overprinted headline beside a tilted demo board, a ticket strip of key facts, a blue statement band, stamped cards, a framed live demo, objection cards and a strip linking to the other three prototypes. Each page keeps its own board, ink order and subject.

Motion follows the portfolio: a staged hero entrance, scroll reveals with a slight tilt, smooth wheel scrolling, lift-and-press buttons, a reading-progress rule and a back-to-top sticker. Reduced-motion settings turn all of it off. The page has a skip link, labelled controls, visible focus and keyboard-operable demos.

## Run the website locally

Requires Node.js 22.12+ and npm.

```bash
npm install
npm run dev       # local Vite development server
npm run build     # production assets in docs/
npm run preview   # preview the production build
npx tsc --noEmit  # TypeScript check
```

The Vite build uses `/turnstile/` as its base path and writes static output to `docs/` for GitHub Pages.

## Run the Python prototype

Requires Python 3.9+; the CLI demo uses the Python standard library.

```bash
python demo.py
```

The command classifies eight hand-authored example sessions, calculates counts from those examples, and serializes a sample offer feed. Those outputs are fixtures, not observed traffic or market metrics. The rules have not been validated against live storefront traffic.

The repository also contains local Python modules for signal classification, sample analytics, and offer-feed serialization, plus a JavaScript beacon example. There is no collector service, live dashboard, storefront integration, or hosted offer endpoint. Configure and review any beacon use separately; it is not connected to the website demo.

## Source map

- `src/poster.css`, `src/components/suite-next.tsx`: shared poster kit and the next-prototype strip.
- `src/page.tsx`: website content and framing.
- `src/components/traffic-routing-board.tsx`: fixed illustrative routes using three sample signal/outcome pairs.
- `src/components/traffic-gate-visualizer.tsx`: local six-session sandbox.
- `src/lib/traffic-model.ts`: website demo rules and fixtures.
- `turnstile/detection.py`, `turnstile/analytics.py`, `turnstile/offers.py`: local Python prototype modules.
- `snippet/turnstile.js`, `demo.py`: example beacon and CLI walkthrough.
- `src/components/suite-header.tsx`, `src/components/suite-motion.tsx`: shared project navigation, anchor focus/history, active-section state, progress, and back-to-top behavior.
- `src/riso-tokens.css`, `src/riso-suite.css`, `src/riso-motion.css`: shared Riso tokens, components, and motion/reduced-motion rules.
- `vite.config.ts`: `/turnstile/` base path and `docs/` build output.

## License

MIT. See [`LICENSE`](LICENSE).