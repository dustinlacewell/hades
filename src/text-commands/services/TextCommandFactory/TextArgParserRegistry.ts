import { Collection } from 'discord.js';
import { multiInject, postConstruct } from 'inversify';

import { singleton } from '../../../decorators/singleton';
import { TextArgParser } from '../../parsers/TextArgParser';
import { Newable } from '../../../utils';


/**
 * A registry of decorated Parsers.
 * 
 * Provides easy access to what classes were decorated with @parser.
 */
@singleton(TextArgParserRegistry)
export class TextArgParserRegistry {
    map = new Collection<Newable<TextArgParser>, TextArgParser>();

    @multiInject(TextArgParser)
    parsers: TextArgParser[]

    @postConstruct()
    init() {
        for (const parser of this.parsers) {
            this.map.set(parser.constructor as Newable<TextArgParser>, parser);
        }
    }

    parserFor(parserType: Newable<TextArgParser>) {
        return this.map.get(parserType);
    }

    find(predicate: (meta: TextArgParser) => boolean) {
        return this.parsers.find(predicate)
    }
}
