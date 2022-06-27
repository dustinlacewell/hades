import { BaseCommandInteraction, Message } from 'discord.js';
import { inject, injectable } from "inversify";
import { HadesBotService } from "../../services/HadesBotService";
import { SlashCommandService } from "./SlashCommandService/SlashCommandService";

@injectable()
export class SlashCommandBotService extends HadesBotService {
    @inject(SlashCommandService)
    commandService: SlashCommandService

    // @inject(SlashCommandHelpService)
    // helpService: SlashCommandHelpService

    async onInteractionCreated<T extends BaseCommandInteraction>(interaction: T) {
        console.log('Executing onInteractionCreated...')
        this.commandService.dispatch(interaction);
    }

    async onMessage<T extends Message>(msg: T) {
        console.log('Executing onMessage...')
        msg.reply("test")
        // this.commandService.dispatch(interaction);
    }
}