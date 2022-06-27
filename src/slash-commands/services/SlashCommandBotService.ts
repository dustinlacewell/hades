import { REST } from '@discordjs/rest';
import { Routes } from "discord-api-types/v9";
import { BaseCommandInteraction, Client, Interaction, Message } from 'discord.js';
import { inject, injectable } from "inversify";
import { HadesBotService } from "../../services/HadesBotService";
import { SlashCommandService } from "./SlashCommandService/SlashCommandService";
import commands from "../commands"

export interface GuildConfig {
  id: string
  lang: string
  prefix: string
  almanaxChannel: string
  partyChannel: string
  buildPreview: string
}

@injectable()
export class SlashCommandBotService extends HadesBotService {
    @inject(SlashCommandService)
    commandService: SlashCommandService

    // @inject(SlashCommandHelpService)
    // helpService: SlashCommandHelpService

    async onReady() {
      await this.registerSlashCommands()
    }

    async registerSlashCommands() {
      this.client.guilds.cache.forEach(guild => {
        this.registerCommands(this.client, guild.id)
      })
    }

    async registerCommands(client: Client, guildId: string) {
      const rest = new REST({ version: "9" }).setToken(process.env.DISCORD_BOT_TOKEN);
      const commandData = commands.map((getData) => {
        const data = getData("en")
        return data.toJSON()
      });
  
      await rest.put(
        Routes.applicationGuildCommands(client.user?.id || "missing id", guildId),
        { body: commandData }
      );
    }

    async onInteractionCreate<T extends Interaction>(interaction: T) {
        console.log('Executing onInteractionCreate...')
        if (interaction.isCommand()) {
          console.log("this is a command")
        }
        console.log("this is not a command")

        // interaction.reply("interactionCreated")
        // this.commandService.dispatch(interaction);
    }

    // async onMessage<T extends Message>(msg: T) {
    //     // console.log('Executing onMessage...')
    //     msg.reply("test")
    //     // this.commandService.dispatch(interaction);
    // }
}