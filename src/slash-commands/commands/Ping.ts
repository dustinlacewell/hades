import { SlashCommandBuilder } from '@discordjs/builders'

export const getPingData = (lang: string) => {
  const builder = new SlashCommandBuilder()
  builder
    .setName('ping')
    .setDescription("Request Ping")
  return builder
}