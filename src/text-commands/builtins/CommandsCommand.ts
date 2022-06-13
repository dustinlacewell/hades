import { inject } from "inversify";

import { command, description } from "../decorators";
import { TextCommand } from "../models/TextCommand";
import { TextCommandService } from "../services/TextCommandService";


@command("commands")
@description("List all commands.")
export class CommandsCommand extends TextCommand {
    @inject(TextCommandService)
    commandService: TextCommandService;

    execute() {
        const embeds = [
            this.commandService.commandsEmbed()
        ];
        return this.reply("all commands I know:", { embeds });
    }
}
