# Public Folder

Denna mapp är för statiska filer som bilder.

## Struktur

```
public/
  images/          # Ladda upp dina app-skärmar här
```

## Bildnamn

För att bilderna ska visas korrekt, använd dessa namn:

- **Centrala telefonen**: `phone-main.jpg` eller `phone-main.png`
- **Overflow-bild** (kommer ut ur skärmen): `phone-overflow.jpg` eller `phone-overflow.png`
- **Små telefoner** (valfritt):
  - `phone-1.jpg` - Övre vänster
  - `phone-2.jpg` - Nedre vänster
  - `phone-3.jpg` - Övre höger
  - `phone-4.jpg` - Nedre höger

## Användning

1. Ladda upp dina bilder i `public/images/` mappen
2. Uppdatera `index.html` med rätt sökvägar till bilderna
3. Bilderna kommer att vara tillgängliga på `http://localhost:8000/public/images/[bildnamn]`

## Bildformat

Stödda format: `.jpg`, `.jpeg`, `.png`, `.webp`, `.gif`, `.svg`

