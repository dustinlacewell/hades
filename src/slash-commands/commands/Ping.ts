import { SlashCommandBuilder } from '@discordjs/builders'
import { BaseCommandInteraction } from 'discord.js'

export const getPingData = {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription("Request Ping"),
  async execute(interaction: BaseCommandInteraction) {
    return interaction.reply("Pong!")
  }
}