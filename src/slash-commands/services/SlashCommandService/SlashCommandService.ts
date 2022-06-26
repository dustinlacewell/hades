import { BaseCommandInteraction } from "discord.js";
import { inject } from "inversify";
import { singleton } from "../../../decorators/singleton";
import { SlashCommandContext } from "../../models/SlashCommandContext";

@singleton(SlashCommandService)
export class SlashCommandService {
    /** the command prefix */
    prefix: string;

    /** service for parsing incoming interactions */
    // @inject(SlashCommandParserService)
    // parserService: SlashCommandParserService

    /** factories for creating command instances */
    // @inject(SlashCommandFactoryRegistry)
    // factories: SlashCommandFactoryRegistry

    // @inject(SlashCommandHelpService)
    // help: SlashCommandHelpService

    async execute(ctx: SlashCommandContext) {
      // TODO
    }

    dispatch(interaction: BaseCommandInteraction) {
      // TODO: Do something with this interaction
      // Parse the interaction
      // Execute logic to handle interaction
    }
}