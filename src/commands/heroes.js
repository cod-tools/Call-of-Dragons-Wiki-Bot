const { SlashCommandBuilder, SlashCommandStringOption } = require("@discordjs/builders");
const Discord = require("discord.js");

// lowercase only !!
const categoryName = "heroes";

// "name": { details: "description", image: "file name in /assets/" }
const knowledgebase = {
    "Alistair": {
        "details": "**Rarity:**\nEpic\n\n**Role:**\nTank\n\n**Buffs:**\nRally\n\n**Units:**\nCavalry\n\n**Tier:**\nC\n\n**Best Pairings:**\nEmrys/Bakshi",
        "image": "alistair.png",
    },
    "Alwyn": {
        "details": "**Rarity:**\nPlaceholder\n\n**Role:**\nPlaceholder\n\n**Buffs:**\nPlaceholder\n\n**Units:**\nPlaceholder\n\n**Tier:**\nPlaceholder\n\n**Best Pairings:**\nPlaceholder",
        "image": "alistair.png",
    }, 
};

module.exports = {
    commandData: new SlashCommandBuilder()
        .setName(categoryName)
        .setDescription("Test Description for Category1.")
        .addStringOption(new SlashCommandStringOption()
            .setChoices(
                ...Object.keys(knowledgebase).map(key => ({ name: key, value: key }))
            )
            .setRequired(true)
            .setName("selection")
            .setDescription("Your selection.")
    ).toJSON(),
    
    run: async(client, interaction) => {
        const userSelection = interaction.options.getString("selection");
        
        if(knowledgebase[userSelection]["image"] != null) {
            const file = new Discord.MessageAttachment().setFile(`./assets/${categoryName}/${knowledgebase[userSelection]["image"]}`).setName("image.png");
            const embed = new Discord.MessageEmbed();
            embed.setAuthor({ name: `${userSelection}`});
            embed.setColor("#7b03fc");
            embed.setImage("attachment://image.png");

            const embed2 = new Discord.MessageEmbed();
            embed2.setDescription(knowledgebase[userSelection]["details"]);
            embed2.setColor("#7b03fc");

            await interaction.reply({ embeds: [ embed, embed2 ], files: [ file ] });
        } else {
            const embed = new Discord.MessageEmbed();
            embed.setAuthor({ name: `${userSelection}`});
            embed.setDescription(knowledgebase[userSelection]["details"]);
            embed.setColor("#7b03fc");

            await interaction.reply({ embeds: [ embed ] });
        }
    }
}