import Argument from '../commands/Argument';
import CommandContext from '../commands/CommandContext';
import parser from '../decorators/parser';
import Parser from './Parser';


@parser()
export default class IntegerParser extends Parser {
    name = 'integer';
    description = "A whole number. (e.g. 42)";

    async parse(arg: Argument, context: CommandContext) {
        return context.reader.getInt();
    }
}
