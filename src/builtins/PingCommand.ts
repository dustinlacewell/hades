import Command from "../commands/Command";
import command from "../decorators/command";


@command("ping")
export default class PingCommand extends Command {
    execute() {
        const then = this.msg.createdTimestamp;
        const now = Date.now();
        const delta = new Date(now - then);
        const seconds = delta.getSeconds();
        const milliseconds = delta.getMilliseconds();
        const total = (seconds * 1000 + milliseconds) / 1000.0;
        return this.reply(`Pong in ${total} seconds!`);
    }
}
