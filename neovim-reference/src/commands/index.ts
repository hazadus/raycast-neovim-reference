import { cmdlineCommands } from "./cmdline";
import { insertCommands } from "./insert";
import { normalCommands } from "./normal";
import { visualCommands } from "./visual";

export const nvimCommands = [...normalCommands, ...cmdlineCommands, ...visualCommands, ...insertCommands];