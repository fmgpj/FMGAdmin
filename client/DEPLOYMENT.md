# Deployment Guide

## Overview

This document outlines the deployment workflow and best practices for the FMGAdmin client application hosted on Vercel.

## 🚀 Deployment Workflow

### Step 1: Feature Development

```bash
# Create feature branch
git checkout -b feature/new-feature-name

# Make your changes
# ... code development ...

# Commit with conventional messages
git add .
git commit -m "feat: add dropdown component with search functionality"
```

### Step 2: Pre-Deployment Preparation

#### 2.1 Check Current Version

```bash
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

#### 3.1 Choose Version Bump Type

- **PATCH** (0.0.1): Bug fixes, backwards compatible
- **MINOR** (0.1.0): New features, backwards compatible
- **MAJOR** (1.0.0): Breaking changes

#### 3.2 Update Version

```bash
# For patch updates (bug fixes)
npm version patch

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

#### 4.1 Update Changelog with New Version

```bash
# In CHANGELOG.md, move items from [Unreleased] to new version section:
## [0.2.0] - 2026-03-02

### Added
- New dropdown component with search
- Infinite scrolling support

### Fixed
- Button hover state issue
```

#### 4.2 Commit Release Changes

```bash
# Add all changes
git add .

# Commit with release message
git commit -m "chore: release v0.2.0"

# Create and push tag
git tag v0.2.0
git push origin main --tags
```

#### 4.3 Release Checklist

- [ ] ✅ CHANGELOG.md updated with new version section
- [ ] ✅ Changes committed with proper message
- [ ] ✅ Tag created and pushed
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

### Automatic Deployments

- **Preview**: Every push to feature branches creates preview deployment
- **Production**: Pushes to `main` branch auto-deploy to production

### Quick Release Commands

```bash
# Use these for future releases after initial setup
npm run pre-deploy          # Run checks
npm run release:patch        # Bug fixes
npm run release:minor        # New features
npm run release:major        # Breaking changes
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
