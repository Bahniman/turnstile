# Turnstile

*Last updated: 1 October 2026*

**Live site:** <https://bahniman.github.io/turnstile/>

Turnstile is a concept about storefront analytics for delegated shopping. The website is a client-side demonstration with six fixed sample sessions and local rules. It does not collect storefront traffic, identify real agents, block requests, attribute sales, or connect to checkout.

## Explore the site

- **Protocol context:** a short overview of payment-protocol developments and the separate questions around storefront traffic and offers.
- **Routing-board illustration:** see fixed person, shopping-agent, and scraper examples paired with their default HTML, JSON, and blocked outcomes. The separate session sandbox lets you inspect six fixtures and adjust local rules to change their displayed classifications.
- **Product hypotheses and limits:** review possible merchant questions, failure cases, and source links.

No result on the site measures a live store or establishes classification accuracy, merchant demand, sales attribution, or conversion effects.

## Design and accessibility

Turnstile uses the shared Riso Poster visual system and responsive project header used by Realium, Heirloom, and Windtunnel. Its routing-board hero presents three fixed examples under default local rules; it is a static preview, while the six-session sandbox below owns selectable examples and adjustable thresholds. The headline and routing board enter in a staggered sequence, section content reveals as you read, and buttons respond with a small lift and press. The route diagram keeps Turnstile's agent-commerce idea visually distinct within the shared style. Section links move into a native disclosure menu on smaller screens, and the theme choice is saved locally. Wheel input uses smooth scrolling, while touch gestures and the browser scrollbar remain native. Section links update the URL fragment, move focus to the destination, and support browser back/forward. The header marks the current section and shows reading progress. A back-to-top link returns focus to the main content. Reduced-motion preferences show the route diagram without its entrance animation.

The page includes a skip link, semantic sections, labeled controls, keyboard-operable options with pressed states, and reduced-motion styling. These are implemented features, not a formal accessibility certification.

Sample-session selections retain their place in the document. Selected rows use cream text on a fixed blue surface; essential timestamps, signal notes, source links, and the storefront preview retain readable colours in both themes. The jargon disclosure supports keyboard opening and closing.

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

- `src/page.tsx` — website content and framing.
- `src/components/traffic-routing-board.tsx` — fixed illustrative routes using three sample signal/outcome pairs.
- `src/components/traffic-gate-visualizer.tsx` — local six-session sandbox.
- `src/lib/traffic-model.ts` — website demo rules and fixtures.
- `turnstile/detection.py`, `turnstile/analytics.py`, `turnstile/offers.py` — local Python prototype modules.
- `snippet/turnstile.js`, `demo.py` — example beacon and CLI walkthrough.
- `src/components/suite-header.tsx`, `src/components/suite-motion.tsx` — shared project navigation, anchor focus/history, active-section state, progress, and back-to-top behavior.
- `src/riso-tokens.css`, `src/riso-suite.css`, `src/riso-motion.css` — shared Riso tokens, components, and motion/reduced-motion rules.
- `vite.config.ts` — `/turnstile/` base path and `docs/` build output.

## License

MIT. See [`LICENSE`](LICENSE).