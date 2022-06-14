import { Container, injectable } from 'inversify';

import { TextArgumentInstaller } from '../factories/TextArgumentInstaller';
import { addArgValidator } from '../metadata';
import { Constructable } from '../../utils';
import { TextCommandContext } from '../models/TextCommandContext';


@injectable()
export class Validator {
    public validate(arg: TextArgumentInstaller, ctx: TextCommandContext, value: any): Promise<any> {
        return;
    }

    static check() {
        return (target: Constructable, key: string) => {
            addArgValidator(target.constructor, key, (di: Container) => {
                di
                    .bind(Validator)
                    .to(this)
                    .whenTargetNamed(key);
            });
        }
    }
}