const { EmbedBuilder, Collection } = require("discord.js");
const log = require("../../Utils/Logger/Logger")

module.exports = {
    name: 'interactionCreate',
    async execute(interaction, client) {

        const { slashCommands, slashCooldowns } = client;
        const { commandName, commandId, user, guildId } = interaction;

        const embed = new EmbedBuilder()
            .setColor('Red')

        if (interaction.isChatInputCommand()) {

            const command = slashCommands.get(commandName, commandId);

            if (!command) {
                embed
                    .setDescription(`This command is outdated.`)

                await interaction.reply({ embeds: [embed], ephemeral: true });
                return
            }

            let cooldowns = slashCooldowns.get(guildId);
            if (!cooldowns) {
                cooldowns = new Map();
                slashCooldowns.set(guildId, cooldowns);
            }

            if (!cooldowns.has(command.name)) {
                cooldowns.set(command.name, new Collection());
            }

            const currentTime = Date.now();
            const cooldownCommand = cooldowns.get(command.name);
            const cooldownAmount = (command.cooldown) * 1000;

            if (cooldownCommand.has(user.id)) {
                const expirationTime = cooldownCommand.get(user.id) + cooldownAmount;

                const timeLeft = Math.round((new Date().getTime()) + (expirationTime - currentTime));

                if (currentTime < expirationTime) {
                    embed
                        .setTitle("Slowdown!")
                        .setDescription(`</${commandName}:${commandId}> is on cooldown and will be available <t:${Math.round(timeLeft / 1000)}:R> `)

                    await interaction.reply({ embeds: [embed], ephemeral: true });
                    return;
                }
            }

            cooldownCommand.set(user.id, currentTime);
            setTimeout(() => cooldownCommand.delete(user.id), cooldownAmount);

            try {

                await command.execute(interaction, client);

            } catch (error) {

                console.error(error)

                if (interaction.replied || interaction.deferred) {

                    embed
                        .setTitle(`There was an error while executing this command`)

                    await interaction.followUp({ embeds: [embed], ephemeral: true });
                } else {

                    const embed = new EmbedBuilder()
                        .setColor('Red')
                        .setTitle(`There was an error while executing this command`)

                    await interaction.reply({ embeds: [embed], ephemeral: true });
                }
            }

        } else if (interaction.isAutocomplete()) {
            const command = slashCommands.get(commandName, commandId);

            if (!command) {
                return;
            }

            try {
                await command.autocomplete(interaction);
            } catch (error) {
                console.error(error)
            }
        }
    },

};