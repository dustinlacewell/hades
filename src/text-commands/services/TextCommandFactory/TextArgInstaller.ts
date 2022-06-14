import { Container } from 'inversify';

import { TextArgError } from '../../errors';
import { TextArgMeta } from '../../metadata';
import { TextArgParser } from '../../parsers';
import { Constructor, InstallerFunc, Newable } from '../../../utils';
import { Validator } from '../../validators';
import { TextCommandContext } from '../../models/TextCommandContext';


export class TextArgInstaller {
    name: string;
    type: Constructor;
    property: string;
    description: string;

    parser: TextArgParser;
    parserType: Newable<TextArgParser>;

    validatorInstallers: InstallerFunc[];
    validatorMethods: any;

    constructor(meta: TextArgMeta, parser: TextArgParser) {
        this.name = meta.name;
        this.type = meta.type;
        this.property = meta.property;
        this.description = meta.description;

        this.parser = parser;
        this.parserType = meta.parserType;

        this.validatorMethods = meta.validatorMethods;
        this.validatorInstallers = meta.validatorInstallers;
    }

    async install(di: Container, context: TextCommandContext) {
        // parse value
        const value = await this.parse(context);

        // install validators
        this.installValidators(di);

        // resolve and run validators
        await this.executeValidators(di, context, value);

        // finally bind the validated value in the subcontainer
        di.bind(this.property).toConstantValue(value)
    }

    private throwIfValueIsEmpty(value: any) {
        if (value === null || value === undefined) {
            throw new TextArgError(`argument \`${this.name}\` must be a ${this.parser.name}.`, true);
        }
    }

    private async parse(context: TextCommandContext) {
        const value = await this.parser.parse(this, context);
        this.throwIfValueIsEmpty(value);
        return value;
    }

    private installValidators(di: Container) {
        for (let installer of this.validatorInstallers) {
            installer(di);
        }
    }

    private async executeValidators(di: Container, context: TextCommandContext, value: any) {
        if (di.isBoundNamed(Validator, this.property)) {
            const validators = di.getAllNamed(Validator, this.property);
            for (let validator of validators) {
                await validator.validate(this, context, value);
            }
        }
    }
}
