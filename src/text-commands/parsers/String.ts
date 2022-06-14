import { TextArgInstaller } from '../services/TextCommandFactory/TextArgInstaller';
import { TextCommandContext } from '../models/TextCommandContext';
import { parser } from '../decorators';
import { TextArgParser } from './TextArgParser';


@parser()
export class StringParser extends TextArgParser {
    name = 'string';
    description = 'Anything really. Use "quote for spaces"."';

    async parse(arg: TextArgInstaller, context: TextCommandContext) {
        return context.reader.getString();
    }
}
