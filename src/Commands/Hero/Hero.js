const { EmbedBuilder, AttachmentBuilder } = require("discord.js");
const hero = require("../../../contents/heroes.json");

module.exports = {
  name: "hero",
  description: "Get information about a hero",
  usage: "<name>",
  example: "hero Alistair",
  cooldown: 5, // seconds
  args: true,
  botPermissions: "SendMessages",

  async execute(message, args) {

    const userSelection = args[0];

    if (!userSelection) {
      return;
    }

    if (!hero[userSelection]) {
      const errEmbed = new EmbedBuilder()
        .setColor("Red")
        .setDescription(`Sorry, ${userSelection} is not a valid hero name.`)

      const m = await message.reply({ embeds: [errEmbed] });

      setTimeout(async () => {
        await m.delete();
        await message.delete();
      }, 5_000);

    } else {

      const attachment = new AttachmentBuilder()
        .setFile(`./assets/hero/${hero[userSelection]["image"]}`)
        .setName("image.png")

      if (hero[userSelection]["image"] !== "") {

        const embed = new EmbedBuilder()
          .setColor("#f59e0b")
          .setTitle(userSelection)
          .setImage("attachment://image.png")

        const embed2 = new EmbedBuilder()
          .setColor("#f59e0b")
          .setFields(
            { name: "Rarity:", value: `${hero[userSelection]["rarity"]}`, inline: false },
            { name: "Role:", value: `${hero[userSelection]["role"]}`, inline: false },
            { name: "Buffs:", value: `${hero[userSelection]["buffs"]}`, inline: false },
            { name: "Units:", value: `${hero[userSelection]["units"]}`, inline: false },
            { name: "Tier:", value: `${hero[userSelection]["tier"]}`, inline: false },
            { name: "Best Pairings", value: `${hero[userSelection]["pairings"]}`, inline: false })

        await message.reply({ files: [attachment], embeds: [embed, embed2] })
      } else {

        const embed = new EmbedBuilder()
          .setColor("#f59e0b")
          .setTitle(userSelection)
          .setFields(
            { name: "Rarity:", value: `${hero[userSelection]["rarity"]}`, inline: false },
            { name: "Role:", value: `${hero[userSelection]["role"]}`, inline: false },
            { name: "Buffs:", value: `${hero[userSelection]["buffs"]}`, inline: false },
            { name: "Units:", value: `${hero[userSelection]["units"]}`, inline: false },
            { name: "Tier:", value: `${hero[userSelection]["tier"]}`, inline: false },
            { name: "Best Pairings", value: `${hero[userSelection]["pairings"]}`, inline: false })

        await message.reply({ embeds: [embed] })

      }

    }
  },
};