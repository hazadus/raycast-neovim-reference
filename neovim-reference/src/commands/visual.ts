import type { NeovimCommand } from "../types";

export const visualCommands: NeovimCommand[] = [
  // MARK: Basic Visual Mode
  {
    command: "y",
    description: "Yank (copy) selected text",
    mode: "Visual",
    category: "Editing",
    keywords: ["yank", "copy", "clipboard"],
    example: "After selecting text in Visual mode, press `y` to copy it.",
    related: ["d", "x", "p"],
  },
];