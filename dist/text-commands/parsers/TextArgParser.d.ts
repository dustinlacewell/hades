import { TextArgInstaller } from '../services/TextCommandFactory/TextArgInstaller';
import { TextCommandContext } from '../models/TextCommandContext';
export declare class TextArgParser {
    name: string;
    description: string;
    parse(arg: TextArgInstaller, context: TextCommandContext): Promise<any>;
}
