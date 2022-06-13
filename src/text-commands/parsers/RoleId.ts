import { TextArgumentInstaller } from '../factories/TextArgumentInstaller';
import { TextCommandContext } from '../models/TextCommandContext';
import { parser } from '../decorators';
import { Parser } from './Parser';


@parser()
export class RoleIdParser extends Parser {
    name = 'role id';
    description = 'A Discord Role ID.';

    async parse(arg: TextArgumentInstaller, context: TextCommandContext) {
        return context.reader.getRoleID();
    }
}
