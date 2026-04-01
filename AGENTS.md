# Agent Guidelines for Rozvazej.Registration

## Overview
This repository contains a unified registration form built with Svelte 5 and Vite, designed to be embedded into Webflow websites for Wolt, Bolt, and Foodora platforms.

## Development Commands

### Installation
```bash
pnpm install
```

### Development Server
```bash
pnpm dev
```
Starts the Vite development server at http://localhost:5173

### Production Build
```bash
pnpm build
```
Creates optimized production assets in the `dist/` directory

### Preview Build
```bash
pnpm preview
```
Locally preview the production build

### Type Checking
```bash
pnpm check
```
Runs both Svelte-check and TypeScript compilation

### Testing
```bash
pnpm test
```
Runs all Vitest tests

### Run Single Test
```bash
pnpm test -- test-name-pattern
```
Example: `pnpm test -- "should validate email"`

### Staging Build & Deploy
```bash
pnpm build:staging
```
Builds and deploys to Surge.sh for staging

## Code Style Guidelines

### File Organization
- Components: `src/lib/components/`
- State management: `src/lib/state/`
- Utilities: `src/lib/utils/`
- Types: `src/lib/types/`
- i18n: `src/lib/i18n/`
- Endpoints: `src/lib/endpoints.ts`

### TypeScript & Svelte
- Use `.svelte` extension for Svelte components
- Use `.ts` for TypeScript logic files (e.g., `ComponentName.svelte.ts`)
- Use `.svelte.ts` for Svelte components with TypeScript logic
- Strict TypeScript mode enabled
- Prefer interfaces over types for object shapes
- Use Type enums for finite sets of values
- Avoid `any` type; use `unknown` when type is uncertain

### Imports
1. External dependencies (alphabetical)
2. Internal utilities and helpers
3. Components and UI elements
4. Styles (if any)
5. Relative paths use `@/` alias for `src/` root
6. Group imports with blank lines between categories

Example:
```typescript
// External
import { onMount } from 'svelte';
import { validateEmail } from '../lib/utils/validation';

// Internal
import { RegistrationState } from '../lib/state/RegistrationState.svelte';
import Loader from '../lib/components/Loader.svelte';
```

### State Management (Svelte 5 Runes)
- Use `$state()` for reactive state
- Use `$derived()` for computed values
- Use `$effect()` for side effects
- Use `$props()` for component props
- Use `$bindable()` for two-way bindings
- Initialize state in constructor or init() method
- Keep state mutations minimal and explicit

### Component Structure
- Script block at top
- Use `lang="ts"` for TypeScript in script tags
- Markup follows Svelte syntax
- Style block scoped to component (optional)
- Export interface for component props when needed
- Use `{#if}` blocks for conditional rendering
- Use `{#each}` for iteration with keys
- Prefer ternary operators in markup for simple conditions

### Naming Conventions
- Components: PascalCase (e.g., `PersonalData.svelte`)
- Functions and variables: camelCase
- Constants: UPPER_SNAKE_CASE
- Types and interfaces: PascalCase
- Enum values: UPPER_SNAKE_CASE
- Private properties/methods: prefix with `_`
- Event handlers: `onEventName` or `handleEventName`
- Boolean variables: start with `is`, `has`, `should`, `can`

### Error Handling
- Use try/catch for async operations
- Handle specific error types when possible
- Log errors with context before re-throwing or showing user feedback
- Use custom error types for domain-specific errors
- In RegistrationState, errors are stored in `errors` object keyed by field name
- Validation errors should be user-friendly and localized
- Network errors should distinguish between client and server issues

### Form Handling & Validation
- Use Zod for schema validation where applicable
- Centralize validation logic in `src/lib/utils/validation.ts`
- Validate on blur and form submission
- Show inline validation errors near fields
- Disable submit button during validation/submission
- Use loading states for async operations
- Reset form state appropriately after success/error

### Internationalization (i18n)
- Use `t('translation.key')` function for translations
- Store translations in `src/lib/i18n/i18n.svelte.ts`
- Default language is Czech (`cs`), English (`en`) also supported
- Detect language from URL path (`-en` suffix)
- Keep translation keys flat and descriptive
- Use nested objects for grouping related translations
- Never hard-code strings in components

### Foxentry Integration
- Check `foxentryPaymentStatus` before making API calls
- Handle payment errors gracefully
- Normalize and validate phone numbers, emails, names
- Debounce address searches (50ms delay)
- Clear suggestions on blur/unfocus
- Apply suggestions to form fields explicitly

### File Uploads
- Validate file size (max 2MB)
- Validate file types when applicable
- Show upload progress when available
- Handle upload failures with retry mechanism
- Use Cloudinary fallback for failed multipart uploads
- Store uploaded file URLs as JSON strings in FormData
- Include metadata for debugging failed uploads

### Environment & Configuration
- Endpoints defined in `src/lib/endpoints.ts`
- Use environment variables for configurable values
- Different endpoints for different environments
- Cloudinary configuration separate from API endpoints
- Feature flags via URL parameters when needed

### Performance Considerations
- Lazy load heavy components when possible
- Optimize re-renders with proper `$derived()` usage
- Minimize expensive computations in reactive statements
- Use `requestAnimationFrame` for DOM measurements
- Clean up event listeners and subscriptions
- Optimize image loading and file handling

### Security
- Sanitize user input before display
- Use parameterized queries for any direct database access (none in this client-side app)
- Validate file types and sizes on client and expect server validation
- Handle authentication tokens securely (none currently used)
- Protect against XSS in dynamic content
- Use HTTPS for all API calls in production

### Testing Guidelines
- Write unit tests for utility functions
- Test component interactions with @testing-library/svelte
- Mock external APIs and services
- Test edge cases and error conditions
- Aim for meaningful test coverage, not just line coverage
- Use descriptive test names that specify behavior
- Group related tests with describe blocks
- Use test.utils.js for shared test setup/helpers

### Git Workflow
- Commit frequently with descriptive messages
- Use conventional commits format when possible
- Feature branches for new development
- Pull requests require review before merging
- Keep commit history clean and linear
- Tag releases with semantic versioning

### Debugging
- Use `debug=cloudinary` URL parameter for Cloudinary debugging
- Browser devtools for component inspection
- Svelte devtools extension for reactivity debugging
- Console.log for development debugging (remove before commit)
- Error boundary concepts via try/catch in async functions

### Build Optimization
- Vite handles code splitting automatically
- Enable gzip/brotli compression on server
- Optimize images before including in repo
- Minimize third-party dependencies
- Use dynamic imports for code splitting when beneficial
- Analyze bundle size with `rollup-plugin-visualizer` if needed

### Accessibility
- Use semantic HTML elements
- Ensure proper color contrast
- Support keyboard navigation
- Provide meaningful ARIA labels and roles
- Test with screen readers
- Skip navigation links for keyboard users
- Focus management for modal dialogs