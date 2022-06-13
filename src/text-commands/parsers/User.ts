import { TextArgumentInstaller } from '../factories/TextArgumentInstaller';
import { TextCommandContext } from '../models/TextCommandContext';
import { parser } from '../decorators';
import { Parser } from './Parser';


@parser()
export class UserParser extends Parser {
    name = 'user';
    description = 'A Discord User.';

    async parse(arg: TextArgumentInstaller, context: TextCommandContext) {
        const id = context.reader.getUserID();
        if (id) {
            return context.msg.client.users.cache.get(id);
        }
    }
}
