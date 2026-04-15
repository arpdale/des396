# Contributing to Design Canvas

Authoritative workflow for contributing code to this repository.

Applies to:
- Human engineers
- AI coding agents (e.g. Claude Code)
- Any automated system making changes to the codebase

ALL contributors MUST follow this document.

---

## Core Principles

1. `main` is protected — no direct commits; all changes enter via Pull Request
2. Work happens on feature branches — one logical unit of work per branch
3. Commits are incremental and meaningful — stable checkpoints, not experiments
4. PRs are the unit of review and merge — merges happen via GitHub, not locally
5. State lives in Git — if it isn't committed and pushed, it doesn't exist

---

## Branching Model

Canonical naming:
- `feature/<short-description>`
- `fix/<short-description>`
- `chore/<short-description>`

Branches are created locally from an up-to-date `main`, then pushed.

If the scope is unclear, ask before branching — do not guess at naming. This applies especially to AI agents.

---

## Local Workflow

### 1. Start from main
- Checkout `main`, pull latest, create a new branch locally
- Never branch off another feature branch unless explicitly coordinating

### 2. Make Changes Incrementally
Good commit units: one component, one fix, one refactor.
Bad commit units: "WIP", multiple unrelated changes, broken states.

### 3. Commit Frequently (But Not Noisily)
Commit when the code builds and the change is logically complete. Messages should be descriptive and scoped.

Avoid: `fix`, `stuff`, `try again`, `updates`.

### 4. Push Early, Push Often
Push your branch to the remote regularly — backup, review, conflict avoidance, and AI context recovery.

---

## Pull Requests

Open a PR when the feature is complete, you want structured review, or you want to signal "this branch exists and is active." PRs are cheap; conflicts are expensive.

- Use **Draft PRs** for in-progress work
- Convert to **Ready** when complete with all checks passing

---

## Merging Policy

All merges happen via GitHub.

Do NOT:
- Merge `main` into your branch locally
- Merge your branch into `main` locally
- Force-push `main`

Approved methods: squash merge (preferred for features) or rebase merge (for clean linear history).

After merge: delete the feature branch on the remote.

---

## Conflict Prevention

- Keep branches short-lived
- Pull `main` before major new work
- Avoid touching unrelated files
- Push frequently
- Never rebase shared branches

Resolve conflicts on the feature branch, never on `main`.

---

## AI Agent Rules (MANDATORY)

AI agents MUST:
1. Never commit directly to `main`
2. Always work on a feature branch
3. Commit incrementally with clear messages
4. Push changes before context switches
5. Open a PR for all changes
6. Never merge locally
7. Treat this document as authoritative

If unsure: STOP, ask for clarification, do not guess. Violations are bugs.
