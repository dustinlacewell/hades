import Argument from '../commands/Argument';
import CommandContext from '../commands/CommandContext';
import parser from '../decorators/parser';
import Parser from './Parser';


@parser()
export default class UserIdParser extends Parser {
    name = 'user id';
    description = "Discord User ID. (Right-click, Copy ID)";

    async parse(arg: Argument, context: CommandContext) {
        return context.reader.getUserID();
    }
}
