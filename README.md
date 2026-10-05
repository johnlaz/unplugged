# UNPLUGGED — Instrument Vault

AI-powered musical instrument inventory, learning tools, and performance utilities — packaged as an offline-capable PWA.

| | URL |
|---|---|
| Landing page | https://johnlaz.github.io/unplugged/ |
| App | https://johnlaz.github.io/unplugged/app/ |

## Repo layout

```
unplugged/
├── index.html          # Landing page (root)
├── README.md           # This file
└── app/                # The PWA
    ├── index.html      # Entire application (single file)
    ├── manifest.json   # PWA manifest (start_url/scope = ./ → /unplugged/app/)
    ├── sw.js           # Service worker (scope /unplugged/app/)
    ├── README.md       # App documentation
    └── icons/
```

## Deploying

GitHub Pages → Settings → Pages → Deploy from branch `main`, folder `/ (root)`.

When changing anything in `app/`, bump `CACHE_NAME` in `app/sw.js` so installed copies pick up the update.
