import Argument from '../commands/Argument';
import CommandContext from '../commands/CommandContext';
import parser from '../decorators/parser';
import Parser from './Parser';


@parser()
export default class ChannelIdParser extends Parser {
    name = 'channel id';
    description = 'Discord Channel ID (Right-click, Copy ID)';

    async parse(arg: Argument, context: CommandContext) {
        return context.reader.getChannelID();
    }
}
