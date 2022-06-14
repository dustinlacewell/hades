import { TextArgParser } from '../../parsers/TextArgParser';
import { Constructor, Newable } from '../../../utils';
export declare type TypeMap = [Constructor, Newable<TextArgParser>];
export declare class TextArgParserResolver {
    private types;
    constructor(types: TypeMap[]);
    infer(fromType: Constructor): Newable<TextArgParser>;
}
