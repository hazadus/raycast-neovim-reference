import type { NeovimCommand } from "../types";

export const cmdlineCommands: NeovimCommand[] = [
  // MARK: Search and Replace
  {
    command: ":%s/old/new/g",
    description: "Replace all occurrences of 'old' with 'new' in entire file",
    mode: "Cmdline",
    category: "Search",
    keywords: ["substitute", "replace", "find", "global"],
    example: "Type `:%s/foo/bar/g` to replace all 'foo' with 'bar' in the entire file.",
    related: [":s/old/new/", ":%s/old/new/gc"],
  },
  {
    command: ":s/old/new/",
    description: "Replace first occurrence in current line",
    mode: "Cmdline",
    category: "Search",
    keywords: ["substitute", "replace", "line"],
    example: "Type `:s/foo/bar/` to replace the first 'foo' with 'bar' in the current line.",
    related: [":%s/old/new/g", ":s/old/new/g"],
  },

  // MARK: File Operations
  {
    command: ":w",
    description: "Save file",
    mode: "Cmdline",
    category: "Files",
    keywords: ["save", "write"],
    example: "Type `:w` to save the current file.",
    related: [":w filename", ":wq", ":x"],
  },
  {
    command: ":q",
    description: "Quit Neovim",
    mode: "Cmdline",
    category: "Files",
    keywords: ["quit", "exit"],
    example: "Type `:q` to quit Neovim (if no unsaved changes).",
    related: [":q!", ":wq", ":x"],
  },
  {
    command: ":wq",
    description: "Save and quit",
    mode: "Cmdline",
    category: "Files",
    keywords: ["save", "quit", "exit"],
    example: "Type `:wq` to save the file and quit Neovim.",
    related: [":x", ":w", ":q"],
  },
  {
    command: ":q!",
    description: "Quit without saving changes",
    mode: "Cmdline",
    category: "Files",
    keywords: ["quit", "force", "discard"],
    example: "Type `:q!` to quit Neovim without saving changes.",
    related: [":q", ":wq"],
  },

  // MARK: Window Management
  {
    command: ":split",
    description: "Split window horizontally",
    mode: "Cmdline",
    category: "Windows",
    keywords: ["split", "horizontal", "window"],
    example: "Type `:split` to split the current window horizontally.",
    related: [":vsplit", "Ctrl-w s", "Ctrl-w v"],
  },
  {
    command: ":vsplit",
    description: "Split window vertically",
    mode: "Cmdline",
    category: "Windows",
    keywords: ["split", "vertical", "window"],
    example: "Type `:vsplit` to split the current window vertically.",
    related: [":split", "Ctrl-w v", "Ctrl-w s"],
  },

  // MARK: Misc
  {
    command: ":help",
    description: "Open help",
    mode: "Cmdline",
    category: "Misc",
    keywords: ["help", "documentation"],
    example: "Type `:help` to open Neovim's built-in help.",
    related: [":help command", ":h"],
  },
];