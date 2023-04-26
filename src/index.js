const { Client, GatewayIntentBits, Partials, Collection } = require("discord.js");
const fs = require("node:fs");
const log = require("./Utils/Logger/Logger")

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildModeration,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.GuildEmojisAndStickers,
    GatewayIntentBits.MessageContent,
  ],
  partials: [
    Partials.Channel,
    Partials.Reaction,
    Partials.GuildMember,
    Partials.Message,
    Partials.User
  ],
});

require("dotenv").config();
client.config = require("./../config.json")
console.clear()

client.prefixCommands = new Collection();
client.prefixCooldowns = new Collection();

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