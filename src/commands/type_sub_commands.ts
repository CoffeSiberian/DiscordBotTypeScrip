import { SlashCommandSubcommandBuilder } from 'discord.js';

export type createSubCommad = {
    data: SlashCommandSubcommandBuilder
    execute: Function
  };