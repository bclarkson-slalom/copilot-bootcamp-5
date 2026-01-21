# Code Patterns Discovered

## Purpose

This file documents **reusable code patterns** discovered during development. When you encounter a recurring problem or find an effective solution, document it here for future reference and AI context.

**When to update**: When you discover a pattern that applies broadly across the codebase or solves a recurring problem.

---

## Pattern Template

Use this template when documenting new patterns:

```markdown
## Pattern: [Pattern Name]

**Context**: [When/where this pattern applies]

**Problem**: [What problem does this solve]

**Solution**: [The pattern to follow]

**Example**:
```javascript
// Code example showing the pattern
```

**Related Files**: [Where this pattern is used]

**Notes**: [Additional context, gotchas, or considerations]
```

---

## Discovered Patterns

### Pattern: Service Initialization with Empty Arrays

**Context**: Initializing data stores in backend services (Express.js with in-memory storage)

**Problem**: 
- Uninitialized arrays result in `undefined` instead of empty array
- Operations like `.push()`, `.find()`, or `.length` on undefined cause crashes
- Tests fail with "Cannot read property of undefined" errors

**Solution**: 
Always explicitly initialize service arrays to empty arrays, never leave as undefined or null.

**Example**:

```javascript
// ❌ DON'T - Declaration without initialization
let todos;

// ❌ DON'T - Initialize to null
let todos = null;

// ✅ DO - Explicit empty array initialization
let todos = [];

// ✅ DO - Initialize with counter
let todos = [];
let nextId = 1;
```

**Related Files**: 
- `packages/backend/src/app.js` - Todo service initialization
- Any future services (users, projects, etc.)

**Notes**: 
- This pattern prevents null pointer errors without adding null checks everywhere
- Applies to all in-memory collections in this project
- Makes code more predictable and tests more reliable
- Discovered during Step 5-1 (TDD cycle) when fixing initialization bugs

---

### Pattern: [Your Next Pattern]

[Document new patterns here as you discover them during development]

---

## Pattern Categories

As patterns accumulate, consider organizing them into categories:

- **Data Initialization**: How to initialize data structures
- **Error Handling**: Consistent error response patterns
- **API Design**: REST endpoint conventions
- **Testing**: Test setup and assertion patterns
- **React Components**: Component structure and state management
- **State Management**: React Query patterns and conventions

Add category headers above as needed when you have multiple patterns in the same category.
