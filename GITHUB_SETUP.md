# Pusha till GitHub - Steg för steg

## Metod 1: Använd scriptet (Enklast)

1. **Skapa ett nytt repository på GitHub:**
   - Gå till https://github.com/new
   - Välj ett namn (t.ex. `jaktappen-pre-register`)
   - Välj Public eller Private
   - **VIKTIGT:** Klicka INTE på "Initialize with README"
   - Klicka "Create repository"

2. **Kopiera repository URL:en** (t.ex. `https://github.com/ditt-användarnamn/jaktappen-pre-register.git`)

3. **Kör scriptet:**
```bash
cd /Users/ocmac/pre-register-page
./push-to-github.sh https://github.com/ditt-användarnamn/jaktappen-pre-register.git
```

## Metod 2: Manuellt (Om scriptet inte fungerar)

1. **Skapa repository på GitHub** (samma som ovan)

2. **Kör dessa kommandon i terminalen:**
```bash
cd /Users/ocmac/pre-register-page

# Initiera git
git init

# Lägg till alla filer
git add .

# Skapa commit
git commit -m "Initial commit: Jaktappen pre-register page"

# Lägg till remote (ersätt med din URL)
git remote add origin https://github.com/ditt-användarnamn/jaktappen-pre-register.git

# Sätt main branch
git branch -M main

# Pusha till GitHub
git push -u origin main
```

## Efter push till GitHub

1. Gå till ditt repository på GitHub
2. Kopiera repository URL:en
3. Gå till [vercel.com](https://vercel.com)
4. Klicka "Add New Project"
5. Välj "Import Git Repository"
6. Välj ditt repository
7. Klicka "Deploy"

Vercel kommer automatiskt:
- Detektera att det är ett Node.js-projekt
- Använda `vercel.json` för konfiguration
- Deploya både frontend och API-endpointen

## Filer som pushas

✅ Alla projektfiler pushas
❌ `data/emails.json` pushas INTE (finns i .gitignore)
❌ `node_modules/` pushas INTE (finns i .gitignore)

