import { TextArgumentInstaller } from '../factories/TextArgumentInstaller';
import { TextCommandContext } from '../models/TextCommandContext';
import { Validator } from './Validator';
export declare class YoutubeIdValidator extends Validator {
    static _channelIdRegExp: RegExp;
    validate(arg: TextArgumentInstaller, ctx: TextCommandContext, value: any): Promise<any>;
}
