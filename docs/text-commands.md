# Text Commands

Hades has support for traditional "text-based parser commands".

This kind of command was typical before Discord's "Slash Commands".

Text command support is located in the `hades/dist/text-commands` module.


## Installing Text Command Support

Add text command support to your `HadesContainer`:

```ts
import "reflect-metadata";

import { HadesContainer } from "hades";
import { installTextCommands } from "hades/dist/text-commands";

import { BotService } from "./services/BotService";

const container = new HadesContainer({
    installers: [
        installTextCommands,
    ]
});
const bot = container.get(BotService);
bot.login()
```

## Using the `TextCommandService`

Add the `TextCommandService` as a dependency to your `BotService`. 

Then dispatch `Message`s to it:
```ts
import { HadesBotService, singleton } from "hades";

@singleton(BotService)
export class BotService extends HadesBotService {
    @inject(TextCommandService)
    commandService: TextCommandService

    async onReady() {
        console.log(`Logged in as ${this.client.user.username}.`);
    }

    async onMessage<T extends Message>(message: T) {
        this.commandService.dispatch(message);
    }
}
```

## Writing Commands

Commands
========

Commands are classes that extend the `TextCommand` class from Hades. They also need
the `@command()` decorator. Here's a ping command:

```ts
import { TextCommand, TextCommandContext, command, description } from "hades/dist/text-commands";

@command("ping")
@description("Get roundtrip latency in seconds.")
export class PingCommand extends TextCommand {
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
```

Use the `@command()` decorator to specify the name of your command.

The `execute()` method will be called when your command is run.

## The Command Context

Every `TextCommand` has a `context: TextCommandContext` field.

The `TextCommandContext` has a number of useful attributes that commands may utilize:

- **msg**: The original Discord.js `Message`
- **body**: The entire text content of the message
- **command**: The name of the command executed;
- **args**: An array of the space-delimited words in the body (minus the command name)
- **reader**: A `discord-command-parser.MessageArgumentReader` instance

It also has a few handy methods:

- **reply(content: any)**: Send a message to the originating user
- **react(emoji: Emoji)**: Add reacts to the original message

The original Discord.js client can also be accessed via `msg.client`


Parsing Arguments
-----------------

The `CommandContext.reader` attribute is a parser from
[discord-command-parser](https://github.com/campbellbrendene/discord-command-parser).

This can parse arguments in a more structured way, including user and channel
IDs.

- **getString()**
- **getInt()**
- **getFloat()**
- **getRemaining()**
- **getUserID()**
- **getRoleID()**
- **getChannelID()**
- **seek(** amount: number = 1 **)**: Useful for skipping tokens