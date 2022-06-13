import { Message } from "discord.js";
import { inject, injectable } from "inversify";
import { HadesBotService } from "../../services/HadesBotService";
import { TextCommandService } from "./TextCommandService";


@injectable()
export class TextCommandBotService extends HadesBotService {
    @inject(TextCommandService)
    textCommandService: TextCommandService

    async onMessage<T extends Message>(message: T) {
        this.textCommandService.dispatch(message);
    }
}