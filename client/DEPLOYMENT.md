# Deployment Guide

## Overview

This document outlines the deployment workflow and best practices for the FMGAdmin client application hosted on Vercel.

## 🌳 Branch Strategy

### Branch Hierarchy

```
main (production)
├── test (integration testing)
├── local (local testing)
├── local-pj (developer: Pijay)
└── feature-branch (specific features)
```

### Branch Responsibilities

- **feature-branch**: Feature development and testing
- **local-pj**: Developer integration and preparation
- **local**: Local testing and validation
- **test**: Integration testing before production
- **main**: Production releases and deployment

## 🚀 Deployment Workflow

### Step 1: Feature Development

**Branch**: `feature-branch`

```bash
# Start feature development
git checkout -b feature/new-feature-name local-pj

# Make your changes and commit
git add .
git commit -m "feat: add dropdown component with search functionality"

# Push feature branch
git push origin feature/new-feature-name

# Merge back to developer branch when complete
git checkout local-pj
git merge feature/new-feature-name
```

### Step 2: Pre-Deployment Preparation

**Branch**: `local-pj` (Developer Integration)

#### 2.1 Check Current Version

```bash
# Ensure you're on your developer branch
git checkout local-pj

# Check current version in package.json
node -p "require('./package.json').version"
```

#### 2.2 Update CHANGELOG.md

- Open `CHANGELOG.md`
- Add your changes under `[Unreleased]` section
- Follow the format: Added, Changed, Deprecated, Removed, Fixed, Security

#### 2.3 Run Quality Checks

```bash
# Run linting
npm run lint

# If errors found, fix them before continuing
```

#### 2.4 Test Build Locally

```bash
# Build the project
npm run build

# Start production server to test
npm run start
# Test at http://localhost:3000
```

#### 2.5 Pre-Deployment Checklist

- [ ] ✅ Version checked in `package.json`
- [ ] ✅ `CHANGELOG.md` updated with changes
- [ ] ✅ Linting passed: `npm run lint`
- [ ] ✅ Build successful: `npm run build`
- [ ] ✅ Local testing passed: `npm run start`

**🎯 When all checkboxes are complete, tell me "ready for step 3" to continue!**

### Step 3: Version Management

**Branch**: `local-pj` (Prepare Release)

#### 3.1 Choose Version Bump Type

- **PATCH** (0.0.1): Bug fixes, backwards compatible
- **MINOR** (0.1.0): New features, backwards compatible
- **MAJOR** (1.0.0): Breaking changes

#### 3.2 Update Version

```bash
# Ensure you're on local-pj branch
git checkout local-pj

# For minor updates (new features)
npm version minor

# For major updates (breaking changes)
npm version major
```

#### 3.3 Version Update Checklist

- [ ] ✅ Decided on version bump type (patch/minor/major)
- [ ] ✅ Version updated using `npm version [type]`
- [ ] ✅ New version shows in `package.json`

**🎯 When complete, tell me "ready for step 4" to continue!**

### Step 4: Release Process

**Branch**: `local-pj` → `local` → `test` → `main` (Branch Hierarchy Merge)

#### 4.1 Update Changelog with New Version

```bash
# In CHANGELOG.md, move items from [Unreleased] to new version section:
## [0.2.0] - 2026-03-03

### Added
- New dropdown component with search
- Infinite scrolling support

### Fixed
- Button hover state issue
```

#### 4.2 Commit Release Changes (on local-pj)

```bash
# Add all changes
git add .

# Commit with release message
git commit -m "chore: release v0.2.0"

# Create tag
git tag v0.2.0
```

#### 4.3 Merge Through Branch Hierarchy

```bash
# Push local-pj changes
git push origin local-pj --tags

# Merge to local for testing
git checkout local
git merge local-pj
git push origin local

# Merge to test for integration testing
git checkout test
git merge local
git push origin test

# Finally merge to main for production
git checkout main
git merge test
git push origin main --tags
```

#### 4.4 Release Checklist

- [ ] ✅ CHANGELOG.md updated with new version section
- [ ] ✅ Changes committed with proper message
- [ ] ✅ Tag created and pushed
- [ ] ✅ Merged through all branch levels (local-pj → local → test → main)
- [ ] ✅ Ready for Vercel deployment

**🎯 When complete, tell me "ready for step 5" to continue!**

### Step 5: Vercel Deployment

#### 5.1 Prepare Environment Variables

Before deploying, gather these values for Vercel dashboard:

```
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_google_client_id
NEXT_PUBLIC_GOOGLE_CLIENT_SECRET=your_google_secret
NEXT_PUBLIC_MICROSOFT_CLIENT_ID=your_microsoft_client_id
NEXT_PUBLIC_MICROSOFT_CLIENT_SECRET=your_microsoft_secret
NEXT_PUBLIC_MICROSOFT_TENANT_ID=your_tenant_id
NEXT_PUBLIC_NEXTAUTH_SECRET=your_secret_key
```

#### 5.2 Upload to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Upload your project folder OR connect Git repository
4. Configure project settings:
    - Framework Preset: **Next.js**
    - Build Command: `npm run build`
    - Output Directory: `.next`

#### 5.3 Configure Environment Variables

1. In Vercel dashboard → Project → Settings → Environment Variables
2. Add all variables from Step 5.1
3. Set Environment: **Production**

#### 5.4 Deploy and Test

1. Click "Deploy" button
2. Wait for build to complete
3. Test your deployed application
4. Verify authentication works with your OAuth providers

#### 5.5 Update OAuth Redirect URLs

Once deployed, update your OAuth providers:

- **Google Console**: Add `https://your-app.vercel.app/api/auth/callback/google`
- **Microsoft Azure**: Add `https://your-app.vercel.app/api/auth/callback/azure-ad`

#### 5.6 Vercel Deployment Checklist

- [ ] ✅ Environment variables configured in Vercel
- [ ] ✅ Project uploaded/connected to Vercel
- [ ] ✅ Build completed successfully
- [ ] ✅ Application accessible at Vercel URL
- [ ] ✅ OAuth redirect URLs updated
- [ ] ✅ Authentication tested and working

**🎯 When complete, tell me "deployment finished!" and celebrate! 🎉**

## 🔄 Future Deployments (After Initial Setup)

### Branch Strategy for Releases

**Development Flow:**

```
feature-branch → local-pj → local → test → main
```

**Deployment Triggers:**

- **feature-branch**: No deployment (development only)
- **local-pj**: No deployment (developer integration)
- **local**: No deployment (local testing)
- **test**: Preview deployment (integration testing)
- **main**: Production deployment (live site)

### Automatic Deployments

- **Preview**: Pushes to `test` branch create preview deployment
- **Production**: Pushes to `main` branch auto-deploy to production

### Quick Release Commands (from local-pj branch)

```bash
# Use these for future releases after initial setup
npm run pre-deploy          # Run checks on local-pj
npm run release:patch        # Bug fixes → auto-merge to main
npm run release:minor        # New features → auto-merge to main
npm run release:major        # Breaking changes → auto-merge to main
```

### Manual Branch Workflow (Alternative)

```bash
# 1. Prepare release on local-pj
git checkout local-pj
npm run pre-deploy
npm version minor

# 2. Merge up the hierarchy
git checkout local && git merge local-pj
git checkout test && git merge local
git checkout main && git merge test

# 3. Push production
git push origin main --tags
```

## 📝 Commit Message Convention

Use conventional commits for better changelog generation:

### Types:

- **feat**: New feature
- **fix**: Bug fix
- **docs**: Documentation changes
- **style**: Code style changes (formatting, etc)
- **refactor**: Code refactoring
- **test**: Adding or updating tests
- **chore**: Maintenance tasks

### Examples:

```bash
git commit -m "feat: add dropdown component with search functionality"
git commit -m "fix: resolve keyboard navigation issue in dropdown"
git commit -m "docs: update deployment guide"
git commit -m "chore: update dependencies to latest versions"
```

## 🔍 Deployment Monitoring

### Health Checks

- Monitor Vercel dashboard for build status
- Check deployment logs for errors
- Verify environment variables are set correctly

### Rollback Strategy

```bash
# If deployment fails, rollback to previous version
git revert HEAD
git push origin main

# Or use Vercel dashboard to promote previous deployment
```

## 🎯 Best Practices

### 1. Branch Strategy

```
main (production)
├── develop (staging)
├── feature/dropdown-component
├── feature/infinite-scroll
└── hotfix/critical-bug
```

### 2. Release Notes Template

For each release, document:

- **What's New**: Features added
- **Improvements**: Enhancements made
- **Bug Fixes**: Issues resolved
- **Breaking Changes**: If any

### 3. Database Migrations

If using a database:

```bash
# Run migrations before deployment
npm run migrate

# Seed data if needed
npm run seed
```

## 🤖 Automated Changelog Generation

### Option 1: GitHub Actions (Fully Automated) ⭐ RECOMMENDED

- **File**: `.github/workflows/release-please.yml` (already created)
- **What it does**:
    - Auto-generates changelog from conventional commit messages
    - Auto-bumps versions (patch/minor/major)
    - Creates GitHub releases automatically
    - Triggers on every push to main branch

**To use**: Just push commits with conventional format:

```bash
git commit -m "feat: add new dashboard widget"
git commit -m "fix: resolve login redirect issue"
git commit -m "docs: update deployment guide"
```

### Option 2: Manual Script (Run When Needed)

```bash
# Generate changelog from recent commits
npm run changelog

# Or run the script directly
bash generate-changelog.sh
```

### Option 3: Automated with Release (Best for Manual Releases)

```bash
# These commands now auto-generate changelog:
npm run release:patch    # Auto-generates + patches version
npm run release:minor    # Auto-generates + minor version
npm run release:major    # Auto-generates + major version
```

### Conventional Commit Format

For automatic changelog generation, use these commit prefixes:

- `feat:` → New features (🚀 Features section)
- `fix:` → Bug fixes (🐛 Bug Fixes section)
- `docs:` → Documentation (📚 Documentation section)
- `style:` → Code formatting (💎 Styles section)
- `refactor:` → Code refactoring (♻️ Code Refactoring section)
- `chore:` → Maintenance tasks (hidden from changelog)

## 🚨 Emergency Procedures

### Hotfix Deployment

```bash
# Create hotfix branch from main
git checkout -b hotfix/critical-issue main

# Fix the issue
# ... make changes ...

# Quick deployment
git add .
git commit -m "fix: resolve critical security issue"
git push origin hotfix/critical-issue

# Merge to main
git checkout main
git merge hotfix/critical-issue
git push origin main
```

### Rollback

- Use Vercel dashboard to promote previous deployment
- Or push a revert commit to main branch
