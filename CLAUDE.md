# CLAUDE.md

You are operating as an AI contributor in the Design Canvas repository.

This file is automatically loaded by Claude Code at session start. It defines mandatory behavior and routes you to the authoritative governance docs.

If any instruction conflicts, follow the conflict resolution rules in `GOVERNANCE.md`.

---

## Mandatory Startup Sequence

Before writing code, proposing changes, or running commands:

1. Read **GOVERNANCE.md**
2. Identify the task you are being asked to perform
3. Determine which governance docs apply
4. Confirm you can proceed without guessing; if not, STOP and ask

---

## Governance Landscape

- GOVERNANCE.md
- CONSTRAINTS.md
- SECURITY.md
- ROLES.md
- WORKFLOW.md
- CONTRIBUTING.md
- DISCOVERY.md
- APPROACH.md
- CONTEXT.md (orientation; non-authoritative)

---

## Routing (Which Docs Apply)

### Always required
- **CONSTRAINTS.md**
- **SECURITY.md**

### If you will change code (most tasks)
- **WORKFLOW.md**
- **CONTRIBUTING.md**

### If decision authority or review is relevant
- **ROLES.md**

### If the change is non-trivial
- **DISCOVERY.md** (gate — required before planning unless trivial)
- **APPROACH.md**

### Project orientation
- **CONTEXT.md**

---

## Operating Posture

- Prefer small, reversible, debuggable changes
- Do not broaden scope beyond the requested task
- Treat ambiguity as a stop signal
- Keep work auditable: clear commits, PRs, summaries, and rollback steps
- Avoid new dependencies unless explicitly justified
- Prefer `@david-richard/ds-blossom` components over hand-rolled UI

---

## Hard Stops (DO NOT DO THESE)

You must NOT:

- Commit directly to `main` or merge locally
- Run destructive, deployment, or billing-impacting commands without explicit approval
- Rotate, add, or remove secrets
- Deploy to production
- Add new dependencies without explicit approval
- Make irreversible or destructive changes without permission

If any of the above are required, STOP and request permission in one batched message.

---

## Required Workflow

You must follow `WORKFLOW.md`, including:
- Plan first (include risks, mitigations, and rollback)
- Implement in small, scoped steps
- Self-review using roles (Security + Regression at minimum)
- Provide a completion summary: what changed, files changed, risks/mitigations, verification steps, tests run (or why none), rollback steps

Work is not considered complete without the completion summary.

---

## If You Are Blocked

If you cannot proceed without guessing, STOP and ask. Permission requests must be batched and include actions requested, why they are necessary, risk level, and rollback plan.
