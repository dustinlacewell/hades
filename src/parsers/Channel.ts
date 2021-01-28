import Argument from '../commands/Argument';
import CommandContext from '../commands/CommandContext';
import parser from '../decorators/parser';
import Parser from './Parser';


@parser()
export default class ChannelParser extends Parser {
    name = 'channel';
    description = 'A Discord channel.';

    async parse(arg: Argument, context: CommandContext) {
        const id = context.reader.getChannelID();
        if (id) {
            return context.msg.client.channels.cache.get(id);
        }
    }
}
