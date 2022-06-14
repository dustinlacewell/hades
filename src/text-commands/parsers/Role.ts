import { TextArgInstaller } from '../services/TextCommandFactory/TextArgInstaller';
import { TextCommandContext } from '../models/TextCommandContext';
import { parser } from '../decorators';
import { TextArgParser } from './TextArgParser';


@parser()
export class RoleParser extends TextArgParser {
    name = 'role';
    description = 'A role on this server.';

    async parse(arg: TextArgInstaller, context: TextCommandContext) {
        const id = context.reader.getRoleID();
        if (id) {
            return context.msg.guild.roles.cache.get(id);
        }
    }
}
