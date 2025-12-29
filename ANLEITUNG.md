# Anleitung: Daten bearbeiten

Diese Anleitung zeigt alle möglichen Varianten, wie du die Kontaktdaten der Familie Müller Website bearbeiten kannst.

## Inhaltsverzeichnis

1. [Kontaktdaten ändern](#kontaktdaten-ändern)
2. [Adressen verwalten](#adressen-verwalten)
3. [Farben anpassen](#farben-anpassen)
4. [Neue Person hinzufügen](#neue-person-hinzufügen)
5. [Übersetzungen ändern](#übersetzungen-ändern)
6. [Erweiterte Optionen](#erweiterte-optionen)

---

## Kontaktdaten ändern

### Telefonnummer ändern

**Datei:** `data/<person>.json` (z.B. `data/stefan.json`)

```json
{
  "countries": [
    {
      "code": "ch",
      "phone": "+41 76 519 99 70"  // ← Hier ändern
    }
  ]
}
```

### Email-Adresse ändern

**Datei:** `data/<person>.json`

```json
{
  "countries": [
    {
      "code": "ch",
      "email": "stefan@juroct.ch"  // ← Hier ändern
    }
  ]
}
```

**Kein Email:** Wenn jemand keine Email hat, setze `null`:

```json
{
  "email": null
}
```

### Name ändern

**Datei:** `data/<person>.json`

```json
{
  "fullName": "Stefan Müller",   // ← Vollständiger Name
  "firstName": "Stefan",          // ← Vorname
  "lastName": "Müller",           // ← Nachname
  "initial": "S"                  // ← Initial für Profilbild
}
```

---

## Adressen verwalten

### Variante 1: Standard-Adresse verwenden (Empfohlen)

**Vorteil:** Adresse nur an einer Stelle ändern, wird überall aktualisiert.

**Datei:** `data/<person>.json`

```json
{
  "address": "@shared/kaiseraugst"  // ← Referenz zur Standard-Adresse
}
```

**Verfügbare Standard-Adressen** (in `data/shared.json`):
- `@shared/kaiseraugst` - Rosenweg 9, 4303 Kaiseraugst, Schweiz
- `@shared/buriam` - 26/3 Moo 2, 31210 Buri Ram, Thailand

### Variante 2: Individuelle Adresse (Schweiz)

**Datei:** `data/<person>.json`

```json
{
  "address": {
    "street": "Hauptstrasse 123",
    "city": "Luzern",
    "postalCode": "6000",
    "country": "Schweiz"
  }
}
```

### Variante 3: Individuelle Adresse (Thailand mit District/Amphoe)

**Datei:** `data/<person>.json`

```json
{
  "address": {
    "street": "123 Moo 4",
    "district": "Tambon Beispiel",    // ← Optional: Tambon
    "amphoe": "Amphoe Mueang",        // ← Optional: Amphoe
    "city": "Chiang Mai",
    "postalCode": "50000",
    "country": "Thailand"
  }
}
```

### Neue Standard-Adresse hinzufügen

**Datei:** `data/shared.json`

```json
{
  "addresses": {
    "kaiseraugst": { ... },
    "buriam": { ... },
    "neustadt": {              // ← Neue Standard-Adresse
      "street": "Neue Strasse 1",
      "city": "Neustadt",
      "postalCode": "1234",
      "country": "Schweiz"
    }
  }
}
```

**Verwendung:** `"address": "@shared/neustadt"`

---

## Farben anpassen

### Farbschema einer Person ändern

**Datei:** `data/<person>.json`

```json
{
  "theme": {
    "colorDark": "#1e40af",           // ← Hauptfarbe (Hex-Code)
    "gradientFrom": "blue-400",       // ← Gradient Start (Tailwind)
    "gradientTo": "indigo-600",       // ← Gradient Ende (Tailwind)
    "bgGradient": "from-blue-50 to-indigo-100",  // ← Hintergrund
    "textColor": "blue-600",          // ← Textfarbe
    "buttonColor": "blue-600",        // ← Button-Farbe
    "buttonHover": "blue-700"         // ← Button Hover-Farbe
  }
}
```

### Verfügbare Tailwind-Farben

**Format:** `<farbe>-<intensität>`

**Farben:**
- `blue`, `indigo`, `purple`, `pink`, `red`, `orange`, `yellow`
- `green`, `emerald`, `teal`, `cyan`, `sky`, `violet`, `fuchsia`

**Intensitäten:** `50`, `100`, `200`, `300`, `400`, `500`, `600`, `700`, `800`, `900`

**Beispiel:**
```json
{
  "gradientFrom": "purple-400",
  "gradientTo": "pink-600"
}
```

### Hex-Farbcodes für colorDark

**Beispiele:**
- Blau: `#1e40af`
- Grün: `#059669`
- Lila: `#9333ea`
- Pink: `#db2777`
- Cyan: `#0891b2`

**Tool:** [https://tailwindcss.com/docs/customizing-colors](https://tailwindcss.com/docs/customizing-colors)

---

## Neue Person hinzufügen

### Schritt 1: JSON-Datei erstellen

**Datei:** `data/<neue-person>.json`

```json
{
  "id": "maria",                    // ← Eindeutige ID (kleinbuchstaben)
  "fullName": "Maria Müller",
  "firstName": "Maria",
  "lastName": "Müller",
  "initial": "M",
  "displayOrder": 6,                // ← Sortierung (1=erste Person)
  "theme": {
    "colorDark": "#059669",
    "gradientFrom": "green-400",
    "gradientTo": "emerald-600"
  },
  "countries": [
    {
      "code": "ch",
      "name": "Switzerland",
      "flag": "🇨🇭",
      "phone": "+41 79 123 45 67",
      "email": "maria@beispiel.ch",
      "address": "@shared/kaiseraugst"
    }
  ],
  "quickContacts": null             // ← Nur für Kinder (siehe unten)
}
```

### Schritt 2: Person zum Manifest hinzufügen

**Datei:** `js/data-loader.js`

```javascript
const PEOPLE_MANIFEST = ['elisabeth', 'stefan', 'rolf', 'samret', 'sky', 'maria'];
//                                                                          ↑ Neue Person
```

**Fertig!** Die neue Person erscheint automatisch auf der Website.

---

## Dual-Country Person (Schweiz + Thailand)

**Beispiel:** Person mit zwei Wohnsitzen

**Datei:** `data/<person>.json`

```json
{
  "id": "stefan",
  "fullName": "Stefan Müller",
  "countries": [
    {
      "code": "ch",              // ← Schweiz
      "name": "Switzerland",
      "flag": "🇨🇭",
      "phone": "+41 76 519 99 70",
      "email": "stefan@juroct.ch",
      "address": "@shared/kaiseraugst"
    },
    {
      "code": "th",              // ← Thailand
      "name": "Thailand",
      "flag": "🇹🇭",
      "phone": "+66 81 234 5678",
      "email": null,             // ← Kein separates Email für TH
      "address": {
        "street": "123 Moo 4",
        "city": "Chiang Mai",
        "postalCode": "50000",
        "country": "Thailand"
      }
    }
  ]
}
```

**Ergebnis:**
- 2 Telefonnummern (CH + TH)
- 1 Email-Adresse
- 2 Adressen
- 3 QR-Codes: CH Link, TH Link, vCard

---

## Quick Contacts (für Kinder)

**Beispiel:** Sky hat Quick-Links zu Mama und Papa

**Datei:** `data/sky.json`

```json
{
  "id": "sky",
  "fullName": "Sky Müller",
  "quickContacts": [
    {
      "label": "mama",           // ← Anzeigename (wird übersetzt)
      "name": "Samret",          // ← Name der Person
      "personId": "samret",      // ← ID für Link zu Profil
      "phone": "+66812345670"    // ← Telefonnummer für Direktanruf
    },
    {
      "label": "papa",
      "name": "Rolf",
      "personId": "rolf",
      "phone": "+66812345679"
    }
  ]
}
```

**Labels:** `mama`, `papa`, `oma`, `opa`, `bruder`, `schwester`

**Ergebnis:** Große Buttons zum Anrufen von Mama/Papa

---

## Übersetzungen ändern

**Datei:** `data/translations.json`

```json
{
  "de": {
    "title": "Familie Müller",          // ← Deutscher Text
    "view_contact": "Kontakt ansehen"
  },
  "en": {
    "title": "Müller Family",           // ← Englischer Text
    "view_contact": "View contact"
  },
  "th": {
    "title": "ครอบครัว มุลเลอร์",        // ← Thailändischer Text
    "view_contact": "ดูข้อมูลติดต่อ"
  }
}
```

### Neue Übersetzung hinzufügen

```json
{
  "de": {
    "new_text": "Neuer Text"
  },
  "en": {
    "new_text": "New text"
  },
  "th": {
    "new_text": "ข้อความใหม่"
  }
}
```

**HTML verwenden:**

```html
<span data-i18n="new_text">Neuer Text</span>
```

---

## Erweiterte Optionen

### Person ohne Adresse

```json
{
  "countries": [
    {
      "code": "ch",
      "phone": "+41 79 123 45 67",
      "email": "person@beispiel.ch",
      "address": null              // ← Keine Adresse
    }
  ]
}
```

### Person ohne Email

```json
{
  "countries": [
    {
      "code": "th",
      "phone": "+66 81 234 5678",
      "email": null,               // ← Kein Email
      "address": "@shared/buriam"
    }
  ]
}
```

### Sortierung ändern

**Datei:** `data/<person>.json`

```json
{
  "displayOrder": 1              // ← 1 = zuerst, 10 = zuletzt
}
```

**Beispiel-Reihenfolge:**
1. Elisabeth (displayOrder: 1)
2. Stefan (displayOrder: 2)
3. Rolf (displayOrder: 3)
4. Samret (displayOrder: 4)
5. Sky (displayOrder: 5)

---

## Häufige Aufgaben

### ✅ Telefonnummer ändern
1. Öffne `data/<person>.json`
2. Suche nach `"phone"`
3. Ändere die Nummer
4. Speichern & Browser aktualisieren

### ✅ Adresse ändern (für alle mit gleicher Adresse)
1. Öffne `data/shared.json`
2. Finde die Adresse (z.B. `kaiseraugst`)
3. Ändere die Werte
4. Speichern & Browser aktualisieren
5. **Automatisch aktualisiert für:** Elisabeth, Stefan, Rolf

### ✅ Farbe einer Person ändern
1. Öffne `data/<person>.json`
2. Suche nach `"theme"`
3. Ändere `gradientFrom` und `gradientTo`
4. Speichern & Browser aktualisieren

### ✅ Email hinzufügen/entfernen
- **Hinzufügen:** `"email": "person@beispiel.ch"`
- **Entfernen:** `"email": null`

---

## Datei-Übersicht

```
mueller/
├── data/
│   ├── elisabeth.json      # Elisabeth's Daten
│   ├── stefan.json         # Stefan's Daten
│   ├── rolf.json           # Rolf's Daten
│   ├── samret.json         # Samret's Daten
│   ├── sky.json            # Sky's Daten
│   ├── shared.json         # Gemeinsame Adressen
│   └── translations.json   # Übersetzungen (DE/EN/TH)
└── js/
    ├── data-loader.js      # PEOPLE_MANIFEST hier editieren
    └── ...
```

---

## Wichtige Hinweise

⚠️ **JSON-Syntax beachten:**
- Kommas zwischen Einträgen (aber NICHT nach dem letzten)
- Anführungszeichen für Strings: `"text"`
- Keine Kommentare erlaubt (// funktioniert nicht in JSON)
- Online-Validator: [jsonlint.com](https://jsonlint.com)

⚠️ **Nach Änderungen:**
- Datei speichern
- Browser aktualisieren (F5 oder Cmd+R)
- Bei Fehlern: Browser-Konsole öffnen (F12)

⚠️ **Telefonnummern:**
- Format: `+41 79 123 45 67` (mit Leerzeichen OK)
- Internationale Vorwahl erforderlich
- Schweiz: `+41`
- Thailand: `+66`

---

## Beispiel-Szenarien

### Szenario 1: Familie zieht um (neue CH-Adresse)

1. Öffne `data/shared.json`
2. Ändere `kaiseraugst` Adresse:
   ```json
   "kaiseraugst": {
     "street": "Neue Strasse 456",
     "city": "Basel",
     "postalCode": "4000",
     "country": "Schweiz"
   }
   ```
3. **Automatisch aktualisiert:** Elisabeth, Stefan, Rolf

### Szenario 2: Neue Telefonnummer für Rolf (nur TH)

1. Öffne `data/rolf.json`
2. Finde Thailand-Eintrag (`"code": "th"`)
3. Ändere `"phone": "+66 99 149 28 68"`
4. Speichern

### Szenario 3: Neue Person "Max" hinzufügen

1. Erstelle `data/max.json` (kopiere von `stefan.json`)
2. Ändere alle Werte für Max
3. Öffne `js/data-loader.js`
4. Füge `'max'` zum `PEOPLE_MANIFEST` hinzu
5. Fertig!

---

## Support & Debugging

**Fehler finden:**
1. Browser öffnen
2. F12 drücken (Developer Tools)
3. "Console" Tab öffnen
4. Fehlermeldungen lesen

**Häufige Fehler:**
- ❌ `Unexpected token` → JSON-Syntax-Fehler (Komma vergessen/zu viel)
- ❌ `Failed to load person` → Dateiname falsch oder nicht im Manifest
- ❌ `Shared address not found` → Adress-Referenz existiert nicht in shared.json

**Hilfe benötigt?**
- GitHub Issues: [mueller/issues](https://github.com/stefan-ffr/mueller/issues)
- JSON-Validator: [jsonlint.com](https://jsonlint.com)
