import 'dotenv/config';

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

import {
    Client,
    Collection,
    Events,
    GatewayIntentBits,
    MessageFlags,
} from 'discord.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const client = new Client({
    intents: [GatewayIntentBits.Guilds],
});

client.commands = new Collection();

client.once(Events.ClientReady, (readyClient) => {
    console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});

client.on(Events.InteractionCreate, async (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    const command = interaction.client.commands.get(
        interaction.commandName
    );

    if (!command) {
        console.error(
            `No command matching ${interaction.commandName} was found.`
        );
        return;
    }

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);

        if (interaction.replied || interaction.deferred) {
            await interaction.followUp({
                content: 'There was an error while executing this command!',
                flags: MessageFlags.Ephemeral,
            });
        } else {
            await interaction.reply({
                content: 'There was an error while executing this command!',
                flags: MessageFlags.Ephemeral,
            });
        }
    }
});

// Load events
const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs
    .readdirSync(eventsPath)
    .filter((file) => file.endsWith('.js'));

for (const file of eventFiles) {
    const filePath = path.join(eventsPath, file);

    const eventModule = await import(
        pathToFileURL(filePath).href
    );

    const event = eventModule.default ?? eventModule;

    if (event.once) {
        client.once(event.name, (...args) =>
            event.execute(...args)
        );
    } else {
        client.on(event.name, (...args) =>
            event.execute(...args)
        );
    }
}

// Load commands
async function loadCommands() {
    const foldersPath = path.join(__dirname, 'commands');

    if (!fs.existsSync(foldersPath)) {
        console.warn('No commands folder found.');
        return;
    }

    const commandFolders = fs.readdirSync(foldersPath);

    for (const folder of commandFolders) {
        const commandsPath = path.join(foldersPath, folder);

        if (!fs.statSync(commandsPath).isDirectory()) {
            continue;
        }

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

                if (
                    'data' in command &&
                    'execute' in command
                ) {
                    client.commands.set(
                        command.data.name,
                        command
                    );
                } else {
                    console.warn(
                        `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`
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

if (!process.env.DISCORD_TOKEN) {
    console.error(
        'DISCORD_TOKEN is missing from your .env file'
    );
    process.exit(1);
}

client.login(process.env.DISCORD_TOKEN);