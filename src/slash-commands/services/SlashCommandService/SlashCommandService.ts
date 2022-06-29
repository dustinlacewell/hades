import { BaseCommandInteraction, Client } from "discord.js";
import { inject } from "inversify";
import { singleton } from "../../../decorators/singleton";
import { SlashArgError } from "../../errors/SlashArgError";
import { SlashCommandContext } from "../../models/SlashCommandContext";
import { SlashCommandFactoryRegistry } from "../SlashCommandFactory/SlashCommandFactoryRegistry";
import { SlashParserService } from "./SlashParserService";
import { Command } from "../../builtins/Command";
import { getSlashCommandMetas } from "../../metadata/api";

@singleton(SlashCommandService)
export class SlashCommandService {
  /** service for parsing incoming interactions */
  @inject(SlashParserService)
  parserService: SlashParserService;

  /** factories for creating command instances */
  @inject(SlashCommandFactoryRegistry)
  factories: SlashCommandFactoryRegistry;

  // @inject(SlashCommandHelpService)
  // help: SlashCommandHelpService

  async execute(ctx: SlashCommandContext) {
    const factory = this.factories.factoryFor(ctx.command);

    if (factory) {
      try {
        const command = await factory.create(ctx);
        await command.execute();
      } catch (e: unknown) {
        if (e instanceof SlashArgError) {
          if (e.showHelp) {
            ctx.interaction.reply({
              content: e.message,
            });
          } else {
            ctx.interaction.reply(e.message);
          }
        } else {
          ctx.interaction.reply(
            "Erm, uh well something went wrong. Dunno what though."
          );
          console.error(e);
        }
      }
    }
  }

  dispatch(interaction: BaseCommandInteraction) {
    const parsedMessage = this.parserService.parse(interaction);
    if (parsedMessage) {
      this.execute(parsedMessage);
    }
  }

  async registerCommands(client: Client) {
    await client.application.commands.set(this.getCommandRegistrationMeta());
  }

  protected getCommandRegistrationMeta(): Command[] {
    return getSlashCommandMetas().map((meta) => meta.registrationDetails);
  }
}
