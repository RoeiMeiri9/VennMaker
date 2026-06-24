<script lang="ts">
  import { state as globalState } from "@src/states.svelte";
  import { correctExpression } from "@src/utils/parseExpression";
  type Snapshot = { value: string; start: number; end: number };

  let undoStack: Snapshot[] = [];
  let redoStack: Snapshot[] = [];
  let groupTimer: ReturnType<typeof setTimeout> | null = null;
  let isProgrammaticEdit = false;

  function snapshot(input: HTMLInputElement): Snapshot {
    return {
      value: input.value,
      start: input.selectionStart ?? 0,
      end: input.selectionEnd ?? 0,
    };
  }

  function beginEditGroup(input: HTMLInputElement, forceNewGroup: boolean) {
    if (isProgrammaticEdit) return;
    if (forceNewGroup || groupTimer === null) {
      undoStack.push(snapshot(input));
      if (undoStack.length > 100) undoStack.shift();
      redoStack = [];
    }
    if (groupTimer) clearTimeout(groupTimer);
    groupTimer = setTimeout(() => (groupTimer = null), 600);
  }

  function applyHistory(input: HTMLInputElement, entry: Snapshot) {
    isProgrammaticEdit = true;
    input.value = entry.value;
    input.setSelectionRange(entry.start, entry.end);
    isProgrammaticEdit = false;
    globalState.expression = entry.value;
    correctExpression();
  }

  function wrapSelection(
    input: HTMLInputElement,
    before: string,
    after: string,
  ) {
    const start = input.selectionStart,
      end = input.selectionEnd;
    if (start === null || end === null) return;

    beginEditGroup(input, true);

    const selected = input.value.slice(start, end);
    const newValue =
      input.value.slice(0, start) +
      before +
      selected +
      after +
      input.value.slice(end);

    isProgrammaticEdit = true;
    input.value = newValue;
    input.setSelectionRange(
      start + before.length,
      start + before.length + selected.length,
    );
    isProgrammaticEdit = false;

    globalState.expression = newValue;
    correctExpression();
  }

  function handleKeyDown(event: KeyboardEvent) {
    const input = event.target as HTMLInputElement;
    const mod = event.ctrlKey || event.metaKey;

    if (mod && !event.shiftKey && event.key.toLowerCase() === "z") {
      event.preventDefault();
      if (!undoStack.length) return;
      redoStack.push(snapshot(input));
      applyHistory(input, undoStack.pop()!);
      return;
    }
    if (
      mod &&
      (event.key.toLowerCase() === "y" ||
        (event.shiftKey && event.key.toLowerCase() === "z"))
    ) {
      event.preventDefault();
      if (!redoStack.length) return;
      undoStack.push(snapshot(input));
      applyHistory(input, redoStack.pop()!);
      return;
    }

    if (event.key === "(" || event.key === ")") {
      const start = input.selectionStart,
        end = input.selectionEnd;
      if (start !== null && end !== null && start !== end) {
        event.preventDefault();
        wrapSelection(input, "(", ")");
      }
    }
  }
</script>

<input
  type="text"
  id="expression"
  bind:value={globalState.expression}
  onbeforeinput={(e) => beginEditGroup(e.target as HTMLInputElement, false)}
  oninput={() => {
    if (!isProgrammaticEdit) correctExpression();
  }}
  onkeydown={handleKeyDown}
  lang="en"
  autocapitalize="none"
  autocorrect="off"
/>

<style>
  input[type="text"] {
    padding: 12px;
    direction: ltr;
    flex: 1;
    border: 2px solid var(--border-light);
    border-radius: var(--radius-sm);
    font-size: 1.1rem;
    text-align: left;
  }

  input[type="text"]:focus {
    border-color: var(--color-primary);
    outline: none;
  }
</style>
