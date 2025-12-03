# Page View Tracking - Snabb Guide

## Steg 1: Skapa API-endpoint

Skapa filen `api/track.js` (eller `api/track.ts` för TypeScript):

```javascript
module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const data = {
    timestamp: new Date().toISOString(),
    ip: req.headers['x-forwarded-for'] || 'Unknown',
    userAgent: req.headers['user-agent'] || 'Unknown',
    referer: req.headers['referer'] || 'Direct',
    url: req.url
  };

  console.log('👁️ PAGE VIEW:', JSON.stringify(data, null, 2));
  
  res.status(200).json({ success: true });
};
```

## Steg 2: Anropa från frontend

Lägg till i din JavaScript-fil (eller i `<script>` taggen):

```javascript
// Track page view när sidan laddas
document.addEventListener('DOMContentLoaded', function() {
  fetch('/api/track', { method: 'GET' })
    .catch(() => {}); // Ignorera fel
});
```

## Steg 3: Se logs i Vercel

1. Vercel Dashboard → Ditt projekt
2. Functions → `track` → Logs
3. Se alla page views där!

## Klart! 🎉

Ingen registrering eller API-nycklar behövs. Allt loggas automatiskt i Vercel Function Logs.

