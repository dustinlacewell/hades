import Argument from '../commands/Argument';
import CommandContext from '../commands/CommandContext';
import parser from '../decorators/parser';
import Parser from './Parser';


@parser()
export default class UserParser extends Parser {
    name = 'user';
    description = 'A Discord User.';

    async parse(arg: Argument, context: CommandContext) {
        const id = context.reader.getUserID();
        if (id) {
            return context.msg.client.users.cache.get(id);
        }
    }
}
