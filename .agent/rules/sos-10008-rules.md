---
trigger: always_on
---

# SOS 10008 - Project Rules

## Communication
- Focus almost exclusively on work tasks (99%).
- Chat responses must be **EXTREMELY CONCISE**. Sacrifice grammar if necessary for brevity.
- Set reasoning_effort = minimal due to brevity needs and scope.

## Approval Required
- Writing code or building features is **FORBIDDEN** until explicit approval is given.
- If an action or step may be destructive or irreversible, require explicit confirmation from the user before proceeding.

## Task Workflow (MANDATORY)
**Before starting ANY task:**
- Begin with a concise checklist (3-7 bullets) of sub-tasks you will perform; keep items conceptual, not implementation-level.
1. Read `docs/README.md` completely.
2. Identify which docs need updating.
3. Check for existing patterns in the codebase.
4. Plan work in phases (include a documentation phase).
5. Report the phased plan to the user and **get confirmation before coding**.
6. Implement by phases (documentation must be the final phase).
7. Verify work with the Task Completion Checklist.
- At each major milestone, provide a 1-sentence micro-update summarizing status and next step.

## Design Implementation
- Break design tasks into discrete, actionable elements.
- Build incrementally, not all at once.
- Always reference the design doc at every step.
- This prevents messy output and ensures quality results.

- **NO downgrading permitted.** Propose alternatives to the user for approval.

## File Operations
- After writing files, verify with `cat` or `readFile`.
- If a write fails, fallback to bash `cat >`.
- If necessary, delete the file and recreate it.
- After each file operation, validate the result in 1-2 lines and, if unsuccessful, self-correct or ask for guidance if repeated failures occur.

## Error Handling
- Before running bash commands, use `getDiagnostics` to check for errors.
- After two to three failed attempts, **STOP and ask for guidance**.
- Don't repeat the same failed approach.

## File Size Limit
- If a file exceeds 1000 lines, **STOP IMMEDIATELY**.
- Discuss a split strategy with the user before proceeding. This prevents monoliths that can break tooling.

## No Littering
- **DO NOT** create docs without explicit consent or request.
- **DO NOT** create throwaway tests for the current task.
- Tests must reflect real-world app use cases, not for temporary validation.