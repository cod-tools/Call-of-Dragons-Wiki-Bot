const { EmbedBuilder } = require("discord.js");
const artifacts = require("../../../contents/artifacts.json");

module.exports = {
  name: "artifacts",
  description: "Get a list of all available artifacts",
  cooldown: 5, // seconds
  botPermissions: "SendMessages",

  async execute(message, args) {

    const artifactNames = Object.keys(artifacts).sort();

    const response = artifactNames.map((artifact) => `**${artifact}**`).join("\n\n")

    const embed = new EmbedBuilder()
      .setColor("#f59e0b")
      .setTitle("Heres a list of all available artifacts!")
      .setDescription(response)

    await message.reply({ embeds: [embed] });
  },
};