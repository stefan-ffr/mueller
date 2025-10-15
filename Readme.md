# Familie Müller - Website Anleitung

## 📋 Übersicht

Diese mehrsprachige Website (Deutsch, English, ไทย) für die **Familie Müller** enthält eine Hauptseite mit Verlinkungen zu individuellen Profilseiten für jedes Familienmitglied (alphabetisch sortiert):

- **Elisabeth** - elisabeth.html (nur Schweiz 🇨🇭)
- **Rolf** - rolf.html (Schweiz 🇨🇭 + Thailand 🇹🇭)
- **Samret** - samret.html (nur Thailand 🇹🇭)
- **Sky** - sky.html (nur Thailand 🇹🇭 + Schnellkontakt zu Eltern)
- **Stefan** - stefan.html (Schweiz 🇨🇭 + Thailand 🇹🇭)

## 🌍 Mehrsprachigkeit

Alle Seiten sind in **drei Sprachen** verfügbar:
- 🇩🇪 Deutsch
- 🇬🇧 English
- 🇹🇭 ไทย (Thai)

**Standardsprachen pro Person:**
- Elisabeth & Stefan: Deutsch
- Rolf: English
- Samret & Sky: ไทย (Thai)

Die Sprachwahl wird automatisch gespeichert und gilt für alle Seiten.

## 🚀 Erste Schritte

### 1. Kontaktinformationen aktualisieren

**Elisabeth (nur Schweiz):**
- Telefon: `+41 00 000 00 00`
- E-Mail: `elisabeth@example.ch`
- Adresse: `Musterstraße 123, 8000 Zürich`

**Stefan (Schweiz + Thailand):**
- Schweiz: `+41 00 000 00 00` / `stefan@example.ch`
- Thailand: `+66 00 000 0000` / `stefan@example.th`

**Rolf (Schweiz + Thailand):**
- Schweiz: `+41 00 000 00 00` / `rolf@example.ch`
- Thailand: `+66 00 000 0000` / `rolf@example.th`

**Samret (nur Thailand):**
- Telefon: `+66 00 000 0000`
- E-Mail: `samret@example.th`
- Adresse: `123 Moo 1, Bangkok 10100`

**Sky (nur Thailand):**
- Telefon: `+66 00 000 0000`
- E-Mail: `sky@example.th`
- Adresse: `123 Moo 1, Bangkok 10100`
- **WICHTIG:** Aktualisiere auch die Telefonnummern für die Großeltern (Samret und Rolf) in der "Schnellkontakt"-Sektion!

### 2. Website hochladen

Lade alle HTML-Dateien auf einen Webserver oder Webhosting-Service hoch:

**Empfohlene kostenlose Hosting-Optionen:**
- **GitHub Pages**: Kostenlos für öffentliche Repositories
- **Netlify**: Einfaches Drag & Drop Interface
- **Vercel**: Schnelle Bereitstellung
- **Cloudflare Pages**: Kostenloses Hosting mit SSL

### 3. QR-Codes für Visitenkarten

**Elisabeth (2 QR-Codes):**
- QR 1: 🔗 Link zur Webseite
- QR 2: 📇 vCard (nur Schweiz Kontakte)

**Stefan & Rolf (3 QR-Codes jeweils):**
- QR 1: 🇨🇭 Link zur Seite (Schweiz)
- QR 2: 🇹🇭 Link zur Seite (Thailand)
- QR 3: 📇 Kombinierte vCard (beide Länder)

**Samret & Sky (2 QR-Codes jeweils):**
- QR 1: 🔗 Link zur Webseite
- QR 2: 📇 vCard (nur Thailand Kontakte)

**Nach dem Hochladen:**
1. Besuche die jeweilige Profilseite im Browser
2. Alle QR-Codes werden automatisch generiert
3. Mache Screenshots der gewünschten QR-Codes
4. Füge die QR-Codes zu den Visitenkarten hinzu

**QR-Code 3 (bei Stefan & Rolf)** ist besonders praktisch, da er alle Kontaktdaten direkt enthält und ohne Internetverbindung funktioniert!

## 📱 Funktionen

### Hauptseite (index.html):
- **Sprachwahl**: Deutsch, English, Thai
- Links zu allen Familienmitgliedern
- Alphabetische Sortierung

### Profilseiten - Allgemein:
- **Sprachwahl**: Jede Seite hat ihre eigene Sprachwahl
- **Standardsprache**: Wird automatisch gesetzt
- **Responsive Design**: Funktioniert auf Desktop, Tablet und Smartphone
- **Moderne UI**: Mit Tailwind CSS gestaltet

### Elisabeth (elisabeth.html):
- 🇨🇭 Nur Schweizer Kontakte
- 2 QR-Codes (Link + vCard)
- 1 Download-Button

### Stefan & Rolf:
- 🇨🇭 Schweizer Kontakte
- 🇹🇭 Thailändische Kontakte
- 3 QR-Codes (CH Link, TH Link, Kombinierte vCard)
- 3 Download-Buttons (Komplett, nur CH, nur TH)

### Samret (samret.html):
- 🇹🇭 Nur thailändische Kontakte
- 2 QR-Codes (Link + vCard)
- 1 Download-Button

### Sky (sky.html):
- 🇹🇭 Nur thailändische Kontakte
- **SPEZIAL: Schnellkontakt-Bereich** mit direkten Call/Message-Buttons für:
  - Samret (Oma / ยาย) 📞💬
  - Rolf (Opa / ตา) 📞💬
- 2 QR-Codes (Link + vCard)
- 1 Download-Button

## 🎨 Design-Anpassungen

Jede Person hat eine individuelle Farbgebung:

- Elisabeth: Lila (Purple)
- Rolf: Grün (Green)
- Samret: Pink
- Sky: Cyan
- Stefan: Blau (Blue)

Die Farben können in den HTML-Dateien angepasst werden, indem die Tailwind CSS-Klassen geändert werden.

## 🔧 Technische Details

- **Framework**: Tailwind CSS (über CDN)
- **QR-Code**: QRCode.js Library
- **Mehrsprachigkeit**: JavaScript mit localStorage
- **Keine Server-Logik**: Rein statische HTML-Dateien
- **Browser-Kompatibilität**: Alle modernen Browser

## 📝 Nächste Schritte

1. ✅ Kontaktinformationen in allen HTML-Dateien aktualisieren
2. ✅ **Bei Sky:** Telefonnummern für die Großeltern (Samret und Rolf) im Schnellkontakt-Bereich aktualisieren
3. ✅ Website auf einen Hosting-Service hochladen
4. ✅ URLs testen
5. ✅ Standardsprachen testen (jede Person sollte ihre eigene Standardsprache haben)
6. ✅ Gewünschte QR-Codes für Visitenkarten auswählen und ausdrucken
7. ✅ Regelmäßig Kontaktdaten aktualisieren, falls nötig

## 💡 Zusätzliche Ideen

- Füge Profilfotos hinzu
- Ergänze Social Media Links (LINE, Facebook, Instagram, etc.)
- Füge eine kurze Biografie hinzu
- Erstelle eine gemeinsame Familien-Galerie
- Füge WhatsApp/LINE Links hinzu

## 🌟 Besondere Features

### Sky's Schnellkontakt
Die Seite von Sky enthält einen speziellen **Schnellkontakt-Bereich** oben, der es ermöglicht, die Großeltern (Samret und Rolf) direkt anzurufen oder eine SMS zu schicken. Perfekt für Notfälle oder schnelle Kommunikation!

- **Deutsch**: Oma & Opa
- **English**: Grandma & Grandpa  
- **ไทย Thai**: ยาย (Yai) & ตา (Ta)

### Automatische Sprachwahl
Die gewählte Sprache wird im Browser gespeichert und gilt für alle Seiten. Jede Person hat ihre eigene Standardsprache:
- **Deutsch**: Elisabeth, Stefan
- **English**: Rolf
- **ไทย (Thai)**: Samret, Sky

### Flexible Kontakte
- **Elisabeth**: Nur Schweiz (lebt hauptsächlich in der Schweiz)
- **Stefan & Rolf**: Beide Länder (pendeln zwischen Schweiz und Thailand)
- **Samret & Sky**: Nur Thailand (leben in Thailand)

Viel Erfolg mit eurer mehrsprachigen Website für die Familie Müller! 🎉

---

## 👨‍👩‍👧‍👦 Familie Müller

**Alle vCard-Daten und die Website enthalten jetzt den Familiennamen "Müller":**
- Elisabeth Müller
- Rolf Müller
- Samret Müller  
- Sky Müller
- Stefan Müller
