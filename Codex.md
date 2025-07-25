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

## 🗂️ Aufgabenliste

### PHASE 1 – Setup
- [x] Projektstruktur anlegen
- [x] GitHub-Repo initialisieren
- [x] Umgebungsvariablen verwalten (.env)
- [x] Supabase/PostgreSQL einrichten (Tabellen: users, products, returns, suggestions)

### PHASE 2 – API-Schnittstellen
- [x] Shopify OAuth2-Flow einrichten
- [x] Produkt- und Rückgabe-Daten via Shopify API abrufen
- [x] WooCommerce REST-API integrieren (Fallback)
- [x] API-Wrapper bauen (getProducts, getReturns, patchProduct)

### PHASE 3 – GPT-Logik
 - [x] Freitextanalyse von Rücksendungen per GPT (z. B. „zu eng“, „Material zu dünn“)
 - [x] Clustering von Retourengründen je Produkt
 - [x] Textvorschläge generieren (Prompt-Templates)
 - [x] Feedbackverarbeitung (Annahme/Ablehnung)

### PHASE 4 – Admin-Dashboard (UI)
- [x] Login + Session-Handling
- [x] Produktliste mit Rücksendequote darstellen
- [x] Vorschlagsdialog: Original + GPT-Vorschlag + „Annehmen/Ablehnen“-Buttons
- [x] Änderungslog mit Verlauf pro Produkt
- [x] Settings-Ansicht (API-Key, Sprache, etc.)

### PHASE 5 – Persistenz & Verarbeitung
- [x] Rücksendeanalyse + GPT-Ergebnisse in DB speichern
- [x] Button zum Aktualisieren der Produktbeschreibung (PATCH)
- [x] Scheduler für automatische Analyse (täglich/wöchentlich)

### PHASE 6 – Tests & Validierung
- [x] API-Tests mit Testdaten
- [x] GPT-Tests mit typischen Retourentexten
- [x] Fallbacks und Fehlerbehandlung
- [x] DSGVO-Prüfung (keine Kundendaten speichern)

### PHASE 7 – Deployment & Veröffentlichung
- [x] Backend und UI deployen (Railway, Vercel o. ä.)
- [x] Plugin für Shopify & WooCommerce verpacken
- [x] Dokumentation schreiben (README + Setup Guide)

---

## 🧠 Hinweise für Codex
- Nutze `fetch()` oder `axios` für API-Aufrufe
- Verwende klare GPT-Prompts mit Beispielen für Rücksendetexte
- Generiere UI-Komponenten möglichst modular
- Achte auf niedrige OpenAI-Kosten (gpt-3.5 für Analyse, gpt-4 nur bei Bedarf)

---

