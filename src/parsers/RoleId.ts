import Argument from '../commands/Argument';
import CommandContext from '../commands/CommandContext';
import parser from '../decorators/parser';
import Parser from './Parser';


@parser()
export default class RoleIdParser extends Parser {
    name = 'role id';
    description = 'A Discord Role ID.';

    async parse(arg: Argument, context: CommandContext) {
        return context.reader.getRoleID();
    }
}
