import { TextArgInstaller } from '../services/TextCommandFactory/TextArgInstaller';
import { TextCommandContext } from '../models/TextCommandContext';
import { parser } from '../decorators';
import { TextArgParser } from './TextArgParser';


@parser()
export class MemberParser extends TextArgParser {
    name = 'member';
    description = 'A user on this server.';

    async parse(arg: TextArgInstaller, context: TextCommandContext) {
        const id = context.reader.getUserID();
        if (id) {
            return context.msg.guild.members.cache.get(id);
        }
    }
}
