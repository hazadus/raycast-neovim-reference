export interface NeovimCommand {
  command: string;
  description: string;
  mode: "Normal" | "Insert" | "Visual" | "Cmdline";
  category:
    | "Navigation"
    | "Editing"
    | "Search"
    | "Windows"
    | "Files"
    | "Text Objects"
    | "LSP"
    | "Git"
    | "Terminal"
    | "LazyVim"
    | "Misc";
  keywords?: string[];
  example?: string;
  related?: string[];
}
