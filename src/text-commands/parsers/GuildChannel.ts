import { TextArgInstaller } from '../services/TextCommandFactory/TextArgInstaller';
import { TextCommandContext } from '../models/TextCommandContext';
import { parser } from '../decorators';
import { TextArgParser } from './TextArgParser';


@parser()
export class GuildChannelParser extends TextArgParser {
    name = 'guild channel';
    description = 'A Channel on this server.';

    async parse(arg: TextArgInstaller, context: TextCommandContext) {
        const id = context.reader.getChannelID();
        if (id) {
            return context.msg.guild.channels.cache.get(id);
        }
    }
}
