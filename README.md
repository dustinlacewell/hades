
Hades
=====

Typescript bot framework using [Inversify.js](https://inversify.io/) and [Discord.js](https://discord.js.org/#/).

![hades.png](https://github.com/apoptosis/hades/blob/master/hades.png?raw=true)

**Note**: Hades is a dependency-injection oriented framework. [Read about it here.](https://github.com/apoptosis/hades/blob/master/di.md)


Installation
============

Install the latest version from Git using NPM:

    $> npm i --save https://github.com/apoptosis/hades.git


Example
=======

You can try a simple example bot here:

https://github.com/apoptosis/hades-example


Getting Started
===============

The basic bot starts with extending `HadesBotService`:

```ts
import { HadesBotService, singleton } from "hades";


@singleton(BotService)
export default class BotService extends HadesBotService {
    async onReady() {
        console.log(`Logged in as ${this.client.user.username}.`);
    }
}
```

`BotService.onReady()` will be called when the associated Discord.js event is
fired and in this case log a message to the console.

We're using the `@singleton()` decorator here to bind `BotService` to itself
within the container as a singleton.

Container Setup
---------------

In our `index.ts` we can configure the container:

```ts
import "reflect-metadata";
import { HadesContainer } from "hades";
import BotService from "./services/BotService";

const container = new HadesContainer();
container.get(BotService);
```

In order for dependency injection to work, we need to import
`reflect-metadata`. Just a fact of life.

We then import the `HadesContainer` from Hades. We also need to import our
`BotService`. After instantiating the `HadesContainer` we request an instance
of our `BotService`.

Writing the Config
------------------

Add your token to `config/default.json`:

```json
{
    "discordToken": "your bot token here",
}
```

That's it. The bot should now boot up and connect to any servers you've added
it to. Of course it doesn't do anything...yet!


Commands
========

Commands are classes that extend the `Command` class from Hades. They also need
the `@command()` decorator.

```ts
import { Command, CommandContext, command } from "hades";

@command("hello")
export default class HelloCommand extends Command {
    execute(context: CommandContext): void {
        context.reply("Howdy!");
    }
}
```

Use the `@command()` decorator to specify the name of your command.

The `execute()` method will be called when your command is run.

CommandContext
--------------

The `CommandContext` has a number of useful attributes that commands may utilize:

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
- **seek(**amount: number = 1**)**: Useful for skipping tokens.


Events
======

The `HadesBotService` has a number of methods you can override to handle the
various Discord.js client events:

logging
----

- async **onDebug**(...args: any[])
- async **onError**(...args: any[])
- async **onWarn**(...args: any[])

channels
----

- async **onChannelCreate**(channel: Channel)
- async **onChannelDelete**(channel: Channel)
- async **onChannelPinsUpdate**(channel: Channel, time: Date)
- async **onChannelUpdate**(oldChannel: Channel, newChannel: Channel)

connection
----

- async **onReady**()
- async **onReconnecting**()
- async **onDisconnect**(event: CloseEvent)

emoji
----

- async **onEmojiCreate**(emoji: Emoji)
- async **onEmojiDelete**(emoji: Emoji)
- async **onEmojiUpdate**(emoji: Emoji)

bans
----

- async **onGuildBanAdd**(guild: Guild, user: User)
- async **onGuildBanRemove**(guild: Guild, user: User)

bot guilds
----

- async **onGuildCreate**(guild: Guild)
- async **onGuildDelete**(guild: Guild)
- async **onGuildUnavailable**(guild: Guild)

guild members
----

- async **onGuildMemberAdd**(member: GuildMember)
- async **onGuildMemberAvailable**(member: GuildMember)
- async **onGuildMemberRemove**(member: GuildMember)
- async **onGuildMemberSpeaking**(member: GuildMember, isSpeaking: boolean)
- async **onGuildMemberUpdate**(oldMember: GuildMember, newMember: GuildMember)
- async **onGuildMembersChunk**(members: GuildMember[], guild: Guild)
- async **onGuildUpdate**(oldGuild: Guild, newGuild: Guild)

messages
----

- async **onMessage**(message: Message)
- async **onMessageDelete**(message: Message)
- async **onMessageDeleteBulk**(messages: Collection<Snowflake, Message>)
- async **onMessageReactionAdd**(reaction: MessageReaction, user: User)
- async **onMessageReactionRemove**(reaction: MessageReaction, user: User)
- async **onMessageReactionRemoveAll**(message: Message)
- async **onMessageUpdate**(oldMessage: Message, newMessage: Message)

prescence
----

- async **onPresenceUpdate**(oldMember: GuildMember, newMember: GuildMember)
- async **onTypingStart**(channel: Channel, user: User)
- async **onTypingStop**(channel: Channel, user: User)

roles
----

- async **onRoleCreate**(role: Role)
- async **onRoleDelete**(role: Role)
- async **onRoleUpdate**(oldRole: Role, newRole: Role)

users
----

- async **onUserNoteUpdate**(user: User, oldNote: string, newNote: string)
- async **onUserUpdate**(oldUser: User, newUser: User)
- async **onVoiceStateUpdate**(oldMember: GuildMember, newMember: GuildMember)
