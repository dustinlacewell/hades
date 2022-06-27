import { BaseCommandInteraction, Client, Collection, Interaction, Message } from 'discord.js';
import { inject, injectable } from "inversify";
import { HadesBotService } from "../../services/HadesBotService";
import { SlashCommandService } from "./SlashCommandService/SlashCommandService";
import Commands from '../commands';

export interface GuildConfig {
  id: string
  lang: string
  prefix: string
  almanaxChannel: string
  partyChannel: string
  buildPreview: string
}

@injectable()
export class SlashCommandBotService extends HadesBotService {
    @inject(SlashCommandService)
    commandService: SlashCommandService

    // @inject(SlashCommandHelpService)
    // helpService: SlashCommandHelpService

    async onReady() {
      console.log('Executing onReady...')
      await this.client.application.commands.set(Commands)
    }

    async onInteractionCreate<T extends Interaction>(interaction: T) {
        console.log('Executing onInteractionCreate...')

        if (!interaction.isCommand() || interaction.isContextMenu()) {
          console.log("this is not a command")
          return
        }
        console.log("this is a command")
        await this.executeSlashCommand(interaction)
        // const command = this.client.commands.get(interaction.commandName);

        // interaction.reply("interactionCreated")
        // this.commandService.dispatch(interaction);
    }

    async executeSlashCommand(interaction: BaseCommandInteraction) {
      const slashCommand = Commands.find(command => command.name === interaction.commandName)
      if (!slashCommand) {
          interaction.followUp({ content: "There was an error." })
          return
      }
  
      await interaction.deferReply()
  
      slashCommand.run(this.client, interaction)
    }
    // async onMessage<T extends Message>(msg: T) {
    //     // console.log('Executing onMessage...')
    //     msg.reply("test")
    //     // this.commandService.dispatch(interaction);
    // }
}