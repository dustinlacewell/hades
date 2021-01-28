import Argument from '../commands/Argument';
import CommandContext from '../commands/CommandContext';
import parser from '../decorators/parser';
import Parser from './Parser';


@parser()
export default class RoleParser extends Parser {
    name = 'role';
    description = 'A role on this server.';

    async parse(arg: Argument, context: CommandContext) {
        const id = context.reader.getRoleID();
        if (id) {
            return context.msg.guild.roles.cache.get(id);
        }
    }
}
