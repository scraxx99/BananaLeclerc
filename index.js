import 'dotenv/config';

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

import {
    Client,
    Collection,
    Events,
    GatewayIntentBits,
} from 'discord.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const client = new Client({
    intents: [GatewayIntentBits.Guilds],
});

client.commands = new Collection();

/* ---------------- READY EVENT ---------------- */

client.once(Events.ClientReady, (readyClient) => {
    console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});

/* ---------------- LOAD EVENTS ---------------- */

const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs
    .readdirSync(eventsPath)
    .filter((file) => file.endsWith('.js'));

for (const file of eventFiles) {
    const filePath = path.join(eventsPath, file);

    const eventModule = await import(pathToFileURL(filePath).href);
    const event = eventModule.default ?? eventModule;

    if (event.once) {
        client.once(event.name, (...args) =>
            event.execute(...args, client)
        );
    } else {
        client.on(event.name, (...args) =>
            event.execute(...args, client)
        );
    }
}

/* ---------------- LOAD COMMANDS ---------------- */

async function loadCommands() {
    const foldersPath = path.join(__dirname, 'commands');

    if (!fs.existsSync(foldersPath)) {
        console.warn('No commands folder found.');
        return;
    }

    const commandFolders = fs.readdirSync(foldersPath);

    for (const folder of commandFolders) {
        const commandsPath = path.join(foldersPath, folder);

        if (!fs.statSync(commandsPath).isDirectory()) continue;

        const commandFiles = fs
            .readdirSync(commandsPath)
            .filter((file) => file.endsWith('.js'));

        for (const file of commandFiles) {
            const filePath = path.join(commandsPath, file);

            try {
                const commandModule = await import(
                    pathToFileURL(filePath).href
                );

                const command =
                    commandModule.default ?? commandModule;

                if ('data' in command && 'execute' in command) {
                    client.commands.set(
                        command.data.name,
                        command
                    );
                } else {
                    console.warn(
                        `[WARNING] Missing "data" or "execute" in ${filePath}`
                    );
                }
            } catch (error) {
                console.error(
                    `Failed to load command ${filePath}:`,
                    error
                );
            }
        }
    }
}

await loadCommands();

/* ---------------- LOGIN ---------------- */

if (!process.env.DISCORD_TOKEN) {
    console.error('DISCORD_TOKEN is missing from .env');
    process.exit(1);
}

client.login(process.env.DISCORD_TOKEN);