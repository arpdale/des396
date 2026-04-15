# SECURITY

Security posture and non-negotiable requirements for Design Canvas.

This document is **authoritative**. All contributors (human and AI) must follow it.

It states **what must be true**, not how to achieve it.

---

## Security Model

- Client-side code must be treated as untrusted.
- Any server endpoint introduced must enforce authentication and authorization explicitly.
- Security is based on verification, not obscurity.

---

## Non-Negotiable Rules

These are absolute. Violation is a bug.

1. Sensitive data (tokens, secrets, credentials, API keys) must never be logged or committed.
2. Secrets must live in environment variables, not source files.
3. All external inputs must be validated at the boundary.
4. Error messages must not reveal internal state, stack traces, or configuration.
5. CORS must be restrictive in production; wide-open CORS is prohibited.
6. Rate limiting must be applied to abuse-prone endpoints.
7. If a security control cannot be added immediately, the risk must be called out in the PR.
8. Dependencies must be reviewed before adoption; prefer well-maintained packages.

---

## Sensitive Data Handling

- Do not log secrets, tokens, or authorization headers.
- Do not log raw request bodies if they may contain user data.
- Do not expose stack traces or configuration details to clients.
- Error messages must be safe-by-default and non-revealing.

---

## Security Review Triggers

Any changes affecting the following require review under the **Security Reviewer** role (see `ROLES.md`):

- Authentication or session handling
- Token handling or verification
- CORS configuration
- New external API integrations
- New dependencies
- Anything that handles user-provided input
