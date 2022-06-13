import { TextArgumentInstaller } from '../factories/TextArgumentInstaller';
import { TextCommandContext } from '../models/TextCommandContext';
import { parser } from '../decorators';
import { Parser } from './Parser';


@parser()
export class ChannelParser extends Parser {
    name = 'channel';
    description = 'A Discord channel.';

    async parse(arg: TextArgumentInstaller, context: TextCommandContext) {
        const id = context.reader.getChannelID();
        if (id) {
            return context.msg.client.channels.cache.get(id);
        }
    }
}
