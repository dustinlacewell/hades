import { BaseCommandInteraction, Interaction, Message } from 'discord.js';
import { inject, injectable } from "inversify";
import { HadesBotService } from "../../services/HadesBotService";
import { SlashCommandService } from "./SlashCommandService/SlashCommandService";

@injectable()
export class SlashCommandBotService extends HadesBotService {
    @inject(SlashCommandService)
    commandService: SlashCommandService

    // @inject(SlashCommandHelpService)
    // helpService: SlashCommandHelpService

    async onInteractionCreate<T extends Interaction>(interaction: T) {
        console.log('Executing onInteractionCreate...')
        if (interaction.isCommand()) {
          console.log("this is a command")
        }
        console.log("this is not a command")

        // interaction.reply("interactionCreated")
        // this.commandService.dispatch(interaction);
    }

    // async onMessage<T extends Message>(msg: T) {
    //     // console.log('Executing onMessage...')
    //     msg.reply("test")
    //     // this.commandService.dispatch(interaction);
    // }
}