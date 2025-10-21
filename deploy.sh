#!/bin/bash

# Supplementary Angles - Vercel Deployment Script
# This script automates the deployment to Vercel

set -e  # Exit on error

echo "=========================================="
echo "Supplementary Angles - Vercel Deployment"
echo "=========================================="
echo ""

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check if git is clean
echo -e "${BLUE}Checking git status...${NC}"
if ! git diff-index --quiet HEAD --; then
    echo -e "${RED}Error: Uncommitted changes found!${NC}"
    echo "Please commit all changes before deploying:"
    echo "  git add -A"
    echo "  git commit -m 'Your message'"
    exit 1
fi
echo -e "${GREEN}✓ Git working tree is clean${NC}"
echo ""

# Check if git is up to date
echo -e "${BLUE}Checking if branch is up to date with origin...${NC}"
git fetch origin > /dev/null 2>&1
if [ $(git rev-parse HEAD) != $(git rev-parse origin/main) ]; then
    echo -e "${YELLOW}⚠ Local branch differs from remote. Pulling latest...${NC}"
    git pull origin main
fi
echo -e "${GREEN}✓ Branch is up to date${NC}"
echo ""

# Check if Vercel CLI is installed
echo -e "${BLUE}Checking for Vercel CLI...${NC}"
if ! command -v vercel &> /dev/null; then
    echo -e "${YELLOW}Vercel CLI not found. Installing...${NC}"
    npm install -g vercel
fi
echo -e "${GREEN}✓ Vercel CLI is installed${NC}"
echo ""

# Show latest commits
echo -e "${BLUE}Latest commits:${NC}"
git log --oneline -3
echo ""

# Confirmation
echo -e "${YELLOW}Ready to deploy to Vercel (production)?${NC}"
read -p "Continue? (y/n) " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "Deployment cancelled."
    exit 1
fi
echo ""

# Deploy
echo -e "${BLUE}Starting Vercel deployment...${NC}"
vercel --prod --confirm

# Deployment complete
echo ""
echo -e "${GREEN}=========================================="
echo "✓ Deployment Complete!"
echo "==========================================${NC}"
echo ""
echo "Your site is now live on Vercel!"
echo ""
echo "Next steps:"
echo "1. Visit your Vercel dashboard: https://vercel.com/dashboard"
echo "2. Find your project and get the deployment URL"
echo "3. Test your site at the provided URL"
echo "4. Connect your custom domain (if applicable)"
echo ""
echo "Questions? Check DEPLOYMENT_GUIDE.md for details."
