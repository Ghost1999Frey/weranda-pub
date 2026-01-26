# Weranda - Deployment Guide

Tento projekt je statická webová aplikácia s admin panelom. Môžete ju nasadiť na ľubovoľný hosting.

## Rýchly Start - Railway (Odporúčané)

### 1. Príprava GitHub
```bash
# Projekt je už v GitHub (user_github remote)
# Stačí pushnutí zmien:
git push user_github main
```

### 2. Nasadenie na Railway
1. Prejdite na https://railway.app
2. Prihlaste sa cez GitHub
3. Kliknite "New Project" → "Deploy from GitHub"
4. Vyberte `weranda-pub` repo
5. Railway automaticky detekuje Node.js projekt
6. Nastavte environment variables (viď nižšie)
7. Kliknite "Deploy"

### 3. Environment Variables na Railway
V Railway Dashboard → Project Settings → Variables:

```
NODE_ENV=production
PORT=3000
```

**Hotovo!** Web bude dostupný na `xxx.up.railway.app`

---

## Alternatívne Hosting Riešenia

### Render.com
1. https://render.com → "New +" → "Web Service"
2. Prepojte GitHub repo
3. Nastavte Build Command: `pnpm build`
4. Start Command: `node dist/index.js`
5. Pridajte Environment Variables

### Vercel (iba frontend)
```bash
vercel deploy
```
Vercel automaticky deployuje React aplikáciu.

### DigitalOcean App Platform
1. Vytvorte App
2. Prepojte GitHub
3. Nastavte Build: `pnpm build`
4. Start: `node dist/index.js`

---

## Build & Test Lokálne

```bash
# Inštalácia závislostí
pnpm install

# Development
pnpm dev

# Production build
pnpm build

# Spustenie production verzie lokálne
NODE_ENV=production node dist/index.js
```

---

## Štruktúra Projektu

```
weranda-pub/
├── client/              # React frontend
│   ├── src/
│   │   ├── pages/      # Všetky stránky (Home, Menu, Gallery, atď)
│   │   ├── components/ # UI komponenty
│   │   └── lib/        # Utility funkcie
│   └── public/         # Statické súbory (favicon, atď)
├── server/             # Express backend
│   └── index.ts        # Server entry point
├── package.json        # Dependencies
└── vite.config.ts      # Vite konfigurácia
```

---

## Admin Panel

**URL:** `/admin-login`
**Heslo:** `weranda2024`

Admin panel umožňuje:
- Zmenu menu podľa dní v týždni
- Prezeranie všetkých formulárov (rezervácie, kontakty, podujatia)
- Správu statusov žiadostí

---

## Dáta

Všetky dáta sa ukladajú do **localStorage** prehliadača:
- Menu podľa dní
- Formuláre (rezervácie, kontakty, podujatia)
- Recenzie

**Poznámka:** Ak chcete databázu na hostingu, kontaktujte Manus support alebo upgradnite na full-stack verziu.

---

## Troubleshooting

### Web sa nenačítava
- Skontrolujte, či je `PORT` nastavená na `3000` (alebo ľubovoľný port)
- Skontrolujte logs na hostingu

### Admin panel nefunguje
- Vyčistite cache prehliadača (Ctrl+Shift+Delete)
- Skúste v incognito režime

### Zmeny sa neukladajú
- Dáta sa ukladajú do localStorage - musia byť povolené cookies
- Skúste iný prehliadač

---

## Ďalšie Kroky

1. **Vlastná doména** - Nakonfigurujte DNS na vašom registrátorovi
2. **SSL Certifikát** - Väčšina hostingov poskytuje zadarmo (Let's Encrypt)
3. **Email Notifikácie** - Prepojte formuláre s emailom (SendGrid, Mailgun)
4. **Databáza** - Upgrade na full-stack s MySQL/PostgreSQL

---

## Support

Ak máte otázky, kontaktujte Manus support na https://help.manus.im
