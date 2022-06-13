import { getArgMeta, getCommandMeta } from '../metadata';
import { Constructable, Constructor } from '../../utils';


export interface DescriptionDecorator extends ClassDecorator, PropertyDecorator { }

export function description(msg: string): DescriptionDecorator {
    function DD(target: object, key?: any) {
        if (key) {
            // arg description
            const constructable = target as Constructable;
            const meta = getArgMeta(constructable.constructor, key);
            meta.description = msg;
        } else {
            // command description
            const ctor = target as Constructor;
            const meta = getCommandMeta(ctor);
            meta.description = msg;
            return ctor;
        }
    }
    return DD;
}
