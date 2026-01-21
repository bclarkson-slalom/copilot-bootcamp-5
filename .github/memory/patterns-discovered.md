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

### Pattern: React Query Error Handling

**Context**: Fetching data with React Query in React applications

**Problem**:
- API requests can fail due to network issues, server errors, or invalid responses
- Without error handling, users see no feedback when data fails to load
- React Query provides `isError` and `error` for handling query failures

**Solution**:
Always extract and handle `isError` and `error` from useQuery hooks, and display user-friendly error messages.

**Example**:

```javascript
const { data: todos = [], isLoading, isError, error } = useQuery({
  queryKey: ['todos'],
  queryFn: async () => {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error('Failed to fetch todos');
    }
    return response.json();
  },
});

// In JSX
{isError && (
  <Card>
    <CardContent>
      <Typography color="error">
        Error loading todos: {error?.message || 'Unknown error'}
      </Typography>
    </CardContent>
  </Card>
)}
```

**Related Files**: `packages/frontend/src/App.js`

**Notes**:
- Always throw errors in queryFn when response is not ok
- Display error messages in user-friendly format
- Use optional chaining for error.message to handle undefined
- Discovered during Step 5-3 (frontend implementation)

---

### Pattern: Relative API URLs

**Context**: Frontend applications communicating with backend APIs

**Problem**:
- Hardcoded `http://localhost:3001` URLs fail in different environments
- Cannot easily proxy API requests during development
- Tests need to mock absolute URLs

**Solution**:
Use relative URLs (`/api/todos`) instead of absolute URLs.

**Example**:

```javascript
// ❌ DON'T: Hardcoded URL
const API_URL = 'http://localhost:3001/api/todos';

// ✅ DO: Relative URL
const API_URL = '/api/todos';
```

**Related Files**: `packages/frontend/src/App.js`

**Notes**:
- Works with Create React App proxy configuration
- Simplifies testing by avoiding absolute URLs
- Discovered during Step 5-3 (frontend implementation)

---

### Pattern: Derived State Calculation

**Context**: React components displaying aggregate information from arrays

**Problem**:
- Hardcoded values don't reflect actual data
- Need to compute counts, filters, or aggregations from arrays

**Solution**:
Calculate derived values directly from props/data during render.

**Example**:

```javascript
const { data: todos = [] } = useTodos();

// Derive stats directly from todos array
const itemsLeft = todos.filter(todo => !todo.completed).length;
const completedCount = todos.filter(todo => todo.completed).length;

return (
  <Box>
    <Chip label={`${itemsLeft} items left`} />
    <Chip label={`${completedCount} completed`} />
  </Box>
);
```

**Related Files**: `packages/frontend/src/App.js`

**Notes**:
- No need for useState if value can be computed from existing data
- Keeps state minimal and reduces bugs from stale state
- Discovered during Step 5-3 (frontend implementation)

---

### Pattern: Conditional Rendering States

**Context**: React components that fetch data asynchronously

**Problem**:
- Need to show appropriate UI for loading, error, empty, and success states
- Avoid showing stale or misleading content

**Solution**:
Use conditional rendering with priority: loading → error → empty → content

**Example**:

```javascript
{isLoading && <CircularProgress />}

{isError && (
  <Typography color="error">
    Error loading: {error?.message}
  </Typography>
)}

{!isLoading && !isError && todos.length === 0 && (
  <Typography>No todos yet!</Typography>
)}

{!isLoading && !isError && todos.length > 0 && (
  <List>
    {todos.map(todo => <ListItem key={todo.id}>...</ListItem>)}
  </List>
)}
```

**Related Files**: `packages/frontend/src/App.js`

**Notes**:
- Order matters: check loading first, then errors, then empty, finally content
- Use `!isLoading && !isError` to ensure data is ready
- Discovered during Step 5-3 (frontend implementation)

---

### Pattern: Material-UI Accessible Buttons

**Context**: Using IconButton components from Material-UI

**Problem**:
- IconButtons without labels are not accessible to screen readers
- Testing Library cannot find buttons by role without accessible names

**Solution**:
Always add `aria-label` prop to IconButton components.

**Example**:

```javascript
<IconButton
  onClick={() => handleDelete(id)}
  aria-label="delete"
>
  <DeleteIcon />
</IconButton>
```

**Related Files**: `packages/frontend/src/App.js`

**Notes**:
- Makes components findable with `screen.findByLabelText('delete')`
- Improves accessibility for screen readers
- Discovered during Step 5-3 (frontend TDD cycle)

---

### Pattern: React Testing Library Mock Fetch

**Context**: Testing React components that use fetch for API calls

**Problem**:
- Tests need to control API responses without real network requests
- React Query requires `ok: true` property on responses

**Solution**:
Mock global fetch with proper response objects including `ok` and `json`.

**Example**:

```javascript
// Setup mock
global.fetch = jest.fn();

// Mock successful response
global.fetch.mockResolvedValueOnce({
  ok: true,
  json: () => Promise.resolve([{ id: 1, title: 'Test' }]),
});

// Mock error response
global.fetch.mockRejectedValueOnce(new Error('API Error'));

// Clear after each test
afterEach(() => {
  jest.clearAllMocks();
});
```

**Related Files**: `packages/frontend/src/__tests__/App.test.js`

**Notes**:
- Must include `ok: true` for successful responses
- Use `mockResolvedValueOnce` for single-use mocks
- Always clear mocks to prevent test pollution
- Discovered during Step 5-3 (writing frontend tests)

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
