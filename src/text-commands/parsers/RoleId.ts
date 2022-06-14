import { TextArgInstaller } from '../services/TextCommandFactory/TextArgInstaller';
import { TextCommandContext } from '../models/TextCommandContext';
import { parser } from '../decorators';
import { TextArgParser } from './TextArgParser';


@parser()
export class RoleIdParser extends TextArgParser {
    name = 'role id';
    description = 'A Discord Role ID.';

    async parse(arg: TextArgInstaller, context: TextCommandContext) {
        return context.reader.getRoleID();
    }
}
