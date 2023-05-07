const { EmbedBuilder } = require("discord.js");
const behemoths = require("../../../contents/behemoths.json");

module.exports = {
  name: "behemoths",
  description: "Get a list of all available behemoths",
  cooldown: 5, // seconds
  botPermissions: "SendMessages",

  async execute(message, args) {

    const behemothName = Object.keys(behemoths).sort();

    const response = behemothName.map(behemoth => `**${behemoth}**`).join("\n\n")

    const embed = new EmbedBuilder()
      .setColor("#f59e0b")
      .setTitle("Heres a list of all available behemoths!")
      .setDescription(response)

    await message.reply({ embeds: [embed] });
  },
};