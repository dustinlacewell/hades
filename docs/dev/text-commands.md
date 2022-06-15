# Text Commands Design

The `text-commands` submodule implements classic "text-based parser commands". The kind typical before Discord's "slash commands" feature.

## Overview

A high-level look at `text-commands`:

- Decorators are used to store metadata
- Metadata is used to drive container bindings
- For each command class a factory is bound in the container
- When a command is invoked the associated factory:
  - Parses the user input into arguments
  - Creates a sub-container
  - Binds the argument values to their names within the sub-container
  - Resolves an instance of the command class
  - All arguments are injected as fields on the command instance
  - `.execute()` is called on the command instance


## Installer

Text command support is enabled in Hades by passing an instance of its installer to the `HadesContainer` constructor options:

```ts
const container = new HadesContainer({
    installers: [
        new TextCommandsInstaller()
    ]
})
```

## Decorators

The `text-commands` submodule makes use of decorators as an easy way for users to define commands, their arguments and validation routines.

The module has a number of such decorators:

- `@command`: Identifies a class as a command
- `@arg`: Identifies a field as an argument
- `@description`: Sets the description of a command or argument
- `@validate`: Marks a method as the validator for an argument

Each of these decorators works in a similar way. Their own purpose is book-keeping.

They do this by storing metadata with `reflect-metadata`.

This allows Hades to find all of the things decorated with a given decorator at runtime. For example, all the command classes.

### Decorator Metas

Two of the decorators have associated metadata types:

- `@command`: `TextCommandMeta`
- `@arg`: `TextArgMeta`

The other decorators just update fields on either of these depending on the context of use.

See `metadata/api.ts` for helpers for accessing decorator metadata.

## Argument Parsing

User input is supplied as a string. If the invoked command has arguments, those need to be parsed. 

The idea behind parsers is that they can return values other than string. 

If you had a `YoutubeIdParser` it might return `YoutubeChannel` objects as the argument value.

By default the simple `StringParser` is used, but another parser can be used by specifying it with the `@parser` decorator:

```ts
@arg()
@parser(YoutubeIdParser)
channel: YoutubeChannel
```

Which parser an argument uses is stored within its `TextArgMeta` metadata.

## Argument Validation

Argument values can also be validated post-parsing.

By adding the `@validate` decorator on a method and passing the name of an argument, that method will be called to validate the argument value:

```ts

@arg()
@parser(YoutubeIdParser)
channel: YoutubeChannel

@validate("channel")
validateChannel() {
    if (this.channel.name !== "Two Minute Papers") {
        throw new TextArgError("Only 'Two Minute Papers' is allowed!")
    }
}
```

Thrown `TextArgError`s will be reported back to the user.


# Command Lifecycle

There are basically two major phases to the command life-cycle:

- Binding during bot startup
- Instantiation during invocation


## Bot Startup

On startup, the `text-command` submodule will find all `TextCommandMeta` objects describing the various `@command` decorated `TextCommand` classes.

For each, it will instantiate a `TextCommandFactory` with the command's metadata.

Each `TextCommandFactory` is then bound into the container.

## Command Invocation

Three classes cooperate to instantiate and invoke commands:

- `DispatchService`: Parses user input and notifies listeners
- `TextCommandFactory`: Creates an instance of the command
- `TextCommandService`: Executes the actual command

## DispatchService

The `DispatchService` will accept listener registrations. When a command is dispatched to it, it will parse the user input, creating a `TextCommandContext`.

It then notifies every listener by passing the context to them.

### TextCommandContext

The `TextCommandContext` has a number of details of the current command invocation:

- `msg`: The original Discord.js `Message` instance
- `body`: The string content of the message
- `args`: The command arguments as strings
- `reader`: An argument reader for manually parsing arguments
- `success`: A flag signaling whether the command was a success or not
- `command`: The full user input

## TextCommandFactory

On startup, a `TextCommandFactory` instance is created for each command class and receives its metadata.

The job of the `TextCommandFactory` is to produce instances of the associated command on each invocation.

### Instantiation

When the factory is asked to produce an instance of a command, it starts by creating a subcontainer.

Within this container, it binds each parsed argument value to that argument's name.

It then resolves an instance of the command class from the container.

Since each `@arg()` decorated field acts like `@inject(thisFieldsName) fieldName: FieldType` the command instance is injected with the values of all of its arguments.

Commands may also depend on, and will be injected with any other services they manually mark with `@inject`.

Finally, the factory returns the command instance back to the `TextCommandService`.

## TextCommandService

After a command instance has been created, the command service will call `.execute()` on it.

The command service will handle reporting any thrown `TextArgError`s back to the user.

