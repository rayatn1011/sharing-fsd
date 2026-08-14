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

**Problem framework**:
The talk-wide progression from technical-based organization through feature-based organization to the FSD lens; it frames the problem but is not counted as a real pitfall case.
_Avoid_: Real case, case study

**Real pitfall case**:
An anonymized first-person event with a confirmed architectural decision, observable consequence, and lesson; synthetic details remain explicitly labeled and are never presented as personal facts.
_Avoid_: Problem framework, unlabeled synthetic example

**UI control**:
A reusable presentation unit whose interface accepts its value, available data, and user interactions without owning feature-specific form or backend-data policy.
_Avoid_: Shared form component, API-bound control

**Form adapter**:
An integration boundary that connects a UI control to field state, validation, and error presentation for a particular form context.
_Avoid_: UI control, backend-data owner

**Server-data owner**:
The page or feature responsibility that selects a backend source and governs fetching, transformation, loading, and error policy before supplying data to a UI control.
_Avoid_: UI control, form adapter

**Shared field rule**:
A validation constraint whose meaning must remain identical wherever the same user field appears, regardless of which feature composes it.
_Avoid_: Global user schema, duplicated field schema

**Feature form schema**:
The feature-owned composition that selects its required fields and applies feature-specific validation while reusing only genuinely stable shared field rules.
_Avoid_: Shared field rule, universal user schema

**Validation drift**:
Behavioral divergence between duplicated copies of a field rule that is intended to remain identical across features.
_Avoid_: Feature-specific validation, schema variation

**Auth state owner**:
The stable lower-layer boundary that owns application-wide token and session state, chosen as Shared infrastructure or an Entity domain model rather than a single login feature.
_Avoid_: Login feature state, universal User store

**Auth wiring**:
The App-layer composition that supplies an auth implementation or injects a current token provider into lower-layer API infrastructure without reversing the import direction.
_Avoid_: Auth state owner, feature cross-import

**Composition root**:
The App-level boundary where concrete dependencies are assembled and supplied to lower-level contracts; Vue Plugin installation and app-level provide/inject are one implementation of this role.
_Avoid_: Shared state owner, dependency injection container
