import { TextArgumentInstaller } from '../factories/TextArgumentInstaller';
import { TextCommandContext } from '../models/TextCommandContext';
import { parser } from '../decorators';
import { Parser } from './Parser';


@parser()
export class StringParser extends Parser {
    name = 'string';
    description = 'Anything really. Use "quote for spaces"."';

    async parse(arg: TextArgumentInstaller, context: TextCommandContext) {
        return context.reader.getString();
    }
}
