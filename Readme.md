# Familie Müller - Familien-Website

Eine moderne, mehrsprachige Website mit individuellen Profilseiten für die Familie Müller.

## ✨ Neue Features

### 1. **Vollständige Namen auf Profilseiten**
Alle Profilseiten zeigen jetzt den vollständigen Namen mit Nachnamen:
- Elisabeth Müller
- Stefan Müller
- Rolf Müller
- Samret Müller
- Sky Müller

Die Nachnamen erscheinen auch in allen vCard-Downloads und QR-Codes.

### 2. **Automatische Browser-Spracherkennung** 🌍
Die Website erkennt automatisch die Sprache des Browsers und stellt die Inhalte entsprechend dar:
- **Deutsch** (de-DE, de-CH, de-AT, etc.) → Deutsche Inhalte
- **Thai** (th-TH) → Thailändische Inhalte
- **Standard** → Englische Inhalte

Die Sprache kann jederzeit manuell über die Sprachbuttons oben rechts geändert werden. Die Auswahl wird im Browser gespeichert und gilt für alle Seiten.

## 👨‍👩‍👧‍👦 Familienmitglieder

- **Elisabeth Müller** - Schweiz 🇨🇭
- **Stefan Müller** - Schweiz 🇨🇭 & Thailand 🇹🇭
- **Rolf Müller** - Schweiz 🇨🇭 & Thailand 🇹🇭
- **Samret Müller** - Thailand 🇹🇭
- **Sky Müller** - Thailand 🇹🇭 (mit Schnellkontakt-Funktion)

## 🌐 Unterstützte Sprachen

1. **Deutsch** 🇩🇪 - Vollständige Übersetzung
2. **English** 🇬🇧 - Complete translation
3. **ไทย** 🇹🇭 - การแปลที่สมบูรณ์

## 📱 Funktionen pro Profilseite

### Standard-Features (alle Seiten):
- ✅ **Automatische Spracherkennung** beim ersten Besuch
- ✅ **Manuelle Sprachwahl** über Buttons
- ✅ Vollständiger Name (Vor- und Nachname)
- ✅ Responsive Design (Desktop, Tablet, Smartphone)
- ✅ QR-Codes für einfaches Teilen
- ✅ vCard-Download für Kontakte
- ✅ Moderne, farbcodierte UI

### Elisabeth Müller:
- 🇨🇭 Schweizer Kontakte
- 2 QR-Codes (Link + vCard)
- 1 Download-Button

### Stefan & Rolf Müller:
- 🇨🇭 Schweizer Kontakte
- 🇹🇭 Thailändische Kontakte
- 3 QR-Codes (CH Link, TH Link, Kombinierte vCard)
- 3 Download-Buttons (Komplett, nur CH, nur TH)

### Samret Müller:
- 🇹🇭 Thailändische Kontakte
- 2 QR-Codes (Link + vCard)
- 1 Download-Button

### Sky Müller:
- 🇹🇭 Thailändische Kontakte
- ⚡ **Schnellkontakt-Bereich** mit direkten Call/Message-Buttons für:
  - Samret (Mama) 📞💬
  - Rolf (Papa) 📞💬
- 2 QR-Codes (Link + vCard)
- 1 Download-Button

## 🎨 Design

Jedes Familienmitglied hat eine individuelle Farbgebung:
- **Elisabeth**: Lila/Pink (Purple)
- **Stefan**: Blau/Indigo (Blue)
- **Rolf**: Grün (Green)
- **Samret**: Pink
- **Sky**: Cyan/Blau (Cyan)

## 🔧 Technische Details

### Verwendete Technologien:
- **Tailwind CSS** (via CDN) - Modernes UI-Framework
- **QRCode.js** - QR-Code Generierung
- **Vanilla JavaScript** - Keine externen Frameworks nötig

### Browser-Spracherkennung:
```javascript
function detectBrowserLanguage() {
    const browserLang = navigator.language || navigator.userLanguage;
    const langCode = browserLang.toLowerCase().split('-')[0];
    
    if (langCode === 'de') return 'de';
    if (langCode === 'th') return 'th';
    return 'en'; // Standard
}
```

### Speicherung:
- Die gewählte Sprache wird im `localStorage` gespeichert
- Funktioniert seitenübergreifend
- Bleibt nach Browserneustart erhalten

## 📝 Anpassungen vornehmen

### Kontaktdaten ändern:
1. Öffne die entsprechende HTML-Datei (z.B. `stefan.html`)
2. Suche nach den Telefonnummern, E-Mails oder Adressen
3. Ersetze die Platzhalter mit echten Daten
4. Speichere die Datei

**Wichtig:** Vergiss nicht, die Daten auch in den vCard-Bereichen zu ändern (JavaScript am Ende der Datei)!

### Standard-Sprache ändern:
Die Standard-Sprache für Browser, die weder Deutsch noch Thai sind, ist Englisch. Um dies zu ändern, passe die `detectBrowserLanguage()` Funktion an:

```javascript
// Statt 'en' kannst du 'de' oder 'th' als Standard setzen
return 'de'; // Deutsch als Standard
```

### Farben anpassen:
Die Farben können einfach durch Ändern der Tailwind CSS-Klassen angepasst werden:
- `purple` → Lila
- `blue` → Blau
- `green` → Grün
- `pink` → Pink
- `cyan` → Cyan

## 🚀 Installation & Nutzung

1. **Lokale Verwendung:**
   - Alle Dateien in einen Ordner legen
   - `index.html` im Browser öffnen
   - Fertig!

2. **Web-Hosting:**
   - Alle Dateien auf einen Webserver hochladen
   - QR-Codes mit der echten URL testen
   - Visitenkarten erstellen

## 📞 QR-Codes für Visitenkarten

Jede Profilseite generiert automatisch QR-Codes. Empfehlung:

**Für Elisabeth & Samret (nur ein Land):**
- Verwende den vCard-QR-Code (funktioniert offline!)

**Für Stefan & Rolf (zwei Länder):**
- Verwende den kombinierten vCard-QR-Code
- Oder je nach Zielgruppe den CH- oder TH-Link

**Für Sky:**
- vCard-QR-Code plus Hinweis auf Schnellkontakt-Feature

## 💡 Tipps

1. **Browser-Test:** Teste die automatische Spracherkennung in verschiedenen Browsern (Chrome, Firefox, Safari)
2. **Mobile Optimierung:** Alle Seiten sind für Smartphones optimiert
3. **QR-Code-Größe:** Für Visitenkarten mindestens 2x2 cm groß drucken
4. **Aktualisierung:** Ändere Kontaktdaten zentral, die QR-Codes passen sich automatisch an

## 🌟 Besonderheiten

### Automatische Spracherkennung
Die Sprache wird beim ersten Besuch automatisch erkannt. Beispiele:
- Browser in Deutsch (de-CH) → Seite wird auf Deutsch angezeigt
- Browser in Thai (th-TH) → Seite wird auf Thai angezeigt
- Browser in Englisch (en-US) → Seite wird auf Englisch angezeigt
- Browser in Französisch (fr-FR) → Seite wird auf Englisch (Standard) angezeigt

### Sprachspeicherung
Die einmal gewählte oder erkannte Sprache gilt für:
- ✅ Alle Seiten der Website
- ✅ Auch nach Browserneustart
- ✅ Kann jederzeit manuell geändert werden

### Sky's Schnellkontakt
Die Schnellkontakt-Funktion ermöglicht direktes Anrufen oder SMS schreiben an Mama und Papa mit nur einem Klick - perfekt für Notfälle!

## 📄 Dateien

- `index.html` - Hauptseite mit Übersicht aller Familienmitglieder
- `elisabeth.html` - Profilseite Elisabeth Müller
- `stefan.html` - Profilseite Stefan Müller
- `rolf.html` - Profilseite Rolf Müller
- `samret.html` - Profilseite Samret Müller
- `sky.html` - Profilseite Sky Müller
- `README.md` - Diese Dokumentation

## 🎯 Nächste Schritte

1. ✅ Echte Kontaktdaten einfügen
2. ✅ Website auf Hosting-Service hochladen
3. ✅ QR-Codes testen
4. ✅ Automatische Spracherkennung in verschiedenen Browsern testen
5. ✅ Visitenkarten mit QR-Codes erstellen

---

**Made with ❤️ for Familie Müller**
