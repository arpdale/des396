# ROLES

Authoritative engineering roles for the Design Canvas codebase.

Roles define **responsibility, scope, and veto power**.
All contributors (human or AI) must follow these roles when implementing or reviewing changes.

---

## Product Architect (Default Executor)

### Purpose
Own end-to-end implementation of features and refactors within Design Canvas.

### Responsibilities
- Design and implement features across UI, hooks, and services
- Ensure correct data flow, state ownership, and error handling
- Follow `CONSTRAINTS.md`, `WORKFLOW.md`, and `SECURITY.md` at all times
- Keep changes small, reversible, and well-scoped
- Provide clear verification and rollback steps

### Must Not
- Introduce new dependencies without clear justification
- Over-engineer abstractions
- Leave large files or unclear ownership without calling it out

### Cannot Override
- Security Reviewer blocks
- Constraints defined in `CONSTRAINTS.md`

---

## Security Reviewer (Hard Veto Role)

### Purpose
Prevent security regressions and reduce abuse risk.

### Responsibilities
- Review authentication/authorization logic
- Review API exposure and any new endpoints
- Review CORS, headers, cookies, and token handling
- Identify abuse vectors (rate limiting, public endpoints, bots)
- Ensure errors do not leak sensitive information

### Blocking Authority
May block any change that:
- Weakens authentication or access control
- Relies on client-side trust assumptions
- Exposes sensitive data or functionality
- Relies on obscurity instead of verification

### Must Not
- Optimize for delivery speed
- Suggest "temporary" security shortcuts

---

## Regression Reviewer (QA / Safety)

### Purpose
Catch changes that silently break existing behavior or user flows.

### Responsibilities
- Review edge cases and failure modes
- Verify state transitions and lifecycle behavior
- Ensure manual verification steps exist
- Ensure rollback is safe and obvious
- Identify missing tests or coverage gaps

### Blocking Authority
May block any change that:
- Lacks clear verification steps
- Risks breaking existing functionality
- Cannot be easily reverted
- Introduces ambiguous or fragile behavior

### Must Not
- Require perfect test coverage
- Block changes solely for stylistic reasons

---

## Performance & Scale Reviewer

### Purpose
Protect UX and responsiveness as the app grows.

### Responsibilities
- Review render and re-render behavior
- Review data-fetching patterns and duplication
- Identify unnecessary re-renders or heavy dependencies
- Consider bundle size and lazy loading

### Blocking Authority
May block any change that:
- Introduces obvious performance regressions
- Adds heavy libraries without clear benefit

### Must Not
- Prematurely optimize
- Block changes without measurable or observable impact

---

## DX & Maintainability Reviewer

### Purpose
Reduce future debugging, onboarding, and maintenance costs.

### Responsibilities
- Review file size and complexity
- Review clarity of naming and abstractions
- Ensure logic is explicit and debuggable
- Flag "clever" code that hides behavior
- Encourage consistency

### Blocking Authority
May block any change that:
- Introduces opaque or brittle abstractions
- Creates oversized files without justification
- Increases cognitive load unnecessarily

### Must Not
- Enforce personal style preferences
- Block changes solely for formatting

---

## Role Usage Rules

- One role executes (Product Architect)
- Review roles must be explicitly invoked
- Reviewers may block; executors may not override
- Roles must be switched explicitly during review
- All work must comply with `CONSTRAINTS.md` and `WORKFLOW.md`
