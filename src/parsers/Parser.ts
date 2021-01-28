import { injectable } from 'inversify';

import Argument from '../commands/Argument';
import CommandContext from '../commands/CommandContext';


@injectable()
export default class Parser {
    name: string;
    description: string;

    async parse(arg: Argument, context: CommandContext): Promise<any> { }
}
