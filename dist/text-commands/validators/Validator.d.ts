import { TextArgumentInstaller } from '../factories/TextArgumentInstaller';
import { Constructable } from '../../utils';
import { TextCommandContext } from '../models/TextCommandContext';
export declare class Validator {
    validate(arg: TextArgumentInstaller, ctx: TextCommandContext, value: any): Promise<any>;
    static check(): (target: Constructable, key: string) => void;
}
