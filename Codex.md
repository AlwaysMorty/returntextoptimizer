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
- [ ] Projektstruktur anlegen
- [ ] GitHub-Repo initialisieren
- [ ] Umgebungsvariablen verwalten (.env)
- [ ] Supabase/PostgreSQL einrichten (Tabellen: users, products, returns, suggestions)

### PHASE 2 – API-Schnittstellen
- [ ] Shopify OAuth2-Flow einrichten
- [ ] Produkt- und Rückgabe-Daten via Shopify API abrufen
- [ ] WooCommerce REST-API integrieren (Fallback)
- [ ] API-Wrapper bauen (getProducts, getReturns, patchProduct)

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

