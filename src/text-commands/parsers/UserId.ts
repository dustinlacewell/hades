import { TextArgumentInstaller } from '../factories/TextArgumentInstaller';
import { TextCommandContext } from '../models/TextCommandContext';
import { parser } from '../decorators';
import { Parser } from './Parser';


@parser()
export class UserIdParser extends Parser {
    name = 'user id';
    description = "Discord User ID. (Right-click, Copy ID)";

    async parse(arg: TextArgumentInstaller, context: TextCommandContext) {
        return context.reader.getUserID();
    }
}
