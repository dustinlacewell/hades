import { SlashArgParser } from '../parsers/SlashArgParser';
import { Newable } from '../../utils';
export interface ParserDecorator extends ClassDecorator, PropertyDecorator {
}
/**
 * Sets the Parser to use for an argument.
 * @param parserClass The Parser to use.
 */
export declare function parser(parserClass?: Newable<SlashArgParser>): ParserDecorator;
