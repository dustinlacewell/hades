import Argument from '../commands/Argument';
import CommandContext from '../commands/CommandContext';
import parser from '../decorators/parser';
import Parser from './Parser';


@parser()
export default class FloatParser extends Parser {
    name = 'float';
    description = 'A floating-point number. (e.g. 3.14)';

    async parse(arg: Argument, context: CommandContext) {
        return context.reader.getFloat();
    }
}
