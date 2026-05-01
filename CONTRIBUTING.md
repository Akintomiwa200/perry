# Contributing to Perry

Thank you for your interest in contributing to Perry! This document provides guidelines and instructions for contributing.

## Code of Conduct

By participating in this project, you agree to abide by our [Code of Conduct](CODE_OF_CONDUCT.md).

## How Can I Contribute?

### Reporting Bugs

- Check if the bug has already been reported in [Issues](https://github.com/yourusername/perry/issues)
- Use the bug report template if creating a new issue
- Include detailed steps to reproduce the bug
- Include expected vs actual behavior

### Suggesting Enhancements

- Check if the enhancement has already been suggested in [Issues](https://github.com/yourusername/perry/issues)
- Use the feature request template
- Describe the enhancement with as much detail as possible

### Pull Requests

1. Fork the repository
2. Create a new branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Run tests if available (`npm test`)
5. Run lint (`npm run lint`)
6. Commit your changes (`git commit -m 'Add some amazing feature'`)
7. Push to the branch (`git push origin feature/amazing-feature`)
8. Open a Pull Request

## Development Setup

```bash
# Clone the repository
git clone https://github.com/yourusername/perry.git
cd perry

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your configuration

# Run development server
npm run dev
```

## Coding Guidelines

### TypeScript

- Use TypeScript for all new code
- Define proper types/interfaces
- Avoid using `any` when possible
- Run `npm run type-check` before submitting

### Styling

- Use Tailwind CSS for styling
- Follow the existing design system (CSS variables in `globals.css`)
- Use the `clsx` and `tailwind-merge` utilities for conditional classes

### Component Structure

- Use functional components with hooks
- Keep components small and focused
- Use `'use client'` directive for client components
- Use server components by default

### State Management

- Use Redux (via `@reduxjs/toolkit`) for global state
- Use Zustand for UI state (toasts, modals, etc.)
- Use React's built-in state for local component state

### Database

- Use the `pg` library for database queries
- Always use parameterized queries to prevent SQL injection
- Create necessary database tables via `db/schema.sql`

## Commit Messages

Follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

- `feat:` - A new feature
- `fix:` - A bug fix
- `docs:` - Documentation only changes
- `style:` - Changes that do not affect the meaning of the code
- `refactor:` - A code change that neither fixes a bug nor adds a feature
- `test:` - Adding missing tests or correcting existing tests
- `chore:` - Changes to the build process or auxiliary tools

Example: `feat: add product reviews feature`

## Review Process

1. All PRs must be reviewed by at least one maintainer
2. Address all review comments
3. Ensure CI checks pass
4. Squash commits if requested

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
