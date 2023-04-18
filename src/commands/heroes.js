const { SlashCommandBuilder, SlashCommandStringOption } = require("@discordjs/builders");
const Discord = require("discord.js");

// lowercase only !!
const categoryName = "heroes";

// "name": { details: "description", image: "file name in /assets/" }
const heroes = {
    "Alistair": {
        "image": "Alistair.png",
        "rarity": "Epic",
        "role": "Tank",
        "buffs": "Rally",
        "units": "Cavalry",
        "tier": "C",
        "pairings": "Emrys/Bakshi"
    },
    "Alwyn": {
        "image": "Alwyn.png",
        "rarity": "Epic",
        "role": "Control",
        "buffs": "PvP",
        "units": "Magic",
        "tier": "B",
        "pairings": "Waldyr/Liliya"
    },
    "Atheus": {
        "image": "Atheus.png",
        "rarity": "Epic",
        "role": "Mobility",
        "buffs": "PvP",
        "units": "Magic",
        "tier": "B",
        "pairings": "Waldyr/Alwyn"
    },
    "Bakshi": {
        "image": "Bakshi.png",
        "rarity": "Legendary",
        "role": "Skills",
        "buffs": "Peacekeeping",
        "units": "Cavalry",
        "tier": "S",
        "pairings": "Emrys/Alistair"
    },
    "Chakcha": {
        "image": "Chakcha.png",
        "rarity": "Elite",
        "role": "Gathering",
        "buffs": "N/A",
        "units": "N/A",
        "tier": "N/A",
        "pairings": "N/A"
    },
    "Eliana": {
        "image": "Eliana.png",
        "rarity": "Epic",
        "role": "Support",
        "buffs": "Peacekeeping",
        "units": "Overall",
        "tier": "B-",
        "pairings": "N/A"
    },
    "Emrys": {
        "image": "Emrys.png",
        "rarity": "Legendary",
        "role": "Mobility",
        "buffs": "PvP",
        "units": "Cavalry",
        "tier": "S",
        "pairings": "Alistair/Bakshi"
    },
    "Gwanwyn": {
        "image": "Gwanwyn.png",
        "rarity": "Epic",
        "role": "Precision",
        "buffs": "Peacekeeping",
        "units": "Marksman",
        "tier": "B",
        "pairings": "Kregg/Nico"
    },
    "Hosk": {
        "image": "Hosk.png",
        "rarity": "Legendary",
        "role": "Precision",
        "buffs": "Rally",
        "units": "Overall",
        "tier": "S",
        "pairings": "Nico/Kinnara"
    },
    "Kella": {
        "image": "Kella.png",
        "rarity": "Elite",
        "role": "Gathering",
        "buffs": "N/A",
        "units": "N/A",
        "tier": "N/A",
        "pairings": "N/A"
    },
    "Kinnara": {
        "image": "Kinnara.png",
        "rarity": "Legendary",
        "role": "Control",
        "buffs": "PvP",
        "units": "Marksman",
        "tier": "S+",
        "pairings": "Nico/Gwanwyn"
    },
    "Kregg": {
        "image": "Kregg.png",
        "rarity": "Epic",
        "role": "Mobility",
        "buffs": "Engineering",
        "units": "Marksman",
        "tier": "B",
        "pairings": "Gwanwyn/Nico"
    },
    "Liliya": {
        "image": "Liliya.png",
        "rarity": "Legendary",
        "role": "Skills",
        "buffs": "Peacekeeping",
        "units": "Magic",
        "tier": "S+",
        "pairings": "Waldyr/Velyn"
    },
    "Madeline": {
        "image": "Madeline.png",
        "rarity": "Legendary",
        "role": "PvP",
        "buffs": "Tank",
        "units": "Overall",
        "tier": "S",
        "pairings": "Nika/Hosk"
    },
    "Nico": {
        "image": "Nico.png",
        "rarity": "Legendary",
        "role": "Precision",
        "buffs": "Precision",
        "units": "Marksman",
        "tier": "A+",
        "pairings": "Gwanwyn/Hosk"
    },
    "Nika": {
        "image": "Nika.png",
        "rarity": "Legendary",
        "role": "Skills",
        "buffs": "Peacekeeping",
        "units": "Infantry",
        "tier": "S",
        "pairings": "Madeline/Hosk"
    },
    "Ordo": {
        "image": "Ordo.png",
        "rarity": "Elite",
        "role": "Engineering",
        "buffs": "N/A",
        "units": "N/A",
        "tier": "N/A",
        "pairings": "N/A"
    },
    "Theia": {
        "image": "Theia.png",
        "rarity": "Legendary",
        "role": "Support",
        "buffs": "PvP",
        "units": "Overall",
        "tier": "S",
        "pairings": "Atheus/Kregg"
    },
    "Velyn": {
        "image": "Velyn.png",
        "rarity": "Legendary",
        "role": "Control",
        "buffs": "PvP",
        "units": "Magic",
        "tier": "S",
        "pairings": "Liliya/Waldyr"
    },
    "Waldyr": {
        "image": "Waldyr.png",
        "rarity": "Epic",
        "role": "Skills",
        "buffs": "PvP",
        "units": "Magic",
        "tier": "A",
        "pairings": "Liliya/Velyn"
    }
};

module.exports = {
    commandData: new SlashCommandBuilder()
        .setName(categoryName)
        .setDescription("Test Description for Category1.")
        .addStringOption(new SlashCommandStringOption()
            .setChoices(
                ...Object.keys(heroes).map(key => ({ name: key, value: key }))
            )
            .setRequired(true)
            .setName("selection")
            .setDescription("Your selection.")
    ).toJSON(),
    
    run: async(client, interaction) => {
        const userSelection = interaction.options.getString("selection");
        
        if(heroes[userSelection]["image"] != null) {
            const file = new Discord.MessageAttachment().setFile(`./assets/${categoryName}/${heroes[userSelection]["image"]}`).setName("image.png");
            const embed = new Discord.MessageEmbed();
            embed.setAuthor({ name: `${userSelection}`});
            embed.setColor("#7b03fc");
            embed.setImage("attachment://image.png");

            const embed2 = new Discord.MessageEmbed();
            embed2.setDescription(`**Rarity:**\n${heroes[userSelection]["rarity"]}\n\n**Role:**\n${heroes[userSelection]["role"]}\n\n**Buffs:**\n${heroes[userSelection]["buffs"]}\n\n**Units:**\n${heroes[userSelection]["units"]}\n\n**Tier:**\n${heroes[userSelection]["tier"]}\n\n**Best Pairings:**\n${heroes[userSelection]["pairings"]}`);
            embed2.setColor("#7b03fc");

            await interaction.reply({ embeds: [ embed, embed2 ], files: [ file ] });
        } else {
            const embed = new Discord.MessageEmbed();
            embed.setAuthor({ name: `${userSelection}`});
            embed.setDescription(`**Rarity:**\n${heroes[userSelection]["rarity"]}\n\n**Role:**\n${heroes[userSelection]["role"]}\n\n**Buffs:**\n${heroes[userSelection]["buffs"]}\n\n**Units:**\n${heroes[userSelection]["units"]}\n\n**Tier:**\n${heroes[userSelection]["tier"]}\n\n**Best Pairings:**\n${heroes[userSelection]["pairings"]}`);
            embed.setColor("#7b03fc");

            await interaction.reply({ embeds: [ embed ] });
        }
    }
}