#!/bin/bash

# FMGAdmin Deployment Preparation Script (run only from `local` branch)
echo "🚀 FMGAdmin Deployment Preparation"
echo "=================================="

# Get current branch
CURRENT_BRANCH=$(git branch --show-current)
echo "Current branch: $CURRENT_BRANCH"

# If not on 'local', instruct developer what to do and exit
if [ "$CURRENT_BRANCH" != "local" ]; then
    echo "\n⚠️  This script must be run from the 'local' branch."
    echo "As a developer, please ensure your feature/developer branch is up-to-date with 'local' and merge feature branches into your developer branch before running this script."
    echo "\nRecommended steps (example):"
    echo "1) Fetch latest remote branches: git fetch origin"
    echo "2) On your feature branch: git checkout feature/your-feature"
    echo "3) Rebase or merge local into your feature branch: git rebase origin/local  # or git merge origin/local"
    echo "4) Run your tests and push your feature to origin if needed: git push origin feature/your-feature"
    echo "5) Switch to your developer branch and merge feature branches: git checkout local && git merge --no-ff feature/your-feature"
    echo "6) Push updated local branch: git push origin local"
    echo "\nOnce 'local' contains all desired changes, run this script from the 'local' branch to prepare and promote the release."
    exit 1
fi

echo "\n✅ Running deployment preparation from 'local' branch"

# Pre-deployment checks
echo "\n📋 Running pre-deployment checks..."

echo "1️⃣ Running linter..."
npm run lint
if [ $? -ne 0 ]; then
    echo "❌ Linting failed. Please fix errors before deploying."
    exit 1
fi

echo "2️⃣ Running build test..."
npm run build
if [ $? -ne 0 ]; then
    echo "❌ Build failed. Please fix errors before deploying."
    exit 1
fi

# Check CHANGELOG.md
echo "3️⃣ Checking changelog..."
if ! grep -q "## \[Unreleased\]" CHANGELOG.md; then
    echo "⚠️  No [Unreleased] section found in CHANGELOG.md"
    echo "Please update CHANGELOG.md with your changes before continuing."
    exit 1
fi

# Show current version and ask for version bump
CURRENT_VERSION=$(node -p "require('./package.json').version")
echo "4️⃣ Current version: $CURRENT_VERSION"

echo "\n📦 Version Management"
echo "Choose version bump type:"
echo "1) Patch - Bug fixes"
echo "2) Minor - New features"
echo "3) Major - Breaking changes"
echo "4) Skip version bump"
read -p "Enter choice (1-4): " VERSION_CHOICE

NEW_VERSION=""
case $VERSION_CHOICE in
    1)
        npm version patch --no-git-tag-version
        ;;
    2)
        npm version minor --no-git-tag-version
        ;;
    3)
        npm version major --no-git-tag-version
        ;;
    4)
        echo "Skipping version bump"
        ;;
    *)
        echo "❌ Invalid choice. Exiting."
        exit 1
        ;;
esac

NEW_VERSION=$(node -p "require('./package.json').version")
echo "Selected version: $NEW_VERSION"

# If version bumped, create new changelog section automatically
if [ "$VERSION_CHOICE" != "4" ]; then
    echo "\n📝 Auto-updating CHANGELOG.md with new version section..."
    CURRENT_DATE=$(date +%Y-%m-%d)
    NEW_SECTION="## [${NEW_VERSION}] - ${CURRENT_DATE}

### 🚀 Added

### 🔄 Changed

### 🐛 Fixed

### 🗑️ Removed

"

    awk -v new_section="$NEW_SECTION" '
    /^## \[Unreleased\]/ {
        print $0
        while ((getline) && !/^## \[/) {
            print $0
        }
        printf "%s", new_section
        print $0
        next
    }
    { print }
    ' CHANGELOG.md > CHANGELOG.tmp && mv CHANGELOG.tmp CHANGELOG.md

    echo "✅ Created new version section [${NEW_VERSION}] in CHANGELOG.md"
    echo "\nPlease copy your items from [Unreleased] to the new [${NEW_VERSION}] section, then clear [Unreleased]."
    read -p "Press Enter when CHANGELOG.md is updated..."

    git add package.json CHANGELOG.md package-lock.json 2>/dev/null || git add package.json CHANGELOG.md package-lock.json || true
    git commit -m "chore: release v${NEW_VERSION}" || echo "No changes to commit for package.json/CHANGELOG.md"
    git tag "v${NEW_VERSION}" || echo "Tag v${NEW_VERSION} already exists or tagging failed"
fi

echo "\n🌳 Promoting 'local' → 'test' → 'main'..."

# Push local
git push origin local

# Merge to test
git checkout test || (echo "Test branch not found locally; creating from origin/test" && git checkout -b test origin/test)
git merge --no-ff local -m "chore: merge local into test for release v${NEW_VERSION}"
git push origin test

# Merge to main
git checkout main || (echo "Main branch not found locally; creating from origin/main" && git checkout -b main origin/main)
git merge --no-ff test -m "chore: promote test to main for release v${NEW_VERSION}"

if [ "$VERSION_CHOICE" != "4" ]; then
    git push origin main --tags
else
    git push origin main
fi

# Return to local
git checkout local

echo "\n🎉 Deployment preparation complete!"
echo "\nSummary:"
echo "- Branch: local"
echo "- Version: $(node -p "require('./package.json').version")"
echo "- Status: Pushed and promoted local→test→main"

echo "\nNext steps: Monitor Vercel for build, test the deployed app, and verify authentication and functionality."