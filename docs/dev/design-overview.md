# Design Overview

All the Discord functionality in Hades is driven by Discord.js under the hood.

Hades attempts to provide a dependency injection based API on top.

- [Design Overview](#design-overview)
  - [HadesContainer](#hadescontainer)
    - [Default Services](#default-services)
    - [Configuration Support](#configuration-support)
    - [Additional Services](#additional-services)
  - [HadesBotService](#hadesbotservice)

## HadesContainer

The Hades core is based around a custom Inversify container called `HadesContainer`.

This container comes with some facilities useful for bootstrapping a Discord bot.

### Default Services

The container has a few services bound by default:

- `HadesClient`: The main Discord client
- `DiscordService`: A high-level service for interacting with Discord
- `EventService`: Calls event handlers on objects in response to Discord events

### Configuration Support

By default, `config/default.json` will be read.

Each value within will be bound into the container.

With a config like:

```json
{
    "foo": {
        "bar": true
    }
}
```

The key `cfg.foo.bar` would be bound to true.

### Additional Services

The Hades core is quite small. The idea is that additional functionality is provided by binding that additional functionality into the container.

For example, text command support is added by adding the `textCommandsInstaller` during construction of `HadesContainer`:

```ts
const container = new HadesContainer({
    installers: [
        new TextCommandsInstaller()
    ]
})
```

The user may also bind their own services.

## HadesBotService

A base class `HadesBotService` is provided as a starting point for building bots.

It has a number of conveniences:

- It automatically receives a `HadesClient` instance
- It automatically registers with the `EventService`
- It comes with a bunch of event-handler methods to override

Users should subclass `HadesBotService` and add the functionality of their own bot.
