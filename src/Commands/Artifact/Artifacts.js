const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const artifact = require("../../../contents/artifacts.json");

module.exports = {
    cooldown: 5,
    data: new SlashCommandBuilder()
        .setName("artifacts")
        .setDescription("Get a list of all available artifacts")
        .setDMPermission(false),

    async execute(interaction) {

        const artifactNames = Object.keys(artifact).sort();

        const artifacts = artifactNames.map((artifact) => `**${artifact}**`).join("\n\n")

        const embed = new EmbedBuilder()
            .setColor("#f59e0b")
            .setTitle("Heres a list of all available artifacts!")
            .setDescription(artifacts)

        await interaction.reply({ embeds: [embed], ephemeral: true });
    },
};
