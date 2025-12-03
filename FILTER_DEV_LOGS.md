# Filtrera bort dina egna page views i Vercel Logs

## Snabbguide

För att markera dina egna besök och kunna filtrera bort dem:

### 1. Markera dina enheter

Lägg till `?dev=true` i URL:en när du besöker sidan:
```
https://jaktappen-pre-register.vercel.app/?dev=true
```

**Första gången:** Lägg till `?dev=true` i URL:en och besök sidan. Detta sparas automatiskt i din webbläsare.

**Framtida besök:** Du behöver inte lägga till `?dev=true` varje gång - det sparas i localStorage och används automatiskt.

### 2. Se dina loggar i Vercel

1. Gå till [Vercel Dashboard](https://vercel.com/dashboard)
2. Klicka på ditt projekt: **jaktappen-pre-register**
3. Gå till fliken **"Functions"**
4. Klicka på **"track"** funktionen
5. Klicka på **"Logs"** tabben

### 3. Filtrera bort dina egna besök

I Vercel Logs kan du filtrera på flera sätt:

#### Metod 1: Sök efter "PAGE VIEW" (exkludera DEV)
I sökfältet, skriv:
```
PAGE VIEW -DEV
```

Detta visar bara riktiga besökare, inte dina egna.

#### Metod 2: Sök efter "👁️" (exkludera "🔧")
I sökfältet, skriv:
```
👁️ -🔧
```

#### Metod 3: Filtrera på JSON-fält
Om Vercel stödjer JSON-filtering, sök efter:
```
"isDev": false
```

### 4. Återställ dev-markering

Om du vill återställa så att dina besök inte markeras som dev:

1. Öppna Developer Console (F12)
2. Kör: `localStorage.removeItem('dev-tracking')`
3. Eller besök sidan utan `?dev=true` i URL:en

## Hur det fungerar

- När du besöker sidan med `?dev=true` markeras dina page views med `🔧 [DEV] PAGE VIEW (FILTERA BORT):`
- Riktiga besökare får `👁️ PAGE VIEW:`
- Dev-sessions har `"isDev": true` i JSON-data
- Markeringen sparas i localStorage så du behöver inte lägga till `?dev=true` varje gång

## Exempel på loggar

**Dina egna besök (filtrera bort):**
```
🔧 [DEV] PAGE VIEW (FILTERA BORT): {
  "timestamp": "2024-12-04T...",
  "ip": "...",
  "isDev": true
}
```

**Riktiga besökare:**
```
👁️ PAGE VIEW: {
  "timestamp": "2024-12-04T...",
  "ip": "...",
  "isDev": false
}
```

