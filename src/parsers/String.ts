import Argument from '../commands/Argument';
import CommandContext from '../commands/CommandContext';
import parser from '../decorators/parser';
import Parser from './Parser';


@parser()
export default class StringParser extends Parser {
    name = 'string';
    description = 'Anything really. Use "quote for spaces"."';

    async parse(arg: Argument, context: CommandContext) {
        return context.reader.getString();
    }
}
