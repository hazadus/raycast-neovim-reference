export interface NeovimCommand {
  command: string;
  description: string;
  mode: "Normal" | "Insert" | "Visual" | "Cmdline";
  category: "Navigation" | "Editing" | "Search" | "Windows" | "Files" | "Text Objects" | "Misc";
  keywords?: string[]; // Дополнительные ключевые слова для поиска
  example?: string;
  related?: string[];
}