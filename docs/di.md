# Dependency Injection

Dependency Injection is a big topic and central to Hades development.

If you're unsure about why you should care, the definitive resource is [Dependency Injection by MarkSeeman](https://www.amazon.com/Dependency-Injection-NET-Mark-Seemann/dp/1935182501)
but feel free to just google it.

The DI container described in this document is based on
[Inversify.js](https://inversify.io/), but the concepts are the same for just about any modern container.

## What is it?

DI is all about fetching *instances* of things:

- Instances of some *concrete type*
- Instances of some *concrete type* which *implements some interface*

After telling the DI container how create instances of our types, it takes on the
role of passing them to the code they're needed by.

Your code _depends_ on instances of those types. The container _injects_ them.

↳ "dependency injection"

## Container Configuration

Configuring the DI container consists of telling it how to make instances of types and interfaces.

If you'll ever want an instance of `Foo`, you have to, ahead of time, tell the container _how_ to provide it. If you want an instance of some type which extends `Useful`, then you have to previously have told the container _how to provide it_.

The way you tell the container how to do this is by "binding" the desired types to the way of making obtaining them:

The basic pattern: `container.bind(WHAT).to(HOW)`

**Constant values**: 

With constant values, we provide the value that will be bound to the type.
  
```ts
container
  .bind(Foo)
  .toConstantValue(new Foo())
```
**Constructors**: 

With constructors, we let the container call the type's constructor to create the new instance.

```ts
container
  .bind(Foo)
  .toSelf()

container // from base class to implementor
  .bind(Useful)
  .to(Foo)
```

There are actually many ways to do binding in Inversify.js. [Check out the docs.](https://github.com/inversify/InversifyJS/blob/master/wiki/readme.md#the-inversifyjs-features-and-api).

### Marking Types as Injectable

In order for our container bindings to work, we need to add the `@injectable()`
decorator to our class:

```ts
@injectable()
class Foo { /* ... */ }
```

## Requesting Instances

Once the container knows how to produce instances of our `@injectable()`
decorated types, your code can request them. If your code _depended_ on using an instance of `Foo`, it could ask the container for one:

```cs
var foo = container.get(Foo);
```

Similarly, if your code depended on having an instance of `Useful` but didn't care which implementation is used, it can again ask the container:

```cs
var useful = container.get(Useful)
```

In this case, the container would create an instance of `Foo` since we told it to bind `Useful` to `Foo`.

## Injecting Instances

For types with no constructor parameters (no dependencies), the container can
easily instantiate it by calling the constructor.

But what if `Foo` has its _own_ dependencies?

You can tell the container how to resolve `Foo`'s dependencies by decorating
its constructor's parameters with `@inject()`:

```ts
@injectable()
class Foo {
    constructor(
        @inject(ILogger) logger: ILogger,
        @inject(Number) randomNum: Number
    ) {
        // ...
    }
}
```

The container can now call `Foo`'s constructor as we've told it which types the
parameters are bound to. The container simply makes instances of those first,
and then passes them to `Foo`s constructor. If the parameters have constructor
parameters of their own, the container can in turn satisfy those dependencies
too -- as long as all the required types and interfaces have been bound and
marked.

Properly configured, a DI container can produce your program's entire object graph

### Dynamic Resolvers

In a way, a concrete type's constructor can be thought of a factory - in that new instances can be made by calling it.

However, what if the container can't provide all of the constructor parameters
for a given type? Say we don't have a binding to use with `@inject()`? Instead, we must provide a factory function that helps the container do the work of providing those unbound dependencies.

If `Foo` takes an `ILogger` and an `Number` we can assume the `ILogger` interface is bound usefully. However, instead of binding `Number` in the container, we can instead bind `Foo` to a dynamic resolver, which is just a simple lambda function:

```ts
container
  .bind(Foo)
  .toDynamicValue((context: Context) => {
      var di = context.container;
      var logger = container.get(ILogger);
      return new Foo(logger, randomNumber());
  })
  .inSingletonScope();
```

When the container must produce an instance of `Foo` it will call this
function. The function uses the container to resolve the `ILogger`
dependency. But we're telling it how to provide the `Number` dependency (`randomNumber()`).

In this case, the container will only ever call the function once, to produce a
single instance, and always return that one. This is thanks to binding `Foo`
with `inSingletonScope()` which we'll cover in the next section.

### Lifetimes

You can specify the "scope" or "lifetime" of a binding with an extra method
after the `.to()` clause of a binding:

- `.inTransientScope()` : A new instance is created for every need
- `.inSingletonScope()` : A single instance is used for every need

In the above example, by changing the lifetime to transient, a new random number is produced each time an instance of `Foo` is provided:

```ts
container
  .bind(Foo)
  .toDynamicValue((context: Context) => {
      var di = context.container;
      var logger = container.get(ILogger);
      return new Foo(logger, randomNumber());
  })
  .inTransientScope();
```

Transient is the default however, so this is unnecessary.

### Targetted Bindings

Another way to inject `Foo` with a `Number` is by targetting a specific binding
to it:

```ts
container
  .bind(Number)
  .toDynamicValue(context: Context => randomNumber())
  .whenInjectedInto(Foo);
```

In this case, we've created a binding for `Number` which is only used when
satisfying the dependency for `Foo`.


