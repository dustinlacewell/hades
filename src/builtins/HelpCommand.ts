import { inject } from "inversify";
import { MessageEmbed } from "discord.js";

import Command from "../commands/Command";
import CommandService from "../services/CommandService";
import arg from "../decorators/arg";
import description from "../decorators/description";
import validate from "../decorators/validate";
import command from "../decorators/command";
import ArgError from "../commands/ArgError";


@command("help")
@description(`
Get help on commands.
Use the \`commands\` command to list all commands.`)
export default class HelpCommand extends Command {
    @arg()
    @description("Name of the command.")
    commandName: string;

    @inject(CommandService) commandService: CommandService;

    private helpEmbed: MessageEmbed;

    @validate('commandName')
    validateCommandName() {
        this.helpEmbed = this.commandService.helpFor(this.commandName);
        if (!this.helpEmbed) {
            throw new ArgError(`Couldn't find a "${this.commandName}" command. :weary:`);
        }
    }

    execute() {
        return this.reply({ embed: this.helpEmbed });
    }
}
