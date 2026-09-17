# SEO Agent Run Log (streamlinedai.tech)

Entries are appended by the fortnightly routine, newest first. The toolkit was built on 2026-08-21;
the first local dry run is recorded below by the session that built it.

## 2026-09-17 12:30 UTC (ad hoc, not the fortnightly routine)

- **Merge policy changed.** Pete, 17 Sep 2026: "I don't check code, just merge as part of your
  workflow." The old "never merge, Pete reviews and merges" rule is gone, replaced by merge
  authority over PRs this agent opened itself, gated on passing smoke checks (PR #59). Merged PR #56
  (the 15 Sep perf hints) and #60 under it. Guardrails kept: never merge someone else's PR, never
  merge red or conflicted, never merge a diff outside the active scope's allowlist, and merge
  authority widens nothing else. **Still outstanding: the stored scheduled-task prompt in the
  scheduler also carries "NEVER merge a PR", and this agent cannot edit that. Until Pete updates it,
  a future run will read the old rule in its task instructions and may follow it over AGENT.md.**
- Trigger: Pete asked where the site ranks for AI coaching, AI workshops, staff training with AI and
  AI consulting. Answer: zero on all four, measured over the property's full lifetime (1 Aug to
  17 Sep), 0 of 24 exact-phrase probes seen and zero rows on broad contains probes for coach,
  workshop, training, consult, course and upskill.
- Researched with 4 WebSearch research agents (one per keyword family) plus an independent
  adversarial refuter each, defaulting to refuted. The refuter downgraded 3 of 4: ai coaching trap,
  ai workshops weak to **trap**, staff training weak, ai consulting moderate to **weak**. All three
  traps are now recorded in `_intent_traps` so a future run does not rediscover them.
- **`/ai-training` shipped in PR #58 on 16 Sep, after the 15 Sep run, and keywords.json did not know
  it existed** (no `_page_map`, no `_proposed_pages`). Same class of blind spot as the
  `/how-it-works` config gap in the 1 Sep report. Fixed in #60, which also records the live copy as
  built so no future run reports it as drift.
- Headline finding for Pete: the page's live title "AI Training and Coaching in Ireland" contests the
  two least winnable terms in the set. Ireland-qualified AI training is owned by Skillnet, the LEOs,
  AIReady.ie and the universities, and the Skillnet Upskill SME grant reclaims the salary cost of
  staff AI training, so the state part-funds the competing service. "Coaching" is a Gartner software
  market and collides with sports coaching on Irish Google. Retitle recommended
  (`Train Your Staff to Use AI | Streamlined Tech`, 45 chars) but **not applied**: content scope,
  changes what a title says, and no GSC striking-distance evidence exists. Pete's call, recorded in
  `_proposed_pages`.
- Indexing: `/ai-training` is "URL is unknown to Google, never crawled". Google last fetched the
  sitemap 15 Sep 22:30 UTC, before the route existed, and still reports 10 submitted URLs not 11.
  Submitted to IndexNow (202 accepted, reaches Bing/Yandex/Naver only). Requesting indexing in the
  Search Console UI remains Pete's action.
- Also corrected AGENT.md: per-route JSON-LD is supported as of PR #58 (a `jsonLd` field on a
  ROUTE_SEO entry prerenders a second block), where the file claimed it needed a plugin change.
- Checks run: route-wiring, sitemap-audit, copy-rules, page-meta. All clean on the new route;
  copy-rules now covers 11 routes at 0 warnings and 0 info. Only the two known `/ai-employees`
  route-wiring warnings and the `/dev` short-description info persist.
- PRs: https://github.com/bushrangerfilms/StreamliedTechWebsite/pull/59 (merged),
  https://github.com/bushrangerfilms/StreamliedTechWebsite/pull/56 (merged),
  https://github.com/bushrangerfilms/StreamliedTechWebsite/pull/60 (merged)
- Issue: commented on https://github.com/bushrangerfilms/StreamliedTechWebsite/issues/57 rather than
  opening a new one, per the one-issue-per-run rule.
- Tracked keywords 87 to 89: added `ai consulting ireland` and `train staff to use ai` (watch only,
  expected to sit at zero for a long time). Deliberately added NO training, coaching, workshop or
  upskilling cluster; their absence is the research working, not an oversight.

## 2026-09-15 10:03 UTC
- Checks: 9 ok / 0 failed
- GSC: 5 queries, 161 page-level impressions, 18 page-level clicks in the last 28 days across all 10 tracked routes; target keywords seen: 0 of 87 (down from 1 of 87; "bespoke ai development ireland" fell out of the named-query list this period)
- Findings: mechanical PR 0 (no drift) · metadata PR 0 (copy rules clean, all lengths inside threshold, root description confirmed at 157 chars per PR #54) · perf PR 1 · content PR 0 (no striking distance) · issue 1 · digest (clean checks, CWV, image audit findings, IndexNow n/a)
- PRs: https://github.com/bushrangerfilms/StreamliedTechWebsite/pull/56 (new); nudged https://github.com/bushrangerfilms/StreamliedTechWebsite/pull/33 (25 days old, now conflicting with main after the site restructuring, recommended closing in favour of #56)
- Issue: https://github.com/bushrangerfilms/StreamliedTechWebsite/issues/57 (comment added to previous report https://github.com/bushrangerfilms/StreamliedTechWebsite/issues/39)
- IndexNow: skipped, no PR added a sitemap URL this run
- Notes: `/privacy` regressed from "Submitted and indexed" (1 Sep report) to "Crawled - currently not indexed"; no on-page cause visible (title/description/canonical all clean), likely a Google low-value judgement on a thin privacy-policy page rather than a technical fault. The `config/checks.json` gap that left `/how-it-works` uncovered by several checks (flagged in the 1 Sep report) is resolved; all 10 marketing routes now covered by page-meta, copy-rules, cwv, link-check and image-audit. `/contractors`, `/installers` and `/australia` all showed real page-level GSC gains this period; `/business` impressions dropped from 13 to 2 but average position improved from 75.0 to 13.5 (noisy at this volume). Two new off-journey queries this period both name "chatbot", which the site does not offer; flagged in the issue, not actioned. PR #56 redoes the `loading="lazy"`/width/height perf fix that PR #33 (open since 21 Aug) was attempting, since #33 no longer applies cleanly to `business.tsx`, `contractors.tsx` and `installers.tsx` after the restructuring rewrote them. Google OAuth token authenticated normally end to end on Search Analytics, Sitemaps and URL Inspection.

## 2026-09-01 10:02 UTC
- Checks: 9 ok / 0 failed
- GSC: 6 queries, 94 page-level impressions, 12 page-level clicks in the last 28 days; target keywords seen: 1 of 87 ("bespoke ai development ireland", 2 impressions, position 93.5, unchanged from last run)
- Findings: mechanical PR 0 (no drift) · metadata PR 0 (copy rules clean, all lengths inside threshold) · perf PR 0 (allowlisted width/height opportunity on business/contractors/installers held back to avoid conflicting with open, unreviewed PR #33 on the same img elements) · content PR 0 (no striking distance) · issue 6 · digest 4
- PRs: none opened this run. Existing open PR unchanged: https://github.com/bushrangerfilms/StreamliedTechWebsite/pull/33 (11 days old, not yet nudged)
- Issue: https://github.com/bushrangerfilms/StreamliedTechWebsite/issues/39 (comment added to previous report https://github.com/bushrangerfilms/StreamliedTechWebsite/issues/34)
- IndexNow: skipped, no PR added a sitemap URL this run
- Notes: `/contractors` and `/privacy` both moved to "Submitted and indexed", clearing both outstanding indexing requests from the last report. PR #36 (merged since last run) fixed the webp reference problem: oversized images down from 16 to 7, total image weight down from 6983 KB to 2264 KB. PR #37 shipped `/how-it-works` ahead of the `_proposed_pages` schedule; it is live, in the sitemap and in seo-routes.ts, but `config/checks.json`'s marketing_routes/page_sources/cwv_routes still only list the original 7 routes, so page-meta, copy-rules, cwv, link-check and image-audit did not cover it this run (route-wiring and sitemap-audit did, since they read seo-routes.ts and the sitemap directly, which is how the gap was caught). Updating that config file is outside every PR scope, so it was flagged in the issue rather than fixed. `/business` mobile CWV returned a PSI 500 this run, reported as could not measure, not retried. A new PR #38 (opened today by Pete, not this agent) proposes a large restructuring, root becomes the general front door and mining content moves to /australia, plus two new routes; it is out of scope to act on but will change the `_page_map` once merged. PR #38's own description also flags a GSC OAuth invalid_grant since 27 Aug, but this run's credentials authenticated normally end to end, so that note looks stale or specific to the AutoListing agent's side; flagged in the issue for Pete to check.

## 2026-08-21 10:59 UTC (first scheduled run)
- Checks: 9 ok / 0 failed
- GSC: 4 queries, 33 impressions, 1 click in the last 28 days; target keywords seen: 1 of 87 ("bespoke ai development ireland", 2 impressions, position 93.5)
- Findings: mechanical PR 0 (no sitemap or robots drift) · metadata PR 0 (copy rules clean, all lengths inside threshold after #32, nothing left that scope allows) · perf PR 1 · content PR 0 (no striking distance) · issue 8 · digest 4
- PRs: https://github.com/bushrangerfilms/StreamliedTechWebsite/pull/33
- Issue: https://github.com/bushrangerfilms/StreamliedTechWebsite/issues/34
- IndexNow: skipped, no PR added a sitemap URL this run
- Notes: PR #32 cleared the whole metadata bucket (4 over-long titles, 4 over-long descriptions, the homepage en dash); copy-rules now returns 0 findings. /contractors moved from "URL is unknown to Google" to "Discovered, currently not indexed", /privacy unchanged; both still need Pete to request indexing in the Search Console UI. Mobile LCP still about 3.5 s on all five core routes, 16 oversized images unchanged. Biggest out-of-scope finding: /business, /contractors and /installers reference the heavy PNG and JPG originals while / uses the already-committed webp siblings, about 2.8 MB where about 0.4 MB would do; changing an image src is forbidden in perf scope so it is in the issue. First run of the checks did not have the credentials in the check process environment and returned an empty GSC result with ok:true; rerun with credentials exported inline and all numbers above come from that run.

## 2026-08-21 09:53 UTC (local dry run by the session that built the toolkit, not the routine)
- Checks: 9 ok / 0 failed
- GSC: 4 queries, 33 impressions, 1 click in the last 28 days; target keywords seen: 0 of 87 (property 13 days old)
- Findings: mechanical PR 0 · metadata PR 0 (not opened by hand; the homepage en dash and four over-long titles/descriptions are proposed to Pete instead) · perf PR 0 · content PR 0 · issue-worthy 6 (/contractors unknown to Google, /privacy not indexed, titles/descriptions over length, homepage en dash, mobile LCP about 3.5 s, 16 oversized images incl. 2 unreferenced) · digest 3
- PRs: bootstrap PR seo/add-seo-agent
- Issue: none (first scheduled run opens the first report)
- IndexNow: key file added, nothing submitted
- Notes: link-check, page-meta H1 and image-audit were switched to page-source fallbacks during this run because the static HTML is head-only. PSI returned 400 once for /installers desktop and /australia mobile.
