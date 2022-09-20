import { SlashCommandBuilder, SlashCommandSubcommandBuilder, CommandInteraction } from 'discord.js';
import { joinVoiceChannel, getVoiceConnection, createAudioPlayer, NoSubscriberBehavior, createAudioResource } from '@discordjs/voice';

import { createSubCommad } from './type_sub_commands';

export class Musica extends SlashCommandBuilder{

  commands:Array<createSubCommad>;

  constructor(name='music', description='Comandos de musica') {
      super();
      this.commands = [];
      this.setName(name);
      this.setDescription(description);
      this.setDMPermission(false);
      
      this.addCommandsToList();
      this.addCommandsToGrup();
  };

  addCommandsToList(){
    let play:createSubCommad =  {
        data: new SlashCommandSubcommandBuilder()
          .setName('play')
          .addStringOption(option => option.setName('busqueda').setDescription('Tu Link para reproducir musica').setRequired(true))
          .setDescription('Reproduse musica de links'),
        execute:Function()
      };

    let pausa:createSubCommad =  {
        data: new SlashCommandSubcommandBuilder()
          .setName('pausa')
          .setDescription('para pausar tu musica'),
        execute:Function()
      };

    let conectar:createSubCommad = {
      data: new SlashCommandSubcommandBuilder()
        .setName('conectar')
        .setDescription('Me conecto al canal en el cual estas'),
      execute:Function()
    };

    let desconectar:createSubCommad = {
      data: new SlashCommandSubcommandBuilder()
        .setName('desconectar')
        .setDescription('Me desconecto de el canal en el que estas'),
      execute:Function()
    };

      // agregamos la funcionalidad
      play.execute = this.play;
      pausa.execute = this.pausa; 
      conectar.execute = this.conectar;
      desconectar.execute = this.desconectar

      // agregamos los comandos
      this.commands.push(play, pausa, conectar, desconectar);

  };

  addCommandsToGrup(){
    this.commands.forEach(command => this.addSubcommand(command.data));
  };

  //logica de comandos
  async play( interaction:CommandInteraction ){
    if (!interaction.inCachedGuild()) return;
    let busqueda = interaction.options.get('busqueda')?.value?.toString();
    await interaction.reply({ content: `Escuchas ${busqueda}` });

    let connection = getVoiceConnection(interaction.guild.id);

    let audio = createAudioPlayer({
      behaviors: {
        noSubscriber: NoSubscriberBehavior.Pause,
        }
      }
    );

    let sourceMusica = createAudioResource( busqueda! );
    
    audio.play(sourceMusica);

    connection?.subscribe(audio)
  };

  async pausa( interaction:CommandInteraction ){
    await interaction.reply({ content: 'cmd!!' });
  };

  async conectar( interaction:CommandInteraction ){
    if(!interaction.inCachedGuild()) return;
    await interaction.reply({ content: `Me conecte al canal ${interaction.member.voice.channel?.name}` });
    joinVoiceChannel(
        {
      channelId: interaction.member.voice.channel!.id,
      guildId:interaction.member.voice.channel!.guild.id,
      adapterCreator: interaction.member.voice.channel!.guild.voiceAdapterCreator,
      }
    );
  };

  async desconectar( interaction:CommandInteraction ) {
    if(!interaction.inCachedGuild()) return;
    await interaction.reply({ content: `Me desconecte del canal ${ interaction.member.voice.channel?.name }` });
    let getVoice = getVoiceConnection(interaction.guild.id);
    getVoice?.disconnect();
    getVoice?.destroy();
  };
};