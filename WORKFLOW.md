# WORKFLOW

Required workflow for making changes to the Design Canvas codebase.

All contributors (human or AI) must follow this workflow.

---

## Default Role

- The default executing role is **Product Architect**
- Review roles must be explicitly invoked

---

## Required Workflow Steps

### 0. Discovery Gate

Before planning any non-trivial change, determine whether discovery is required. Requirements and outputs are defined in `DISCOVERY.md`. If required, produce a Discovery Summary before proceeding.

### 0.5. Approach (Optional but Recommended)

For non-trivial changes, use the Approach phase between Discovery and Planning to evaluate multiple solution paths and tradeoffs before converging on a plan. See `APPROACH.md`.

---

### 1. Plan First
Before writing code:
- Propose an implementation plan
- Identify risks and mitigations
- Define a rollback plan

No code should be written before this step unless the change is trivial.

---

### 2. Implement in Small Steps
- Keep changes small and scoped
- Prefer multiple small commits over large ones
- Avoid scope creep

---

### 3. Self-Review Using Roles
Before marking work as complete:
- Switch to **Security Reviewer** and review
- Switch to **Regression Reviewer** and review
- Apply all blocking feedback

Additional reviewers (Performance, DX) should be used for risky changes.

---

### 4. Provide a Completion Summary
All completed work must include:
- Summary of what changed
- Files changed
- Risks and how they were mitigated
- Manual verification steps
- Tests run (or why none)
- Rollback steps

Work is not considered complete without this summary.

---

## Permission Handling for AI Contributors

To allow focused, autonomous execution and minimize interruption, AI contributors must follow the permission rules below.

### Operating Mode: Batched Permissions

AI contributors **must not** ask for step-by-step permission. They operate within a **pre-approved scope** defined at the start of each task.

### Pre-Approved Actions (Within Scope)

Unless explicitly restricted, AI contributors are pre-approved to:
- Edit only the files explicitly listed in the task
- Create small supporting files (types, helpers, docs) required to complete the task
- Refactor code only where necessary to complete the task
- Run only the commands explicitly listed in the task

### Not Pre-Approved Actions

AI contributors must **pause and request permission** before:
- Editing files outside the approved list
- Running commands not explicitly approved
- Rotating, deleting, or adding secrets
- Deploying to production
- Making irreversible or destructive changes
- Adding new dependencies

### Permission Gates

AI contributors may interrupt **only** at these gates:
1. Before any deploy, secret change, or irreversible action
2. When work must proceed outside the approved scope

Permission requests must be **batched into a single message** and include:
- Actions requested (explicit list)
- Reason each action is necessary
- Risk level (low / medium / high)
- Rollback plan

---

## Verification Must Be Automated

"Manual smoke test" is not an acceptable Definition-of-Done signal. Every milestone's DoD must be backed by one or more automated checks that run in CI:

- `npm run build` — TypeScript + Vite compile
- `npm run lint`
- `npm run test` — unit / integration (Vitest)
- `npm run test:e2e` — end-to-end (Playwright) for interaction flows

A PR is not merge-ready until all applicable checks are green in CI. Where an automated check cannot reasonably cover a behavior, the PR must say so explicitly and identify what *is* verified automatically.

The point: the user must be able to trust a green CI without re-running the feature by hand.

---

## Phase Output Review Rule

Artifacts produced by phases meant for user review — Discovery Summaries, Approach docs, Plans, or any substantive review document — must be **rendered inline in the chat window**, not only saved to a file on disk.

Saving to a file (e.g., under `docs/planning/`) is fine and preferred as the durable artifact. But the doc must also be rendered inline for review. Summaries with links are not acceptable — the full content must be visible in the chat so feedback can happen without context-switching.

After revisions are accepted, the on-disk file is the canonical artifact and the inline rendering can be omitted from subsequent turns.

---

## Communication Rules

- Do not ask questions unless blocked
- Do not interrupt repeatedly for confirmation
- Call out uncertainty explicitly
- Treat repo markdown files as authoritative

---

## Definition of Done

Work is considered done only when:
- All required reviews are complete
- Verification steps are provided
- Rollback is safe and obvious
- Constraints have not been violated
