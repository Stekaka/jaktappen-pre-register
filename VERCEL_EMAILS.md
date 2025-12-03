# Hur du ser emails och page views på Vercel

På Vercel sparas emails och page views automatiskt i **Function Logs**. Du behöver INTE registrera dig eller koppla några APIs!

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

## Så här ser du page views (besökare):

1. Gå till ditt Vercel Dashboard: https://vercel.com/dashboard
2. Klicka på ditt projekt: **jaktappen-pre-register**
3. Gå till fliken **"Functions"**
4. Klicka på **"track"** funktionen
5. Klicka på **"Logs"** tabben
6. Där ser du alla page views som loggas med formatet:
   ```
   👁️ PAGE VIEW: {
     "timestamp": "2024-12-03T...",
     "ip": "xxx.xxx.xxx.xxx",
     "userAgent": "Mozilla/5.0...",
     "referer": "https://...",
     "url": "/api/track",
     "method": "GET"
   }
   ```

## Alternativ: Exportera logs

Du kan också exportera logs från Vercel Dashboard för att få alla emails och page views i en fil.

## Lokal utveckling

När du kör lokalt sparas emails i `data/emails.json` filen. Page views loggas till console.

