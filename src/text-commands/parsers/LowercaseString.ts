import { TextArgInstaller } from '../services/TextCommandFactory/TextArgInstaller';
import { TextCommandContext } from '../models/TextCommandContext';
import { parser } from '../decorators';
import { TextArgParser } from './TextArgParser';
import { TextArgError } from '../errors';


export type LowercaseString = Lowercase<string>;


const isLowercaseString = (str: string): str is LowercaseString => {
    // check if str is lowercase
    return str === str.toLowerCase();
}

@parser()
export class LowercaseStringParser extends TextArgParser {
    name = 'lowercase-string';
    description = 'An lowercase string. Use "QUOTES FOR SPACES".';

    async parse(arg: TextArgInstaller, context: TextCommandContext) {
        const str = context.reader.getString();
        if (isLowercaseString(str)) {
            return str as LowercaseString;
        }

        throw new TextArgError(`Expected an lowercase string, got "${str}".`);
    }
}
