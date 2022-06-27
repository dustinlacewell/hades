import { BaseCommandInteraction, Client, Collection, Interaction, Message } from 'discord.js';
import { inject, injectable } from "inversify";
import { HadesBotService } from "../../services/HadesBotService";
import { SlashCommandService } from "./SlashCommandService/SlashCommandService";
import { getPingData } from '../commands/Ping';

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
      this.client.commands = new Collection()
      this.client.commands.set(getPingData.data.name, getPingData)
    }

    async onInteractionCreate<T extends Interaction>(interaction: T) {
        console.log('Executing onInteractionCreate...')

        if (!interaction.isCommand()) {
          console.log("this is not a command")
          return
        }
        console.log("this is a command")
        // const command = this.client.commands.get(interaction.commandName);

        // interaction.reply("interactionCreated")
        // this.commandService.dispatch(interaction);
    }

    // async onMessage<T extends Message>(msg: T) {
    //     // console.log('Executing onMessage...')
    //     msg.reply("test")
    //     // this.commandService.dispatch(interaction);
    // }
}