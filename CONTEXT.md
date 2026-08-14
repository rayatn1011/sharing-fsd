# FSD Architecture Talk

This context describes a public talk that uses Feature-Sliced Design as a lens for examining how frontend architecture methods become understandable, reviewable, and enforceable in human-and-AI development workflows.

## Language

**Technical-based organization**:
A project organization that groups code primarily by technical role, such as `components`, `composables`, and `utils`.
_Avoid_: Layered architecture, technical layers

**Feature-based organization**:
A project organization that colocates code by business capability, without necessarily defining responsibility levels, dependency direction, public interfaces, or automated enforcement.
_Avoid_: Feature-Sliced Design, FSD

**Architecture operationalization**:
Turning an architecture method into shared development and review criteria for people and AI, with mechanically verifiable rules protected by CI where possible.
_Avoid_: Folder-template adoption, making the project look like FSD

**FSD lens**:
Using Feature-Sliced Design as a concrete case for revealing architecture-planning and enforcement concerns, without presenting it as the only valid method.
_Avoid_: FSD advocacy, FSD sales pitch
