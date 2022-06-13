import { TextArgumentInstaller } from '../factories/TextArgumentInstaller';
import { TextCommandContext } from '../models/TextCommandContext';
import { parser } from '../decorators';
import { Parser } from './Parser';


@parser()
export class MemberParser extends Parser {
    name = 'member';
    description = 'A user on this server.';

    async parse(arg: TextArgumentInstaller, context: TextCommandContext) {
        const id = context.reader.getUserID();
        if (id) {
            return context.msg.guild.members.cache.get(id);
        }
    }
}
