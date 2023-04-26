const fs = require("node:fs");
const log = require("../Logger/Logger");

module.exports = (client) => {

  const prefixCommandFolder = fs.readdirSync("./src/Commands");
  const commands = [];

  for (const folder of prefixCommandFolder) {
    const commandFiles = fs
      .readdirSync(`./src/Commands/${folder}`)
      .filter((file) => file.endsWith(".js"));

    const { prefixCommands } = client;
    for (const file of commandFiles) {
      const command = require(`../../Commands/${folder}/${file}`);

      if (!command.name) {
        log.warn(`Prefix command at ${file} is missing a name`)
      } else {
        prefixCommands.set(command.name, command);
        commands.push(command.name)
      }
    }
  }
  log.info(`[COMMAND] Loaded ${commands.length} commands`);
};
