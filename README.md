# ReturnTextOptimizer

**ReturnTextOptimizer** ist ein intelligentes E-Commerce-Plugin für Shopify und WooCommerce, das mithilfe von GPT Rücksendegründe analysiert und automatisch bessere Produktbeschreibungen vorschlägt – zur Reduktion von Retouren und Steigerung der Kundenzufriedenheit.

---

## 🚀 Funktionsübersicht

- Analyse von Rücksendungen (Freitext oder API)
- Kategorisierung und Clustering von Retourengründen je Produkt
- GPT-generierte Textvorschläge zur Beschreibungskorrektur
- Webinterface für Shopbetreiber: Vorschauen, Entscheidungen, Historie
- Einfaches Admin-Dashboard mit Login und Session-Handling
- Produktliste mit Rücksendequote
- Dialog zur Annahme oder Ablehnung von GPT-Vorschlägen
- Änderungslog und Settings-Ansicht
- Direkte Integration in Shopify/WooCommerce via API
- Aktualisierung der Produktbeschreibung via patchProduct
- Automatische Speicherung von Analyseergebnissen in der Datenbank
- Scheduler führt täglich eine Analyse aller Produkte durch
- Einfacher OAuth2-Flow für Shopify (Placeholder)
- Feedback-API zum Annehmen oder Ablehnen von Vorschlägen
- DSGVO-konform und API-sparsam
- Speichert keinerlei personenbezogene Kundendaten

---

## ⚙️ Technologien

- **Backend:** Node.js + Express (alternativ: FastAPI)
- **Frontend:** SvelteKit oder React
- **KI:** OpenAI GPT-3.5 / GPT-4 API
- **Datenbank:** PostgreSQL oder Supabase
- **Deployment:** Railway, Vercel, Render oder Docker

---

## 📦 Projektstruktur

```bash
returntextoptimizer/
├── api/              # Schnittstellen zu Shopify/WooCommerce
├── db/               # Datenbankmodule
├── gpt/              # GPT-Logik & Prompts
├── frontend/         # Admin-UI
├── routes/           # API-Routen
├── utils/            # Logging, Configs
├── .env              # Umgebungsvariablen
├── index.js          # Einstiegspunkt Backend
└── README.md
```

---

## 🧪 Testdaten

Für Entwicklung und Tests liegen Beispiel-Retouren und Produkte direkt im Repository.

- `returns.csv` enthält einige typische Rücksendegründe
- `products.json` listet die dazugehörigen Testprodukte

---

## 🛠️ Installation (lokal)

```bash
git clone https://github.com/dein-name/returntextoptimizer.git
cd returntextoptimizer
npm install
cp .env.example .env
# API- und DB-Zugangsdaten in .env eintragen
npm run migrate # legt Tabellen an
npm run dev
npm test # optional: startet die Beispieltests
```

Frontend & Backend laufen auf: `http://localhost:5000`
Beispiel-Endpunkte:
- `/products` – liefert Produktliste
- `/returns` – liefert Test-Retouren
- `/analyze/:id` – GPT-Vorschlag für Produkt
- `/categories/:id` – gruppierte Rücksendegründe
- `/suggestions` – gespeicherte Vorschläge abrufen
- `/feedback/:id` – Vorschlag annehmen oder ablehnen (POST)
- `/apply/:id` – Produktbeschreibung aktualisieren (POST)
- `/stats` – Produktliste mit Rücksendeanzahl (Login erforderlich)
- `/login` – Session starten
- `/auth/shopify` – OAuth2-Startpunkt (Placeholder)

---

## 📑 Lizenz

MIT – frei verwendbar unter Angabe der Urheberschaft.

---

## ✉️ Kontakt / Support

Fragen, Anfragen oder Interesse an einer erweiterten Version?  
→ Kontakt: `dein.name@example.com`  
→ Discord/Newsletter-Link: *folgt*

