# SEO agent for streamlinedai.tech

A fortnightly remote Claude Code routine that monitors and maintains SEO for `streamlinedai.tech`,
reports by buyer journey, opens one GitHub issue per run, and opens small scoped PRs for what is
safely fixable. Sister of `bushrangerfilms/ListingsApp_16Feb25/tools/seo-agent` (autolisting.io).

## Layout

```
tools/seo-agent/
├── AGENT.md               # the run procedure the remote agent follows
├── README.md
├── RUN_LOG.md             # one entry per run
├── config/
│   ├── keywords.json      # target keyword clusters + _journeys, _intent_traps, _page_map, _proposed_pages
│   └── checks.json        # routes, file paths, PR scopes, copy rules, thresholds, IndexNow key
├── research/
│   ├── JOURNEY-MAP.md     # buyer journeys traced from Irish and Australian Google, Aug 2026
│   └── CONTENT-GAPS.md    # proposed pages and sections, in priority order
├── lib/
│   ├── env.mjs            # loads ~/Documents/Claude/.env.seo-agent locally; passthrough remotely
│   ├── gsc-client.mjs     # Search Console API (env vars first, local creds file second)
│   └── indexnow.mjs       # IndexNow submit + key-file verification
├── checks/                # each prints JSON to stdout
│   ├── gsc-snapshot.mjs   # queries, pages, target coverage, striking distance, sitemap status
│   ├── sitemap-audit.mjs  # live sitemap vs config, robots.txt, repo vs live drift
│   ├── route-wiring.mjs   # seo-routes.ts vs vercel.json vs sitemap vs App.tsx (this site's SEO plumbing)
│   ├── page-meta.mjs      # title, description, canonical, og:*, JSON-LD per route
│   ├── copy-rules.mjs     # Pete's voice and claims rules on live heads and page source
│   ├── cwv.mjs            # PageSpeed Insights (cwv_routes only, to spare quota)
│   ├── link-check.mjs     # every <a href> on the marketing routes
│   ├── indexing-status.mjs# GSC URL Inspection per route
│   └── image-audit.mjs    # oversized images under client/public, missing alt/dimensions live
├── run-all-checks.mjs     # runs all checks in parallel -> reports/<timestamp>/_aggregate.json
├── scripts/test-gsc.mjs   # local smoke test that the GSC API is reachable
└── reports/               # gitignored
```

## Credentials

| Service | Env vars | Local fallback |
|---|---|---|
| Google Search Console | `GSC_CLIENT_ID`, `GSC_CLIENT_SECRET`, `GSC_REFRESH_TOKEN` | `~/Documents/Claude/.env.gsc-oauth.json` |
| PageSpeed Insights | `PSI_API_KEY` | `~/Documents/Claude/.env.seo-agent` |
| GitHub | `GH_TOKEN` (fine-grained PAT with this repo) | local `gh auth` |

The GSC token is the same one the AutoListing agent uses; the Google account that minted it owns the
`https://streamlinedai.tech/` property, so nothing new had to be created. The OAuth consent screen
must stay "In production" (Testing-mode tokens die after 7 days, and this runs every 14).

## Running locally

```bash
cd tools/seo-agent
node run-all-checks.mjs          # JSON summary; full reports under reports/<timestamp>/
node checks/route-wiring.mjs | jq '.findings'
node checks/copy-rules.mjs | jq '.results[].findings'
```

## Editing targets

`config/keywords.json`: top-level keys that do not start with `_` are clusters (arrays of lowercase
phrases). The `_journeys`, `_intent_traps`, `_page_map` and `_proposed_pages` keys carry the journey
research the agent reports against; edit freely, the agent reads the file on every run.

## Scheduled runs

A cloud routine (https://claude.ai/code/routines) clones this repo on the 1st and 15th and follows
`AGENT.md`. `RUN_LOG.md` is the record. The routine never merges; Pete does.
