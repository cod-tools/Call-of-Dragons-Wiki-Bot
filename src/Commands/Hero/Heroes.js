const { EmbedBuilder } = require("discord.js");
const heroes = require("../../../contents/heroes.json");

module.exports = {
  name: "heroes",
  description: "Get a list of all available heroes.",
  cooldown: 5, // seconds
  botPermissions: "SendMessages",

  async execute(message, args) {

    const heroNames = Object.keys(heroes).sort();

    const response = heroNames.map(hero => `**${hero}**`).join("\n\n")

    const embed = new EmbedBuilder()
      .setColor("#f59e0b")
      .setTitle("Heres a list of all available heroes!")
      .setDescription(response)

    await message.reply({ embeds: [embed] });
  },
};