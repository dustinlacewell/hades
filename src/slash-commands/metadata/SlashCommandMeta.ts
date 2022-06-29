import { Collection } from "discord.js";

import { Constructor } from "../../utils";
import { Command } from "../builtins";
import { SlashArgMeta } from "./SlashArgMeta";

export type SlashCommandRegistrationDetails = Command;

/**
 * Decorator metadata for @command
 */
export class SlashCommandMeta {
  name: string;
  target: Constructor;
  args = new Collection<string, SlashArgMeta>();
  description?: string;
  registrationDetails?: SlashCommandRegistrationDetails;

  getArgMeta(name: string) {
    let meta = this.args.get(name);
    if (meta === undefined) {
      meta = new SlashArgMeta();
      this.args.set(name, meta);
    }
    return meta;
  }
}
