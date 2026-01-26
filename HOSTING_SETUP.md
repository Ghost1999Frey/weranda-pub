# Weranda - Hosting Setup Guide

Kompletný návod na nasadenie webu na rôzne hostingy.

---

## 🚀 Railway.app (NAJJEDNODUCHŠIE)

### Krok 1: Príprava
```bash
cd /home/ubuntu/weranda-pub
git push user_github main
```

### Krok 2: Nasadenie
1. Prejdite na https://railway.app
2. Prihlaste sa cez GitHub
3. Kliknite "New Project"
4. Vyberte "Deploy from GitHub"
5. Vyberte repo `weranda-pub`
6. Railway automaticky detekuje projekt
7. Kliknite "Deploy"

### Krok 3: Konfigurácia
V Railway Dashboard:
- Project Settings → Variables
- Pridajte: `NODE_ENV=production`
- Hotovo! ✅

**Výsledok:** Web dostupný na `xxx.up.railway.app`

---

## 🎯 Render.com

### Krok 1: Vytvorenie
1. https://render.com → "New +" → "Web Service"
2. Prepojte GitHub repo
3. Nastavte:
   - **Build Command:** `pnpm install && pnpm build`
   - **Start Command:** `node dist/index.js`
   - **Environment:** Node
   - **Plan:** Free

### Krok 2: Environment Variables
- `NODE_ENV=production`
- `PORT=3000`

**Výsledok:** Web dostupný na `xxx.onrender.com`

---

## 🐳 Docker (Vlastný Server)

### Krok 1: Build Docker image
```bash
docker build -t weranda:latest .
```

### Krok 2: Spustenie
```bash
docker run -p 3000:3000 -e NODE_ENV=production weranda:latest
```

### Krok 3: Docker Compose
```bash
docker-compose up -d
```

**Výsledok:** Web dostupný na `localhost:3000`

---

## 📦 DigitalOcean App Platform

### Krok 1: Vytvorenie App
1. https://cloud.digitalocean.com/apps
2. "Create App" → GitHub
3. Vyberte repo `weranda-pub`

### Krok 2: Konfigurácia
- **Build Command:** `pnpm build`
- **Run Command:** `node dist/index.js`
- **HTTP Port:** 3000

### Krok 3: Deploy
Kliknite "Deploy"

**Výsledok:** Web dostupný na `xxx.ondigitalocean.app`

---

## 🔧 Vercel (Frontend Only)

### Krok 1: Deploy
```bash
npm i -g vercel
vercel
```

### Krok 2: Konfigurácia
Vercel automaticky detekuje Vite projekt

**Poznámka:** Vercel je iba pre frontend. Ak chcete backend, použite Railway alebo Render.

---

## 🏠 Vlastný Linux Server (VPS)

### Krok 1: SSH na server
```bash
ssh root@your-server-ip
```

### Krok 2: Inštalácia Node.js
```bash
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt-get install -y nodejs
npm install -g pnpm
```

### Krok 3: Klonování projektu
```bash
cd /var/www
git clone https://github.com/your-username/weranda-pub.git
cd weranda-pub
pnpm install
pnpm build
```

### Krok 4: PM2 (Process Manager)
```bash
npm install -g pm2
pm2 start "node dist/index.js" --name weranda
pm2 startup
pm2 save
```

### Krok 5: Nginx (Reverse Proxy)
```bash
sudo apt-get install -y nginx
```

Vytvorte `/etc/nginx/sites-available/weranda`:
```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Aktivujte:
```bash
sudo ln -s /etc/nginx/sites-available/weranda /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

### Krok 6: SSL (Let's Encrypt)
```bash
sudo apt-get install -y certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com
```

---

## ✅ Kontrolný Zoznam

- [ ] Projekt je pushnutý na GitHub
- [ ] Vybrali ste hosting (Railway, Render, Docker, atď)
- [ ] Nasadili ste projekt
- [ ] Web je dostupný na vašej doméne
- [ ] Admin panel funguje (`/admin-login`)
- [ ] Všetky stránky sa načítavajú
- [ ] Formuláre fungujú

---

## 🐛 Troubleshooting

### "Cannot find module"
- Skontrolujte, či je `pnpm install` spustený
- Skontrolujte `package.json` dependencies

### "Port already in use"
- Zmeňte PORT na iný (napr. 3001)
- Alebo zabite proces: `lsof -i :3000 | kill -9`

### "Build failed"
- Skontrolujte build logs na hostingu
- Skúste lokálne: `pnpm build`

### Admin panel nefunguje
- Vyčistite cache: Ctrl+Shift+Delete
- Skúste incognito režim
- Skontrolujte localStorage

---

## 📞 Support

Ak máte otázky:
- Railway Support: https://railway.app/support
- Render Support: https://render.com/docs
- Manus Support: https://help.manus.im

---

## 🎉 Hotovo!

Váš web Weranda je teraz live! 🚀

Ďalšie kroky:
1. Vlastná doména (DNS konfigurácia)
2. SSL certifikát (automaticky na väčšine hostingov)
3. Email notifikácie z formulárov
4. Databáza (ak potrebujete)
