const logger = require("../../Utils/Logger/Logger")

module.exports = {
    name: "ready",
    once: true,

    async execute(client) {

        logger.info(`[READY] Successfully logged in as ${client.user.tag}.`)

    },
};
