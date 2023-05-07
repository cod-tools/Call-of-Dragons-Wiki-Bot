const { EmbedBuilder, AttachmentBuilder } = require("discord.js");
const behemoth = require("../../../contents/behemoths.json");

module.exports = {
  name: "behemoth",
  description: "Get information about an behemoth",
  usage: "<name>",
  example: "behemoth Magic Bomb",
  cooldown: 5, // seconds
  args: true,
  botPermissions: "SendMessages",

  async execute(message, args) {

    const userSelection = args.join(" ")

    if (!userSelection) {
      return;
    }

    if (!behemoth[userSelection]) {
      const errEmbed = new EmbedBuilder()
        .setColor("Red")
        .setDescription(`Sorry, ${userSelection} is not a valid behemoth name.`)

      const m = await message.reply({ embeds: [errEmbed] });

      setTimeout(async () => {
        await m.delete();
        await message.delete();
      }, 5_000);

    } else {

      const attachment = new AttachmentBuilder()
        .setFile(`./assets/behemoth/${behemoth[userSelection]["image"]}`)
        .setName("image.png")

      if (behemoth[userSelection]["image"] !== "") {

        const embed = new EmbedBuilder()
          .setColor("#f59e0b")
          .setTitle(`${userSelection}`)
          .setImage("attachment://image.png")

        const embed2 = new EmbedBuilder()
          .setColor("#f59e0b")
          .setFields(
            { name: "Level:", value: `${behemoth[userSelection]["level"]}`, inline: false },
            { name: "Health", value: `${behemoth[userSelection]["health"]}`, inline: false },
            { name: "Tutorial:", value: `${behemoth[userSelection]["tutorial"]}`, inline: false })

        await message.reply({ files: [attachment], embeds: [embed, embed2] })
      } else {

        const embed = new EmbedBuilder()
          .setColor("#f59e0b")
          .setFields(
            { name: "Level:", value: `${behemoth[userSelection]["level"]}`, inline: false },
            { name: "Health", value: `${behemoth[userSelection]["health"]}`, inline: false },
            { name: "Tutorial:", value: `${behemoth[userSelection]["tutorial"]}`, inline: false })

        await message.reply({ embeds: [embed] })
      }
    }
  },
};