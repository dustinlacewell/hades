import { Collection } from 'discord.js';
import { Newable } from '../../../utils';
import { SlashArgParser } from '../../parsers/SlashArgParser';
/**
 * A registry of decorated Parsers.
 *
 * Provides easy access to what classes were decorated with @parser.
 */
export declare class SlashArgParserRegistry {
    map: Collection<Newable<SlashArgParser>, SlashArgParser>;
    parsers: SlashArgParser[];
    init(): void;
    parserFor(parserType: Newable<SlashArgParser>): SlashArgParser;
    find(predicate: (meta: SlashArgParser) => boolean): SlashArgParser;
}
