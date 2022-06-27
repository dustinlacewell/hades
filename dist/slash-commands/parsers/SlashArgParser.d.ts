import { SlashArgInstaller } from '../services/SlashCommandFactory/SlashArgInstaller';
import { SlashCommandContext } from '../models/SlashCommandContext';
export declare class SlashArgParser {
    name: string;
    description: string;
    parse(arg: SlashArgInstaller, context: SlashCommandContext): Promise<any>;
}
