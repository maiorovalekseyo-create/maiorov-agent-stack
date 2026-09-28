# Using MAIOROV STACK

Canonical source:
https://github.com/maiorovalekseyo-create/maiorov-agent-stack

## In a project
Add a project AGENTS.md that says the project follows MAIOROV STACK, then include project-specific rules only.

Recommended durable files:
- PROJECT.md
- DESIGN.md
- DECISIONS.md

## In ChatGPT
Treat the repository above as the canonical detailed rule source. Account memory/customization should only carry the short bootstrap idea, not copy the entire stack.

Suggested bootstrap text:
"Use MAIOROV STACK as my default work method. Canonical source: https://github.com/maiorovalekseyo-create/maiorov-agent-stack. Proactively choose the best implementation path, scout/reuse before custom build, preserve approved work, fix root causes, verify before saying done, and maintain durable project context."

## In Codex / coding agents
Prefer a project-level AGENTS.md plus the relevant skills from this repository. Keep project-specific state local to the project; keep global behavior here.

## Updating the stack
Change global behavior here once, then refresh project bootstrap files only when needed. Do not fork the full stack into every project unless the agent platform requires local copies.
