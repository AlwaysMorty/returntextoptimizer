# Codex Agent Aufgaben – ReturnTextOptimizer
📅 Stand: 2025-07-25

Dies ist eine strukturierte Aufgabenliste für die Umsetzung des E-Commerce-Plugins „ReturnTextOptimizer“ mit Unterstützung durch den Codex-Agenten.

---

## ✅ Projektziel
Ein Plugin für Shopify/WooCommerce, das mithilfe von GPT Rücksendetexte analysiert und daraus Vorschläge für verbesserte Produktbeschreibungen generiert.

---

## 🧱 Projektstruktur (zu erstellen)
- Node.js + Express (alternativ: FastAPI)
- PostgreSQL oder Supabase
- Frontend: React oder SvelteKit
- Deployment auf Railway oder Vercel

---


## 🎯 Erstes Ziel
Eine lokal ausführbare MVP-Version, die:
    Produkt- und Retourendaten aus Beispieldateien lädt
    Freitext-Retourengründe per GPT analysiert (über Dummy-GPT-Wrapper)
    Rückgaben strukturiert und Handlungsempfehlungen ausgibt

---

## 🧠 GPT-Integration
Verwende vorerst gpt-3.5-turbo über Platzhalter-Wrapper
Die Analyse soll:
    Kategorie des Problems erkennen (z. B. „Größe“, „Material“)
    Verbesserungsvorschläge für Produkttext oder Beschreibung liefern

---

## 📘 Hinweis zur Kommunikation
Wenn du Meilensteine erreichst, dokumentiere sie im Projekt (README, Code-Kommentare) und gib mir hier kurz Bescheid.
Arbeite möglichst modular, kommentiert und verständlich.

---

## 🗂️ Aufgabenliste

### PHASE 1 – Setup
- [ ] Erstelle index.js oder app.js mit Express-Server
- [ ] Richte Umgebungsvariablen (dotenv) und ein einfaches Logging ein
- [ ] Lade lokale Testdaten aus products.json und returns.csv
- [ ] Lege Datei- oder DB-Schema-Strukturen an

### PHASE 2 – API-Schnittstellen
- [ ] Erstelle Platzhalterfunktionen für Shopify & WooCommerce (z. B. importProducts() in shopify.js)
- [ ] Keine echten API-Keys erforderlich – verwende Dummy-Rückgaben
- [ ] WooCommerce REST-API integrieren (Fallback)
- [ ] Dokumentiere geplante Endpunkte in api/

### PHASE 3 – GPT-Logik
- [ ] Freitextanalyse von Rücksendungen per GPT (z. B. „zu eng“, „Material zu dünn“)
- [ ] Clustering von Retourengründen je Produkt
- [ ] Textvorschläge generieren (Prompt-Templates)
- [ ] Feedbackverarbeitung (Annahme/Ablehnung)

### PHASE 4 – Admin-Dashboard (UI)
- [ ] Login + Session-Handling
- [ ] Produktliste mit Rücksendequote darstellen
- [ ] Vorschlagsdialog: Original + GPT-Vorschlag + „Annehmen/Ablehnen“-Buttons
- [ ] Änderungslog mit Verlauf pro Produkt
- [ ] Settings-Ansicht (API-Key, Sprache, etc.)

### PHASE 5 – Persistenz & Verarbeitung
- [ ] Rücksendeanalyse + GPT-Ergebnisse in DB speichern
- [ ] Button zum Aktualisieren der Produktbeschreibung (PATCH)
- [ ] Scheduler für automatische Analyse (täglich/wöchentlich)

### PHASE 6 – Tests & Validierung
- [ ] API-Tests mit Testdaten
- [ ] GPT-Tests mit typischen Retourentexten
- [ ] Fallbacks und Fehlerbehandlung
- [ ] DSGVO-Prüfung (keine Kundendaten speichern)

### PHASE 7 – Deployment & Veröffentlichung
- [ ] Backend und UI deployen (Railway, Vercel o. ä.)
- [ ] Plugin für Shopify & WooCommerce verpacken
- [ ] Dokumentation schreiben (README + Setup Guide)

---

## 🧠 Hinweise für Codex
- Nutze `fetch()` oder `axios` für API-Aufrufe
- Verwende klare GPT-Prompts mit Beispielen für Rücksendetexte
- Generiere UI-Komponenten möglichst modular
- Achte auf niedrige OpenAI-Kosten (gpt-3.5 für Analyse, gpt-4 nur bei Bedarf)

---

