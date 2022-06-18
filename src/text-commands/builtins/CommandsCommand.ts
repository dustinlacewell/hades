import { inject } from "inversify";

import { command, description } from "../decorators";
import { TextCommand } from "../models/TextCommand";
import { TextCommandHelpService } from "../services/TextCommandHelpService";


@command("commands")
@description("List all commands.")
export class CommandsCommand extends TextCommand {
    @inject(TextCommandHelpService)
    commandService: TextCommandHelpService;

    execute() {
        const embeds = [
            this.commandService.getCommandsEmbed(),
        ];
        return this.reply("all commands I know:", { embeds });
    }
}
