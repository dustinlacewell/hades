import { getTextArgMeta, getTextCommandMeta } from '../metadata';
import { Constructable, Constructor } from '../../utils';


export interface DescriptionDecorator extends ClassDecorator, PropertyDecorator { }

export function description(msg: string): DescriptionDecorator {
    function DD(target: object, key?: any) {
        if (key) {
            // arg description
            const constructable = target as Constructable;
            const meta = getTextArgMeta(constructable.constructor, key);
            meta.description = msg;
        } else {
            // command description
            const ctor = target as Constructor;
            const meta = getTextCommandMeta(ctor);
            meta.description = msg;
            return ctor;
        }
    }
    return DD;
}
