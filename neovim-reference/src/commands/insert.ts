import type { NeovimCommand } from "../types";

export const insertCommands: NeovimCommand[] = [
  // MARK: Register Access
  {
    command: "Ctrl-r",
    description: "Access registers in Insert mode",
    mode: "Insert",
    category: "Editing",
    keywords: ["register", "paste", "clipboard"],
    example: "Press `Ctrl-r` then `+` to paste from system clipboard in Insert mode.",
    related: ["Ctrl-r +", "p", "P"],
  },
  {
    command: "Ctrl-r +",
    description: "Paste from system clipboard",
    mode: "Insert",
    category: "Editing",
    keywords: ["paste", "clipboard", "system"],
    example: "Press `Ctrl-r +` to paste from system clipboard in Insert mode.",
    related: ["Ctrl-r", "p", "P"],
  },

  // MARK: Navigation in Insert Mode
  {
    command: "Ctrl-o",
    description: "Execute single Normal mode command",
    mode: "Insert",
    category: "Navigation",
    keywords: ["normal", "command", "single"],
    example: "Press `Ctrl-o` to execute a single Normal mode command without leaving Insert mode.",
    related: ["Esc", "Ctrl-c"],
  },

  // MARK: Text Deletion
  {
    command: "Ctrl-u",
    description: "Delete from cursor to beginning of line",
    mode: "Insert",
    category: "Editing",
    keywords: ["delete", "line", "beginning"],
    example: "Press `Ctrl-u` to delete all text from cursor to beginning of line in Insert mode.",
    related: ["Ctrl-w", "Ctrl-h", "Backspace"],
  },
  {
    command: "Ctrl-w",
    description: "Delete word before cursor",
    mode: "Insert",
    category: "Editing",
    keywords: ["delete", "word", "before"],
    example: "Press `Ctrl-w` to delete the word before the cursor in Insert mode.",
    related: ["Ctrl-u", "Ctrl-h", "Backspace"],
  },
  {
    command: "Ctrl-h",
    description: "Delete character before cursor (backspace)",
    mode: "Insert",
    category: "Editing",
    keywords: ["delete", "character", "backspace"],
    example: "Press `Ctrl-h` to delete the character before cursor (same as Backspace).",
    related: ["Backspace", "Ctrl-w", "Ctrl-u"],
  },

  // MARK: Indentation
  {
    command: "Ctrl-t",
    description: "Indent current line",
    mode: "Insert",
    category: "Editing",
    keywords: ["indent", "tab", "right"],
    example: "Press `Ctrl-t` to indent the current line to the right in Insert mode.",
    related: ["Ctrl-d", ">>", "<<"],
  },
  {
    command: "Ctrl-d",
    description: "Unindent current line",
    mode: "Insert",
    category: "Editing",
    keywords: ["unindent", "dedent", "left"],
    example: "Press `Ctrl-d` to unindent the current line to the left in Insert mode.",
    related: ["Ctrl-t", ">>", "<<"],
  },

  // MARK: Text Insertion
  {
    command: "Ctrl-a",
    description: "Insert previous Insert mode text",
    mode: "Insert",
    category: "Editing",
    keywords: ["insert", "previous", "text", "repeat"],
    example: "Press `Ctrl-a` to insert the text from the previous Insert mode session.",
    related: ["Ctrl-@", ".", "Ctrl-r"],
  },
  {
    command: "Ctrl-@",
    description: "Insert previous Insert mode text and exit Insert mode",
    mode: "Insert",
    category: "Editing",
    keywords: ["insert", "previous", "text", "exit"],
    example: "Press `Ctrl-@` to insert previous text and return to Normal mode.",
    related: ["Ctrl-a", ".", "Esc"],
  },

  // MARK: Special Characters
  {
    command: "Ctrl-v",
    description: "Insert next character literally",
    mode: "Insert",
    category: "Editing",
    keywords: ["literal", "character", "escape"],
    example: "Press `Ctrl-v` then `Tab` to insert a literal tab character.",
    related: ["Ctrl-k", "Ctrl-q"],
  },
  {
    command: "Ctrl-k",
    description: "Insert digraph",
    mode: "Insert",
    category: "Editing",
    keywords: ["digraph", "special", "character"],
    example: "Press `Ctrl-k` then two characters to insert a digraph (special character).",
    related: ["Ctrl-v", ":dig"],
  },

  // MARK: Completion
  {
    command: "Ctrl-n",
    description: "Next completion match",
    mode: "Insert",
    category: "Editing",
    keywords: ["completion", "next", "autocomplete"],
    example: "Press `Ctrl-n` to go to the next completion match.",
    related: ["Ctrl-p", "Ctrl-x Ctrl-n", "Tab"],
  },
  {
    command: "Ctrl-p",
    description: "Previous completion match",
    mode: "Insert",
    category: "Editing",
    keywords: ["completion", "previous", "autocomplete"],
    example: "Press `Ctrl-p` to go to the previous completion match.",
    related: ["Ctrl-n", "Ctrl-x Ctrl-p", "S-Tab"],
  },
  {
    command: "Ctrl-x Ctrl-n",
    description: "Keyword completion",
    mode: "Insert",
    category: "Editing",
    keywords: ["completion", "keyword", "autocomplete"],
    example: "Press `Ctrl-x Ctrl-n` to trigger keyword completion.",
    related: ["Ctrl-n", "Ctrl-p", "Ctrl-x Ctrl-l"],
  },
  {
    command: "Ctrl-x Ctrl-l",
    description: "Line completion",
    mode: "Insert",
    category: "Editing",
    keywords: ["completion", "line", "autocomplete"],
    example: "Press `Ctrl-x Ctrl-l` to complete whole lines.",
    related: ["Ctrl-x Ctrl-n", "Ctrl-n", "Ctrl-p"],
  },
  {
    command: "Ctrl-x Ctrl-f",
    description: "Filename completion",
    mode: "Insert",
    category: "Editing",
    keywords: ["completion", "filename", "file", "path"],
    example: "Press `Ctrl-x Ctrl-f` to complete filenames and paths.",
    related: ["Ctrl-x Ctrl-n", "Ctrl-n", "Ctrl-p"],
  },

  // MARK: Mode Exit
  {
    command: "Esc",
    description: "Exit Insert mode",
    mode: "Insert",
    category: "Navigation",
    keywords: ["exit", "normal", "mode"],
    example: "Press `Esc` to exit Insert mode and return to Normal mode.",
    related: ["Ctrl-c", "Ctrl-["],
  },
  {
    command: "Ctrl-c",
    description: "Exit Insert mode (alternative)",
    mode: "Insert",
    category: "Navigation",
    keywords: ["exit", "normal", "mode", "cancel"],
    example: "Press `Ctrl-c` to exit Insert mode and return to Normal mode.",
    related: ["Esc", "Ctrl-["],
  },
  {
    command: "Ctrl-[",
    description: "Exit Insert mode (alternative)",
    mode: "Insert",
    category: "Navigation",
    keywords: ["exit", "normal", "mode"],
    example: "Press `Ctrl-[` to exit Insert mode and return to Normal mode.",
    related: ["Esc", "Ctrl-c"],
  },
];
