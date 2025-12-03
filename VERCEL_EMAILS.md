# Hur du ser emails på Vercel

På Vercel sparas emails automatiskt i **Function Logs**. Du behöver INTE registrera dig eller koppla några APIs!

## Så här ser du emails:

1. Gå till ditt Vercel Dashboard: https://vercel.com/dashboard
2. Klicka på ditt projekt: **jaktappen-pre-register**
3. Gå till fliken **"Functions"** (eller **"Deployments"** → klicka på senaste deploymenten)
4. Klicka på **"subscribe"** funktionen
5. Klicka på **"Logs"** tabben
6. Där ser du alla emails som loggas med formatet:
   ```
   📧 NEW EMAIL SUBSCRIPTION: {
     "email": "example@email.com",
     "timestamp": "2024-12-03T...",
     "source": "jaktappen-pre-register"
   }
   ```

## Alternativ: Exportera logs

Du kan också exportera logs från Vercel Dashboard för att få alla emails i en fil.

## Lokal utveckling

När du kör lokalt sparas emails i `data/emails.json` filen.

