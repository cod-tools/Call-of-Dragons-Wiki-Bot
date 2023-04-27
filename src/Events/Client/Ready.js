const logger = require("../../Utils/Logger/Logger")
const { ActivityType } = require("discord.js");

module.exports = {
    name: "ready",
    once: true,

    async execute(client) {

        logger.info(`[READY] Successfully logged in as ${client.user.tag}.`)

        client.user.setPresence({
            activities: [
                {
                    name: `${client.config.prefix}help`,
                    type: ActivityType.Playing,
                },
            ],
            status: "Online",
        });

    },
};
