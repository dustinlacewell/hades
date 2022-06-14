import { Collection } from 'discord.js';
import { TextArgParser } from '../../parsers/TextArgParser';
import { Newable } from '../../../utils';
/**
 * A registry of decorated Parsers.
 */
export declare class TextArgParserRegistry {
    parsers: Collection<Newable<TextArgParser>, TextArgParser>;
    constructor(parsers: TextArgParser[]);
    parserFor(parserType: Newable<TextArgParser>): TextArgParser;
}
