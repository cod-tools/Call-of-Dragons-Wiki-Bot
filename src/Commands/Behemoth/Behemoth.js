const { SlashCommandBuilder, EmbedBuilder, AttachmentBuilder } = require("discord.js");
const behemoths = require("../../../contents/behemoths.json");

module.exports = {
    cooldown: 5,
    data: new SlashCommandBuilder()
        .setName("behemoth")
        .setDescription("Get information about a behemoth.")
        .setDMPermission(false)
        .addStringOption(option =>
            option
                .setName("name")
                .setDescription("Name of the behemoth")
                .setRequired(true)
                .setAutocomplete(true)
        ),

    async autocomplete(interaction) {
        const focusedValue = interaction.options.getFocused().toLowerCase();
        const choices = Object.keys(behemoths);
        const filtered = choices.filter(choice => choice.toLowerCase().startsWith(focusedValue)).slice(0, 25);
        await interaction.respond(filtered.map(choice => ({ name: choice, value: choice })));
    },

    async execute(interaction) {
        const userSelection = interaction.options.getString("name");

        const selectedBehemoth = behemoths[userSelection];

        const embed = new EmbedBuilder()
            .setColor("#f59e0b")
            .setTitle(userSelection)
            .setFields(
                { name: "Level:", value: selectedBehemoth.level, inline: false },
                // { name: "Location:", value: selectedBehemoth.health, inline: false }, Location !== health...
                { name: "Health:", value: selectedBehemoth.health, inline: false },
                { name: "Tutorial:", value: selectedBehemoth.tutorial, inline: false },
            );

        if (selectedBehemoth.image !== "") {

            const attachment = new AttachmentBuilder()
                .setFile(`./assets/behemoth/${selectedBehemoth.image}`)
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