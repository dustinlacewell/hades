import Argument from '../commands/Argument';
import CommandContext from '../commands/CommandContext';
export default class Parser {
    name: string;
    description: string;
    parse(arg: Argument, context: CommandContext): Promise<any>;
}
