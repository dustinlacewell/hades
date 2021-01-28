import Parser from '../parsers/Parser';
import { Constructor, Newable } from '../utils';
export declare type TypeMap = [Constructor, Newable<Parser>];
export default class InferenceService {
    private types;
    constructor(types: TypeMap[]);
    infer(fromType: Constructor): Newable<Parser>;
}
