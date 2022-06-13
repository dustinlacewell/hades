import { Collection } from 'discord.js';
import { Parser } from '../parsers/Parser';
import { Newable } from '../../utils';
/**
 * A registry of decorated Parsers.
 */
export declare class ParserRegistry {
    parsers: Collection<Newable<Parser>, Parser>;
    constructor(parsers: Parser[]);
    parserFor(parserType: Newable<Parser>): Parser;
}
