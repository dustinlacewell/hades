import { inject, multiInject } from "inversify";

import { singleton } from "../decorators";
import DispatchService from "./DispatchService";

import Command from "../commands/Command";
import CommandContext from "../commands/CommandContext";
import { Message } from "discord.js";


@singleton(CommandService)
export default class CommandService {
    prefix: string;
    options: any;
    commands: { [key: string]: Command }
    dispatchService: DispatchService;

    constructor(
        @inject(DispatchService) dispatchService: DispatchService,
        @multiInject(Command) commands: Command[]
    ) {
        this.dispatchService = dispatchService;
        this.commands = {};
        for (let command of commands) {
            const name = command.name;
            console.log(`Registering ${name}.`);
            this.commands[name] = command;
        }
        this.dispatchService.register(ctx => {
            this.execute(ctx)
        });
    }

    execute(ctx: CommandContext) {
        const command = this.commands[ctx.command];

        if (command) {
            command.execute(ctx);
        }
    }

    dispatch(msg: Message) {
        this.dispatchService.dispatch(msg);
    }
}
