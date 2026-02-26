# Deployment Guide

## Overview

This document outlines the deployment workflow and best practices for the FMGAdmin client application hosted on Vercel.

## 🚀 Deployment Workflow

### 1. Feature Development

```bash
# Create feature branch
git checkout -b feature/new-feature-name

# Make your changes
# ... code development ...

# Commit with conventional messages
git add .
git commit -m "feat: add dropdown component with search functionality"
```

### 2. Pre-Deployment Checklist

- [ ] Update version in `package.json`
- [ ] Update `CHANGELOG.md` with changes
- [ ] Run tests: `npm run lint`
- [ ] Build locally: `npm run build`
- [ ] Test locally: `npm run start`

### 3. Version Management

#### Semantic Versioning (SemVer)

- **MAJOR** (1.0.0): Breaking changes
- **MINOR** (0.1.0): New features, backwards compatible
- **PATCH** (0.0.1): Bug fixes, backwards compatible

#### Version Update Script

```bash
# For patch updates
npm version patch

# For minor updates
npm version minor

# For major updates
npm version major
```

### 4. Release Process

#### Step 1: Update Changelog

In `CHANGELOG.md`, move items from `[Unreleased]` to a new version section:

```markdown
## [0.2.0] - 2026-02-22

### Added

- New dropdown component with search
- Infinite scrolling support
```

#### Step 2: Commit Release

```bash
git add .
git commit -m "chore: release v0.2.0"
git tag v0.2.0
git push origin main --tags
```

#### Step 3: Vercel Deployment

Vercel automatically deploys when you push to main branch.

## 🔄 Vercel-Specific Workflow

### Automatic Deployments

- **Preview**: Every push to any branch creates a preview deployment
- **Production**: Pushes to `main` branch deploy to production
- **Custom domains**: Configure in Vercel dashboard

### Environment Variables

```bash
# Production environment variables in Vercel dashboard:
NEXTAUTH_URL=https://your-domain.vercel.app
NEXTAUTH_SECRET=your-secret-key
DATABASE_URL=your-db-connection-string
```

### Deployment Commands (vercel.json)

```json
{
    "buildCommand": "npm run build",
    "devCommand": "npm run dev",
    "framework": "nextjs"
}
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

## 📊 Changelog Automation (Optional)

### Auto-generate changelog from commits:

```bash
npm install -D conventional-changelog-cli

# Add to package.json scripts:
"changelog": "conventional-changelog -p angular -i CHANGELOG.md -s"
```

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
