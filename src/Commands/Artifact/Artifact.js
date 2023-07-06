const { SlashCommandBuilder, EmbedBuilder, AttachmentBuilder } = require("discord.js");
const artifacts = require("../../../contents/artifacts.json");

module.exports = {
    cooldown: 5,
    data: new SlashCommandBuilder()
        .setName("artifact")
        .setDescription("Get information about an artifact")
        .setDMPermission(false)
        .addStringOption(option =>
            option
                .setName("name")
                .setDescription("Name of the artifact")
                .setRequired(true)
                .setAutocomplete(true)
        ),

    async autocomplete(interaction) {
        const focusedValue = interaction.options.getFocused().toLowerCase();
        const choices = Object.keys(artifacts);
        const filtered = choices.filter(choice => choice.toLowerCase().startsWith(focusedValue)).slice(0, 25);
        await interaction.respond(filtered.map(choice => ({ name: choice, value: choice })));
    },

    async execute(interaction) {
        const userSelection = interaction.options.getString("name");

        const selectedArtifact = artifacts[userSelection];

        const embed = new EmbedBuilder()
            .setColor("#f59e0b")
            .setTitle(userSelection)
            .setFields(
                { name: "Rarity:", value: selectedArtifact.rarity, inline: false },
                { name: "Role:", value: selectedArtifact.role, inline: false },
                { name: "Buffs:", value: selectedArtifact.buffs, inline: false },
                { name: "Units:", value: selectedArtifact.units, inline: false },
                { name: "Tier:", value: selectedArtifact.tier, inline: false }
            );

        if (selectedArtifact.image !== "") {

            const attachment = new AttachmentBuilder()
                .setFile(`./assets/artifact/${selectedArtifact.image}`)
                .setName(`image.png`)

            const embed2 = new EmbedBuilder()
                .setColor("#f59e0b")
                .setTitle(`${userSelection}`)
                .setImage("attachment://image.png")

            await interaction.reply({ files: [attachment], embeds: [embed2, embed] });
        } else {
            await interaction.reply({ embeds: [embed] });
        }

    },
};