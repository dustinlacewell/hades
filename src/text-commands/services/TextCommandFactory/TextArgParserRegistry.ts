import { Collection } from 'discord.js';
import { multiInject } from 'inversify';

import { singleton } from '../../../decorators/singleton';
import { TextArgParser } from '../../parsers/TextArgParser';
import { Newable } from '../../../utils';


/**
 * A registry of decorated Parsers.
 */
@singleton(TextArgParserRegistry)
export class TextArgParserRegistry {
    parsers = new Collection<Newable<TextArgParser>, TextArgParser>();

    constructor(
        @multiInject(TextArgParser) parsers: TextArgParser[],
    ) {
        for (let parser of parsers) {
            this.parsers.set(parser.constructor as Newable<TextArgParser>, parser);
        }
    }

    parserFor(parserType: Newable<TextArgParser>) {
        return this.parsers.get(parserType);
    }
}
