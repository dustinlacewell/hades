import { Container, injectable } from 'inversify';

import { TextArgInstaller } from '../services/TextCommandFactory/TextArgInstaller';
import { addTextArgValidator } from '../metadata';
import { Constructable } from '../../utils';
import { TextCommandContext } from '../models/TextCommandContext';


/**
 * Base class for reusable argument validators.
 */
@injectable()
export class Validator {
    public async validate(arg: TextArgInstaller, ctx: TextCommandContext, value: any): Promise<any> {
        return;
    }

    static check() {
        return ({ constructor }: Constructable, key: string) => {
            addTextArgValidator(constructor, key, (container: Container) => {
                container
                    .bind(Validator)
                    .to(this)
                    .whenTargetNamed(key);
            });
        }
    }
}
