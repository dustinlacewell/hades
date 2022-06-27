import { injectable } from 'inversify';

import { getSlashArgMeta, registerSlashParser } from '../metadata';
import { SlashArgParser } from '../parsers/SlashArgParser';
import { Constructable, Constructor, Newable } from '../../utils';


export interface ParserDecorator extends ClassDecorator, PropertyDecorator { }

/**
 * Sets the Parser to use for an argument.
 * @param parserClass The Parser to use.
 */
export function parser(parserClass?: Newable<SlashArgParser>): ParserDecorator {
    return (target: Constructor, key?: any) => {
        if (key) {
            const constructable = target as Constructable;
            const argMeta = getSlashArgMeta(constructable.constructor, key);
            argMeta.parserType = parserClass;
        } else {
            const ctor = target as Constructor;
            if (!(ctor.prototype instanceof SlashArgParser)) {
                throw new Error(`@parser decorated class ${ctor.name} doesn't extend Parser.`);
            }
            registerSlashParser(ctor as Newable<SlashArgParser>);
            return injectable()(target);
        }
    }
}
