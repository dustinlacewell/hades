import { SlashArgParser } from './SlashArgParser';
import { SlashCommandContext } from '../models/SlashCommandContext';
import { SlashArgInstaller } from '../services/SlashCommandFactory/SlashArgInstaller';
export declare class StringParser extends SlashArgParser {
    name: string;
    description: string;
    parse(arg: SlashArgInstaller, context: SlashCommandContext): Promise<string>;
}
