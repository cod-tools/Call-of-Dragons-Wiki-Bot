const { Client, GatewayIntentBits, Partials, Collection } = require("discord.js");
const fs = require("node:fs");
const log = require("./Utils/Logger/Logger")

const client = new Client({ intents: [],
  partials: [
      "CHANNEL",
      "REACTION",
      "GUILD_MEMBER",
      "MESSAGE",
      "REACTION",
      "USER"
  ]
});

require("dotenv").config();
console.clear()

client.slashCommands = new Collection();
client.slashCooldowns = new Collection();

const utilFolders = ['Handlers'];

utilFolders.forEach(folder => {
  const utilFiles = fs.readdirSync(`./src/Utils/${folder}`).filter(file => file.endsWith(".js"));
  utilFiles.forEach(file => require(`./Utils/${folder}/${file}`)(client));
});

client.login(process.env.TOKEN);

process.on("unhandledRejection", (error) => {
  log.error(error)
});

process.on("uncaughtException", (error) => {
  log.error(error)
});