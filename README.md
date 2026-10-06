<p align="center"><img src="docs/banner.svg" alt="UNPLUGGED, Instrument Collection" width="100%"></p>

# UNPLUGGED: Instrument Collection

An offline-ready PWA for musicians: catalogue your instruments, track service, gigs and mods, and use a built-in tools hub (tuner, chords, songs, metronome, setlists, practice timer). One HTML file, no backend, no account. Light, dark or automatic theme.

<p align="center">
  <img src="app/shot-phone-1.png" alt="Collection grid on a phone" width="220">
  &nbsp;
  <img src="app/shot-phone-2.png" alt="Instrument detail on a phone" width="220">
</p>

## Live URLs

| | URL |
|---|---|
| Landing page | https://johnlaz.github.io/unplugged/ |
| App | https://johnlaz.github.io/unplugged/app/ |

Install: Android/Chrome and desktop Chrome/Edge use the install prompt; iPhone uses Share, then Add to Home Screen.

## What it does

- **Collection:** add instruments by hand, by camera scan, or by importing Excel/CSV. Grid, tile and list views, search, filters (type, family, storage) and sorting, running collection value, and an insurance report.
- **Per instrument:** specs, notes, photo, gig log, service log, mods and gear, and an optional AI-written profile.
- **Bottom bar:** Collection, Tools, Scan (centre), a quick button, and Settings.
- **Quick button:** pin any of the nine tools one tap away (Tuner by default). Press and hold the button, or use Settings, to change it.
- **Tools hub (9):** Record, Tuner, Learn to Play, Song Search, Metronome, Chord Dictionary, Setlist Builder, Originals, Practice Timer.
- **Backup & restore** (Settings): one JSON file with everything. Merge matches instruments by serial number (or make, model and year when there is none) and replaces sample entries; Replace All swaps everything. The screen shows when you last backed up.
- **Spreadsheets & reports:** Excel and CSV import/export, blank import template, printable insurance report.
- **Theme:** Auto (follows the device), Light or Dark, set in Settings.
- **Empty on first run.** Use "Try sample instruments" on the empty collection (or in Settings) to load eight example instruments with photos. Restoring a backup replaces them with your real entries.

<p align="center"><img src="docs/how-it-works.svg" alt="How Unplugged works: add or scan, AI fills specs, your collection, tools hub" width="100%"></p>

## Repo layout

```
unplugged/
├── index.html            # Landing page
├── README.md
├── docs/                 # README visuals (SVG)
└── app/                  # The PWA (scope: /unplugged/app/)
    ├── index.html        # Entire app, single file
    ├── manifest.json
    ├── sw.js             # Service worker
    ├── icon-192.png
    ├── icon-512.png      # Both maskable-safe
    └── shot-*.png        # Install screenshots
```

## AI and model setup

AI is optional and uses **Groq** with your own free key from [console.groq.com](https://console.groq.com).

1. Open **Settings**, paste your key under **Groq API key**, tap **Save key**.
2. Saving a new key fetches the models available on your key. **Refresh** next to AI model repeats this.

Defaults: text model `qwen/qwen3.6-27b`, falling back to `openai/gpt-oss-120b` or `openai/gpt-oss-20b` on a rate limit. Camera scan tries `meta-llama/llama-4-scout-17b-16e-instruct`, then `openai/gpt-oss-120b`. Refreshing only adds options: your saved model is never replaced, and if it is missing from the current list it is kept and flagged.

AI results (profiles, song sheets, chords) are cached locally, so each is requested once.

## Data and privacy

Everything lives in your browser's `localStorage`: `unplugged_inventory`, `unplugged_api_key`, `unplugged_text_model`, `unplugged_model_list`, `unplugged_view`, `unplugged_theme`, `unplugged_quick_tool`, `unplugged_last_backup`, `unplugged_notes`, `unplugged_song_cache`, `unplugged_chord_cache`, `unplugged_setlists`, `unplugged_originals`, `unplugged_practice`, and related keys.

Network calls:

| Host | Why |
|---|---|
| `api.groq.com` | AI features: your prompts and, for camera scan, the captured image |
| `en.wikipedia.org`, `upload.wikimedia.org` | Manufacturer photos (Picsum placeholder as a last resort) |
| `api.lyrics.ovh` | Lyrics lookup (artist and title) |
| `cdnjs.cloudflare.com` | SheetJS 0.18.5 for Excel import/export, cached for offline use |
| Sample instrument photo hosts | Only if you load the sample instruments; photos are linked, not bundled, and fall back to an icon if a link breaks |

Backups exclude your API key unless you tick the box when backing up.

## Deploy and update

GitHub Pages, deploy from `main`, folder `/ (root)`. No build step.

When anything in `app/` changes, bump **both** `APP_VERSION` in `app/index.html` and `VERSION` in `app/sw.js` (keep them identical). The service worker serves the app network-first, so updates arrive on next load, and open copies show an "Update ready" bar.

## Changelog

- **2.6:** light, dark and auto theme; new bottom bar (Collection, Tools, Scan, quick button, Settings) with a user-chosen quick tool; Settings is now a screen; Import/Export became Backup & Restore with a last-backup note; "Vault" renamed "Collection"; sample instruments are now eight real instruments with photos; themed confirmation dialogs and bottom-sheet modals on phones; summary tiles and a filter button on the collection; fixes for the storage filter, duplicate instruments on merge (items without serials), and re-selecting the same file in a picker.
- **2.5:** removed the pre-seeded personal collection (empty first run plus opt-in sample data); Groq model list refresh with saved-model protection; API key excluded from backups by default; service worker only caches same-origin files and SheetJS, with an update prompt; single version stamp; copper accent; flat repo with 192/512 icons and install screenshots; accessibility labels; README and landing refresh.
- **2.0 to 2.4:** earlier redesign and PWA work, see git history.

© 2026 LAZLAB Creations. All Rights Reserved. · lazlab.io@gmail.com
