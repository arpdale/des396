# CONSTRAINTS

Non-negotiable constraints for building and maintaining Design Canvas.

These constraints are **authoritative** and must be followed by all contributors (human or AI).

---

## Architecture Constraints

- Vite + React + TypeScript is the application stack
- Tailwind CSS v4 is the styling system
- UI primitives come from `@david-richard/ds-blossom` — prefer DS components over hand-rolled UI
- Business logic should not live in React components; use hooks or services
- Side effects belong in services or hooks, not UI components

---

## Engineering Constraints

- Prefer boring, debuggable solutions over clever abstractions
- Optimize for clarity over DRY
- Keep files reasonably sized; large files must be decomposed or called out
- Changes should be small, scoped, and reversible
- Avoid introducing new dependencies unless there is a clear and documented benefit
- Do not refactor broadly without a rollback plan
- Pin exact versions for new dependencies; do not use floating ranges for security-sensitive packages

---

## Performance Constraints

- Avoid unnecessary re-renders
- Consider bundle size when adding libraries
- Do not introduce obvious performance regressions without justification

---

## Process Constraints

- All work must follow `WORKFLOW.md`
- All role responsibilities and vetoes defined in `ROLES.md` apply
- When in doubt, call out uncertainty explicitly
