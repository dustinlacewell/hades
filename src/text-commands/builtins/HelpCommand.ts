import { inject } from "inversify";
import { MessageEmbed } from "discord.js";

import { TextCommand } from "../models/TextCommand";
import { TextArgError } from "../errors/TextArgError";
import { command, description, arg, validate } from "../decorators";
import { TextCommandHelpService } from "../services/TextCommandHelpService";


@command("help")
@description(`
Get help on commands.
Use the \`commands\` command to list all commands.`)
export class HelpCommand extends TextCommand {
    @arg()
    @description("Name of the command.")
    commandName: string;

    @inject(TextCommandHelpService)
    helpService: TextCommandHelpService;

    private helpEmbed: MessageEmbed;

    @validate('commandName')
    validateCommandName() {
        this.helpEmbed = this.helpService.getHelpEmbed(this.commandName);

        if (!this.helpEmbed) {
            throw new TextArgError(`Couldn't find a "${this.commandName}" command. :weary:`);
        }
    }

    execute() {
        return this.reply("Here's what I've got:", { embeds: [this.helpEmbed] });
    }
}
