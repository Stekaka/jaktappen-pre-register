#!/bin/bash

# Script för att pusha projektet till GitHub

echo "🚀 Förbereder projektet för GitHub..."

# Initiera git repo
git init

# Lägg till alla filer
git add .

# Skapa första commit
git commit -m "Initial commit: Jaktappen pre-register page"

# Visa status
echo ""
echo "✅ Git repo initierat och filer committade!"
echo ""
echo "📝 Nästa steg:"
echo "1. Gå till https://github.com/new och skapa ett nytt repository"
echo "2. Kopiera repository URL:en"
echo "3. Kör dessa kommandon:"
echo ""
echo "   git remote add origin <DIN-REPO-URL>"
echo "   git branch -M main"
echo "   git push -u origin main"
echo ""
echo "Eller kör:"
echo "   ./push-to-github.sh <DIN-REPO-URL>"
echo ""

# Om URL anges som argument, pusha direkt
if [ ! -z "$1" ]; then
    echo "🔗 Lägger till remote origin..."
    git remote add origin $1
    git branch -M main
    echo "📤 Pushar till GitHub..."
    git push -u origin main
    echo ""
    echo "✅ Klart! Projektet är nu på GitHub!"
fi

