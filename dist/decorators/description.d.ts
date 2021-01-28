interface DescriptionDecorator extends ClassDecorator, PropertyDecorator {
}
export default function description(msg: string): DescriptionDecorator;
export {};
