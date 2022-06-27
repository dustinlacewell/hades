import { Collection } from 'discord.js';
import { multiInject, postConstruct } from 'inversify';

import { singleton } from '../../../decorators/singleton';
import { SlashArgParser } from '../../parsers/SlashArgParser';
import { Constructor, Newable } from '../../../utils';
import { StringParser } from '../../parsers';


export type TypeMap = [Constructor, Newable<SlashArgParser>];


/**
 * Decides which parser to use for a given argument type.
 */
@singleton(SlashArgParserResolver)
export class SlashArgParserResolver {
    @multiInject('MappedTypes')
    protected types: TypeMap[]

    private map = new Collection<Constructor, Newable<SlashArgParser>>();

    @postConstruct()
    init() {
        this.types.forEach(([from, to]) => this.map.set(from, to))
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
        for (let [ctor, type] of this.map) {
            if (ctor.name === fromType.toString()) {
                return type;
            }
        }
    }
}
