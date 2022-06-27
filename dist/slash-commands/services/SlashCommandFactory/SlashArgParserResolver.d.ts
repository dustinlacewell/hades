import { SlashArgParser } from '../../parsers/SlashArgParser';
import { Constructor, Newable } from '../../../utils';
export declare type TypeMap = [Constructor, Newable<SlashArgParser>];
/**
 * Decides which parser to use for a given argument type.
 */
export declare class SlashArgParserResolver {
    protected types: TypeMap[];
    private map;
    init(): void;
    /**
     * Get a parser type for a given argument type.
     * @param fromType The argument type to look up.
     * @returns
     */
    infer(fromType: Constructor): Newable<SlashArgParser>;
}
