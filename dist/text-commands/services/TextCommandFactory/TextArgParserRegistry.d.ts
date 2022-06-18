import { Collection } from 'discord.js';
import { TextArgParser } from '../../parsers/TextArgParser';
import { Newable } from '../../../utils';
/**
 * A registry of decorated Parsers.
 *
 * Provides easy access to what classes were decorated with @parser.
 */
export declare class TextArgParserRegistry {
    map: Collection<Newable<TextArgParser>, TextArgParser>;
    parsers: TextArgParser[];
    init(): void;
    parserFor(parserType: Newable<TextArgParser>): TextArgParser;
    find(predicate: (meta: TextArgParser) => boolean): TextArgParser;
}
