export interface DescriptionDecorator extends ClassDecorator, PropertyDecorator {
}
/**
 * Sets the description on a @command or @arg decorated target.
 * @param msg The description.
 */
export declare function description(msg: string): DescriptionDecorator;
