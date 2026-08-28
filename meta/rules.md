# 🛠️ Operation Rules & Tasks Lifecycle

Always initialize your context by strictly reviewing `meta/architecture.md` and `meta/journal.md` before making any edits.

---

## 💻 Project Commands

Use the following exact commands to run, verify, and compile the workspace:
* **Development Server**: `npm run dev`
* **TypeScript Compilation**: `npx tsc -b`
* **ESLint Validation**: `npm run lint`
* **Production Build**: `npm run build`

---

## 🔄 Task Lifecycle Protocol

Every task assigned by the user must follow this execution lifecycle:

1. Read `meta/architecture.md` to find the exact target files without scanning directories.
2. Review `meta/journal.md` to ensure code matches all established agreements and patterns.

### Phase 2: Execution
1. Implement the requested feature or fix in small, logical steps.
2. Verify TypeScript typing correctness iteratively with `npx tsc -b`.
3. Check code style and syntactical bugs using `npm run lint`.

### Phase 3: Definition of Done (DoD)
Before completing any task, you **MUST**:
1. If files were added, deleted, or their single-responsibilities changed, update `meta/architecture.md` immediately.
2. If new patterns, fixes, style preferences, or LLM corrections were made, append them directly to `meta/journal.md` as new agreements.
