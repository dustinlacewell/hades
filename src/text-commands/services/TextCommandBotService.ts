import { Message } from "discord.js";
import { inject, injectable } from "inversify";
import { HadesBotService } from "../../services/HadesBotService";
import { TextCommandHelpService } from "./TextCommandHelpService";
import { TextCommandService } from "./TextCommandService/TextCommandService";


/**
 * A base bot class with text command support.
 */
@injectable()
export class TextCommandBotService extends HadesBotService {
    @inject(TextCommandService)
    commandService: TextCommandService

    @inject(TextCommandHelpService)
    helpService: TextCommandHelpService

    async onMessage<T extends Message>(message: T) {
        this.commandService.dispatch(message);
    }
}