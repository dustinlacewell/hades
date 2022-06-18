import { injectable } from 'inversify';

import { getTextArgMeta, registerTextParser } from '../metadata';
import { TextArgParser } from '../parsers/TextArgParser';
import { Constructable, Constructor, Newable } from '../../utils';


export interface ParserDecorator extends ClassDecorator, PropertyDecorator { }

/**
 * Sets the Parser to use for an argument.
 * @param parserClass The Parser to use.
 */
export function parser(parserClass?: Newable<TextArgParser>): ParserDecorator {
    return (target: Constructor, key?: any) => {
        if (key) {
            const constructable = target as Constructable;
            const argMeta = getTextArgMeta(constructable.constructor, key);
            argMeta.parserType = parserClass;
        } else {
            const ctor = target as Constructor;
            if (!(ctor.prototype instanceof TextArgParser)) {
                throw new Error(`@parser decorated class ${ctor.name} doesn't extend Parser.`);
            }
            registerTextParser(ctor as Newable<TextArgParser>);
            return injectable()(target);
        }
    }
}
