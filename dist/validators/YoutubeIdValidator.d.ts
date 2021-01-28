import Argument from '../commands/Argument';
import CommandContext from '../commands/CommandContext';
import Validator from './Validator';
export default class YoutubeIdValidator extends Validator {
    static _channelIdRegExp: RegExp;
    validate(arg: Argument, ctx: CommandContext, value: any): Promise<any>;
}
