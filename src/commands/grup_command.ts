import { SlashCommandBuilder, SlashCommandSubcommandBuilder, CommandInteraction } from 'discord.js';
import { createSubCommad } from './type_sub_commands';

export class GrupExample extends SlashCommandBuilder{

  commands:Array<createSubCommad>;

  constructor(name='testing', description='Comandos de prueba') {
      super();
      this.commands = []
      this.setName(name);
      this.setDescription(description);
      this.setDMPermission(false)
      
      this.addCommandsToList()
      this.addCommandsToGrup()
  };

  addCommandsToList(){
    let holaMundoCommand:createSubCommad =  {
        data: new SlashCommandSubcommandBuilder()
          .setName('holamundo')
          .addStringOption(option => option.setName('nombre').setDescription('Tu nombre').setRequired(true))
          .setDescription('Hola Mundo!'),
        execute:Function()
      };

    let otrocmdCommand:createSubCommad =  {
        data: new SlashCommandSubcommandBuilder()
          .setName('otrocmd')
          .setDescription('Nada que ver'),
        execute:Function()
      };
      
      holaMundoCommand.execute = this.holamundo;
      otrocmdCommand.execute = this.otrocmd; // agregamos la funcionalidad

      this.commands.push(holaMundoCommand, otrocmdCommand); // agregamos los comandos

  };

  addCommandsToGrup(){
    this.commands.forEach(command => this.addSubcommand(command.data));
  };

  //logica de comandos
  async holamundo( interaction:CommandInteraction ){
    let name = interaction.options.get('nombre')?.value;
    await interaction.reply({ content: 'hola mundo '+name, ephemeral: true });
  };

  async otrocmd( interaction:CommandInteraction ){
    await interaction.reply({ content: 'cmd!!' });
  }

};