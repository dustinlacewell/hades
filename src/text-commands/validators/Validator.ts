import { Container, injectable } from 'inversify';

import { TextArgumentInstaller } from '../factories/TextArgumentInstaller';
import { addArgValidator } from '../metadata';
import { Constructable } from '../../utils';
import { TextCommandContext } from '../models/TextCommandContext';


@injectable()
export class Validator {
    public async validate(arg: TextArgumentInstaller, ctx: TextCommandContext, value: any): Promise<any> {
        return;
    }

    static check() {
        return ({ constructor }: Constructable, key: string) => {
            addArgValidator(constructor, key, (container: Container) => {
                container
                    .bind(Validator)
                    .to(this)
                    .whenTargetNamed(key);
            });
        }
    }
}
