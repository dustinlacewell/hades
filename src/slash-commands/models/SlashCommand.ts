import { inject, injectable } from "inversify";
import { InteractionReplyOptions } from "discord.js";

import { DiscordService } from "../../services/DiscordService";
import { SlashCommandContext } from "./SlashCommandContext";

/**
 * Base slash command class.
 */
@injectable()
export abstract class SlashCommand {
  /** information on the current command invocation */
  @inject("SlashCommandContext")
  context: SlashCommandContext;

  /** service for getting data from discord */
  @inject(DiscordService)
  discord: DiscordService;

  /** main command logic handler */
  abstract execute(): Promise<any>;

  get interaction() {
    return this.context.interaction;
  }

  public reply(content: string, options?: InteractionReplyOptions) {
    return this.interaction.reply({ ...options, content });
  }

  public followUp(content: string, options?: InteractionReplyOptions) {
    return this.interaction.followUp({ ...options, content });
  }

  public async deferReply() {
    return await this.interaction.deferReply();
  }
}
