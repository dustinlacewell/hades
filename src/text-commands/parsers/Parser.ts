import { injectable } from 'inversify';

import { TextArgumentInstaller } from '../factories/TextArgumentInstaller';
import { TextCommandContext } from '../models/TextCommandContext';


@injectable()
export class Parser {
    name: string;
    description: string;

    async parse(arg: TextArgumentInstaller, context: TextCommandContext): Promise<any> { }
}
