import { injectable } from "inversify";

import { getSlashCommandMeta } from "../metadata";

/**
 * Marks a SlashCommand class as a command.
 * @param name The command's name.
 */
export function command(name: string) {
  return (target: any) => {
    const meta = getSlashCommandMeta(target);
    meta.name = name;
    meta.target = target;
    return injectable()(target);
  };
}
