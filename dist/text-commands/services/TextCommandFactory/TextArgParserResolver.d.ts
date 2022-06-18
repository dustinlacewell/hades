import { TextArgParser } from '../../parsers/TextArgParser';
import { Constructor, Newable } from '../../../utils';
export declare type TypeMap = [Constructor, Newable<TextArgParser>];
/**
 * Decides which parser to use for a given argument type.
 */
export declare class TextArgParserResolver {
    protected types: TypeMap[];
    private map;
    init(): void;
    /**
     * Get a parser type for a given argument type.
     * @param fromType The argument type to look up.
     * @returns
     */
    infer(fromType: Constructor): Newable<TextArgParser>;
}
