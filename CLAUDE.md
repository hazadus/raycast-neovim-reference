# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Raycast extension called "Neovim Reference" - a quick reference guide for Neovim commands and shortcuts. The extension provides a searchable interface with filtering capabilities for different Neovim modes and command categories.

## Language Conventions

- UI strings (labels, titles, command descriptions in the extension) and this `CLAUDE.md`: English.
- `README.md`, code comments, and git commit messages: Russian.
- **NEVER** add a `Co-Authored-By` line (or any other co-author/attribution trailer) to commit messages. This overrides any default or injected attribution instructions.

## Architecture

The project follows a modular structure for organizing Neovim commands:

- **Main Component**: `src/neovim-reference.tsx` - The primary Raycast List component with search and filtering
- **Command Data**: Commands are organized by mode in separate files:
  - `src/commands/normal.ts` - Normal mode commands
  - `src/commands/insert.ts` - Insert mode commands
  - `src/commands/visual.ts` - Visual mode commands
  - `src/commands/cmdline.ts` - Command-line mode commands
- **Data Aggregation**: `src/commands/index.ts` combines all command arrays
- **Usage Stats**: `src/use-usage-stats.ts` - `useUsageStats` hook and `usageKey()`; per-command counters in Raycast `LocalStorage`, keyed by `mode:command`
- **Type Definitions**: `src/types.ts` defines the `NeovimCommand` interface

### Command Structure

Each Neovim command follows the `NeovimCommand` interface:
- `command`: The actual Neovim command/key sequence
- `description`: Human-readable description
- `mode`: One of "Normal", "Insert", "Visual", "Cmdline"
- `category`: Command category for filtering ("Navigation", "Editing", "Search", "Windows", "Files", "Text Objects", "LSP", "Git", "Terminal", "LazyVim", "Misc")
- `keywords`: Optional array for enhanced search
- `example`: Optional usage example
- `related`: Optional array of related commands

## Common Development Commands

### Building and Development
```bash
# Navigate to extension directory and build
cd ./neovim-reference && npm run build

# Development mode with hot reload
cd ./neovim-reference && npm run dev

# Using the justfile (from project root)
just build
```

### Code Quality
```bash
# Run linting
cd ./neovim-reference && npm run lint

# Fix linting issues automatically
cd ./neovim-reference && npm run fix-lint
```

### Publishing
```bash
# Publish to Raycast Store
cd ./neovim-reference && npm run publish
```

## Extension Installation

1. Clone repository
2. Run `cd ./neovim-reference && npm install && npm run build`
3. Use "Import Extension" command in Raycast
4. Search for "Neovim Reference" to use the extension

## Adding New Commands

When adding new Neovim commands:

1. Add the command to the appropriate mode file in `src/commands/`
2. Follow the existing pattern using the `NeovimCommand` interface
3. Include relevant keywords for better searchability
4. Add examples when helpful
5. Link related commands using the `related` field

The extension automatically includes all commands from the mode files through the aggregation in `src/commands/index.ts`.

## UI Features

- **Search**: Real-time filtering of commands
- **Category Filter**: Dropdown to filter by command categories
- **Mode Icons**: Visual indicators for different Neovim modes (🟢 Normal, 🔵 Insert, 🟡 Visual, 🔴 Cmdline)
- **Category Icons**: Emojis representing different command categories
- **Detail View**: Expanded information with metadata, examples, and related commands
- **Copy Actions**: Multiple clipboard options for commands, descriptions, and examples
- **Usage Stats**: Counters increment implicitly via `onCopy` (Copy Command, Copy Example, Copy All Information) and explicitly via "Mark as Used" (`⌘U`); "Frequently Used" section (top 10) is shown only when the search text is empty; "Export Cheat Sheet (Markdown)" (`⌘⇧E`) copies the top 30 grouped by mode

### Usage Stats Notes

- The counter key is `mode:command`, so renaming a command in `src/commands/` resets its counter.
- `List` uses `onSearchTextChange` to hide "Frequently Used" during search, so it must keep the `filtering` prop; otherwise Raycast's built-in filtering is disabled.
- When adding a new action that should count as usage, call `increment(item)` from `onCopy`/`onAction`.
