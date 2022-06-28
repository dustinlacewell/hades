import { BaseCommandInteraction } from "discord.js";
import { inject, optional } from "inversify";
import { singleton } from "../../../decorators";
import { SlashCommandContext } from "../../models";

export type SlashParserServiceOptions = {
  prefix?: string;
};

export const defaults: SlashParserServiceOptions = {
  prefix: "!",
};

@singleton(SlashParserService)
export class SlashParserService {
  options: SlashParserServiceOptions;

  constructor(
    @optional()
    @inject("PARSER_OPTIONS")
    options?: SlashParserServiceOptions
  ) {
    this.options = {
      ...defaults,
      ...options,
    };
  }

  /**
   * Parse a Discord.js interaction into a SlashCommandContext
   * @param msg The underlying Discord.js Slash Command Interaction
   * @returns A new SlashCommandContext or null
   */
  parse(interaction: BaseCommandInteraction): SlashCommandContext | null {
    return new SlashCommandContext(interaction);
  }
}
