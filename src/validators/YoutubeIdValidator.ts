import ArgError from '../commands/ArgError';
import Argument from '../commands/Argument';
import CommandContext from '../commands/CommandContext';
import Validator from './Validator';


export default class YoutubeIdValidator extends Validator {

    static _channelIdRegExp = new RegExp(/UC[\w-]{21}[AQgw]/);

    public validate(arg: Argument, ctx: CommandContext, value: any): Promise<any> {
        if (!YoutubeIdValidator._channelIdRegExp.test(value as string)) {
            throw new ArgError(`\`${arg.name}\` must be a valid Youtube channel ID.`);
        }
        return;
    }
}
