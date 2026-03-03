#!/bin/bash

# FMGAdmin Deployment Preparation Script
# Follows the documented branch hierarchy: local-pj → local → test → main
echo "🚀 FMGAdmin Deployment Preparation"
echo "=================================="

# Check current branch and validate workflow
CURRENT_BRANCH=$(git branch --show-current)
echo "Current branch: $CURRENT_BRANCH"

# Branch validation based on deployment workflow
validate_branch() {
    case $CURRENT_BRANCH in
        "local-pj")
            echo "✅ Starting deployment from developer branch (local-pj)"
            ;;
        "local"|"test"|"main")
            echo "⚠️  You're on $CURRENT_BRANCH branch."
            echo "Deployment should start from 'local-pj' branch for proper workflow."
            echo "Continue anyway? (y/n)"
            read -r CONTINUE
            if [ "$CONTINUE" != "y" ]; then
                echo "Please switch to 'local-pj' branch: git checkout local-pj"
                exit 1
            fi
            ;;
        *)
            echo "⚠️  You're on '$CURRENT_BRANCH' branch."
            echo "This doesn't match the standard workflow (feature-branch → local-pj → local → test → main)."
            echo "Continue anyway? (y/n)"
            read -r CONTINUE
            if [ "$CONTINUE" != "y" ]; then
                exit 1
            fi
            ;;
    esac
}

validate_branch

# Pre-deployment checks
echo ""
echo "📋 Running Step 2: Pre-deployment checks..."

echo "1️⃣ Running linter..."
npm run lint
if [ $? -ne 0 ]; then
    echo "❌ Linting failed. Please fix errors before deploying."
    echo "Run: npm run lint and fix all issues."
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

echo ""
echo "📦 Step 3: Version Management"
echo "Choose version bump type:"
echo "1) Patch (0.0.1) - Bug fixes, backwards compatible"
echo "2) Minor (0.1.0) - New features, backwards compatible" 
echo "3) Major (1.0.0) - Breaking changes"
echo "4) Skip version bump (testing only)"
read -p "Enter choice (1-4): " VERSION_CHOICE

NEW_VERSION=""
case $VERSION_CHOICE in
    1)
        echo "🔧 Bumping patch version..."
        npm version patch --no-git-tag-version
        NEW_VERSION=$(node -p "require('./package.json').version")
        echo "New version: $NEW_VERSION"
        ;;
    2)
        echo "✨ Bumping minor version..."
        npm version minor --no-git-tag-version
        NEW_VERSION=$(node -p "require('./package.json').version")
        echo "New version: $NEW_VERSION"
        ;;
    3)
        echo "💥 Bumping major version..."
        npm version major --no-git-tag-version
        NEW_VERSION=$(node -p "require('./package.json').version")
        echo "New version: $NEW_VERSION"
        ;;
    4)
        echo "⏭️  Skipping version bump..."
        NEW_VERSION=$CURRENT_VERSION
        ;;
    *)
        echo "❌ Invalid choice. Exiting."
        exit 1
        ;;
esac

# Step 4: Release Process
echo ""
echo "🔄 Step 4: Release Process"

if [ "$VERSION_CHOICE" != "4" ]; then
    echo "📝 Auto-updating CHANGELOG.md with new version section..."
    
    # Create the new version section
    CURRENT_DATE=$(date +%Y-%m-%d)
    NEW_SECTION="## [${NEW_VERSION}] - ${CURRENT_DATE}

### 🚀 Added

### 🔄 Changed

### 🐛 Fixed

### 🗑️ Removed

"
    
    # Insert the new section after [Unreleased] section
    awk -v new_section="$NEW_SECTION" '
    /^## \[Unreleased\]/ {
        # Print [Unreleased] section
        print $0
        # Read and print everything until next ## section
        while ((getline) && !/^## \[/) {
            print $0
        }
        # Print the new version section
        printf "%s", new_section
        # Print the current line (which should be the next ## section)
        print $0
        next
    }
    { print }
    ' CHANGELOG.md > CHANGELOG.tmp && mv CHANGELOG.tmp CHANGELOG.md
    
    echo "✅ Created new version section [${NEW_VERSION}] in CHANGELOG.md"
    echo ""
    echo "📋 Next step: Copy your changes from [Unreleased] to [${NEW_VERSION}]"
    echo "   1. Open CHANGELOG.md in your editor"
    echo "   2. Copy items from [Unreleased] sections to [${NEW_VERSION}] sections"  
    echo "   3. Clear the [Unreleased] sections (leave categories but remove content)"
    echo "   4. Save the file"
    echo ""
    read -p "Press Enter when CHANGELOG.md is updated..."
    
    # Commit version changes on current branch
    git add package.json CHANGELOG.md
    git commit -m "chore: release v${NEW_VERSION}"
    
    # Create tag
    git tag "v${NEW_VERSION}"
    echo "✅ Created tag v${NEW_VERSION}"
fi

# Branch hierarchy deployment
echo ""
echo "🌳 Starting branch hierarchy deployment..."

if [ "$CURRENT_BRANCH" == "local-pj" ] || [[ "$CURRENT_BRANCH" == feature* ]]; then
    echo "1️⃣ Pushing current branch changes..."
    git push origin $CURRENT_BRANCH
    
    echo "2️⃣ Merging to local branch..."
    git checkout local
    git merge $CURRENT_BRANCH
    git push origin local
    
    echo "3️⃣ Merging to test branch..."
    git checkout test  
    git merge local
    git push origin test
    
    echo "4️⃣ Merging to main branch..."
    git checkout main
    git merge test
    
    if [ "$VERSION_CHOICE" != "4" ]; then
        git push origin main --tags
        echo "✅ Pushed to main with tags"
    else
        git push origin main
        echo "✅ Pushed to main"
    fi
    
    # Return to original branch
    git checkout $CURRENT_BRANCH
    
elif [ "$CURRENT_BRANCH" == "main" ]; then
    if [ "$VERSION_CHOICE" != "4" ]; then
        git push origin main --tags
    else
        git push origin main
    fi
    echo "✅ Updated main branch"
else
    echo "⚠️  Manual push required for branch: $CURRENT_BRANCH"
    echo "Run: git push origin $CURRENT_BRANCH"
fi

echo ""
echo "🎉 Deployment preparation complete!"
echo ""
echo "📊 Summary:"
echo "- Branch: $CURRENT_BRANCH"
echo "- Version: $(node -p "require('./package.json').version")"
echo "- Status: Ready for production"
echo ""
echo "🌐 Next steps:"
echo "1. Monitor Vercel dashboard for automatic deployment"
echo "2. Test the deployed application"
echo "3. Verify authentication and functionality"
echo "4. Update OAuth redirect URLs if needed"
echo ""
echo "🔗 Useful links:"
echo "- Vercel Dashboard: https://vercel.com/dashboard"
echo "- Deployment Status: Check your project in Vercel"