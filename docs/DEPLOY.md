# Deployment Guide

Dieses Projekt kann schnell auf Railway oder Vercel bereitgestellt werden. Es wird ein Docker-Container verwendet.

## Schritte

1. Forke dieses Repository und aktiviere dein Railway/Vercel Konto.
2. Setze die Umgebungsvariablen aus `.env.example` im jeweiligen Dashboard.
3. Railway: Neues Projekt erstellen und das Repository verknüpfen.
   - Dockerfile wird automatisch erkannt.
4. Vercel: Importiere das Repository und wähle `Dockerfile` als Build-Type.
5. Nach dem Deploy ist das Backend unter der angegebenen URL verfügbar.

Optional kann `npm run package` ausgeführt werden, um ein ZIP-Paket für den Upload als Shopify/WooCommerce Plugin zu erzeugen.
