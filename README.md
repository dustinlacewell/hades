
# Hades

Typescript bot framework using [Inversify.js](https://inversify.io/) and [Discord.js](https://discord.js.org/#/).

![hades.png](./hades.png)

<pre style="text-align: center;">
    Hades is a <i>dependency-injection oriented framework</i>. 
    <a href="./docs/di.md">Read more about DI here</a>.
</pre>

## Installation

Install the latest version from Git using NPM:

    $> npm i --save https://github.com/dustinlacewell/hades.git


## Example

You can try a simple example bot here:

https://github.com/dustinlacewell/hades-example-bot


## Getting Started

The basic bot starts with extending `HadesBotService`:

```ts
import { HadesBotService, singleton } from "hades";

@singleton(BotService)
export class BotService extends HadesBotService {

    async onReady() {
        console.log(`Logged in as ${this.client.user.username}.`);
    }
}
```

`BotService.onReady()` will be called when the associated Discord.js event is
fired and in this case log a message to the console.

We're using the `@singleton()` decorator here to bind `BotService` to itself
within the container as a singleton.

## Container Setup

In our `index.ts` we can configure the container:

```ts
import "reflect-metadata";

import { HadesContainer } from "hades";
import { installTextCommands } from "hades/dist/text-commands";

import { BotService } from "./services/BotService";

const container = new HadesContainer();
const bot = container.get(BotService);
bot.login()
```

In order for dependency injection to work, we need to import
`reflect-metadata`. Just a fact of life.

After creating the `HadesContainer` we can then request an instance of our
`BotService`.

We can finally login to Discord as the bot.

## Writing the Config

Add your token to `config/default.json`:

```json
{
    "discordToken": "your bot token here",
}
```

That's it. The bot should now boot up and connect to any servers you've added
it to. Of course it doesn't do anything...yet!

# Documentation

Please visit our documentation for more information:

- [Dependency Injection](./docs/di.md)
- [Events](./docs/events.md)
- [Text Commands](./docs/text-commands.md)
