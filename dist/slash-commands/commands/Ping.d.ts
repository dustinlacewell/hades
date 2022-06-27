import { SlashCommandBuilder } from '@discordjs/builders';
import { BaseCommandInteraction } from 'discord.js';
export declare const getPingData: {
    data: SlashCommandBuilder;
    execute(interaction: BaseCommandInteraction): Promise<void>;
};
