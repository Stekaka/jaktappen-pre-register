# Snabb push till GitHub

Eftersom git-kommandona kräver Xcode-licens, kör dessa kommandon manuellt i din terminal:

```bash
cd /Users/ocmac/pre-register-page

# Initiera git (om inte redan gjort)
git init

# Lägg till alla filer
git add .

# Skapa commit
git commit -m "Initial commit: Jaktappen pre-register page"

# Sätt main branch
git branch -M main

# Lägg till remote (skapar repo automatiskt om det inte finns)
gh repo create jaktappen-pre-register --public --source=. --remote=origin --push

# Eller om repot redan finns:
git remote add origin https://github.com/Stekaka/jaktappen-pre-register.git
git push -u origin main
```

**Alternativt:** Använd Cursor's inbyggda Git-funktioner:
1. Öppna Source Control i Cursor (Cmd+Shift+G)
2. Klicka på "Initialize Repository" om det behövs
3. Stage alla filer
4. Skriv commit-meddelande: "Initial commit: Jaktappen pre-register page"
5. Commit
6. Klicka på "..." menyn → "Publish Branch"
7. Välj "Stekaka" som owner och skriv "jaktappen-pre-register" som repo-namn

