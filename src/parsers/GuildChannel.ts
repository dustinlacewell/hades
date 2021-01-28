import Argument from '../commands/Argument';
import CommandContext from '../commands/CommandContext';
import parser from '../decorators/parser';
import Parser from './Parser';


@parser()
export default class GuildChannelParser extends Parser {
    name = 'guild channel';
    description = 'A Channel on this server.';

    async parse(arg: Argument, context: CommandContext) {
        const id = context.reader.getChannelID();
        if (id) {
            return context.msg.guild.channels.cache.get(id);
        }
    }
}
