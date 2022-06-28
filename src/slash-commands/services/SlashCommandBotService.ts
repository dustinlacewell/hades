import { BaseCommandInteraction, Interaction } from "discord.js";
import { inject, injectable } from "inversify";
import { HadesBotService } from "../../services/HadesBotService";
import { SlashCommandService } from "./SlashCommandService/SlashCommandService";
import Commands from "../commands";

@injectable()
export class SlashCommandBotService extends HadesBotService {
  @inject(SlashCommandService)
  commandService: SlashCommandService;

  // @inject(SlashCommandHelpService)
  // helpService: SlashCommandHelpService

  async onReady() {
    console.log("Executing onReady...");
    await this.commandService.registerCommands(this.client);
    //await this.client.application.commands.set(Commands);
  }

  async onInteractionCreate<T extends Interaction>(interaction: T) {
    console.log("Executing onInteractionCreate...");

    if (!interaction.isCommand() || interaction.isContextMenu()) {
      return;
    }
    // await this.executeSlashCommand(interaction);

    this.commandService.dispatch(interaction);
  }

  // async executeSlashCommand(interaction: BaseCommandInteraction) {
  //   const slashCommand = Commands.find(
  //     (command) => command.name === interaction.commandName
  //   );

  //   if (!slashCommand) {
  //     interaction.followUp({ content: "There was an error." });
  //     return;
  //   }

  //   await interaction.deferReply();
  //   slashCommand.run(this.client, interaction);
  // }
}
