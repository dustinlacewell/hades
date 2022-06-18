import { Collection } from 'discord.js';
import { multiInject } from 'inversify';

import { singleton } from '../../../decorators/singleton';
import { TextArgParser } from '../../parsers/TextArgParser';
import { Constructor, Newable } from '../../../utils';
import { StringParser } from '../../parsers';


export type TypeMap = [Constructor, Newable<TextArgParser>];


/**
 * Decides which parser to use for a given argument type.
 */
@singleton(TextArgParserResolver)
export class TextArgParserResolver {

    private types = new Collection<Constructor, Newable<TextArgParser>>();

    constructor(
        @multiInject('MappedTypes') types: TypeMap[],
    ) {
        for (let [from, to] of types) {
            this.types.set(from, to);
        }
    }

    /**
     * Get a parser type for a given argument type.
     * @param fromType The argument type to look up.
     * @returns 
     */
    infer(fromType: Constructor) {
        if (!fromType) {
            return StringParser;
        }
        for (let [ctor, type] of this.types) {
            if (ctor.name === fromType.toString()) {
                return type;
            }
        }
    }
}
