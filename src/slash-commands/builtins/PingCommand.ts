import { command } from "../decorators";
import { SlashCommand } from "../models/SlashCommand";
import { Command } from "./Command";

@command("ping")
export class PingCommand extends SlashCommand {
  execute() {
    const then = this.interaction.createdTimestamp;
    const now = Date.now();
    const delta = new Date(now - then);
    const seconds = delta.getSeconds();
    const milliseconds = delta.getMilliseconds();
    const total = (seconds * 1000 + milliseconds) / 1000.0;
    return this.reply(`Pong in ${total} seconds!`);
  }

  static getRegistrationData(): Command {
    return {
      name: "ping",
      description: "Returns pong",
      type: "CHAT_INPUT",
    };
  }
}
