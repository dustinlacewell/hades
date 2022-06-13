import { Message } from "discord.js";
import { HadesBotService } from "../../services/HadesBotService";
import { TextCommandService } from "./TextCommandService";
export declare class TextCommandBotService extends HadesBotService {
    textCommandService: TextCommandService;
    onMessage<T extends Message>(message: T): Promise<void>;
}
