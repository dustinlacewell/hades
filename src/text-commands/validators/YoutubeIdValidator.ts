import { TextArgError } from '../errors/TextArgError';
import { TextArgumentInstaller } from '../factories/TextArgumentInstaller';
import { TextCommandContext } from '../models/TextCommandContext';

import { Validator } from './Validator';


export class YoutubeIdValidator extends Validator {

    static _channelIdRegExp = new RegExp(/UC[\w-]{21}[AQgw]/);

    public validate(arg: TextArgumentInstaller, ctx: TextCommandContext, value: any): Promise<any> {
        if (!YoutubeIdValidator._channelIdRegExp.test(value as string)) {
            throw new TextArgError(`\`${arg.name}\` must be a valid Youtube channel ID.`);
        }
        return;
    }
}
