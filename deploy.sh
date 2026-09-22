#!/usr/bin/env bash
# ==============================================================================
# QUERYINDO STUDIO - Enterprise Headless CMS Production Deployment Script
# ==============================================================================
set -e

APP_DIR="/var/www/queryindo-studio"
cd "$APP_DIR"

echo "=========================================================="
echo "🚀 [1/3] Menarik Kode Terbaru Studio dari GitHub..."
echo "=========================================================="
git fetch --all
git reset --hard origin/main

echo "=========================================================="
echo "📦 [2/3] Menginstal Dependensi & Build Studio (Vite SPA)..."
echo "=========================================================="
npm install --no-audit --no-fund
npm run build

echo "=========================================================="
echo "🔄 [3/3] Memeriksa & Mengupdate Konfigurasi Nginx..."
echo "=========================================================="
if [ -f "$APP_DIR/nginx-studio.conf" ]; then
  sudo cp "$APP_DIR/nginx-studio.conf" /etc/nginx/sites-available/queryindo-studio
  if [ ! -f /etc/nginx/sites-enabled/queryindo-studio ]; then
    sudo ln -s /etc/nginx/sites-available/queryindo-studio /etc/nginx/sites-enabled/
  fi
  sudo nginx -t
  sudo systemctl reload nginx
fi

echo "=========================================================="
echo "✨ DEPLOYMENT STUDIO SELESAI! Aktif di https://studio.queryindo.com"
echo "=========================================================="
