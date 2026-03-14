# UNPLUGGED — Instrument Vault

> AI-powered musical instrument inventory, learning tools, and performance utilities — packaged as a Progressive Web App.

---

## What is Unplugged?

Unplugged is a fully offline-capable web application for musicians. It combines a professional instrument collection manager with an AI-powered learning suite. Everything runs in a single HTML file — no backend, no accounts, no subscription. Your data stays on your device.

---

## File Structure

```
unplugged-pwa/
├── unplugged.html        # The entire application (self-contained)
├── manifest.json         # PWA manifest — name, theme, icons
├── sw.js                 # Service worker — offline caching
├── README.md             # This file
└── icons/
    ├── unplugged.ico     # Favicon (browser tab) — all legacy sizes
    ├── icon-512.png      # PWA install / splash screen
    ├── icon-192.png      # Android home screen
    ├── icon-180.png      # iOS home screen (iPhone)
    ├── icon-152.png      # iOS home screen (iPad)
    └── icon-120.png      # iOS home screen (older devices)
```

---

## Getting Started

### Deployment Requirements

- Must be served over **HTTPS** (or `localhost`) for the service worker and camera features to work
- Any static host works — GitHub Pages, Netlify, Cloudflare Pages, Vercel, or your own server
- Simply upload the contents of this folder to your hosting root — no build step required

### Installing as a PWA

| Platform | How to install |
|---|---|
| **Android / Chrome** | Open the URL → tap the install banner or ⋮ menu → *Install app* |
| **iPhone / Safari** | Open the URL → tap Share → *Add to Home Screen* |
| **Desktop Chrome/Edge** | Open the URL → click the ⊕ icon in the address bar → *Install* |

Once installed, the app works fully offline. Groq AI calls require an internet connection.

### Setting up AI Features

1. Open the app and tap the **⚙** gear icon
2. Enter your [Groq API key](https://console.groq.com) — free tier available, no credit card required
3. Tap **Save Settings**

Your key is stored only in your browser's localStorage — it is never transmitted anywhere except directly to the Groq API.

---

## Features

### Instrument Vault

The main screen — your full instrument collection.

- **Add instruments** manually with a comprehensive spec form
- **Camera scan** — point at a headstock, label, or body; Groq Vision reads the make, model, serial number, year, and country of origin, then auto-fills the full spec sheet
- **AI spec fill** — enter a brand and model, click AI Fill Specs, and all fields populate automatically
- **AI instrument profile** — each instrument gets a rich editorial write-up covering history, construction, playability, collectibility, and notable players. Generated once and cached permanently
- **Auto manufacturer image** — on first view, the app searches Wikipedia, Wikimedia Commons, and Discogs for a real product photo. Never overwrites a photo you set manually
- **Per-instrument tracking panels:**
  - **Gig Log** — count sessions, log venue/event names, view recent history
  - **Service Log** — checklist of maintenance tasks (string changes, setup, electronics), date of last service, running log entries
  - **Mods & Gear** — checkboxes for common modifications (pickup upgrades, refrets, custom finish, etc.) plus a free-text custom field
- **Grid, small tile, and list views** with sort by name, brand, value, year
- **Filter** by instrument type and family
- **Vault value** — running total of all estimated values
- **Import/Export** — Excel (.xlsx) and CSV support. Import maps by serial number and merges rather than duplicates

---

### Laz Mode

A hidden feature set unlocked by clicking the **⚙ gear icon 5 times quickly**. Once unlocked it persists permanently and adds a **⚡ LAZ MODE** tab to the navigation.

#### 🎙 Record

- Record audio from any connected microphone or USB audio interface (Hush X plugs and similar devices enumerate automatically)
- Live VU level meter while recording
- Recordings stack with individual playback players
- Download each take as a `.webm` audio file
- Switch between input devices without leaving the app

#### 🎵 Chromatic Tuner

- Real pitch detection via autocorrelation — accurate to ±1 cent
- Animated needle with ±50 cent range, turns green when within ±5 cents of target
- Note name, octave, and Hz readout
- Pre-built string reference buttons for: Guitar (E Standard), Bass, Ukulele, Violin
- Fully chromatic mode for any instrument
- No external library — built entirely on Web Audio API

#### 🎸 Learn to Play

Four difficulty tiers — the mode changes completely between Beginner and the rest:

**Beginner — Teacher Mode**
Step-by-step instruction that waits for you. No timer, no pressure.

- Displays the current note with three view options:
  - **⇄ Horizontal** — classic 6-string ASCII tab, left to right, current note highlighted
  - **⇅ Vertical** — one note per row scrolling down, easier on phones
  - **◉ Big** — single large note display with string name, fret number, finger guidance, and a mini fretboard SVG diagram showing exactly where to place your finger
- **Plain text callout** always visible: *String 6 (E) · Fret 3 · Ring finger · Note G2*
- **🔊 Hear It** — plays the correct note via Web Audio so you know what to aim for
- **Count-in** — 3-2-1 click tick before each note (toggle on/off)
- **Speed slider** — 25% to 100%, reduces listening sensitivity at lower speeds
- Mic listens for your pitch, accepts any octave (capo-friendly), advances automatically on a correct match
- Skip button if you get stuck

**Easy / Medium / Hard — Guitar Hero Mode**
Falling note lanes with live mic pitch detection, score, streak multiplier, and accuracy tracking.

**Built-in Song Library:**

| Song | Difficulty |
|---|---|
| Smoke on the Water | Beginner+ |
| Seven Nation Army | Beginner+ |
| Ode to Joy (Single String) | Beginner+ |
| Come As You Are | Easy+ |
| Money for Nothing (Riff) | Easy+ |
| Enter Sandman (Riff) | Medium+ |
| Stairway to Heaven (Intro) | Medium+ |
| Eruption (Van Halen) | Hard |
| Comfortably Numb (Solo) | Hard |

Every song has full tab data — string number, fret, finger guidance, and a plain-English hint per note.

#### 🎵 Song Search

Search any song by artist and title (e.g. *Nirvana — Come as You Are*) and receive a complete lead sheet generated by Groq AI, cached locally after the first search.

Four result tabs:

- **Chords** — SVG fretboard diagrams for every chord in the song with finger numbers, barre indicators, and open/muted string markers
- **Lyrics** — full lead sheet format with chord names placed inline above the syllables they fall on
- **Strum** — visual D↓ U↑ ✕ mute pattern with beat labels, accent markers, and a playable rhythm click at the song's BPM
- **Tab** — ASCII tab for the main intro or riff

Also shows: key, capo position and explanation, BPM, time signature, difficulty rating, and playing tips. Results are permanently cached — the same song never calls the API twice.

#### 🥁 Metronome

- BPM range: 40–240
- Tap tempo — tap at least twice to set BPM (averages last 8 taps)
- Animated pendulum with a glowing bob
- Beat dots that pulse with accent/beat differentiation
- Time signatures: 4/4, 3/4, 6/8, 2/4
- Subdivisions: quarter notes, 8th notes, triplets
- Audible click with accent differentiation on beat 1

#### 🎼 Chord Dictionary

- Search any chord name — Am, G7, Cmaj7, Bb, F#m11, etc.
- Returns 2–4 voicings per chord with:
  - SVG fretboard diagram with finger numbers and barre indicators
  - Position name (Open, 5th fret, etc.)
  - Note names for each string
  - **🔊 Hear It** — arpeggiated strum via Web Audio
- Quick-access buttons for 14 common chords
- Results cached locally — no repeat API calls

#### 📋 Setlist Builder

- Create and name multiple setlists
- Add songs with title, key, and BPM
- Drag to reorder
- Gig notes panel (venue, set time, tuning changes, etc.)
- Estimated set length (4 min per song)
- Export setlist as a plain text file
- All setlists persist in localStorage

#### ⏱ Practice Timer

- Session timer with pause/resume
- Daily goal progress bar (15 min to 90 min, configurable)
- Log session with optional practice notes
- Persistent session log
- Stats: total hours, current day streak, average minutes per day

---

## AI & Data Architecture

### How AI is used

| Feature | Model | Called how often |
|---|---|---|
| Instrument profile | Groq (llama-3.3-70b) | Once per instrument, cached forever |
| Spec auto-fill | Groq (llama-3.3-70b) | On demand, result saved to instrument |
| Camera scan analysis | Groq Vision (Llama 4) | Each capture |
| Song search | Groq (llama-3.3-70b) | Once per unique search query, cached forever |
| Chord dictionary | Groq (llama-3.3-70b) | Once per chord, cached forever |

The app is deliberately conservative about AI calls. Every Groq result is saved to localStorage on first fetch and reused indefinitely — you will not burn through your free tier quota on repeat views.

### Model fallback

If `llama-3.3-70b-versatile` hits a rate limit, the app automatically retries with `llama-3.1-8b-instant`. The fallback model can also be set as the primary in Settings.

### Data storage

All data is stored in the browser's `localStorage` under these keys:

| Key | Contents |
|---|---|
| `unplugged_inventory` | Full instrument vault |
| `unplugged_api_key` | Groq API key |
| `unplugged_text_model` | Preferred AI model |
| `unplugged_view` | Grid/list/small view preference |
| `unplugged_laz` | Laz Mode unlock flag |
| `unplugged_song_cache` | Cached song search results |
| `unplugged_song_history` | Recent song searches |
| `unplugged_chord_cache` | Cached chord lookups |
| `unplugged_setlists` | All setlists |
| `unplugged_practice` | Practice session log |
| `unplugged_practice_goal` | Daily practice goal |

No data is ever sent to any server other than the Groq API (for AI features) and the image sources (Wikipedia, Wikimedia, Discogs) used to fetch instrument photos.

---

## Browser & Device Support

| Browser | Support |
|---|---|
| Chrome / Edge (desktop + Android) | Full — including PWA install, camera, audio |
| Safari (iOS 16.4+) | Full — including PWA install via Add to Home Screen |
| Firefox (desktop) | Full except PWA install prompt |
| Samsung Internet | Full |

**Camera features** require HTTPS and a device with a camera. The app handles all permission denial states gracefully with clear instructions.

**Audio features** (tuner, recorder, learn mode) require microphone permission and a browser that supports the Web Audio API — all modern browsers qualify.

---

## Groq API Free Tier

The free tier at [console.groq.com](https://console.groq.com) provides approximately:

- 500,000 tokens per day
- 6,000 tokens per minute
- No credit card required

A typical instrument profile uses ~800 tokens. A song search uses ~1,200 tokens. Given the local caching strategy, normal usage stays well within the free tier even for large collections.

---

## Development Notes

The entire application is a single self-contained HTML file with no build step, no npm, and no external framework dependencies. JavaScript is vanilla ES2020+. Styling uses CSS custom properties throughout for easy theming.

To modify the app, open `unplugged.html` in any text editor. The code is organized into clearly commented sections:

- `DATA STORE` — localStorage load/save
- `GROQ API` — grokText, grokVision wrappers with rate limit fallback
- `SCREENS` — navigation between vault, detail, import/export
- `RENDER INVENTORY` — card and list rendering
- `DETAIL VIEW` — instrument detail page
- `SERVICE/GIG/MODS PANELS` — the three tracking panels per instrument
- `AI DESCRIPTION` — profile fetch with caching
- `AUTO MANUFACTURER IMAGE` — 4-source real image pipeline
- `CAMERA / AI VISION SCAN` — camera modal and OCR flow
- `IMPORT / EXPORT` — xlsx/csv read and write
- `LAZ MODE` — unlock mechanic and all Laz panels
- `RECORDER` — MediaRecorder with level metering
- `TUNER` — autocorrelation pitch detection
- `LEARN TO PLAY` — teacher mode + hero game engine
- `SONG SEARCH` — Groq-powered lead sheet generator
- `METRONOME` — Web Audio click with tap tempo
- `CHORD DICTIONARY` — voicing lookup and diagram rendering
- `SETLIST BUILDER` — drag-and-drop setlist management
- `PRACTICE TIMER` — session tracking and streak logic

---

## License

Built for personal use. The Groq API integration is subject to [Groq's Terms of Service](https://groq.com/terms-of-service). Instrument photos fetched via Wikipedia and Wikimedia Commons are subject to their respective licenses (typically Creative Commons). Song tab and chord data is AI-generated and intended for personal learning use only.
