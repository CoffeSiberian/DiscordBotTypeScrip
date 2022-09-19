const { GrupExample } = require('../commands/grup_test/grup_command')
const { SlashCommandSubcommandBuilder } = require('discord.js');

const Grup = new GrupExample()

const teste = {
    data: new SlashCommandSubcommandBuilder()
    .setName('holamundo')
    .setDescription('Comando Hola Mundo')
    .addStringOption(option => option.setName('nombre').setDescription('Ingresa tu nombre').setRequired(true))
    .addSubcommandGroup(Grup),
    async execute(interaction) {
		return interaction.reply({ content: 'Hola Mundo!', ephemeral: true });
	}
};

module.exports = { teste };