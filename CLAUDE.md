# CLAUDE.md

This file provides guidance to Claude Code when working with this forked react-native-calendars library.

## Project Overview

This is a fork of `wix/react-native-calendars` published as `react-native-calendars-karim` on npm. It includes custom bug fixes and enhancements not yet merged into the upstream repository.

### Repository Information

- **Original**: https://github.com/wix/react-native-calendars
- **Fork**: https://github.com/karim-dev06/react-native-calendars
- **npm Package**: https://www.npmjs.com/package/react-native-calendars-karim
- **Branch Strategy**:
  - `master` - Synced with upstream (wix/react-native-calendars)
  - `dev` - Development branch with custom changes

## Publishing Process

### Important: Build Files Are NOT Committed

**DO NOT commit compiled `.js` and `.d.ts` files to git.** They are generated during the build process and excluded via `.npmignore`.

### Publishing to npm

**Prerequisites:**
- Ensure you're on the `dev` branch
- Ensure you're logged into npm: `npm login`

**Steps:**

1. **Make your changes** to TypeScript source files in `src/`

2. **Build the library:**
   ```bash
   yarn build:ts
   ```
   This generates compiled `.js` and `.d.ts` files in `src/` directory.

3. **Bump version:**
   ```bash
   npm version patch  # for bug fixes (1.0.1 → 1.0.2)
   npm version minor  # for new features (1.0.1 → 1.1.0)
   npm version major  # for breaking changes (1.0.1 → 2.0.0)
   ```

4. **Commit changes:**
   ```bash
   git add .
   git commit -m "fix: description of your changes"
   git push origin dev
   ```

5. **Publish to npm:**
   ```bash
   npm publish
   ```

   The `.npmignore` file ensures:
   - ✅ Compiled `.js` and `.d.ts` files are included
   - ❌ TypeScript `.ts` and `.tsx` source files are excluded
   - ❌ Test files, examples, and dev dependencies are excluded

### What Gets Published

When you run `npm publish`, the package includes:
- Compiled JavaScript files (`src/**/*.js`)
- Type definitions (`src/**/*.d.ts`)
- Assets (images in `src/*/img/`)
- `package.json`, `README.md`, `LICENSE`
- Other necessary runtime files

**Files NOT published** (excluded by `.npmignore`):
- TypeScript source files (`*.ts`, `*.tsx`)
- Example app (`example/`)
- iOS/Android native projects
- Test files and specs
- Development configuration files

## Local Testing with yalc

**yalc** is the recommended tool for testing library changes locally before publishing. It works better than `npm link` with React Native Metro bundler.

### One-Time Setup

Install yalc globally:
```bash
npm install -g yalc
```

### Testing Workflow

**1. In the library directory (this repo):**

```bash
# Make your changes to TypeScript source files
# ...

# Build the library
yarn build:ts

# Publish to local yalc store
yalc publish
```

**2. In your app directory (e.g., 3by4-app):**

```bash
# First time: Add the library from yalc
yalc add react-native-calendars-karim

# This updates package.json to:
# "react-native-calendars-karim": "file:.yalc/react-native-calendars-karim"
```

**3. Make changes and update:**

```bash
# In library directory - after making changes:
yarn build:ts
yalc push  # Automatically updates all linked apps!

# In app directory - restart Metro bundler:
npx expo start --clear
```

### yalc Commands Reference

```bash
# In library directory:
yalc publish          # Publish to local yalc store
yalc push             # Publish AND update all linked apps

# In app directory:
yalc add <package>    # Add package from yalc store
yalc update           # Update to latest yalc version
yalc remove <package> # Remove yalc version, restore from npm
yalc remove --all     # Remove all yalc packages

# Check status:
yalc installations show  # Show all apps using this package
```

### Removing yalc and Going Back to npm

```bash
# In your app directory:
yalc remove react-native-calendars-karim
npm install  # Reinstall from npm registry
```

## Syncing with Upstream

To pull updates from the original wix/react-native-calendars repository:

```bash
# Update master from upstream
git checkout master
git fetch upstream
git merge upstream/master
git push origin master

# Merge upstream changes into dev branch
git checkout dev
git merge master

# Resolve any conflicts
# Test your customizations still work
# Rebuild and republish if needed
yarn build:ts
npm version patch
npm publish
```

## Custom Changes & Bug Fixes

Document your custom changes here:

### Bug Fixes

1. **hideExtraDays behavior fix** (v1.0.2)
   - File: `src/expandableCalendar/index.tsx:618`
   - Issue: `hideExtraDays` prop worked in reverse (hidden when collapsed, visible when expanded)
   - Fix: Changed `hideExtraDays={!horizontal && isOpen}` to `hideExtraDays={isOpen}`
   - Now correctly hides extra days when calendar is expanded/open

### Enhancements

_(Add your enhancements here as you make them)_

## Development Guidelines

- **Branch Strategy**: Always work on `dev` branch, keep `master` synced with upstream
- **Testing**: Use yalc for local testing before publishing
- **Building**: Always run `yarn build:ts` before publishing
- **Versioning**: Follow semantic versioning (major.minor.patch)
- **Git**: DO NOT commit compiled `.js` and `.d.ts` files

## Troubleshooting

### "Unable to resolve module" errors with yalc

If you get module resolution errors:
1. Remove yalc: `yalc remove react-native-calendars-karim`
2. Clear Metro cache: `npx expo start --clear`
3. Re-add from yalc: `yalc add react-native-calendars-karim`

### Changes not reflecting in app

1. Ensure you rebuilt: `yarn build:ts`
2. Push to yalc: `yalc push`
3. Clear Metro cache: `npx expo start --clear`

### Peer dependency conflicts during npm install

Use `--legacy-peer-deps` flag:
```bash
npm install --legacy-peer-deps
```

This is expected for dev dependencies like `@welldone-software/why-did-you-render` which require older React versions.
