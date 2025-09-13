import { normalCommands } from "./normal";
import { cmdlineCommands } from "./cmdline";

export const nvimCommands = [...normalCommands, ...cmdlineCommands];