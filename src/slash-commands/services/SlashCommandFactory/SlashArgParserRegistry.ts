import { Collection } from 'discord.js';
import { multiInject, postConstruct } from 'inversify';

import { singleton } from '../../../decorators/singleton';
import { Newable } from '../../../utils';
import { SlashArgParser } from '../../parsers/SlashArgParser';


/**
 * A registry of decorated Parsers.
 * 
 * Provides easy access to what classes were decorated with @parser.
 */
@singleton(SlashArgParserRegistry)
export class SlashArgParserRegistry {
    map = new Collection<Newable<SlashArgParser>, SlashArgParser>();

    @multiInject(SlashArgParser)
    parsers: SlashArgParser[]

    @postConstruct()
    init() {
        for (const parser of this.parsers) {
            this.map.set(parser.constructor as Newable<SlashArgParser>, parser);
        }
    }

    parserFor(parserType: Newable<SlashArgParser>) {
        return this.map.get(parserType);
    }

    find(predicate: (meta: SlashArgParser) => boolean) {
        return this.parsers.find(predicate)
    }
}
