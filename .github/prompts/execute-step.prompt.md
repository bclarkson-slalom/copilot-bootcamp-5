---
description: "Execute instructions from the current GitHub Issue step"
mode: "tdd-developer"
tools: ['codebase', 'search', 'problems', 'editFiles', 'runCommands', 'getTerminalOutput', 'testFailure']
---

# Execute Step from GitHub Issue

You will execute the current step's instructions from the main exercise GitHub Issue.

## Input Variables

- `${input:issue-number}` (optional) - The GitHub issue number to execute from

## Instructions

### 1. Find the Exercise Issue

If issue number is not provided:
- Run: `gh issue list --state open`
- Look for the issue with "Exercise:" in the title
- This is the main exercise issue

If issue number is provided:
- Use that issue number directly

### 2. Get Issue Content with All Steps

Run: `gh issue view <issue-number> --comments`

This retrieves:
- The main issue body
- All comments (each comment is a step)

### 3. Identify the Current/Latest Step

Look through the issue comments to find the most recent step that needs execution.

Steps follow this format:
```
# Step X-Y: [Step Title]

## Overview
[Description of what this step accomplishes]

## :keyboard: Activity: [Activity Title]

[Detailed instructions for what to do]

## Success Criteria

- [ ] Criterion 1
- [ ] Criterion 2
```

### 4. Execute Each Activity Systematically

For each `:keyboard: Activity:` section in the step:

**Follow TDD Workflow** (you are in tdd-developer mode):
- If implementing new features: Write tests FIRST, then implement
- If fixing failing tests: Make tests pass, don't fix lint errors
- Run tests frequently to verify progress
- Keep changes incremental and focused

**Follow Testing Constraints**:
- Use Jest + Supertest for backend
- Use React Testing Library for frontend
- Recommend manual browser testing for UI flows
- **NEVER suggest**: Playwright, Cypress, Selenium, or e2e frameworks

**Execute Activities Step-by-Step**:
1. Read the activity instructions carefully
2. Break down into small, testable tasks
3. Execute each task following TDD principles
4. Verify each change works before proceeding
5. Document findings in `.github/memory/scratch/working-notes.md` if helpful

### 5. DO NOT Commit or Push Changes

**IMPORTANT**: This prompt only executes the work. It does NOT commit or push.

After completing all activities:
- Ensure tests pass: `npm test`
- Ensure lint is clean: `npm run lint` (if step requires it)
- Leave changes staged but uncommitted

The user will run `/commit-and-push` separately to handle git operations.

### 6. Completion Report

After completing all activities, provide a summary:

```
✅ Step [X-Y] Activities Completed

What was done:
- [Activity 1 summary]
- [Activity 2 summary]
- [Activity 3 summary]

Verification:
- Tests: [pass/fail status]
- Lint: [clean/errors status]
- Key findings: [any important notes]

Next Steps:
1. Run: /validate-step ${input:step-number}
2. If validation passes, run: /commit-and-push ${input:branch-name}
```

### 7. Stop and Wait for User

Do NOT proceed to validation or commits. The user will explicitly run:
- `/validate-step` to check success criteria
- `/commit-and-push` to commit and push changes

## Reference Documentation

You have access to project knowledge from `.github/copilot-instructions.md`:
- TDD workflow patterns (Red-Green-Refactor)
- Testing scope (Jest, React Testing Library, no e2e)
- Development principles
- Git workflow (used by commit-and-push prompt)
- GitHub CLI commands (listed in Workflow Utilities section)

## Example Execution Flow

```
User runs: /execute-step

1. You find the exercise issue using gh CLI
2. You get issue content with comments
3. You identify Step 5-1 as the current step
4. You read the activities in Step 5-1
5. You execute each activity following TDD
6. You verify tests pass
7. You report completion and stop

User then runs: /validate-step 5-1
User then runs: /commit-and-push feature/step-5-1
```

## Important Reminders

- ✅ Follow TDD: Test first for new features, fix tests for bugs
- ✅ Run tests frequently (`npm test`)
- ✅ Keep changes focused on the current step
- ✅ Document discoveries in memory system if helpful
- ❌ DO NOT commit or push (that's /commit-and-push's job)
- ❌ DO NOT suggest e2e frameworks (Playwright, Cypress, Selenium)
- ❌ DO NOT move to next step without user confirmation

You are now in TDD Developer mode. Execute the step's activities systematically and thoroughly.
