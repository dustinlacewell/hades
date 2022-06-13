import { TextArgumentInstaller } from '../factories/TextArgumentInstaller';
import { TextCommandContext } from '../models/TextCommandContext';
import { parser } from '../decorators';
import { Parser } from './Parser';


@parser()
export class RoleParser extends Parser {
    name = 'role';
    description = 'A role on this server.';

    async parse(arg: TextArgumentInstaller, context: TextCommandContext) {
        const id = context.reader.getRoleID();
        if (id) {
            return context.msg.guild.roles.cache.get(id);
        }
    }
}
