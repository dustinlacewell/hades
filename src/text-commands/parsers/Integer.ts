import { TextArgumentInstaller } from '../factories/TextArgumentInstaller';
import { TextCommandContext } from '../models/TextCommandContext';
import { parser } from '../decorators';
import { Parser } from './Parser';


@parser()
export class IntegerParser extends Parser {
    name = 'integer';
    description = "A whole number. (e.g. 42)";

    async parse(arg: TextArgumentInstaller, context: TextCommandContext) {
        return context.reader.getInt();
    }
}
