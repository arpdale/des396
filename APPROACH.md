# Approach

## Purpose

The Approach phase exists to prevent premature convergence.

Its job is to explicitly explore multiple viable solution paths **before** planning or implementation begins, especially for non-trivial product, UX, or architectural changes.

Approach is about *option evaluation*, not execution.

---

## When Approach Is Used

Recommended when:
- Introducing a new feature or workflow
- Making non-trivial UX or interaction changes
- Refactoring flows that affect user behavior
- Changing data models, persistence, or system boundaries
- Confidence in the "obvious" solution is not clearly high

May be skipped for:
- Small, mechanical changes
- Pure copy edits
- Isolated bug fixes with clear root cause
- Changes where alternatives are not meaningfully different

If skipped, state the reason explicitly.

---

## What an Approach Must Include

1. **Problem Restatement** — what is broken/limiting today, the desired outcome, and key constraints
2. **Multiple Viable Approaches** — at least **two** meaningfully different paths
3. **Tradeoff Analysis** — UX implications, technical complexity/risk, future extensibility, alignment with product values
4. **Provisional Recommendation** — one approach with clear rationale and why others were not chosen
5. **Open Questions / Decisions** — unknowns that need resolution before planning

---

## What Approach Must NOT Include

- Task breakdowns
- File-level architecture
- Detailed schemas or APIs
- Code or pseudocode
- Implementation timelines

Those belong in Planning.

---

## Exit Criteria

Approach is complete when a single direction is chosen with awareness of alternatives, tradeoffs are understood and accepted, and remaining unknowns are clearly identified.

Only after this should Planning begin.

---

## Relationship to Other Phases

- **Discovery** answers: "Do we understand the problem?"
- **Approach** answers: "What are the reasonable ways to solve it?"
- **Planning** answers: "How do we execute the chosen approach safely?"

---

## Guiding Principle

If a solution feels "obvious" too quickly, that is often a signal that Approach is needed.
