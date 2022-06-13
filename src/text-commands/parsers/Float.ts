import { TextArgumentInstaller } from '../factories/TextArgumentInstaller';
import { TextCommandContext } from '../models/TextCommandContext';
import { parser } from '../decorators';
import { Parser } from './Parser';


@parser()
export class FloatParser extends Parser {
    name = 'float';
    description = 'A floating-point number. (e.g. 3.14)';

    async parse(arg: TextArgumentInstaller, context: TextCommandContext) {
        return context.reader.getFloat();
    }
}
