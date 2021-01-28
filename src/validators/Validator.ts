import { Container, injectable } from 'inversify';

import Argument from '../commands/Argument';
import CommandContext from '../commands/CommandContext';
import { addArgValidator } from '../meta';
import { Constructable } from '../utils';


@injectable()
export default class Validator {
    public validate(arg: Argument, ctx: CommandContext, value: any): Promise<any> {
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
