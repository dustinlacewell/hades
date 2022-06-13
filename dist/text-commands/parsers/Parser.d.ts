import { TextArgumentInstaller } from '../factories/TextArgumentInstaller';
import { TextCommandContext } from '../models/TextCommandContext';
export declare class Parser {
    name: string;
    description: string;
    parse(arg: TextArgumentInstaller, context: TextCommandContext): Promise<any>;
}
