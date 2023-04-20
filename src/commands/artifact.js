const { SlashCommandBuilder, SlashCommandStringOption } = require("@discordjs/builders");
const Discord = require("discord.js");

// lowercase only !!
const categoryName = "artifact";

// "name": { details: "description", image: "file name in /assets/" }
const artifact = {
    "Springs of Silence": {
        "image": "Springs-of-Silence.png",
        "rarity": "Legendary",
        "role": "Assault",
        "buffs": "PvP",
        "units": "Infantry",
        "tier": "S",
    },
};

module.exports = {
    commandData: new SlashCommandBuilder()
        .setName(categoryName)
        .setDescription("Get information about a Call of Dragons artifact")
        .addStringOption(new SlashCommandStringOption()
            .setChoices(
                ...Object.keys(artifact).map(key => ({ name: key, value: key }))
            )
            .setRequired(true)
            .setName("selection")
            .setDescription("Your selection.")
    ).toJSON(),
    
    run: async(client, interaction) => {
        const userSelection = interaction.options.getString("selection");
        
        if(artifact[userSelection]["image"] != null) {
            const file = new Discord.MessageAttachment().setFile(`./assets/${categoryName}/${artifact[userSelection]["image"]}`).setName("image.png");
            const embed = new Discord.MessageEmbed();
            embed.setAuthor({ name: `${userSelection}`});
            embed.setColor("#7b03fc");
            embed.setImage("attachment://image.png");

            const embed2 = new Discord.MessageEmbed();
            embed2.setDescription(`**Rarity:**\n${artifact[userSelection]["rarity"]}\n\n**Role:**\n${artifact[userSelection]["role"]}\n\n**Buffs:**\n${artifact[userSelection]["buffs"]}\n\n**Units:**\n${artifact[userSelection]["units"]}\n\n**Tier:**\n${artifact[userSelection]["tier"]}`);
            embed2.setColor("#7b03fc");

            await interaction.reply({ embeds: [ embed, embed2 ], files: [ file ] });
        } else {
            const embed = new Discord.MessageEmbed();
            embed.setAuthor({ name: `${userSelection}`});
            embed.setDescription(`**Rarity:**\n${artifact[userSelection]["rarity"]}\n\n**Role:**\n${artifact[userSelection]["role"]}\n\n**Buffs:**\n${artifact[userSelection]["buffs"]}\n\n**Units:**\n${artifact[userSelection]["units"]}\n\n**Tier:**\n${artifact[userSelection]["tier"]}`);
            embed.setColor("#7b03fc");

            await interaction.reply({ embeds: [ embed ] });
        }
    }
}