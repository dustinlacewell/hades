import { TextArgInstaller } from '../services/TextCommandFactory/TextArgInstaller';
import { TextCommandContext } from '../models/TextCommandContext';
import { TextArgParser } from './TextArgParser';
export declare class StringParser extends TextArgParser {
    name: string;
    description: string;
    parse(arg: TextArgInstaller, context: TextCommandContext): Promise<string>;
}
