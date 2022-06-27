import { injectable } from 'inversify';

import { SlashArgInstaller } from '../services/SlashCommandFactory/SlashArgInstaller';
import { SlashCommandContext } from '../models/SlashCommandContext';


@injectable()
export class SlashArgParser {
    name: string;
    description: string;

    async parse(arg: SlashArgInstaller, context: SlashCommandContext): Promise<any> { }
}
