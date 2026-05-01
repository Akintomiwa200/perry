# Security Policy

## Reporting a Vulnerability

We take the security of Perry seriously. If you believe you have found a security
vulnerability, please report it to us as described below.

### Disclosure Method

**Please DO NOT report security vulnerabilities through public GitHub issues.**

Instead, please report them to: **security@perrycollectibles.com**

You should receive a response within 48 hours. If for some reason you do not,
please follow up via email to ensure we received your original message.

### What to Include

Please include the following information (as much as you can provide):

- Type of issue (e.g., buffer overflow, SQL injection, cross-site scripting, etc.)
- Full paths of source file(s) related to the manifestation of the issue
- The location of the affected source code (tag/branch/commit or direct URL)
- Any special configuration required to reproduce the issue
- Step-by-step instructions to reproduce the issue
- Proof-of-concept or exploit code (if possible)
- Impact of the issue, including how an attacker might exploit it

### Preferred Languages

We prefer all communications to be in English.

## Scope

We will only address security vulnerabilities in:

- The current release and the previous release
- The `main` branch

Vulnerabilities in third-party libraries (e.g., npm packages) should be
reported to their respective maintainers.

## Responsible Disclosure

We follow a responsible disclosure policy:

1. Reporter submits vulnerability privately
2. We acknowledge receipt within 48 hours
3. We investigate and validate the report (1-5 business days)
4. We develop and test a fix
5. We release a patch and credit the reporter (unless they wish to remain anonymous)
6. We publicly disclose the vulnerability after users have had time to update

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 0.1.x   | :white_check_mark: |
| < 0.1   | :x:                |

## Security Best Practices for Contributors

When contributing to Perry, please follow these security best practices:

- Never commit secrets (API keys, passwords, JWT secrets) to the repository
- Always use parameterized queries to prevent SQL injection
- Validate and sanitize all user inputs
- Use TypeScript strict mode — avoid `any` types where possible
- Keep dependencies up to date (`npm audit`, `npm update`)
- Follow the principle of least privilege for database connections
- Use HTTPS in production
- Hash passwords with bcryptjs (already implemented)

## Known Security Measures in Perry

- ✅ JWT-based authentication with `jose`
- ✅ Password hashing with `bcryptjs`
- ✅ Parameterized SQL queries (prevents SQL injection)
- ✅ Server-side input validation with Zod schemas
- ✅ Environment variables for secrets (`.env` is gitignored)
- ✅ CSRF protection via SameSite cookies
- ✅ XSS protection (React automatically escapes JSX)
- ✅ TypeScript strict mode enabled

## Contact

Security Coordinator: **security@perrycollectibles.com**

GPG Key: [security@perrycollectibles.com.gpg](https://perrycollectibles.com/security.gpg)
Old-Fingerprint: `XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX`
