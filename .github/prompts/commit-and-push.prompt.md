---
description: "Analyze changes, generate commit message, and push to feature branch"
tools: ['runCommands', 'getTerminalOutput']
---

# Commit and Push Changes

You will analyze the current changes, generate a conventional commit message, and push to a feature branch.

## Input Variables

- `${input:branch-name}` (REQUIRED) - The feature branch name to commit and push to

## Instructions

### 1. Verify Branch Name is Provided

If `${input:branch-name}` is empty or not provided:
- Ask the user: "Please provide a branch name (e.g., feature/step-5-1, fix/toggle-bug)"
- Wait for user to provide the branch name
- Do not proceed without a branch name

### 2. Analyze Current Changes

Run: `git status`

Check what files have been modified, added, or deleted.

Run: `git diff`

Review the actual changes to understand what was done.

### 3. Generate Conventional Commit Message

Based on the changes, create a commit message following the **Conventional Commits** format:

```
<type>(<scope>): <description>

[optional body]
```

**Types** (reference from `.github/copilot-instructions.md`):
- `feat:` - New feature
- `fix:` - Bug fix
- `test:` - Adding or updating tests
- `chore:` - Maintenance tasks, dependencies
- `docs:` - Documentation changes
- `refactor:` - Code restructuring without behavior change
- `style:` - Code formatting, whitespace
- `perf:` - Performance improvements

**Scopes**:
- `backend` - Backend API changes
- `frontend` - Frontend React changes
- `tests` - Test-related changes
- Or omit scope if changes span multiple areas

**Examples**:
```
feat(backend): add DELETE /todos/:id endpoint
fix(backend): initialize todos array to prevent undefined errors
test(frontend): add tests for TodoList component rendering
chore: update dependencies to latest versions
```

**Guidelines**:
- Description should be clear and concise
- Use imperative mood ("add" not "added")
- Don't capitalize first letter of description
- No period at the end
- Add body if changes are complex and need explanation

### 4. Create or Switch to Feature Branch

**Check if branch exists**:
```bash
git branch --list ${input:branch-name}
```

**If branch doesn't exist**:
```bash
git checkout -b ${input:branch-name}
```

**If branch exists**:
```bash
git checkout ${input:branch-name}
```

### 5. Stage All Changes

```bash
git add .
```

### 6. Commit with Generated Message

```bash
git commit -m "<generated-message>"
```

Use the conventional commit message you generated in step 3.

### 7. Push to Feature Branch

```bash
git push origin ${input:branch-name}
```

If this is the first push to this branch:
```bash
git push --set-upstream origin ${input:branch-name}
```

### 8. Verify Push Success

Check the git output to confirm:
- Commit was created successfully
- Push completed without errors
- Remote branch is updated

### 9. Report Completion

Provide a summary:

```
✅ Changes Committed and Pushed

Branch: ${input:branch-name}
Commit: <generated-commit-message>

Files changed:
- <list of files>

Git operations completed:
✓ Checked out feature branch
✓ Staged all changes
✓ Committed with message
✓ Pushed to origin

Next Steps:
- Continue working on next step
- Or create a pull request if work is complete
```

## Safety Checks

**CRITICAL**: Never commit or push to these branches:
- ❌ `main` - Protected branch
- ❌ `master` - Protected branch
- ❌ Any branch that's not the user-provided branch name

**If user tries to commit to main**:
```
⚠️  WARNING: Cannot commit directly to main branch.

Please provide a feature branch name:
- feature/<descriptive-name> for new features
- fix/<descriptive-name> for bug fixes

Example: feature/step-5-1
```

## Error Handling

### If git operations fail:

**Merge conflicts**:
```
❌ Push failed due to conflicts.

Run these commands to resolve:
1. git pull origin ${input:branch-name}
2. Resolve conflicts in affected files
3. git add .
4. git commit -m "merge: resolve conflicts"
5. git push origin ${input:branch-name}
```

**Uncommitted changes already exist**:
```
⚠️  There are uncommitted changes. Proceeding with commit...
[Continue with normal flow]
```

**No changes to commit**:
```
ℹ️  No changes to commit. Working tree is clean.

Possible reasons:
- Changes were already committed
- No files were modified
- Changes were not staged
```

## Reference Documentation

Git workflow knowledge comes from `.github/copilot-instructions.md`:
- Conventional Commits format
- Branching strategy
- Commit workflow steps

## Example Execution

```
User runs: /commit-and-push feature/step-5-1

1. You analyze git diff
2. You see backend tests were added and bugs fixed
3. You generate: "fix(backend): initialize todos array and implement CRUD endpoints"
4. You create/checkout feature/step-5-1
5. You stage all changes
6. You commit with the message
7. You push to origin feature/step-5-1
8. You report completion
```

## Important Reminders

- ✅ Always use conventional commit format
- ✅ Generate descriptive, clear commit messages
- ✅ Only commit to the user-provided feature branch
- ✅ Verify push success before reporting completion
- ❌ NEVER commit to main or master branches
- ❌ Don't proceed without a branch name
- ❌ Don't push if there are no changes

Proceed with analyzing changes and committing to the specified feature branch.
