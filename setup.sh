#!/bin/bash

echo "🚀 Starte Setup für ReturnTextOptimizer..."

# 1. Git-Repo klonen
echo "📥 Klone GitHub-Repository (bitte URL anpassen)..."
git clone https://github.com/DEIN-USERNAME/returntextoptimizer.git
cd returntextoptimizer || exit

# 2. Node.js-Projekt einrichten
echo "📦 Installiere Node.js-Abhängigkeiten..."
npm install

# 3. Beispielhafte .env-Datei anlegen
echo "🔐 Erstelle .env-Datei..."
cp .env.example .env

echo "✍️ Bitte trage deine OpenAI- und Shop-API-Keys in die .env-Datei ein."
sleep 1

# 4. Datenbankmigrationen vorbereiten (optional mit Supabase CLI oder Prisma)
echo "🗃️ (Optional) Datenbank vorbereiten..."
echo "   Bitte Supabase oder lokale PostgreSQL-Datenbank konfigurieren."

# 5. Projekt starten
echo "🚀 Starte Entwicklungssystem..."
npm run dev

echo "✅ Setup abgeschlossen. Frontend: http://localhost:3000 | Backend: http://localhost:5000"
