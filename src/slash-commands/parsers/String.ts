import { parser } from '../decorators';
import { SlashArgParser } from './SlashArgParser';
import { SlashCommandContext } from '../models/SlashCommandContext';
import { SlashArgInstaller } from '../services/SlashCommandFactory/SlashArgInstaller';


@parser()
export class StringParser extends SlashArgParser {
    name = 'string';
    description = 'Anything really. Use "quote for spaces"."';

    async parse(arg: SlashArgInstaller, context: SlashCommandContext) {
        return context.getCommandName();
    }
}
