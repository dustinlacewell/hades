import { TextArgParser } from '../parsers/TextArgParser';
import { Newable } from '../../utils';
export interface ParserDecorator extends ClassDecorator, PropertyDecorator {
}
export declare function parser(parserClass?: Newable<TextArgParser>): ParserDecorator;
