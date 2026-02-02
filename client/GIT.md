## Git Workflow Guidelines

### Commit Message Prefixes

Use these prefixes for consistent and readable commit messages:

#### Feature Development
- `feat:` - New features or functionality
- `enhance:` - Improvements to existing features
- `ui:` - User interface changes and styling

#### Bug Fixes & Maintenance
- `fix:` - Bug fixes
- `hotfix:` - Critical bug fixes for production
- `refactor:` - Code refactoring without functionality changes

#### Development & Configuration
- `setup:` - Initial setup, configuration, or project scaffolding
- `deps:` - Dependency updates or additions
- `config:` - Configuration file changes
- `build:` - Build system or CI/CD changes

#### Documentation & Testing
- `docs:` - Documentation updates
- `test:` - Adding or updating tests
- `chore:` - Maintenance tasks, tooling, or minor updates

#### Examples:
```
feat: add product creation form
fix: resolve authentication redirect issue
ui: update dashboard layout and styling
refactor: extract product validation logic
docs: update API documentation
deps: upgrade Next.js to v15
setup: configure ESLint and Prettier
```

### Branch Naming Conventions

Follow this structure: `type/short-description`

#### Main Branches
- `main` - Production-ready code
- `develop` - Development branch for integration

#### Feature Branches
- `feature/product-management` - New product management features
- `feature/user-authentication` - User auth system
- `feature/dashboard-analytics` - Analytics dashboard

#### Bug Fix Branches
- `bugfix/login-validation` - Non-critical bug fixes
- `hotfix/payment-gateway` - Critical production fixes

#### Other Branches
- `refactor/api-endpoints` - Code refactoring
- `docs/api-documentation` - Documentation updates
- `setup/ci-cd-pipeline` - Configuration and setup

### Additional Git Best Practices

1. **Keep commits atomic** - One logical change per commit
2. **Write descriptive commit messages** - Explain what and why, not just what
3. **Use present tense** - "Add feature" not "Added feature"
4. **Limit first line to 50 characters** - For better readability in Git logs
5. **Add detailed description for complex changes** - Use the commit body for context

#### Example Commit Format:
```
feat: add product search functionality

- Implement search by name and category
- Add debounced input for better performance
- Include pagination for search results
- Update API endpoints for search queries
```
