import { TextArgumentInstaller } from '../factories/TextArgumentInstaller';
import { TextCommandContext } from '../models/TextCommandContext';
import { parser } from '../decorators';
import { Parser } from './Parser';
import { TextArgError } from '../errors';


export type UppercaseString = Uppercase<string>;


const isUppercaseString = (str: string): str is UppercaseString => {
    // check if str is uppercase
    return str === str.toUpperCase();
}

@parser()
export class UppercaseStringParser extends Parser {
    name = 'uppercase-string';
    description = 'An uppercase string. Use "QUOTES FOR SPACES".';

    async parse(arg: TextArgumentInstaller, context: TextCommandContext) {
        const str = context.reader.getString();
        if (isUppercaseString(str)) {
            return str as UppercaseString;
        }

        throw new TextArgError(`Expected an uppercase string, got "${str}".`);
    }
}
