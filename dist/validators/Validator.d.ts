import Argument from '../commands/Argument';
import CommandContext from '../commands/CommandContext';
import { Constructable } from '../utils';
export default class Validator {
    validate(arg: Argument, ctx: CommandContext, value: any): Promise<any>;
    static check(): (target: Constructable, key: string) => void;
}
