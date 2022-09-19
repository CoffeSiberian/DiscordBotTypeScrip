import { BaseInteraction } from 'discord.js';

module.exports = {
	name: 'interactionCreate',
	async execute( interaction:BaseInteraction ) {
        if (!interaction.isChatInputCommand()) return;
        
        const command = interaction.client.commands.get(interaction.options.getSubcommand());
    
        if (!command) return;
    
        try {
            await command.execute(interaction);
        } catch (error) {
            console.error(error);
            await interaction.reply({ content: 'Tenemos un error al ejecutar el comando', ephemeral: true });
        }
	}
};