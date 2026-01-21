---
description: "Validate that all success criteria for the current step are met"
mode: "code-reviewer"
tools: ['codebase', 'problems', 'runCommands', 'getTerminalOutput']
---

# Validate Step Completion

You will validate that all success criteria for the specified step are met.

## Input Variables

- `${input:step-number}` (REQUIRED) - The step number to validate (e.g., "5-0", "5-1", "5-2")

## Instructions

### 1. Verify Step Number is Provided

If `${input:step-number}` is empty or not provided:
- Ask the user: "Please provide the step number to validate (e.g., 5-0, 5-1, 5-2)"
- Wait for user to provide the step number
- Do not proceed without a step number

### 2. Find the Main Exercise Issue

Run: `gh issue list --state open`

Look for the issue with "Exercise:" in the title. This is the main exercise issue.

Get the issue number.

### 3. Get Issue Content with All Comments

Run: `gh issue view <issue-number> --comments`

This retrieves the full issue including all step comments.

### 4. Find the Specified Step

Search through the issue content for:
```
# Step ${input:step-number}:
```

For example, if step-number is "5-1", search for "# Step 5-1:"

Extract the full step content including:
- Overview section
- Activity sections
- **Success Criteria section** (this is what you'll validate)

### 5. Extract Success Criteria

The success criteria section looks like:
```
## Success Criteria

- [ ] All backend tests pass (run npm test in packages/backend)
- [ ] No ESLint errors in backend code
- [ ] API endpoints return correct status codes
- [ ] Changes are committed with conventional commit message
```

Parse each criterion from the step.

### 6. Validate Each Criterion

For each success criterion, check the current state of the workspace:

**Common Validation Checks**:

**Tests passing**:
```bash
npm test
# or for specific package:
npm test --workspace=packages/backend
npm test --workspace=packages/frontend
```
Check exit code and test results.

**No ESLint errors**:
```bash
npm run lint
# or for specific package:
npm run lint --workspace=packages/backend
npm run lint --workspace=packages/frontend
```
Check for 0 errors.

**Files exist**:
Use codebase tool to check if specific files exist.

**Code contains expected patterns**:
Search codebase for required implementations.

**Commits made**:
```bash
git log --oneline -n 5
```
Check recent commits.

**Application runs**:
```bash
npm run start
```
(Don't actually start the server, but check if package.json has start script)

### 7. Report Validation Results

Provide a detailed report for each criterion:

```
# Step ${input:step-number} Validation Report

## Success Criteria Status

### ✅ Criterion 1: All backend tests pass
Status: PASSING
Details: All 12 tests pass (npm test in packages/backend)

### ✅ Criterion 2: No ESLint errors in backend
Status: PASSING
Details: 0 errors, 0 warnings

### ⚠️ Criterion 3: DELETE endpoint implemented
Status: INCOMPLETE
Details: DELETE /api/todos/:id endpoint exists but missing error handling
Action needed: Add 404 response for non-existent todos

### ❌ Criterion 4: Frontend tests pass
Status: FAILING
Details: 2 tests failing in App.test.js
- "should render todo list" - Cannot find element
- "should delete todo on click" - deleteTodo not called
Action needed: Fix these test failures before proceeding

## Overall Status: [COMPLETE | INCOMPLETE]

Summary:
- ✅ 2 criteria met
- ⚠️ 1 criteria partially met
- ❌ 1 criteria not met

Recommendation:
[If incomplete] Complete the remaining criteria before moving to the next step.
[If complete] All criteria met! You can proceed to the next step.
```

### 8. Provide Actionable Guidance

For any incomplete or failing criteria:

**Be specific**:
- Show exact error messages
- Identify which files need changes
- Suggest concrete next steps

**Be helpful**:
- Don't just say "tests fail", show which tests and why
- Don't just say "lint errors", categorize and count them
- Provide commands to run for fixing issues

**Example guidance**:
```
To fix the failing frontend tests:

1. Run tests in watch mode:
   npm test --workspace=packages/frontend -- --watch

2. Focus on the first failing test:
   "should render todo list"
   
3. The error suggests the TodoList component isn't rendering.
   Check that:
   - TodoList is imported in App.js
   - TodoList receives the todos prop
   - TodoList renders the todo items

4. After fixing, rerun validation:
   /validate-step ${input:step-number}
```

### 9. Integration with Other Prompts

**If validation fails**:
- Suggest using `/execute-step` to complete remaining work
- Or provide specific commands/fixes to address issues

**If validation passes**:
- Confirm the step is complete
- Suggest moving to next step if applicable
- Or creating a pull request if all steps complete

## Validation Patterns

### Pattern: Test Validation
```bash
npm test 2>&1
```
Parse output for:
- "Tests: X passed, Y total" → all passing?
- "FAIL" keyword → which tests failed?
- Exit code 0 → success, non-zero → failure

### Pattern: Lint Validation
```bash
npm run lint 2>&1
```
Parse output for:
- "0 errors, 0 warnings" → clean
- Error count and locations
- Specific rule violations

### Pattern: File/Code Validation
Use codebase search to check:
- File exists: search for file path
- Code exists: grep for function names, patterns
- Implementation complete: check for TODO comments

### Pattern: Git Validation
```bash
git log --oneline -1
```
Check most recent commit message matches conventional format.

## Error Handling

**If step not found in issue**:
```
❌ Step ${input:step-number} not found in the exercise issue.

Available steps found:
- Step 5-0: Initial Setup
- Step 5-1: Backend Stabilization
- Step 5-2: Lint Resolution

Please verify the step number and try again.
```

**If commands fail**:
```
⚠️  Unable to run validation command: npm test

This might mean:
- Dependencies not installed (run: npm install)
- Package.json missing test script
- Current directory is incorrect

Please resolve and rerun validation.
```

## Reference Documentation

Validation knowledge comes from `.github/copilot-instructions.md`:
- Testing scope (what to validate)
- Code quality standards
- Git workflow patterns

## Example Execution

```
User runs: /validate-step 5-1

1. You verify "5-1" was provided
2. You find the main exercise issue
3. You get issue with comments
4. You find "# Step 5-1:" in the comments
5. You extract success criteria
6. You check each criterion:
   - Run npm test → passes ✅
   - Run npm run lint → 5 errors ❌
   - Check DELETE endpoint → exists ✅
7. You report: 2/3 criteria met, 1 failing (lint)
8. You provide guidance on fixing lint errors
```

## Important Reminders

- ✅ Be thorough - check every criterion
- ✅ Be specific - show exact errors and guidance
- ✅ Be helpful - provide actionable next steps
- ✅ Use actual commands - run real validation checks
- ❌ Don't assume - actually check the state
- ❌ Don't just say "incomplete" - explain what's missing
- ❌ Don't skip criteria - validate all of them

You are now in Code Reviewer mode. Validate the step's success criteria systematically and thoroughly.
