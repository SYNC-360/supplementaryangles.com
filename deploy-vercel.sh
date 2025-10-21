#!/bin/bash

# ============================================
# SUPPLEMENTARY ANGLES - VERCEL DEPLOYMENT
# ============================================

echo "🚀 Deploying Supplementary Angles Calculator to Vercel..."

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI not found. Installing..."
    npm install -g vercel
fi

# Check if we're in the right directory
if [ ! -f "index.html" ]; then
    echo "❌ index.html not found. Make sure you're in the project directory."
    exit 1
fi

# Deploy to Vercel
echo "📦 Deploying to Vercel..."
vercel --prod

echo "✅ Deployment complete!"
echo "🌐 Your site should be live at the URL provided above."
echo "📊 Monitor performance at: https://vercel.com/dashboard"
