import { Collection } from "discord.js";
import { Container } from "inversify";
import { SlashCommandMeta } from "../../metadata/slashCommandMeta";
import { SlashCommandContext } from "../../models/SlashCommandContext";
import { SlashArgInstaller } from "./SlashArgInstaller";
import { SlashArgParserRegistry } from "./SlashArgParserRegistry";
import { SlashArgParserResolver } from "./SlashArgParserResolver";

/**
 * Instantiates commands on invocation.
 *
 * Every command class is associated with its own SlashCommandFactory. On
 * invocation of that command, the factory will do what's necessary to
 * create an instance of that command class suitable for execution.
 */
export class SlashCommandFactory {
  /** container to derive sub-containers from */
  parentContainer: Container;
  /** the meta of the associated command */
  meta: SlashCommandMeta;

  /** service for looking up parsers based on argument type */
  inferenceService: SlashArgParserResolver;
  /** service for easy lookup of parsers */
  parserService: SlashArgParserRegistry;
  /** arguments of the associated command */
  argInstallers = new Collection<string, SlashArgInstaller>();

  constructor(parentContainer: Container, meta: SlashCommandMeta) {
    this.parentContainer = parentContainer;
    this.meta = meta;

    this.inferenceService = parentContainer.get(SlashArgParserResolver);
    this.parserService = parentContainer.get(SlashArgParserRegistry);

    // setup arguments
    for (let [argName, argMeta] of meta.args) {
      const parserType =
        argMeta.parserType || this.inferenceService.infer(argMeta.type);
      const parser = this.parserService.parserFor(parserType);
      const arg = new SlashArgInstaller(argMeta, parser);
      this.argInstallers.set(argName, arg);
    }
  }

  /**
   * Parse and install argument values into a container.
   * @param container Container to install into.
   * @param context The command invocation context.
   */
  async installArguments(container: Container, context: SlashCommandContext) {
    for (let [_, arg] of this.argInstallers) {
      await arg.install(container, context);
    }
  }

  /**
   * Invoke validator methods on the given command instance.
   * @param inst Command instance.
   */
  // async runMethodValidators(inst: any) {
  //     for (let [_, arg] of this.argInstallers) {
  //         for (let methodName of arg.validatorMethods) {
  //             const callable = inst[methodName];
  //             if (callable) {
  //                 await callable.apply(inst);
  //             }
  //         }
  //     }
  // }

  /**
   * Create a sub-container for resolving the command instance from.
   * @param context The parent container.
   * @returns A sub-container.
   */
  createSubContainer(context: SlashCommandContext) {
    const di = this.parentContainer.createChild({ skipBaseClassChecks: true });
    // bind the command class
    di.bind(this.meta.target).toSelf();
    // bind the invocation context
    di.bind<SlashCommandContext>("SlashCommandContext").toConstantValue(
      context
    );
    // connect the containers
    di.parent = this.parentContainer;
    return di;
  }

  /**
   * Create an instance of the invoked command.
   * @param context A command invocation context.
   * @returns A command instance.
   */
  async create(context: SlashCommandContext) {
    // subcontainer config
    const subContainer = this.createSubContainer(context);

    // parse, validate and bind argument values
    // await this.installArguments(subContainer, context);

    // resolve command instance
    const inst = subContainer.get(this.meta.target);

    // run instance-method validators
    // await this.runMethodValidators(inst);

    return inst;
  }
}
