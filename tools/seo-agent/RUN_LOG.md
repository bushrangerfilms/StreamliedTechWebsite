# SEO Agent Run Log (streamlinedai.tech)

Entries are appended by the fortnightly routine, newest first. The toolkit was built on 2026-08-21;
the first local dry run is recorded below by the session that built it.

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
