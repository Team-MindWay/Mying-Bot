import { Client, GatewayIntentBits } from "discord.js";
import { Bot } from "./bot";

export const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
      ]
})

export const bot = new Bot(client)