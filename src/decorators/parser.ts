import { injectable } from 'inversify';

import { getArgMeta, registerParser } from '../meta';
import Parser from '../parsers/Parser';
import { Constructable, Constructor, Newable } from '../utils';


interface ParserDecorator extends ClassDecorator, PropertyDecorator { }

export default function parser(parserClass?: Newable<Parser>): ParserDecorator {
    return (target: object, key?: any) => {
        if (key) {
            const constructable = target as Constructable;
            const argMeta = getArgMeta(constructable.constructor, key);
            argMeta.parserType = parserClass;
        } else {
            const ctor = target as Constructor;
            if (!(ctor.prototype instanceof Parser)) {
                throw new Error(`@parser decorated class ${ctor.name} doesn't extend Parser.`);
            }
            registerParser(ctor as Newable<Parser>);
            return injectable()(target);
        }
    }
}
