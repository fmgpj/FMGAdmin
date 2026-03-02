#!/bin/bash

# Auto-generate changelog from git commits
echo "# Changelog" > CHANGELOG.md
echo "" >> CHANGELOG.md
echo "All notable changes to this project will be documented in this file." >> CHANGELOG.md
echo "" >> CHANGELOG.md

# Get version from package.json
CURRENT_VERSION=$(node -p "require('./package.json').version")
echo "## [$CURRENT_VERSION] - $(date +%Y-%m-%d)" >> CHANGELOG.md
echo "" >> CHANGELOG.md

# Extract features
echo "### 🚀 Features" >> CHANGELOG.md
git log --oneline --grep="^feat" --since="1 month ago" | sed 's/^[a-f0-9]* feat: /- /' >> CHANGELOG.md
echo "" >> CHANGELOG.md

# Extract fixes  
echo "### 🐛 Bug Fixes" >> CHANGELOG.md
git log --oneline --grep="^fix" --since="1 month ago" | sed 's/^[a-f0-9]* fix: /- /' >> CHANGELOG.md
echo "" >> CHANGELOG.md

# Extract docs
echo "### 📚 Documentation" >> CHANGELOG.md
git log --oneline --grep="^docs" --since="1 month ago" | sed 's/^[a-f0-9]* docs: /- /' >> CHANGELOG.md

echo "✅ Changelog generated!"