# Deployment Guide

## Vercel (Rekommenderat - Enklast)

### Metod 1: Via Vercel CLI

1. **Installera Vercel CLI:**
```bash
npm i -g vercel
```

2. **Logga in:**
```bash
vercel login
```

3. **Deploya:**
```bash
cd /Users/ocmac/pre-register-page
vercel
```

4. **Följ instruktionerna:**
   - Skriv "Y" för att länka till ett befintligt projekt eller skapa nytt
   - Välj scope (din organisation)
   - Bekräfta inställningar

5. **Produktionsdeploy:**
```bash
vercel --prod
```

### Metod 2: Via Vercel Dashboard (Enklast)

1. Gå till [vercel.com](https://vercel.com) och logga in
2. Klicka på "Add New Project"
3. Importera ditt Git-repo eller dra och släpp projektmappen
4. Vercel detekterar automatiskt inställningarna
5. Klicka "Deploy"

## GitHub Pages

1. **Pusha till GitHub:**
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin <din-github-repo-url>
git push -u origin main
```

2. **Aktivera GitHub Pages:**
   - Gå till ditt repo på GitHub
   - Settings → Pages
   - Välj "main" branch och "/root" folder
   - Klicka Save

**OBS:** GitHub Pages fungerar bara för statiska filer. API-endpointen kommer inte fungera. Du behöver använda Vercel eller liknande för backend-funktionalitet.

## Viktiga filer

- `vercel.json` - Vercel konfiguration
- `package.json` - Node.js projektkonfiguration
- `api/subscribe.js` - Serverless function för email-hantering
- `server.js` - Lokal utvecklingsserver

## Efter deployment

Efter att ha deployat till Vercel får du en URL som:
- `https://ditt-projekt.vercel.app`

Du kan också konfigurera en custom domain i Vercel dashboard.

## Email Storage

⚠️ **Viktigt:** På Vercel kan du inte spara filer permanent i filsystemet. För produktion bör du:
- Använda en databas (MongoDB, PostgreSQL, etc.)
- Eller använda en tjänst som Firebase, Supabase
- Eller integrera med en email-tjänst som SendGrid, Mailchimp

För nu fungerar det lokalt, men på Vercel kommer emails inte sparas permanent.

