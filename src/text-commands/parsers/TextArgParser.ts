import { injectable } from 'inversify';

import { TextArgInstaller } from '../services/TextCommandFactory/TextArgInstaller';
import { TextCommandContext } from '../models/TextCommandContext';


@injectable()
export class TextArgParser {
    name: string;
    description: string;

    async parse(arg: TextArgInstaller, context: TextCommandContext): Promise<any> { }
}
