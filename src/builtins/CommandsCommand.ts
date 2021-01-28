import { inject } from "inversify";

import Command from "../commands/Command";
import command from "../decorators/command";
import description from "../decorators/description";
import CommandService from "../services/CommandService";


@command("commands")
@description("List all commands.")
export default class CommandsCommand extends Command {
    @inject(CommandService) commandService: CommandService;

    execute() {
        const embed = this.commandService.commandsEmbed();
        return this.reply("all commands I know:", { embed });
    }
}
