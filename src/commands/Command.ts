import { injectable } from "inversify";

import CommandContext from "./CommandContext";


@injectable()
export default abstract class Command {
    name: string;
    abstract execute(context: CommandContext, ...args: any[]): void;
}
