import { TextArgumentInstaller } from '../factories/TextArgumentInstaller';
import { TextCommandContext } from '../models/TextCommandContext';
import { parser } from '../decorators';
import { Parser } from './Parser';


@parser()
export class GuildChannelParser extends Parser {
    name = 'guild channel';
    description = 'A Channel on this server.';

    async parse(arg: TextArgumentInstaller, context: TextCommandContext) {
        const id = context.reader.getChannelID();
        if (id) {
            return context.msg.guild.channels.cache.get(id);
        }
    }
}
