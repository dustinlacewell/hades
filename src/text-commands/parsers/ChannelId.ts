import { TextArgumentInstaller } from '../factories/TextArgumentInstaller';
import { TextCommandContext } from '../models/TextCommandContext';
import { parser } from '../decorators';
import { Parser } from './Parser';


@parser()
export class ChannelIdParser extends Parser {
    name = 'channel id';
    description = 'Discord Channel ID (Right-click, Copy ID)';

    async parse(arg: TextArgumentInstaller, context: TextCommandContext) {
        return context.reader.getChannelID();
    }
}
