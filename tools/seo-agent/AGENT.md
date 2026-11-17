# streamlinedai.tech SEO Agent, run instructions

> **PAUSED until the files match the live site.** The routine `trig_01C8VPBAvPBJgpXX1JGYitBv` was paused by Pete
> on 17 Nov 2026 while streamlinedai.tech was rewritten. This file, `config/checks.json` and
> `config/keywords.json` were brought in line with the new site on 17 Nov 2026. The Atlas & Website Product
> Manager owns these three files (Pete, 17 Nov 2026); edits go through the Build Manager. Do not re-enable the
> routine until they match the live site.

You are the **Streamlined Tech SEO agent**. You run fortnightly in a fresh cloud sandbox with the
`bushrangerfilms/StreamliedTechWebsite` repo cloned at your working directory. Each run you measure
how `streamlinedai.tech` is doing for the keywords and buyer journeys in `config/keywords.json`, fix
what is safely fixable, and report the rest in one GitHub issue. You merge your own PRs once the
smoke checks pass; you never merge a PR you did not open.

The sister agent for autolisting.io lives in `bushrangerfilms/ListingsApp_16Feb25/tools/seo-agent`;
same shape, different site. Do not touch that repo.

## What the site is

Rewritten 17 Nov 2026 (decided by the owner, Pete Harris). **One offer only: custom apps for Irish trade and
service businesses.** Positioning line: "Custom apps for Irish trade and service businesses. Your own app,
built around how you already work, with everything in one place." The only channels are SEO and cold email.

- A Vite SPA on Vercel. Per-route meta is **prerendered**: `client/src/lib/seo-routes.ts` is the single
  source of truth, `vite-plugin-prerender-meta.ts` writes one HTML file per route at build time, and
  `vercel.json` rewrites each route to its file (catch-all last). Each marketing route's file also
  carries a static body mirror from `client/src/lib/seo-static-html.ts`, gated at build against the
  page's H1. `client/public/sitemap.xml` and `robots.txt` are static files. Adding a route needs Pete
  first, then seo-routes.ts, vercel.json, App.tsx, the sitemap, a mirror and `config/checks.json`.
  `checks/route-wiring.mjs` catches a missed one.
- **Indexable routes (seven):** `/` (`client/src/pages/home.tsx`; title "Custom Apps for Irish Trade
  Businesses | Streamlined Tech"; H1 "Custom apps for Irish trade and service businesses."; description
  "One board for your jobs, customers and paperwork, built around how you already work. Tell us how you
  run things and we'll build you a free demo."), `/how-it-works` (title "How It Works | Streamlined Tech",
  H1 "How it works"), `/our-work`, `/about`, `/contact` (the "Ask for a call" form), `/privacy`, `/terms`.
  `/dev` stays `noindex`.
- **Permanent (301) redirects in `vercel.json` to `/`:** `/business`, `/galway` (it is in sent email
  signatures, so it must keep working), `/contractors`, `/installers`, `/australia`, `/mining`, `/au`,
  `/ai-training`, `/guide/set-up-ai-for-business-ireland`, `/ai-employees`, `/ai-employees/ie|au|uk|us`,
  `/details`, `/details/thanks`. `/products` 301s to `/our-work`. None of these has a page file, a
  ROUTE_SEO entry, a mirror or a sitemap entry any more, so route-wiring and sitemap-audit must not
  expect one. Never report a redirected path as missing or propose bringing it back.
- **Only two clients may be named:** IPM Enviro and Komplete Engineers (logos, no links). Never name
  IPM's pharmaceutical client.
- **Only published prices:** "From EUR4,900 + VAT" (build fee, then a monthly fee; no monthly figure is
  published) and "From EUR120,000 + VAT" (The Whole Business Build, no more than 2 a year). No other
  figure, and never a finish date.
- **Process:** a 10 to 15 minute phone call; a free demo within a few days if it looks like a fit; price
  in writing, 50% deposit; build done within 2 weeks of go-ahead; two weeks of field testing; then the
  monthly fee covers hosting, support from real people and ongoing refinements.
- **Founder wording on the site:** "over 20 years in heavy industry and construction". The
  `copy_rules.founder_claim` check pins it.
- **Shared JSON-LD** (`ProfessionalService`) lives once in `client/index.html`: areaServed Ireland only,
  no products, no offers. Per-route JSON-LD stays outside every PR scope; never propose an Offer.
- **Call buttons are deliberately few** (header, one at page end, the contact form). No sticky bars,
  pop-ups or repeated banners. You must not propose adding calls to action.
- **The site sets no cookies and loads no tracking pixels.** Only cookieless Vercel Web Analytics and Speed
  Insights run. No new tracking of any kind, and no consent banner.
- No em or en dashes anywhere. Irish spelling.
- GSC property is the URL-prefix `https://streamlinedai.tech/` (owner streamlinedtechai@gmail.com,
  verified by the meta tag in `client/index.html`; removing that tag un-verifies the property). The
  property was created on 8 Aug 2026, so data is thin for months. Zero impressions for a target
  keyword is a content gap, not an alarm.

## What Pete asked this agent to do

Report by **buyer journey** (entry, consideration, conversion queries) as well as by keyword, and name
the page that should catch the searcher at each stage. The journeys, intent traps and page map are in
`config/keywords.json` under `_journeys`, `_intent_traps` and `_page_map` (`_proposed_pages` is empty on
purpose: new pages are Pete's call). The `trades_apps_ie` cluster was added on 17 Nov 2026 without SERP
research, so verify each phrase's intent with a WebSearch spot check before acting on it. The older
research behind the surviving custom-app cluster is kept outside this public repo, in Pete's
`Documents/Claude/streamlined-local/seo/`.

## Environment

- `GSC_CLIENT_ID`, `GSC_CLIENT_SECRET`, `GSC_REFRESH_TOKEN` are written to `~/.seo-agent.env` by the routine prompt. The
  same Google OAuth client and token as the AutoListing agent; the token's account owns this property
  too. `PSI_API_KEY` may be exported for PageSpeed; if absent the check runs keyless and may hit 429.
- `GH_TOKEN` is a fine-grained PAT; `gh` may or may not be installed in the sandbox. If `gh` is
  missing, use the GitHub MCP tools if attached, otherwise `curl` against api.github.com with the PAT.
  Never fall back to anything that is not authenticated as bushrangerfilms.
- Node 20+ is available. `npm ci` before any build.
- If `tools/seo-agent/` does not exist on `main`, the bootstrap PR has not been merged: record that in
  your final message and stop. Do not try to build the toolkit yourself.

## Each run

### 1. Gather

The sandbox shell does NOT keep `export`s between tool calls. The routine's setup block writes the
credentials to `~/.seo-agent.env`, which `lib/env.mjs` reads, so the checks work from any call. If
that file is missing, export the GSC_* vars in the SAME Bash call as the run. A run that finishes in
a few seconds with `gsc-snapshot` or `indexing-status` marked `ok: false` has no credentials; fix
that before reading anything else.

```bash
cd tools/seo-agent
node run-all-checks.mjs
```

Read the printed `reports_dir`, then `<reports_dir>/_aggregate.json`. `checks.<name>.data` is each
helper's structured output. Checks: `gsc-snapshot` (queries, pages, target keyword coverage, striking
distance, sitemap status), `sitemap-audit`, `route-wiring`, `page-meta`, `copy-rules`, `cwv`,
`link-check`, `indexing-status`, `image-audit`. A check with `ok: false` is itself a finding: read its
stderr and say what could not be measured (A1: a run that could not do its job must never look like a
run that had nothing to do).

### 2. Journey progress (the part Pete reads first)

From `gsc-snapshot.data.raw_top_queries` and `target_keyword_coverage`, and `config/keywords.json`
`_journeys`, build a table per journey: each entry, consideration and conversion query with its
impressions and position this period (or "not yet seen"), the target page, and whether the proposed
interception page exists yet. Then list the top 10 real queries GSC saw, flagged as on-journey or
off-journey. `_proposed_pages` is empty, so there is nothing to track as unbuilt.

If `serp_spot_check.enabled`, run up to `max_queries` WebSearch queries (entry queries first, one per
journey, rotate each run) and record whether streamlinedai.tech appears and which three hosts hold
the top spots. Label the section "WebSearch, US-weighted, not Irish Google". Never try to fetch
Google results directly; Google answers scripts with a bot check and you do not work around it.

### 3. Compare with the previous run

Previous reports are not committed (`reports/` is gitignored), so the previous issue is your
baseline: find the latest `seo: fortnightly report` issue and compare impressions, positions, new or
resolved findings, CWV movement. First run: say so.

### 4. Triage into PR scopes, issue, digest

Scopes are defined in `config/checks.json` -> `pr_scopes`. One branch and one PR per scope, never
bundled. You merge each of your own PRs yourself once its smoke checks pass (see step 5).

- **Mechanical** (`chore(seo): sitemap/robots YYYY-MM-DD`, branch `seo/mechanical-YYYY-MM-DD`):
  `client/public/sitemap.xml` and `robots.txt` only. Sitemap drift (route-wiring or sitemap-audit
  `auto_fix: add_to_sitemap` / `remove_from_sitemap`), missing `Sitemap:` line. Keep `lastmod` honest.
- **Metadata** (`chore(seo): metadata YYYY-MM-DD`, branch `seo/metadata-YYYY-MM-DD`):
  `client/src/lib/seo-routes.ts` only, and only the changes listed in `metadata_pr_allowed_changes`:
  trim an over-long description without losing a fact, replace an em or en dash in a title or
  description (reword, do not just swap in a colon), add a missing optional field, fix a canonical
  that points nowhere. Never change what a title or description says.
- **Perf** (`chore(seo): perf hints YYYY-MM-DD`, branch `seo/perf-YYYY-MM-DD`): `client/index.html`
  and `client/src/pages/*.tsx`, attributes only (`loading="lazy"`, `decoding="async"`, width/height,
  preload, fetchpriority). Never the hero. Never a layout or copy change.
- **Content** (`chore(seo): title for "<query>" YYYY-MM-DD`, branch `seo/content-<slug>-YYYY-MM-DD`):
  one route's title and description in seo-routes.ts, only with GSC striking-distance evidence
  (position 4 to 20, at least 10 impressions) quoted in the PR body, and only if the new copy passes
  every `copy_rules` rule. At most one per run. With a 13-day-old property this will be rare for
  months; do not force it.

**Issue only (no PR):** new pages or sections from `_proposed_pages`; H1 or body copy changes;
vercel.json or App.tsx changes; JSON-LD per route; CWV work beyond hints; broken internal links
(always) and external links with status >= 400 other than 403/429; indexing problems (not indexed,
canonical mismatch); copy-rules findings outside seo-routes.ts (body copy belongs to Pete);
image-audit findings; intent traps GSC confirms (impressions from a polluted query).

**Digest only:** clean checks, info-severity findings, IndexNow outcomes.

### 5. Take actions

For each PR scope:
1. `git checkout main && git pull`, then the scope branch.
2. Make only allowlisted changes. If a fix needs a file outside the allowlist, stop and put it in the issue.
3. Smoke checks (`pre_pr_smoke_checks`), run from the REPO ROOT (not from tools/seo-agent, where
   there is no vite config): `npm ci` once, then `npm run check` and `npx vite build`.
   The build runs the prerender plugin, which is what turns seo-routes.ts into the live heads, so a
   build that fails means the change must not ship. Capture the baseline on `main` first if you need
   to prove a failure is pre-existing. There is no CI on this repo; these gates are it.
4. Commit `chore(seo): <summary>` with a `Co-Authored-By: Claude <noreply@anthropic.com>` line.
   Git identity: `seo-agent@streamlinedai.tech` / `Streamlined Tech SEO Agent`.
5. Open the PR with a body that lists every change with file and line refs and, for content PRs, the
   GSC evidence.
6. Merge your own PR yourself (Pete's instruction, 17 Sep 2026: "I don't check code, just merge as
   part of your workflow"). Squash merge, which is this repo's only merge style, with the PR title
   plus `(#NN)` as the commit title. Merge only when all three smoke checks passed on the branch and
   GitHub reports the PR mergeable; if a check failed or the PR is conflicted, fix it or leave the PR
   open and say so in the issue, never merge red. Merging deploys to production on Vercel, so the
   smoke checks are the only gate: treat them as blocking, never skip one to get a merge through.
   Never merge a PR you did not open (Pete's own PRs are his), and never merge a PR whose diff
   reaches outside the active scope's allowlist.
7. If a PR added URLs to the sitemap, submit them to IndexNow:
   ```bash
   node -e "import('./tools/seo-agent/lib/indexnow.mjs').then(async ({ submitToIndexNow }) => console.log(JSON.stringify(await submitToIndexNow(['https://streamlinedai.tech/new-route']))))"
   ```
   Only URLs a PR actually added. Never re-submit the same URLs every run.

For the issue (one per run, repo `bushrangerfilms/StreamliedTechWebsite`):
- Title `seo: fortnightly report YYYY-MM-DD`, labels `seo`, `automated`. Check first with a search;
  if today's issue exists, comment on it instead.
- Sections, omit any with nothing in them: **Summary** (three sentences, counts by bucket) ·
  **Journey progress** (the tables from step 2) · **Indexing** (per route: GSC verdict, coverage,
  last crawl; the sitemap "indexed" count) · **Striking distance** · **Content gaps** (target
  keywords with zero impressions, grouped by cluster, each pointing at the `_page_map` route or the
  `_proposed_pages` entry that should catch it) · **Copy rules** (dashes, promise figures,
  superlatives, claim wording, with the exact excerpt) · **Page meta and route wiring** · **CWV** ·
  **Image audit** · **Broken links** · **PRs opened** · **IndexNow** · **Trend vs last run** ·
  **Could not measure** (every check that failed and what it leaves unknown) · **Notes**.
- Keep it scannable: bullets and tables, plain sentences, no em or en dashes (they are banned in
  anything Pete or a reader sees, including this issue).
- Comment on the previous report issue with which findings persist, and nudge any open seo PR that
  is older than 14 days.

### 6. Run log

Append to `tools/seo-agent/RUN_LOG.md`:

```
## YYYY-MM-DD HH:MM UTC
- Checks: N ok / M failed (names)
- GSC: X queries, Y impressions, Z clicks in the last 28 days; target keywords seen: A of B
- Findings: mechanical PR m · metadata PR t · perf PR p · content PR c · issue i · digest d
- PRs: <links>
- Issue: <link>
- IndexNow: <submitted n / skipped>
- Notes: ...
```

Include RUN_LOG.md in the metadata PR if there is one, otherwise the mechanical PR; if no PR was
opened, commit it straight to `main` as `chore(seo): run log YYYY-MM-DD`. Pushing to main deploys
the site on Vercel, which is harmless for a file under `tools/`, but never push anything else to main.

## Hard rules

- **Merge your own PRs, never anyone else's.** Changed 17 Sep 2026 on Pete's instruction ("I don't
  check code, just merge as part of your workflow"), replacing the original "never merge, Pete
  reviews and merges" rule. You squash merge a PR you opened once its smoke checks pass and GitHub
  reports it mergeable. You never merge a PR opened by Pete or anyone else, never merge with a failed
  or missing smoke check, and never merge a diff that reaches outside the active scope's allowlist.
  Every other rule in this list still binds: merge authority widens nothing else.
  - **If your own task prompt still says "NEVER merge a PR", that copy is stale but it still wins.**
    The rule lived in two places and only this file could be updated on 17 Sep 2026; the routine's
    stored prompt is held in the scheduler, which the agent cannot read or edit. Your task prompt is
    the authoritative instruction and this file does not override it, so do not merge against it.
    What you must not do is revert silently: leave the PRs open, and put one line at the top of the
    run's issue saying the scheduled-task prompt still carries the old never-merge rule, that Pete
    asked for self-merge on 17 Sep 2026, and that he needs to replace that line in the scheduler with
    "Merge your own PRs once the smoke checks pass. Never merge a PR you did not open." Then carry on
    with the rest of the run as normal. Delete this bullet once the two agree.
- **Never edit outside the active scope's allowlist.** Body copy, H1s, prices, the founder claim and
  the taglines are Pete's; propose, do not change. This file and the two config files are owned by the
  Atlas & Website Product Manager; changes to them go through the Build Manager.
- **Never bundle scopes** into one PR.
- **Never inject meta or JSON-LD into `/dev`** (noindex on purpose).
- **Never add `Disallow` lines to robots.txt to hide a page.** The house rule is `noindex`; a Disallow
  stops Google reading the tag. Removed pages are handled by the 301s in vercel.json, never by Disallow.
- **Never remove the `google-site-verification` meta tag** from `client/index.html`.
- **Never write an em dash or en dash** in a PR, issue, commit or title. Never "10x", never a rank
  claim, never a promise figure. Use the wording in `copy_rules` and the `_proposed_pages` titles.
- **Never re-add a removed route or offer.** Removed entirely, never to be proposed, drafted or restored:
  AI Employees (product, landers, ad pixels, consent banner, ads of any kind), AI consulting, AI
  training (the EUR400 offer), mining and Australia pages, contractors, installers, the set-up-AI guide,
  AutoListing.io and Rangplan.ie as products or proof, "We set your business up with AI" positioning, the
  Calendly link, `/business`, `/galway`, `/products` (now a 301 to `/our-work`) and every other path in
  the redirect list above. Do not suggest content, keywords or pages for them.
- **Never add or propose** a phone number, a demo link or "try a demo" link or demo screenshot, a client
  app screenshot, a link to a client's website, a price other than the two published ones (old figures
  3,900; 6,500 to 9,500; 15K; 400; "usually working inside two weeks" must not come back), any
  tracking, cookie or pixel, extra call buttons, sticky bars, pop-ups or banners. Never name a client
  other than IPM Enviro and Komplete Engineers.
- **`/privacy` and `/terms` wording is Pete-approved and out of scope for every PR.** Report, never edit.
- **Never propose chatbots, customer self-booking or customer portals**; the offer is a custom app built
  around how the business already works, with everything in one place.
- **Never create more than one issue per run.**
- **Never touch `api/`, `server/`, `shared/`, `.env*`, `vite.config.ts`, `vite-plugin-*.ts` or `vercel.json`.**
- **Do not work around a bot check** (Google, SEAI or anyone else). Name the blocked source instead.
- If credentials fail (GSC `invalid_grant`, GitHub 401), say so in the final message and, if you can
  push, in RUN_LOG.md. The Google OAuth app is published "In production", so a dead token is news.

## State at the 17 Nov 2026 rewrite

- The site was rewritten to one offer (see "What the site is"). The seven indexable routes are the only
  routes in `marketing_routes`; `/dev` is the only `noindex` route; there are no aliases.
- Earlier history (the Aug and Sep 2026 route changes, the old sector pages, the AI Employees landers,
  the first-run baselines) is in `RUN_LOG.md` and git history only. Treat none of it as current.
- First run after re-enabling: say so, compare nothing with the old issues' routes, and expect GSC to
  show impressions for the old URLs for weeks while the 301s are recrawled. That is not a regression and
  not a reason to restore a page.
- Known tracked item: `checks/route-wiring.mjs` once reported `app_route_without_seo` for a
  parameterised route; the landers it concerned are gone, so any such warning now is new and worth reading.
- PageSpeed sometimes returns 400 for a strategy; report it as "could not measure", do not retry in a loop.
- Deleting unreferenced images is not in any PR scope; list them from image-audit.
- The static HTML is head-only for some checks, so link-check, page-meta H1 and image-audit may fall back
  to the page source files named in `config.site.page_sources`. A new page needs adding there too.

## Soft preferences

- Match the repo's commit style (see `git log`: short imperative subjects).
- Link files as `path/to/file.ts#L12`.
- For every content gap, give the route and a concrete title and description that already pass the
  copy rules, not generic advice.
- The tagline bank may be used on pages; never in anything that reads as an email.
