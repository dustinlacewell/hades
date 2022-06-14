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

Use the `@description()` decorator to provide a description of its purpose.

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

## Arguments

Arguments can be added to `TextCommand` classes as fields using the `@arg()` decorator:

```ts
@command("isUpper")
@description("Check if a string is uppercase.")
export class IsUpper extends TextCommand {

    @arg()
    @description("String to check.")
    input!: string;

    async execute() {
        const result =
            this.input === this.input.toUpperCase()
                ? "is"
                : "is not"

        return this.reply(
            `${this.input} ${result} uppercase.`
        );
    }
}
```

### Argument Parsers

Argument values can automatically be parsed into other types using the `@parser()` decorator:

```ts
@command("squared")
@description("Get the square of a number.")
export class Squared extends TextCommand {

    @arg()
    @description("Number to square.")
    @parser(IntegerParser)
    input!: number

    async execute() {
        const square = this.input * this.input;
        return this.reply(
            `${this.input} squared is ${square}.`
        );
    }
}
```

If the argument cannot be parsed, a message will be sent to the user reporting the problem.

**Built-in Parsers**

There are a number of built-in parsers available:

- `ChannelParser`: a Discord channel
- `ChannelIdParser`: a Discord channel ID
- `FloatParser`: a floating-point number
- `GuildChannelParser`: a Discord channel of the current Guild
- `IntegerParser`: a integer number
- `MemberParser`: a User of the current Guild
- `RoleParser`: a Role of the current Guild
- `RoleIdParser`: the ID of a Role of the current Guild
- `String`: any string, the default parser
- `User`: a Discord user
- `UserId` a Discord user ID


**Default Parsers**

By default, a number of field types have automatically associated parsers.

In the above example, Hades will observe the field's type is `number` and automatically use the `IntegerParser`. So the `@parser(IntegerParser)` bit can be removed:

```ts
@command("squared")
@description("Get the square of a number.")
export class Squared extends TextCommand {

    @arg()
    @description("Number to square.")
    input!: number // automatically parsed with IntegerParser

    async execute() {
        const square = this.input * this.input;
        return this.reply(
            `${this.input} squared is ${square}.`
        );
    }
}
```

Here are the default type-parser associations:

- `string` => `StringParser`
- `number` => `IntegerParser`
- `Channel` => `ChannelParser`
- `User` => `UserParser`
- `Role` => `RoleParser`
- `GuildChannel` => `GuildChannelParser`
- `GuildMember` => `MemberParser`

You can provider your own mapping by providing it to `TextCommandsInstaller`:

```ts
    const container = new HadesContainer({
        installers: [
            new TextCommandsInstaller(
                [
                    ...defaultMappedTypes,
                    [Number, FloatParser],
                ]
            ),
        ],
    });
```

Now the `Squared` command above would only accept floating-point numbers.


### Manually Parsing Arguments

You can manually parse arguments passed to your commands using the `CommandContext.reader` attribute.

`CommandContext.reader` is a parser from [discord-command-parser](https://github.com/campbellbrendene/discord-command-parser).

This can parse arguments in a more structured way, including user and channel IDs.

- **getString()**
- **getInt()**
- **getFloat()**
- **getRemaining()**
- **getUserID()**
- **getRoleID()**
- **getChannelID()**
- **seek(** amount: number = 1 **)**: Useful for skipping tokens


### Argument Validation

Argument values can optionally have custom validation applied to them.

Building on the `Squared` example:

```ts
@command("squared")
@description("Get the square of a number.")
export class Squared extends TextCommand {

    @arg()
    @description("Number to square.")
    input!: number // automatically parsed with IntegerParser

    async execute() {
        const square = this.input * this.input;
        return this.reply(
            `${this.input} squared is ${square}.`
        );
    }

    @validate("input")
    async mustBePositive() {
        if (this.input < 0) {
            throw new TextArgError("Value must be positive.")
        }
    }
}
```

If the user input fails validation, the error will be reported to the user.

**Reusable Validators**

You can also implement `Validator` subclasses for reusable validation:

```ts

class PositiveNumber extends Validator {
    public async validate(arg: TextArgumentInstaller, ctx: TextCommandContext, value: number) {
        if (value < 0) {
            throw new TextArgError(`${value} must be positive.`);
        }
    }
}

@command("squared")
@description("Get the square of a number.")
export class Squared extends TextCommand {

    @arg()
    @description("Number to square.")
    PositiveNumber.check()
    input!: number // automatically parsed with IntegerParser

    async execute() {
        const square = this.input * this.input;
        return this.reply(
            `${this.input} squared is ${square}.`
        );
    }
}
```