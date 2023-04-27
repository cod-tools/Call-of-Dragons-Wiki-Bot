const { EmbedBuilder, ChannelType, Collection, codeBlock } = require("discord.js");
const ms = require("ms");

module.exports = {
  name: 'messageCreate',

  async execute(message, client) {
    const { config, prefixCommands, prefixCooldowns } = client

    const prefix = config.prefix;

    if (!message.content.startsWith(prefix) || message.author.bot || message.channel.type === ChannelType.DM) {
      return;
    }
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const cmd = args.shift().toLowerCase();

    const command = prefixCommands.get(cmd)

    if (!command) {
      return;
    }

    let cooldowns = prefixCooldowns.get(message.guildId);

    if (!cooldowns) {
      cooldowns = new Map();
      client.prefixCooldowns.set(message.guild.id, cooldowns);
    }

    if (!cooldowns.has(command.name)) {
      cooldowns.set(command.name, new Collection());
    }

    const currentTime = Date.now();
    const cooldownCommand = cooldowns.get(command.name);
    const cooldownAmount = parseInt((command.cooldown) * 1000);

    if (cooldownCommand.has(message.member.user.id)) {
      const expirationTime = cooldownCommand.get(message.member.user.id) + cooldownAmount;

      const timeLeft = Math.round((new Date().getTime()) + (expirationTime - currentTime));

      if (currentTime < expirationTime) {

        const embed = new EmbedBuilder()
          .setColor('Red')
          .setTitle("Slowdown!")
          .setDescription(`${prefix}${command.name} is on cooldown and will be available <t:${Math.round(timeLeft / 1000)}:R> `)

        return message.reply({ embeds: [embed] }).then((m) => {
          setTimeout(async () => {
            await m.delete();
            await message.delete();
          }, 5_000);
        });
      }
    }

    cooldownCommand.set(message.member.user.id, currentTime);

    setTimeout(() => cooldownCommand.delete(message.member.user.id), cooldownAmount);

    if (command.args && !args.length) {

      const embed = new EmbedBuilder()
        .setColor("#f59e0b")
        .setTitle(`${prefix}${command.name}`)
        .addFields(
          { name: "Description", value: codeBlock(command.description), inline: false },
          { name: "Cooldown", value: codeBlock(ms(cooldownAmount)), inline: false },
          { name: "Usage", value: `${codeBlock(`${prefix}${command.name} ${command.usage}`)}`, inline: false },
          { name: "Example", value: `${codeBlock(`${prefix}${command.example}`)}`, inline: false }
        )
      return message.reply({ embeds: [embed] });
    }

    const perm = {
      Administrator: "Administrator",
      ViewChannel: "View Channels",
      ManageChannels: "Manage Channels",
      ManageRoles: "Manage Roles",
      ManageEmojisAndStickers: "Manage Emojis",
      ViewAuditLog: "View Audit Log",
      ManageWebhooks: "Manage Webhooks",
      ManageGuild: "Manage Server",
      CreateInstantInvite: "Create Invite",
      ChangeNickname: "Change Nickname",
      ManageNicknames: "Manage Nicknames",
      KickMembers: "Kick Members",
      BanMembers: "Ban Members",
      ModerateMembers: "Moderate Members",
      SendMessages: "Send Messages",
      SendMessagesInThreads: "Send Messages in Threads",
      CreatePublicThreads: "Create Public Threads",
      CreatePrivateThreads: "Create Private Threads",
      EmbedLinks: "Embed Links",
      AttachFiles: "Attach Files",
      AddReactions: "Add Reactions",
      UseExternalEmojis: "Use External Emoji",
      UseExternalStickers: "Use External Stickers",
      MentionEveryone: "Mention Everyone",
      ManageMessages: "Manage Messages",
      ManageThreads: "ManageThreads",
      ReadMessageHistory: "Read Message History",
      SendTTSMessages: "Send Text-to-Speech Messages",
      UseApplicationCommands: "Use Application Commands",
      Connect: "Connect",
      Speak: "Speak",
      Video: "Video",
      UseEmbeddedActivities: "Use Activities",
    };

    if (command.userPermissions && !message.member.permissions.has(command.userPermissions)) {

      const embed = new EmbedBuilder()
        .setColor('Red')
        .setTitle("There was an error")
        .setDescription(`You're missing the following permission: \`${perm[command.userPermissions]}\`\nPlease update your permissions and try again`)

      return message.reply({ embeds: [embed] });
    }
    // Check bot permissions
    if (command.botPermissions && !message.guild.members.me.permissions.has(command.botPermissions)) {

      const embed = new EmbedBuilder()
        .setColor('Red')
        .setTitle("There was an error")
        .setDescription(`I'm missing the following permission: \`${perm[command.botPermissions]}\`\nPlease update my permissions and try again`)

      return message.reply({ embeds: [embed] });
    }

    try {
      await command.execute(message, args, client);
    } catch (error) {
      console.error(error);
      const embed = new EmbedBuilder()
        .setColor('Red')
        .setTitle(`There was an error while executing this command`)

      await message.reply({ embeds: [embed], ephemeral: true });
    }
  }
};