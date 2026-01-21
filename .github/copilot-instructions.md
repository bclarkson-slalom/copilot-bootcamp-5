# GitHub Copilot Instructions for TODO Application

## Project Context

This is a full-stack TODO application built with:
- **Frontend**: React (Create React App)
- **Backend**: Express.js with in-memory data store
- **Architecture**: Monorepo structure with separate frontend/backend packages

Development follows an **iterative, feedback-driven approach** focused on:
- Backend stabilization and API reliability
- Frontend feature completion and user experience
- Maintaining test coverage throughout

**Current Phase**: Backend stabilization and frontend feature completion

## Documentation References

Consult these documents to understand project structure and standards:
- [docs/project-overview.md](../docs/project-overview.md) - Architecture, tech stack, and project structure
- [docs/testing-guidelines.md](../docs/testing-guidelines.md) - Test patterns and standards
- [docs/workflow-patterns.md](../docs/workflow-patterns.md) - Development workflow guidance

## Development Principles

Follow these core principles in all development work:

1. **Test-Driven Development (TDD)**: Follow the Red-Green-Refactor cycle
   - Write failing test first (RED)
   - Implement minimal code to pass (GREEN)
   - Improve code quality while keeping tests passing (REFACTOR)

2. **Incremental Changes**: Make small, testable modifications
   - One feature or fix at a time
   - Each change should be independently testable
   - Verify before moving to the next change

3. **Systematic Debugging**: Use test failures as guides
   - Read error messages carefully
   - Isolate the failing component
   - Fix root cause, not symptoms

4. **Validation Before Commit**: Ensure quality at every step
   - All tests must pass
   - No lint errors
   - Code meets project standards

## Testing Scope

This project uses **unit tests and integration tests ONLY**:

### Supported Testing Approaches
- **Backend**: Jest + Supertest for API endpoint testing
- **Frontend**: React Testing Library for component unit and integration tests
- **Manual Testing**: Browser testing for full UI verification and user flows

### Testing Approach by Context

**Backend API Changes** (Test-First):
1. Write Jest/Supertest tests FIRST that define the expected API behavior
2. Run tests and see them FAIL (RED)
3. Implement the API endpoint/logic to make tests pass (GREEN)
4. Refactor while keeping tests passing (REFACTOR)

**Frontend Component Features** (Test-First):
1. Write React Testing Library tests FIRST for component behavior
2. Run tests and see them FAIL (RED)
3. Implement the component/feature to make tests pass (GREEN)
4. Refactor while keeping tests passing (REFACTOR)
5. Follow with manual browser testing for full UI flows

### Explicitly NOT Supported

**DO NOT suggest or implement**:
- End-to-end (e2e) test frameworks: Playwright, Cypress, Selenium
- Browser automation tools
- Visual regression testing tools
- Integration with external testing services

**Reason**: This lab focuses on unit and integration testing skills without the added complexity of e2e testing infrastructure.

## Workflow Patterns

Follow these workflow patterns for different development contexts:

### 1. TDD Workflow (Red-Green-Refactor)
```
Write/Fix Test → Run Tests → See Failure (RED) 
  → Implement Code → Tests Pass (GREEN) 
  → Refactor → Tests Still Pass → Commit
```

**Key Points**:
- Always write the test BEFORE the implementation
- Run tests to see the failure before implementing
- Implement only enough to make tests pass
- Refactor only after tests are green

### 2. Code Quality Workflow
```
Run Lint → Categorize Issues → Fix Systematically 
  → Re-validate → Ensure No Errors → Commit
```

**Key Points**:
- Group similar lint errors together
- Fix one category at a time
- Re-run linter after each batch of fixes
- Verify no new errors introduced

### 3. Integration Workflow
```
Identify Issue → Debug (logs/tests) → Write/Update Test 
  → Fix Implementation → Verify End-to-End → Commit
```

**Key Points**:
- Reproduce issue in tests when possible
- Fix both test and implementation
- Verify the fix works across the stack

## Chat Mode Usage

Use specialized chat modes for focused assistance:

### `tdd-developer` Mode
**Use for**:
- Writing new tests (backend or frontend)
- Following Red-Green-Refactor cycles
- Test-driven feature development
- Debugging test failures
- Refactoring with test safety net

### `code-reviewer` Mode
**Use for**:
- Addressing ESLint errors
- Code quality improvements
- Identifying code smells
- Suggesting refactoring opportunities
- Ensuring code standards compliance

## Memory System

The project uses a working memory system to track discoveries, patterns, and lessons learned during development:

- **Persistent Memory**: This file (`.github/copilot-instructions.md`) contains foundational principles and workflows
- **Working Memory**: `.github/memory/` directory contains discoveries and patterns
  - `session-notes.md` - Historical summaries of completed sessions (committed to git)
  - `patterns-discovered.md` - Accumulated code patterns and solutions (committed to git)
  - `scratch/working-notes.md` - Active session notes for current work (NOT committed)

### How to Use

**During Active Development**:
- Take notes in `.github/memory/scratch/working-notes.md` as you work
- Document current task, approach, findings, decisions, blockers, and next steps
- Reference these notes when asking AI for help

**At End of Session**:
- Summarize key findings into `.github/memory/session-notes.md`
- Document recurring patterns in `.github/memory/patterns-discovered.md`
- Commit the session notes and patterns (scratch/ is git-ignored)

**When Providing AI Context**:
- Reference these files to maintain context across sessions
- AI uses patterns-discovered.md to suggest consistent solutions
- Session notes provide historical context for decision-making

See [.github/memory/README.md](.github/memory/README.md) for detailed guidance on using the memory system.

## Workflow Utilities

The project includes GitHub CLI integration for workflow automation. All chat modes have access to these commands:

### GitHub Issue Commands

```bash
# List all open issues
gh issue list --state open

# View specific issue details
gh issue view <issue-number>

# View issue with all comments
gh issue view <issue-number> --comments
```

### Exercise Workflow

- The main exercise issue has "Exercise:" in the title
- Individual steps are posted as comments on the main issue
- Use `/execute-step` prompt to begin a step
- Use `/validate-step` prompt to verify completion

**When prompted with these commands**:
1. Use `gh issue list` to find the exercise issue
2. Use `gh issue view <number> --comments` to see all steps
3. Read the relevant step/comment
4. Execute the required work
5. Validate against step requirements

## Git Workflow

Follow these Git practices for consistent commit history:

### Conventional Commits

Use conventional commit format for all commits:

```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

**Types**:
- `feat:` - New feature
- `fix:` - Bug fix
- `test:` - Adding or updating tests
- `chore:` - Maintenance tasks, dependencies
- `docs:` - Documentation changes
- `refactor:` - Code restructuring without behavior change
- `style:` - Code formatting, whitespace
- `perf:` - Performance improvements

**Examples**:
```bash
git commit -m "feat(backend): add DELETE /todos/:id endpoint"
git commit -m "test(frontend): add tests for TodoList component"
git commit -m "fix(backend): handle missing todo ID in update"
git commit -m "chore: update dependencies to latest versions"
```

### Branching Strategy

- **Main branch**: `main` - stable, tested code
- **Feature branches**: `feature/<descriptive-name>` - new features
- **Fix branches**: `fix/<descriptive-name>` - bug fixes

### Commit Workflow

1. **Stage all changes**: `git add .`
2. **Commit with message**: `git commit -m "type(scope): description"`
3. **Push to branch**: `git push origin <branch-name>`

Always ensure tests pass and lint is clean before pushing.

---

**Note**: These instructions help GitHub Copilot provide context-aware assistance throughout the development process. Refer to the linked documentation for detailed guidance on specific topics.
