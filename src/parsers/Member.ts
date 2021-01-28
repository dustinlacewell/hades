import Argument from '../commands/Argument';
import CommandContext from '../commands/CommandContext';
import parser from '../decorators/parser';
import Parser from './Parser';


@parser()
export default class MemberParser extends Parser {
    name = 'member';
    description = 'A user on this server.';

    async parse(arg: Argument, context: CommandContext) {
        const id = context.reader.getUserID();
        if (id) {
            return context.msg.guild.members.cache.get(id);
        }
    }
}
