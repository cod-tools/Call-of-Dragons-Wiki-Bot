const { EmbedBuilder } = require("discord.js");
const help = require("../../../contents/help.json");

module.exports = {
  name: "help",
  description: "Get a list of commands",
  cooldown: 5, // seconds
  botPermissions: "SendMessages",

  async execute(message, args) {

    const embed = new EmbedBuilder()
      .setColor("#f59e0b")
      .setTitle("Heres a list of all available commands!")
      .setDescription(help.help)

    await message.reply({ embeds: [embed] });
  },
};