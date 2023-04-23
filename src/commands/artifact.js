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
    "Bloodblade Banner": {
        "image": "Bloodblade-Banner.png",
        "rarity": "Legendary",
        "role": "Assault",
        "buffs": "Rally",
        "units": "Overall",
        "tier": "S",
    },
    "Shadowblades": {
        "image": "Shadowblades.png",
        "rarity": "Legendary",
        "role": "Assault",
        "buffs": "PvP",
        "units": "Marksman",
        "tier": "S",
    },
    "Sorland’s Blade": {
        "image": "Sorlands-Blade.png",
        "rarity": "Legendary",
        "role": "Assault",
        "buffs": "PvP",
        "units": "Cavalry",
        "tier": "S",
    },
    "Heart of Kamasi": {
        "image": "Heart-of-Kamasi.png",
        "rarity": "Legendary",
        "role": "Support",
        "buffs": "PvP",
        "units": "Marksman",
        "tier": "S",
    },
    "Dragonrift": {
        "image": "Dragonrift.png",
        "rarity": "Legendary",
        "role": "Assault",
        "buffs": "PvP",
        "units": "Infantry",
        "tier": "S",
    },
    "Phoenix Eye": {
        "image": "Phoenix-Eye.png",
        "rarity": "Legendary",
        "role": "Assault",
        "buffs": "PvP",
        "units": "Magic",
        "tier": "S",
    },
    "Breath of Jargentis": {
        "image": "Breath-of-Jargentis.png",
        "rarity": "Legendary",
        "role": "Support",
        "buffs": "PvP",
        "units": "Magic",
        "tier": "S",
    },
    "Kingslayer": {
        "image": "Kingslayer.png",
        "rarity": "Legendary",
        "role": "Assault",
        "buffs": "PvP",
        "units": "Cavalry",
        "tier": "S",
    },
    "Tear of Arbon": {
        "image": "Tear-of-Arbon.png",
        "rarity": "Legendary",
        "role": "Support",
        "buffs": "PvP",
        "units": "Magic",
        "tier": "A",
    },
    "Fang of Ashkari": {
        "image": "Fang-of-Ashkari.png",
        "rarity": "Legendary",
        "role": "Tank",
        "buffs": "PvP",
        "units": "Overall",
        "tier": "A",
    },
    "Breath of the Forest": {
        "image": "Breath-of-the-Forest.png",
        "rarity": "Legendary",
        "role": "Support",
        "buffs": "Garrison",
        "units": "Overall",
        "tier": "A",
    },
    "Heartpiercer": {
        "image": "Heartpiercer.png",
        "rarity": "Epic",
        "role": "Assault",
        "buffs": "PvP",
        "units": "Marksman",
        "tier": "A",
    },
    "Archery Master's Manual": {
        "image": "Archery-Masters-Manual.png",
        "rarity": "Epic",
        "role": "Assault",
        "buffs": "PvP",
        "units": "Marksman",
        "tier": "A",
    },
    "Magic Bomb": {
        "image": "Magic-Bomb.png",
        "rarity": "Epic",
        "role": "Assault",
        "buffs": "PvP",
        "units": "Magic",
        "tier": "A",
    },
    "Giant's Bone": {
        "image": "Giants-Bone.png",
        "rarity": "Epic",
        "role": "Peacekeeping",
        "buffs": "Peacekeeping",
        "units": "Overall",
        "tier": "A",
    },
    "Giant's Bone": {
        "image": "Giants-Bone.png",
        "rarity": "Epic",
        "role": "Peacekeeping",
        "buffs": "Peacekeeping",
        "units": "Overall",
        "tier": "A",
    },
    "Staff of Spring": {
        "image": "Staff-of-Spring.png",
        "rarity": "Epic",
        "role": "Support",
        "buffs": "PvP",
        "units": "Magic",
        "tier": "A",
    },
    "Codex of Prophecy": {
        "image": "Codex-of-Prophecy.png",
        "rarity": "Epic",
        "role": "Peacekeeping",
        "buffs": "Peacekeeping",
        "units": "Infantry",
        "tier": "A",
    },
    "Amulet of Glory": {
        "image": "Amulet-of-Glory.png",
        "rarity": "Epic",
        "role": "Peacekeeping",
        "buffs": "Peacekeeping",
        "units": "Overall",
        "tier": "A",
    },
    "Butcher's Blade": {
        "image": "Butchers-Blade.png",
        "rarity": "Epic",
        "role": "Assault",
        "buffs": "PvP",
        "units": "Infantry",
        "tier": "A",
    },
    "Centaur Bow": {
        "image": "Centaur-Bow.png",
        "rarity": "Epic",
        "role": "Assault",
        "buffs": "PvP",
        "units": "Cavalry",
        "tier": "A",
    },
    "Bomb Flinger": {
        "image": "Bomb-Flinger.png",
        "rarity": "Epic",
        "role": "Peacekeeping",
        "buffs": "Peacekeeping",
        "units": "Marksman",
        "tier": "A",
    },
    "Enchiridion of Advanced Incantations": {
        "image": "Enchiridion-of-Advanced-Incantations.png",
        "rarity": "Epic",
        "role": "Peacekeeping",
        "buffs": "Peacekeeping",
        "units": "Magic",
        "tier": "A",
    },
    "Homecoming Blossom": {
        "image": "Homecoming-Blossom.png",
        "rarity": "Epic",
        "role": "Support",
        "buffs": "Mobility",
        "units": "Overall",
        "tier": "B",
    },
    "Kurrata's Wrath": {
        "image": "Kurratas-Wrath.png",
        "rarity": "Legendary",
        "role": "Peacekeeping",
        "buffs": "Peacekeeping",
        "units": "Overall",
        "tier": "B",
    },
    "Wolf-Woman of Haelor": {
        "image": "Wolf-Woman-of-Haelor.png",
        "rarity": "Legendary",
        "role": "Peacekeeping",
        "buffs": "Peacekeeping",
        "units": "Overall",
        "tier": "B",
    },
    "Staff of the Prophet": {
        "image": "Staff-of-the-Prophet.png",
        "rarity": "Legendary",
        "role": "Support",
        "buffs": "Mobility",
        "units": "Magic",
        "tier": "B",
    },
    "Storm Arrows": {
        "image": "Storm-Arrows.png",
        "rarity": "Legendary",
        "role": "Support",
        "buffs": "Mobility",
        "units": "Cavalry",
        "tier": "B",
    },
    "Cloak of Stealth": {
        "image": "Cloak-of-Stealth.png",
        "rarity": "Epic",
        "role": "Support",
        "buffs": "Mobility",
        "units": "Cavalry",
        "tier": "B",
    },
    "Spirit Bangle": {
        "image": "Cloak-of-Stealth.png",
        "rarity": "Epic",
        "role": "Support",
        "buffs": "PvP",
        "units": "Magic",
        "tier": "B",
    },
    "Freezing Ring": {
        "image": "Freezing-Ring.png",
        "rarity": "Epic",
        "role": "Tank",
        "buffs": "PvP",
        "units": "Magic",
        "tier": "B",
    },
    "Blade of Reproach": {
        "image": "Blade-of-Reproach.png",
        "rarity": "Epic",
        "role": "Peacekeeping",
        "buffs": "Peacekeeping",
        "units": "Cavalry",
        "tier": "B",
    },
    "Rapid Crossbow": {
        "image": "Rapid-Crossbow.png",
        "rarity": "Elite",
        "role": "Assault",
        "buffs": "PvP",
        "units": "Marksman",
        "tier": "B",
    },
    "Crown of the Berserker": {
        "image": "Crown-of-the-Berserker.png",
        "rarity": "Elite",
        "role": "Assault",
        "buffs": "PvP",
        "units": "Cavalry",
        "tier": "B",
    },
    "Crown of the Berserker": {
        "image": "Crown-of-the-Berserker.png",
        "rarity": "Elite",
        "role": "Assault",
        "buffs": "PvP",
        "units": "Cavalry",
        "tier": "B",
    },
    "Harlequin Mask": {
        "image": "Harlequin-Mask.png",
        "rarity": "Elite",
        "role": "Peacekeeping",
        "buffs": "Peacekeeping",
        "units": "Infantry",
        "tier": "B",
    },
    "Potion of Vigor": {
        "image": "Potion-of-Vigor.png",
        "rarity": "Epic",
        "role": "Engineering",
        "buffs": "Engineering",
        "units": "Infantry",
        "tier": "N/A",
    },
    "Bone Cleaver": {
        "image": "Bone-Cleaver.png",
        "rarity": "Elite",
        "role": "Assault",
        "buffs": "PvP",
        "units": "Cavalry",
        "tier": "C",
    },
    "Ever-Ice": {
        "image": "Ever-Ice.png",
        "rarity": "Elite",
        "role": "Assault",
        "buffs": "PvP",
        "units": "Magic",
        "tier": "C",
    },
    "Boots of Swiftness": {
        "image": "Boots-of-Swiftness.png",
        "rarity": "Elite",
        "role": "Support",
        "buffs": "Mobility",
        "units": "Overall",
        "tier": "C",
    },
    "Veteran's Diary": {
        "image": "Veterans-Diary.png",
        "rarity": "Elite",
        "role": "Assault",
        "buffs": "PvP",
        "units": "Infantry",
        "tier": "C",
    },
    "Joyous Fireworks": {
        "image": "Joyous-Fireworks.png",
        "rarity": "Advanced",
        "role": "Engineering",
        "buffs": "Engineering",
        "units": "Overall",
        "tier": "C",
    },
    "Lucia's Horn": {
        "image": "Lucias-Horn.png",
        "rarity": "Legendary",
        "role": "Gathering",
        "buffs": "Gathering",
        "units": "Overall",
        "tier": "N/A",
    },
    "Ancient Tree Roots": {
        "image": "Ancient-Tree-Roots.png",
        "rarity": "Legendary",
        "role": "Gathering",
        "buffs": "Gathering",
        "units": "Overall",
        "tier": "N/A",
    },
    "Greenfinger Sickle": {
        "image": "Greenfinger-Sickle.png",
        "rarity": "Epic",
        "role": "Gathering",
        "buffs": "Gathering",
        "units": "Overall",
        "tier": "N/A",
    },
    "Illusory Gems": {
        "image": "Illusory-Gems.png",
        "rarity": "Elite",
        "role": "Gathering",
        "buffs": "Gathering",
        "units": "Overall",
        "tier": "N/A",
    },
    "Enchanted Coins": {
        "image": "Enchanted-Coins.png",
        "rarity": "Advanced",
        "role": "Gathering",
        "buffs": "Gathering",
        "units": "Overall",
        "tier": "N/A",
    },
    "Storm Leaf": {
        "image": "Storm-Leaf.png",
        "rarity": "Advanced",
        "role": "Gathering",
        "buffs": "Gathering",
        "units": "Overall",
        "tier": "N/A",
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