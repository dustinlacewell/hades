import { Parser } from '../parsers/Parser';
import { Newable } from '../../utils';
export interface ParserDecorator extends ClassDecorator, PropertyDecorator {
}
export declare function parser(parserClass?: Newable<Parser>): ParserDecorator;
