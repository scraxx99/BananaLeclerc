import dotenv from 'dotenv';
dotenv.config();

import { Client, GatewayIntentBits } from 'discord.js';

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers
    ],
    presence: { status: 'online' }
});



client.on("messageCreate", async (message) => {
    if (message.author.bot) return;
    
    if (message.content.toLowerCase() === 'whats up') {
        try {
            await message.author.send(`Echo ${message.content}`);
        } catch (error) {
            console.error(`Could not DM user: ${error.message}`);
        }
    }
});


    