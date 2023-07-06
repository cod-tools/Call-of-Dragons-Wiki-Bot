const { REST, Routes } = require("discord.js");
const fs = require("node:fs");
require("dotenv").config();
const { CLIENT_ID, TOKEN } = process.env;
const log = require("../Logger/Logger");

module.exports = (client) => {

    const { slashCommands } = client;
    const commands = [];

    const commandFolder = fs.readdirSync("./src/Commands");

    for (const folder of commandFolder) {
        const commandFiles = fs
            .readdirSync(`./src/Commands/${folder}`)
            .filter((file) => file.endsWith(".js"));

        for (const file of commandFiles) {
            const command = require(`../../Commands/${folder}/${file}`);

            if ('data' in command && 'execute' in command) {
                slashCommands.set(command.data.name, command);
                commands.push(command.data.toJSON());
            } else {
                log.warn(`[WARNING] The command at ${file} is missing a required "data" or "execute" property.`);
            }
        }
    }

    const rest = new REST({ version: "10" }).setToken(TOKEN);

    (async () => {
        try {
            const data = await rest.put(Routes.applicationCommands(CLIENT_ID), {
                body: commands,
            });

            log.info(`[INFO] Successfully refreshed ${data.length} guild (/) commands.`);
        } catch (error) {
            log.error(error);
        }
    })();
};
