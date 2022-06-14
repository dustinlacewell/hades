import { Collection } from 'discord.js';
import { multiInject } from 'inversify';

import { singleton } from '../../decorators/singleton';
import { Parser } from '../parsers/Parser';
import { Newable } from '../../utils';


/**
 * A registry of decorated Parsers.
 */
@singleton(ParserRegistry)
export class ParserRegistry {
    parsers = new Collection<Newable<Parser>, Parser>();

    constructor(
        @multiInject(Parser) parsers: Parser[],
    ) {
        for (let parser of parsers) {
            this.parsers.set(parser.constructor as Newable<Parser>, parser);
        }
    }

    parserFor(parserType: Newable<Parser>) {
        return this.parsers.get(parserType);
    }
}