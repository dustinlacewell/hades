import { Collection } from 'discord.js';
import { multiInject } from 'inversify';

import { singleton } from '../../../decorators/singleton';
import { TextArgParser } from '../../parsers/TextArgParser';
import { Constructor, Newable } from '../../../utils';
import { StringParser } from '../../parsers';


export type TypeMap = [Constructor, Newable<TextArgParser>];

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

    infer(fromType: Constructor) {
        if (!fromType) {
            return StringParser;
        }
        for (let [ctor, type] of this.types) {
            if (ctor.toString() === fromType.toString()) {
                return type;
            }
        }
    }
}
