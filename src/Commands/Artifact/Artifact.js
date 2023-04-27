const { EmbedBuilder, AttachmentBuilder } = require("discord.js");
const artifact = require("../../../contents/artifacts.json");

module.exports = {
  name: "artifact",
  description: "Get information about an artifact",
  usage: "<name>",
  example: "artifact Magic Bomb",
  cooldown: 5, // seconds
  args: true,
  botPermissions: "SendMessages",

  async execute(message, args) {

    const userSelection = args.join(" ")

    if (!userSelection) {
      return;
    }

    if (!artifact[userSelection]) {
      const errEmbed = new EmbedBuilder()
        .setColor("Red")
        .setDescription(`Sorry, ${userSelection} is not a valid artifact name.`)

      const m = await message.reply({ embeds: [errEmbed] });

      setTimeout(async () => {
        await m.delete();
        await message.delete();
      }, 5_000);

    } else {

      const attachment = new AttachmentBuilder()
        .setFile(`./assets/Artifact/${artifact[userSelection]["image"]}`)
        .setName("image.png")

      if (artifact[userSelection]["image"] !== "") {

        const embed = new EmbedBuilder()
          .setColor("#f59e0b")
          .setTitle(`${userSelection}`)
          .setImage("attachment://image.png")

        const embed2 = new EmbedBuilder()
          .setColor("#f59e0b")
          .setFields(
            { name: "Rarity:", value: `${artifact[userSelection]["rarity"]}`, inline: false },
            { name: "Role:", value: `${artifact[userSelection]["role"]}`, inline: false },
            { name: "Buffs:", value: `${artifact[userSelection]["buffs"]}`, inline: false },
            { name: "Units:", value: `${artifact[userSelection]["units"]}`, inline: false },
            { name: "Tier:", value: `${artifact[userSelection]["tier"]}`, inline: false })

        await message.reply({ files: [attachment], embeds: [embed, embed2] })
      } else {

        const embed = new EmbedBuilder()
          .setColor("#f59e0b")
          .setFields(
            { name: "Rarity:", value: `${artifact[userSelection]["rarity"]}`, inline: false },
            { name: "Role:", value: `${artifact[userSelection]["role"]}`, inline: false },
            { name: "Buffs:", value: `${artifact[userSelection]["buffs"]}`, inline: false },
            { name: "Units:", value: `${artifact[userSelection]["units"]}`, inline: false },
            { name: "Tier:", value: `${artifact[userSelection]["tier"]}`, inline: false })

        await message.reply({ embeds: [embed] })
      }
    }
  },
};