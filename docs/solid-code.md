# Writing SOLID Code

Or: *Saying what but not how*.

Obviously, a complete description of what makes code good is not going to fit into the following sections.

Instead, we'll explore one key idea that might contribute to code being good: Dependency Injection

## Why Use Dependency Injection?

You may or may not already be familiar with dependency injection as a design pattern.

If not, this document will try to build up an intuition for its value starting from the ground up.

Even if you are familiar with dependency injection, you may find the following an interesting read.

## Encapsulation and Naive Refactoring

What does encapsulation mean?

A workable definition could be:

    To put what is on the outside on the inside.

What does refactoring mean?

A workable definition could be:

    To restructure software to improve it, usually without changing its functionality.

Most developers are familiar with the kind of "naive refactoring" we often do where we try to break up a function or class into smaller parts.

It's this kind of refactoring we'll explore. To think a bit deeper about why we do this kind of refactoring so that we can do it wittingly.


## The Three Spirits of Encapsulation

There are two primary ways to do encapsulation in most modern languages:

 - Functions
 - Classes

We wont get into their differences right now.

Currently we're interested in an important way in which they are similar.

    They both let you put stuff that's outside, on the inside.

In both cases, each has three primary aspects, or spirits:

- Its overall responsibility or purpose
- A strategy it uses to fulfill that purpose
- The specific implementation of that strategy

That a function or class' has purpose is straight-forward enough.

But that it has both a strategy and an implementation of that strategy, as separate things, that's more interesting.


## Strategy and Implementation

What makes a strategy and the implementation of that strategy different things?

Here's an easy way to think about it:

    For any strategy, there are multiple implementations of that strategy

Hence they're not necessarily the same thing.

For trivial cases, they can be -- but it's not the trivial cases that cause us trouble.


### Understanding Strategy

Consider this:

    If you have the wrong strategy, no implementation of it is helpful.

You must first have a strategy which accomplishes the right goal. 

If we have the wrong strategy, it doesn't matter how correct or incorrect the implementation of that strategy is.


### Understanding Implementation

Consider this:

    To understand which strategy is employed by some code, you must first understand its implementation.

Only by first working through the existing implementation of a strategy can we even get at which strategy is being used.

Understanding the implementation is a barrier to understanding the strategy which is a barrier to understanding if the implementation is correct.

There's gotta be a better way!


### Expressiveness

Expressiveness is one of those terms that gets thrown around a lot and everyone has their own definition.

But we can now consider a very particular form of expressiveness:

    How readily some code says what its strategy is.


## Writing Expressive Code

How can we address the contention between strategy and implementation?

How can we write code that says what its strategy is, without the implementation getting in our way?


### Distillation

If the strategy is "what is done" and implementation is "how it is done",

Distillation is then:

    Reducing the amount of detail regarding the how of what is done.

This is where encapsulation comes back into the picture.


### Delegation

We can achieve the distillation we're after through delegation.

By throwing those implementation details into some secondary encapsulation we can then delegate to it.

By delegating to the encapsulation we replace the implementation details with a call to that delegate.

Assuming we have good naming convention and style, what is left over is an artifact saying *what* we're doing but *not how*.

The "how" has been hidden inside the delegate encapsulation.


### Squinting

How do we know which bits of implementation to group together and delegate out into an encapsulation?

Well, in general, we want to capture the very highest-level description of the local strategy.

Obviously, you can take this too far. 

If you're trying to tell someone how to draw a house, giving them the single step of "1. draw the house" isn't very helpful. It's too coarse of a description.
```ts
function() drawHouse() {
    drawHouse()
}
```

At the opposite end of the spectrum we have the implementation itself, all the atomic steps needed to carry out the strategy.
```ts
function drawHouse() {
    pen.goto(0,0)
    pen.color("blue")
    for (let i = 0; i < 2; i++) {
        pen.forward(100)
        pen.left(90)
        pen.forward(100)
        pen.left(90)
    }
    pen.goto(0,100)
    pen.color("green")
    for (let i = 0; i < 3; i++) {
        pen.forward(100)
        pen.left(120)
    }
    pen.goto(40,0)
    pen.color("brown")
    for (let i = 0; i < 2; i++) {
        pen.forward(20)
        pen.left(90)
        pen.forward(50)
        pen.left(90)
    }
}
```

What we want is something that approaches the former without reaching it. We want to express the minimal number of steps but enough to actually differentiate this strategy from the alternatives.
```ts
function drawTriangle(x: number, y: number, length: number, color: string) {
    pen.goto(x,y)
    pen.color(color)
    for (let i = 0; i < 3; i++) {
        pen.forward(length)
        pen.left(120)
    }
}

function drawRectangle(x: number, y: number, length: number, color: string) {
    pen.goto(x,y)
    pen.color(color)
    for (let i = 0; i < 2; i++) {
        pen.forward(width)
        pen.left(90)
        pen.forward(height)
        pen.left(90)
    }
}

function drawWalls() {
    drawRectangle(0, 0, 100, 100, "blue")
}

function drawRoof() {
    drawTriangle(0, 100, 100, "green")
}

function drawDoor() {
    drawRectangle(40, 0, 20, 50, "brown")
}

function drawHouse() {
    drawWalls()
    drawRoof()
    drawDoor()
}
```

Unfortunately there is no generalized method for deriving what level of description best conveys the nature of a given strategy.

You'll just have to squint.


## Dependencies

With delegation as our approach of choice for distillation we introduce a curious problem.

We introduce a dependency relationship from the distilled to the delegate.


### Where Do Dependencies Come From?

There are three primary ways we can get at dependencies:

- Construction
- Service Location
- Dependency Injection

One of these is not like the other two. Can you guess which?


### Construction

With construction, we instantiate the dependency directly ourselves. Not only do we take on providing our own dependency, but all of its constructor arguments too.
```ts
class Foo {
    bar: Bar = new Bar("x","y","z");
}
```

### Service Location

Service location is any mechanism for reaching out to a parent scope in order to reference the dependency. This might be in the form of an import or a module-level local.
```ts
const bar = new Bar("x","y","z"); // or import { bar } from "./some-module";

class Foo {
    bar: Bar = bar;
}
```

### Dependency Injection

"Dependency Injection" means it is up to someone else to provide our dependencies to us. Usually this is in the form of function or constructor arguments.
```ts
class Foo {
    bar: Bar;
    constructor(bar: Bar) {
        this.bar = bar;
    }
}
```

## Why Dependency Injection is Best

Dependency injection is the only way to obtain dependencies that embodies the principle of Inversion of Control.


### Inversion of Control

"Inversion of Control" is a general idea wherein we relinquish control over objects, data, or other portions of our program to... well someone else!

In the case of dependency injection, we are relinquishing control over where our dependencies come from.

Someone else must "inject" those dependencies into us, usually via function or constructor parameter.


### SOLID Principles

Dependency injection helps us achieve each of the other SOLID principles.


**Single Responsibility Principle**

By delegating implementation details out to subordinate encapsulations we leave only orchestrating those dependencies as the sole responsibility of most components.

**Open / Close Principle**

By changing which dependencies are injected, we can change the behavior of the consumer without modifying it.

**Liskov Substitution Principle**

By specifying our dependencies as interfaces, we don't care which specific dependency we get, we just need one we can work with.

**Interface Segregation Principle**

Taking in narrowly typed dependencies that represent just the functionality we need avoids utilizing resources or behavior our function or class doesn't actually need, or shouldn't use.

## Clarity of Mind

The biggest advantage to dependency injection is focus and clarity of mind we are able to enjoy while working on any individual component.

If we understand the responsibility or purpose of the component we're working on, we can start to formulate a high-level strategy it might take.

As you start to write the component, we no longer need to start off by typing out all the implementation details.

Instead, we can simply declare dependencies, even if they don't exist yet, that would be the most helpful delegates for saying what our component's strategy is.

All we need to worry about is orchestrating those dependencies to carry out that strategy in the most distilled and expressive way possible.

Once we are satisfied, we can move on to implementing the dependencies and hashing out the implementation details.

Of course, we can apply this exact same thinking to the implementation of those dependencies.

We can keep delegating until there's nothing left to delegate. Until further delegation would result in simply saying "1. draw the owl". At that point it's time to stop delegation an actually implement the narrow concern or responsibility at hand.