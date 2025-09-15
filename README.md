# Neovim Reference for Raycast

A comprehensive quick reference for **LazyVim** - the modern Neovim distribution. This Raycast extension provides instant access to 280+ carefully curated commands, keybindings, and workflows for both standard Neovim and LazyVim-specific features.

[![Raycast Extension](https://img.shields.io/badge/Raycast-Extension-red?style=flat&logo=raycast)](https://raycast.com/)
[![LazyVim](https://img.shields.io/badge/LazyVim-Reference-blue?style=flat)](https://lazyvim.org/)
[![Neovim](https://img.shields.io/badge/Neovim-0.9+-green?style=flat&logo=neovim)](https://neovim.io/)

![Extension Screenshot](./docs/screenshot.png)

## Features

### **Comprehensive Command Coverage**
- **280+ commands** across all Neovim modes
- **LazyVim-specific keybindings** and workflows
- **LSP integration** commands for modern development
- **Git workflow** commands with Lazygit integration

### **Four Editor Modes Supported**
- 🟢 **Normal Mode** (147 commands) - Navigation, editing, text objects
- 🔵 **Insert Mode** (20 commands) - Text input, completion, navigation
- 🟡 **Visual Mode** (30 commands) - Selection, manipulation, block editing
- 🔴 **Command-line Mode** (59 commands) - Ex commands, file operations, configuration

### **11 Organized Categories**
| Category | Commands | Description |
|----------|----------|-------------|
| 📁 **Files** | 19 | File operations, buffers, sessions |
| 🧭 **Navigation** | 53 | Movement, jumps, marks, scrolling |
| ✏️ **Editing** | 84 | Text manipulation, indentation, folding |
| 🔍 **Search** | 16 | Find, replace, grep, patterns |
| 🪟 **Windows** | 18 | Splits, tabs, layout management |
| 📝 **Text Objects** | 12 | Word, paragraph, bracket operations |
| 🔧 **LSP** | 14 | Language server, diagnostics, code actions |
| 🌿 **Git** | 9 | Version control, hunks, Lazygit |
| 💻 **Terminal** | 4 | Terminal integration, shell commands |
| 🚀 **LazyVim** | 15 | LazyVim-specific features and shortcuts |
| ⚙️ **Misc** | 12 | Macros, spell check, configuration |

### **Search & Filtering**
- **Real-time search** across commands, descriptions, and keywords
- **Mode filtering** - Focus on specific editor modes
- **Category filtering** - Browse by command type
- **Keyword matching** - Find commands by functionality

### **Command Details**
- **Clear descriptions** for every command
- **Practical examples** showing usage
- **Related commands** for discovery
- **Mode indicators** with color coding
- **Category icons** for visual organization

## Installation

### Prerequisites
- [Raycast](https://raycast.com/) installed on macOS

### Install from Source
```bash
# Clone the repository
git clone https://github.com/hazadus/raycast-neovim-reference.git
cd raycast-neovim-reference

# Build the extension
cd neovim-reference
npm install && npm run build

# Import into Raycast
# Use "Import Extension" command in Raycast and select the project folder
```

## Usage

### Quick Access
1. Open Raycast (`⌘ + Space`)
2. Type "Neovim Reference" or "nv"
3. Browse or search for commands

### Search Tips
- **Search by command**: Type the actual keybinding (e.g., "gd", "Ctrl-w")
- **Search by function**: Type what you want to do (e.g., "delete word", "split window")
- **Filter by mode**: Use the mode dropdown to focus on specific modes
- **Filter by category**: Use category dropdown to browse by functionality

## Development

### Project Structure
```
neovim-reference/
├── src/
│   ├── commands/          # Command definitions by mode
│   │   ├── normal.ts      # Normal mode commands
│   │   ├── insert.ts      # Insert mode commands
│   │   ├── visual.ts      # Visual mode commands
│   │   ├── cmdline.ts     # Command-line mode commands
│   │   └── index.ts       # Command aggregation
│   ├── types.ts           # TypeScript interfaces
│   └── neovim-reference.tsx # Main extension component
├── assets/                # Extension icon
└── package.json           # Extension configuration
```

### Building
```bash
# Development mode with hot reload
npm run dev

# Build for production
npm run build

# Lint and format code
npm run lint
npm run fix-lint
```

### Adding New Commands
1. Edit the appropriate mode file in `src/commands/`
2. Follow the `NeovimCommand` interface structure
3. Include description, example, keywords, and related commands
4. Run `npm run build` to test

### Contributing
1. Fork the repository
2. Create a feature branch
3. Add your commands with proper documentation
4. Test the extension in Raycast
5. Submit a pull request

## Technology Stack

- **Framework**: [Raycast API](https://developers.raycast.com/)
- **Language**: TypeScript
- **UI**: React with Raycast components
- **Build**: Node.js, npm
- **Linting**: ESLint, Prettier

## Sources & Credits

This extension is based on commands and workflows from:

- **[LazyVim For Ambitious Developers Book](https://lazyvim-ambitious-devs.phillips.codes/)** - Comprehensive LazyVim tutorial
- **[LazyVim Documentation](https://lazyvim.org/)** - Modern Neovim configuration
- **[Neovim Documentation](https://neovim.io/)** - Core Neovim functionality

## Links

- [Raycast Store](https://raycast.com/store) - Discover more extensions
- [Raycast Extensions Development Documentation](https://developers.raycast.com/basics/create-your-first-extension)

## License

MIT License - feel free to use, modify, and distribute.
