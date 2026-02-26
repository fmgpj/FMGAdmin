#!/bin/bash

# Deployment Preparation Script
echo "🚀 FMGAdmin Deployment Preparation"
echo "=================================="

# Check current branch
CURRENT_BRANCH=$(git branch --show-current)
echo "Current branch: $CURRENT_BRANCH"

if [ "$CURRENT_BRANCH" != "main" ]; then
    echo "⚠️  Warning: Not on main branch. Continue? (y/n)"
    read -r CONTINUE
    if [ "$CONTINUE" != "y" ]; then
        exit 1
    fi
fi

# Run pre-deployment checks
echo "📋 Running pre-deployment checks..."

echo "1️⃣ Running linter..."
npm run lint
if [ $? -ne 0 ]; then
    echo "❌ Linting failed. Please fix errors before deploying."
    exit 1
fi

echo "2️⃣ Running build..."
npm run build
if [ $? -ne 0 ]; then
    echo "❌ Build failed. Please fix errors before deploying."
    exit 1
fi

# Check if CHANGELOG.md has unreleased changes
echo "3️⃣ Checking changelog..."
if ! grep -q "## \[Unreleased\]" CHANGELOG.md; then
    echo "⚠️  No unreleased section found in CHANGELOG.md"
    echo "Please update the changelog before deploying."
    exit 1
fi

# Show current version
CURRENT_VERSION=$(node -p "require('./package.json').version")
echo "Current version: $CURRENT_VERSION"

# Ask for version bump type
echo "Select version bump type:"
echo "1) Patch (bug fixes)"
echo "2) Minor (new features)" 
echo "3) Major (breaking changes)"
echo "4) Skip version bump"
read -p "Enter choice (1-4): " VERSION_CHOICE

case $VERSION_CHOICE in
    1)
        echo "🔧 Bumping patch version..."
        npm run release:patch
        ;;
    2)
        echo "✨ Bumping minor version..."
        npm run release:minor
        ;;
    3)
        echo "💥 Bumping major version..."
        npm run release:major
        ;;
    4)
        echo "⏭️  Skipping version bump..."
        ;;
    *)
        echo "❌ Invalid choice. Exiting."
        exit 1
        ;;
esac

echo "✅ Deployment preparation complete!"
echo "🌐 Vercel will automatically deploy when you push to main branch."
echo ""
echo "Next steps:"
echo "1. Update CHANGELOG.md with new version details"
echo "2. Push changes to trigger deployment: git push origin main"
echo "3. Monitor deployment in Vercel dashboard"