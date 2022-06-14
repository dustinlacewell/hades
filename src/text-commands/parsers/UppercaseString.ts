import { TextArgInstaller } from '../services/TextCommandFactory/TextArgInstaller';
import { TextCommandContext } from '../models/TextCommandContext';
import { parser } from '../decorators';
import { TextArgParser } from './TextArgParser';
import { TextArgError } from '../errors';


export type UppercaseString = Uppercase<string>;


const isUppercaseString = (str: string): str is UppercaseString => {
    // check if str is uppercase
    return str === str.toUpperCase();
}

@parser()
export class UppercaseStringParser extends TextArgParser {
    name = 'uppercase-string';
    description = 'An uppercase string. Use "QUOTES FOR SPACES".';

    async parse(arg: TextArgInstaller, context: TextCommandContext) {
        const str = context.reader.getString();
        if (isUppercaseString(str)) {
            return str as UppercaseString;
        }

        throw new TextArgError(`Expected an uppercase string, got "${str}".`);
    }
}
