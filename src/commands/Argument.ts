import { Container } from 'inversify';

import ArgError from './ArgError';
import { ArgMeta } from '../meta';
import Parser from '../parsers/Parser';
import { Constructor, Installer, Newable } from '../utils';
import Validator from '../validators/Validator';
import CommandContext from './CommandContext';


export default class Argument {
    name: string;
    type: Constructor;
    property: string;
    description: string;

    parser: Parser;
    parserType: Newable<Parser>;

    validatorInstallers: Installer[];
    validatorMethods: any;

    constructor(meta: ArgMeta, parser: Parser) {
        this.name = meta.name;
        this.type = meta.type;
        this.property = meta.property;
        this.description = meta.description;

        this.parser = parser;
        this.parserType = meta.parserType;

        this.validatorMethods = meta.validatorMethods;
        this.validatorInstallers = meta.validatorInstallers;
    }

    async install(di: Container, context: CommandContext) {
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
            throw new ArgError(`argument \`${this.name}\` must be a ${this.parser.name}.`, true);
        }
    }

    private async parse(context: CommandContext) {
        const value = await this.parser.parse(this, context);
        this.throwIfValueIsEmpty(value);
        return value;
    }

    private installValidators(di: Container) {
        for (let installer of this.validatorInstallers) {
            installer(di);
        }
    }

    private async executeValidators(di: Container, context: CommandContext, value: any) {
        if (di.isBoundNamed(Validator, this.property)) {
            const validators = di.getAllNamed(Validator, this.property);
            for (let validator of validators) {
                await validator.validate(this, context, value);
            }
        }
    }
}
