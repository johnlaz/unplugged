# Unplugged v2.5: changelog

Zip contains changed/new files only. Copy over the repo, then delete the files listed under "Delete".

## Delete from repo
- `app/icons/` (whole folder: icon-120/152/180/192/512.png, unplugged.ico)
- `app/.keep`, `app/icons/.keep`
- `app/README.md` (folded into the root README)

## Changed / added
| File | What | Why |
|---|---|---|
| app/index.html | Removed pre-seeded personal vault; added opt-in "Load demo instruments" (fictional, skips photo lookups) | Every visitor received your real vault |
| app/index.html | Groq model refresh: fetch on key save + Refresh button; existing options, default and saved pick untouched; saved model missing from list is kept and flagged; blank select no longer overwrites saved model | Model-list update rule; fixes silent swap bug |
| app/index.html | Backup excludes API key unless checkbox ticked | Key was exported in plaintext |
| app/index.html | `APP_VERSION` constant (2.5) drives header, title, backup, PDF | Version stamp matched nothing |
| app/index.html | "Update ready" bar on service-worker update | No update prompt |
| app/index.html | Gold to copper accent; theme-color; icon links point to flat PNGs | Match icon and landing |
| app/index.html | aria-labels, dialog roles, keyboard-operable tabs/badges, aria-live toasts | Zero aria before |
| app/sw.js | VERSION 2.5, cache `unplugged-v2.5`; caches only same-origin + pinned SheetJS; cross-origin photo requests pass through; flat icon list | Stale/unbounded photo caching |
| app/manifest.json | Added `id` (/unplugged/app/, same as old default identity); separate any/maskable entries for 192+512; 3 screenshots; theme_color copper | Install quality |
| app/icon-192.png, icon-512.png | Regenerated maskable-safe (artwork at 78%) | Wordmark was clipped by circular masks |
| app/shot-phone-1/2.png, shot-desktop.png | Simulated: rendered from the real app with demo data (1080x1920, 1080x1920, 1920x1080) | Install screenshots; replace with real captures when you have them |
| index.html (landing) | Hero phone screenshot replaces emoji frame; fake "Verified" card replaced by detail screenshot; shorter hero copy; "9 tools"; footer + email; gallery PNG to inline WebP (784 KB to 116 KB); description/theme-color meta | Design, accuracy, weight |
| README.md | Rewritten to match the code (qwen/gpt-oss models, real network hosts, no Discogs) with all standard sections | Old README described llama-3.3 and Discogs |
| docs/banner.svg, how-it-works.svg | New, self-contained, dark panels readable on GitHub light and dark | README visuals |

## Not done
- SheetJS upgrade (audit #8): newer builds are only on cdn.sheetjs.com, unreachable from my sandbox, so untested. Still 0.18.5.
- Vision fallback list left unchanged. `openai/gpt-oss-120b` may not accept images; verify on your key.

## Existing installs
No reinstall needed: scope/start_url unchanged and manifest id equals the old default. Installed copies pick up the new service worker on next online open and show the update bar. iOS keeps its old home-screen icon until re-added.

## Heads-up
- Your real vault (serials, values) remains in the public repo's git history. Removing it needs a history rewrite.
- Browsers that already opened the app hold a seeded copy in their own localStorage.
- Export a backup before clearing site data on your devices; a fresh install now starts empty.
