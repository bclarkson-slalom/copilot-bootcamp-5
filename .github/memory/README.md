# Working Memory System

## Purpose

This memory system helps track **patterns, decisions, and lessons** learned during development. It serves as a knowledge base that both developers and AI assistants can reference to maintain context across sessions and apply accumulated learnings to future work.

## Why Memory Matters

Software development is an iterative learning process. As you work through bugs, implement features, and refactor code, you discover:

- **Patterns**: Recurring problems and their solutions
- **Decisions**: Why certain approaches were chosen
- **Context**: Project-specific conventions and constraints
- **Lessons**: What worked, what didn't, and why

Without a memory system, this knowledge is lost when sessions end, forcing you to rediscover the same insights repeatedly.

## Two Types of Memory

### Persistent Memory (Foundational)

**Location**: `.github/copilot-instructions.md`

**Contents**: 
- Core development principles
- Workflow patterns (TDD, linting, debugging)
- Project architecture and standards
- Universal guidelines that rarely change

**Purpose**: Provides the foundation for all development work. These are the rules of the road.

### Working Memory (Discoveries)

**Location**: `.github/memory/`

**Contents**:
- Session summaries (historical)
- Code patterns discovered
- Active session notes (ephemeral)

**Purpose**: Captures project-specific learnings that emerge during development.

## Directory Structure

```
.github/memory/
├── README.md                    # This file - explains the system
├── session-notes.md             # Historical session summaries (COMMITTED)
├── patterns-discovered.md       # Accumulated code patterns (COMMITTED)
└── scratch/
    ├── .gitignore              # Ignores all files in scratch/
    └── working-notes.md        # Active session notes (NOT COMMITTED)
```

### File Purposes

#### `session-notes.md` (Committed to Git)
- **When to use**: At the END of each development session
- **What to record**: Summary of what was accomplished, key findings, decisions made
- **Why committed**: Historical record of project evolution
- **Format**: Date-stamped entries, newest first

#### `patterns-discovered.md` (Committed to Git)
- **When to use**: When you discover a recurring pattern or solution
- **What to record**: Pattern name, context, problem, solution, examples
- **Why committed**: Reusable knowledge base for the project
- **Format**: Structured pattern documentation

#### `scratch/working-notes.md` (NOT Committed)
- **When to use**: DURING active development sessions
- **What to record**: Current task, approach, findings, decisions, blockers, next steps
- **Why NOT committed**: Ephemeral work-in-progress that's only relevant during active work
- **Format**: Free-form notes organized by sections

## How to Use This System

### During Development (Active Session)

1. **Start Session**: Open `scratch/working-notes.md`
2. **Document as You Go**:
   - Write down your current task and approach
   - Note key findings as you debug or implement
   - Record decisions and their rationale
   - Track blockers and how you overcame them
   - List next steps

3. **Use with AI**: Reference these notes in your AI prompts:
   ```
   "I'm working on the toggle bug. According to my notes in 
   scratch/working-notes.md, I found that the issue is in line 45. 
   Help me implement the fix."
   ```

### TDD Workflow + Memory

```
1. RED (Failing Test)
   → Document test failure in working-notes.md
   → Note what the test expects vs what it gets

2. GREEN (Pass Test)
   → Document the solution approach
   → Note any patterns discovered

3. REFACTOR
   → Document refactoring decisions
   → If pattern is reusable, add to patterns-discovered.md

4. COMMIT
   → Tests pass, code clean
```

### Linting Workflow + Memory

```
1. Run Lint
   → Document error categories in working-notes.md
   → Note which errors appear frequently

2. Fix Systematically
   → Document approach for each error type
   → If pattern emerges, add to patterns-discovered.md

3. Verify
   → Note completion in working-notes.md
```

### Debugging Workflow + Memory

```
1. Identify Issue
   → Document symptoms in working-notes.md
   → Note reproduction steps

2. Isolate Problem
   → Document debugging process
   → Record what you tried and results

3. Fix & Validate
   → Document solution and why it works
   → If pattern discovered, add to patterns-discovered.md
```

### End of Session (Session Close)

1. **Review** `scratch/working-notes.md`
2. **Extract** key findings and decisions
3. **Summarize** into `session-notes.md`
4. **Document** any patterns into `patterns-discovered.md`
5. **Clean** `scratch/working-notes.md` for next session (or leave as reference)
6. **Commit** session-notes.md and patterns-discovered.md

## How AI Uses This Memory

When you work with GitHub Copilot or other AI assistants:

### AI Reads Automatically
- `.github/copilot-instructions.md` - Foundational principles
- `.github/memory/patterns-discovered.md` - Project patterns
- `.github/memory/session-notes.md` - Recent context

### You Reference Explicitly
```
"According to patterns-discovered.md, we handle service 
initialization with empty arrays. Apply this pattern to 
the new UserService."
```

### AI Applies Context
- Suggests code that follows discovered patterns
- Avoids previously documented pitfalls
- Maintains consistency with project decisions
- Recalls solutions to recurring problems

## Example Usage Scenarios

### Scenario 1: Found a Bug Pattern

**During debugging**, you discover that all service initializations in this project use empty arrays instead of null to prevent null pointer errors.

**Action**:
1. Note in `scratch/working-notes.md`: "Found pattern - services use empty arrays"
2. After fixing bug, document in `patterns-discovered.md` as reusable pattern
3. When session ends, summarize in `session-notes.md`: "Fixed initialization bug, documented pattern"

**Result**: Next time you create a service, AI suggests empty array initialization automatically.

### Scenario 2: Complex Debugging Session

**During TDD**, you spend 2 hours debugging a toggle function that always returns true.

**Action**:
1. Document each hypothesis in `scratch/working-notes.md`
2. Note dead ends and what didn't work
3. When fixed, extract lesson: "Always check boolean assignment vs toggle"
4. Add to `session-notes.md` with outcome

**Result**: Next time you implement toggle logic, AI warns about this pitfall.

### Scenario 3: Architecture Decision

**During implementation**, you decide to use React Query instead of Redux because this app has simple state needs.

**Action**:
1. Document decision rationale in `scratch/working-notes.md`
2. At session end, record in `session-notes.md`
3. Add pattern to `patterns-discovered.md` if it applies to other components

**Result**: Future components follow same state management approach consistently.

## Benefits

1. **Consistency**: AI suggestions align with project-specific patterns
2. **Context Preservation**: Knowledge persists across sessions and team members
3. **Faster Development**: Don't rediscover the same solutions
4. **Better AI Assistance**: More context = better suggestions
5. **Documentation**: Natural side-effect of development process
6. **Learning**: Reinforces lessons by writing them down

## Best Practices

### DO ✅

- **Write as you work** - Don't wait until session end
- **Be specific** - "Toggle always returns true due to assignment operator" not "Toggle broken"
- **Include code snippets** - Show the pattern, not just describe it
- **Date entries** - Especially in session-notes.md
- **Review before asking AI** - Reference relevant notes in your prompts
- **Clean up scratch/** - Working notes don't need to be perfect
- **Commit regularly** - Push session-notes.md and patterns-discovered.md

### DON'T ❌

- **Don't commit scratch/** - It's for active work only
- **Don't duplicate** - If it's in copilot-instructions.md, don't repeat in memory/
- **Don't over-document** - Record insights, not every keystroke
- **Don't forget to summarize** - Session notes are useless if not extracted from scratch
- **Don't make patterns prematurely** - Wait until you see the same problem twice

## Getting Started

1. **Read this file** - You're doing it! ✓
2. **Review the templates** - Look at session-notes.md and patterns-discovered.md
3. **Start working** - Open scratch/working-notes.md and begin your next task
4. **Document actively** - Take notes as you develop
5. **Summarize at end** - Extract key findings into session-notes.md
6. **Reference in prompts** - Point AI to relevant memory when asking for help

## Questions?

If you're unsure which file to use:

- **Right now, while coding?** → `scratch/working-notes.md`
- **Found a reusable pattern?** → `patterns-discovered.md`
- **Session finished?** → Summarize into `session-notes.md`
- **Universal principle?** → `.github/copilot-instructions.md`

---

**Remember**: The memory system is a tool, not a burden. It should make development easier, not harder. Write naturally, reference actively, and let the knowledge accumulate over time.
