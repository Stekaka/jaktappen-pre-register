# Filtrera bort dina egna page views och bots i Vercel Logs

## Snabbguide

För att enkelt se **RIKTIGA BESÖKARE** och filtrera bort:
- Dina egna besök (dev-sessions)
- Vercel screenshot-bots (`vercel-screenshot/1.0`)
- Andra automatiska bots och crawlers

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

#### Metod 1: Sök efter "RIKTIG BESÖKARE" (enklast!)
I sökfältet, skriv:
```
RIKTIG BESÖKARE
```

Detta visar **ENDAST** riktiga besökare - alla bots och dev-sessions filtreras bort automatiskt!

#### Metod 2: Sök efter "👁️" (exkludera bots och dev)
I sökfältet, skriv:
```
👁️ -🤖 -🔧
```

#### Metod 3: Exkludera specifika user-agents
För att filtrera bort Vercel screenshot och andra bots:
```
PAGE VIEW -vercel-screenshot -bot -crawler
```

#### Metod 4: Filtrera på JSON-fält
Om Vercel stödjer JSON-filtering, sök efter:
```
"isDev": false
```

### 4. Återställ dev-markering

Om du vill återställa så att dina besök inte markeras som dev:

1. Öppna Developer Console (F12)
2. Kör: `localStorage.removeItem('dev-tracking')`
3. Eller besök sidan utan `?dev=true` i URL:en

## Retroaktiv filtrering på IP-adress

Om du vill filtrera bort dina egna besök retroaktivt (innan dev-tracking implementerades):

### 1. Hitta dina IP-adresser

Dina IP-adresser loggas i varje page view. Hitta dem genom att:
1. Gå till Vercel Logs
2. Sök efter dina kända besök (t.ex. när du testade sidan)
3. Kopiera IP-adresserna från JSON-data

**Exempel:**
- Desktop IP: `123.45.67.89`
- Mobil IP: `98.76.54.32`

### 2. Filtrera i Vercel Logs

I Vercel Logs sökfältet, använd:

**Filtrera BORT dina IPs:**
```
PAGE VIEW -94.191.136.214 -94.234.70.246
```

**Eller filtrera på JSON:**
```
"ip": "94.191.136.214"
```

**OBS:** Mobil IP kan ändras om du byter nätverk (WiFi vs mobil data). Kontrollera loggarna regelbundet för att se om din mobil IP har ändrats.

### 3. Lägg till dina IPs som kända dev IPs (rekommenderat)

För att automatiskt markera dina IPs som dev i framtida besök:

1. Gå till Vercel Dashboard → ditt projekt → Settings → Environment Variables
2. Lägg till en ny variabel:
   - **Name:** `DEV_IPS`
   - **Value:** `94.191.136.214,94.234.70.246` (komma-separerade IPs)
   - **Environment:** Production, Preview, Development (välj alla)
3. Redeploy projektet

Nu markeras alla besök från dessa IPs automatiskt som dev, även utan `?dev=true`.

**Viktigt om mobil IP:**
- Om du använder WiFi kommer mobilen ofta ha samma IP som din router (94.191.136.214)
- Om du använder mobil data kommer IP:n att vara från din operatör (94.234.70.246)
- Mobil data IP kan ändras när du byter plats eller nätverk
- Om din mobil IP ändras, uppdatera `DEV_IPS` miljövariabeln med den nya IP:n

## Hur det fungerar

**Automatiskt filtrerade:**
- 🤖 **Bots** (inkl. `vercel-screenshot/1.0`) - markeras med `🤖 [BOT (FILTERA BORT)]`
- 🔧 **Dev-sessions** - dina egna besök med `?dev=true` eller kända IPs
- Alla har `"isDev": true` i JSON-data

**Riktiga besökare:**
- 👁️ **Riktiga besökare** - markeras med `👁️ PAGE VIEW (RIKTIG BESÖKARE):`
- Har `"isDev": false` i JSON-data

**Automatisk bot-detektering:**
Systemet identifierar automatiskt:
- `vercel-screenshot` (Vercel's screenshot-tjänst)
- `bot`, `crawler`, `spider` (sökmotorer och crawlers)
- `headless`, `monitoring`, `uptime`, `pingdom` (monitoring-tjänster)

**Dev-markering:**
- När du besöker sidan med `?dev=true` markeras dina page views
- Markeringen sparas i localStorage så du behöver inte lägga till `?dev=true` varje gång
- Om du sätter `DEV_IPS` miljövariabeln markeras dessa IPs automatiskt som dev

## Exempel på loggar

**Vercel screenshot bot (filtrera bort):**
```
🤖 [BOT (FILTERA BORT)] [bot]: {
  "timestamp": "2024-12-04T...",
  "userAgent": "vercel-screenshot/1.0",
  "isDev": true,
  "devReason": "bot"
}
```

**Dina egna besök (filtrera bort):**
```
🔧 [DEV (FILTERA BORT)] [query-param]: {
  "timestamp": "2024-12-04T...",
  "ip": "94.191.136.214",
  "isDev": true,
  "devReason": "query-param"
}
```

**Riktiga besökare (detta vill du se!):**
```
👁️ PAGE VIEW (RIKTIG BESÖKARE): {
  "timestamp": "2024-12-04T...",
  "ip": "123.45.67.89",
  "userAgent": "Mozilla/5.0...",
  "isDev": false,
  "devReason": null
}
```

## Snabbguide för att se RIKTIGA BESÖKARE

**I Vercel Logs, sök efter:**
```
RIKTIG BESÖKARE
```

Detta visar **ENDAST** riktiga besökare - alla bots, dev-sessions och automatiska besök filtreras bort!

