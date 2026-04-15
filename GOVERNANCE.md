# GOVERNANCE

This document is the **authoritative entry point** for all work on the Design Canvas codebase.

It applies to:
- Human contributors
- AI coding agents (e.g. Claude Code, Cursor, future agents)
- Any automated system that reads, writes, or modifies repository files

No code, architecture, or workflow decisions should be made without first aligning to this governance model.

---

## Purpose

This document exists to:

- Establish a single source of truth for how work is governed
- Ensure humans and AI agents follow the same operating rules
- Eliminate the need to re-explain workflow and constraints
- Provide a predictable, auditable development lifecycle

This file does **not** restate detailed rules.
It defines **how to navigate and apply** the other governance documents.

---

## Governance Model (How This Repo Is Structured)

Design Canvas governance is layered:

1. **GOVERNANCE.md**
   → Entry point and authority model

2. **Non-Negotiable Rules**
   → `CONSTRAINTS.md`
   → `SECURITY.md`

3. **Roles & Decision Authority**
   → `ROLES.md`

4. **Execution & Process**
   → `WORKFLOW.md`
   → `CONTRIBUTING.md`

5. **Agent-Specific Instructions**
   → `CLAUDE.md`
   → Claude Code auto-loads CLAUDE.md; it must contain only agent startup and behavior instructions.

6. **Discovery & Approach**
   → `DISCOVERY.md`
   → `APPROACH.md`

7. **Codebase Orientation**
   → `CONTEXT.md`
   → Structural overview, system map, and mental model (evergreen, non-authoritative)

All contributors are expected to route themselves correctly through these documents.

---

## Required Reading by Situation

### Required for **all work**
- `CONSTRAINTS.md`
- `SECURITY.md`

### New to the codebase (recommended)
- `CONTEXT.md`

### Writing or changing code
- `WORKFLOW.md`
- `CONTRIBUTING.md`

### Acting as an AI agent
- `CLAUDE.md`

Failure to consult the relevant documents is considered a governance violation.

---

## Session Start Contract (MANDATORY)

At the start of **every working session** (human or agent):

1. Identify the task you are working on
2. Determine which governance documents apply
3. Confirm no constraints are being violated
4. Call out uncertainty before proceeding
5. Do not make assumptions to move faster

If required information is missing or unclear:
- **Pause**
- **Ask**
- **Do not guess**

---

## Behavioral Expectations

For non-trivial work, contributors should avoid proposing a single plan without either:

- Explicitly justifying why alternatives are not meaningful, or
- Presenting multiple approaches and tradeoffs

See `APPROACH.md`.

---

## Authority & Conflict Resolution

If guidance conflicts:

1. `SECURITY.md` and `CONSTRAINTS.md` override all other documents
2. Role-based vetoes defined in `ROLES.md` apply
3. This document defines how conflicts are resolved

When in doubt, stop and escalate.

---

## Enforcement

These governance rules are not advisory.

Violations include:
- Bypassing workflow rules
- Ignoring security requirements
- Making architectural changes without alignment
- AI agents proceeding under uncertainty
- Skipping required reviews or summaries

Governance violations are treated as bugs.

---

## Single Entry Point Rule

When referencing "how work is done on Design Canvas":
- Reference **this file only**
- Do not list or restate other markdown files
- Let this document route contributors correctly

If you are unsure where to start:
→ Start here.
