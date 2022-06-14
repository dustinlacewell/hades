import { TextArgInstaller } from '../services/TextCommandFactory/TextArgInstaller';
import { TextCommandContext } from '../models/TextCommandContext';
import { parser } from '../decorators';
import { TextArgParser } from './TextArgParser';


@parser()
export class IntegerParser extends TextArgParser {
    name = 'integer';
    description = "A whole number. (e.g. 42)";

    async parse(arg: TextArgInstaller, context: TextCommandContext) {
        return context.reader.getInt();
    }
}
