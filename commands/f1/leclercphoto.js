import {
    SlashCommandBuilder,
    EmbedBuilder,
    MessageFlags,
} from 'discord.js';

// Global cooldown (shared by everyone)
let lastUsed = 0;
const COOLDOWN = 60 * 60 * 1000; // 1 hour

const leclercPhotos = [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/Charles-Leclerc_%28crop3%29.jpg/894px-Charles-Leclerc_%28crop3%29.jpg',

    'https://media.formula1.com/image/upload/t_16by9Centre/c_fit,w_3200,h_1800/q_auto/v1740000001/trackside-images/2026/F1_Grand_Prix_Of_China___Sprint__Qualifying/2266430502.webp',

    'https://images.indianexpress.com/2026/03/charles-leclerc-2.jpg'
];

export default {
    data: new SlashCommandBuilder()
        .setName('leclercphoto')
        .setDescription('Posts a random Charles Leclerc photo (1 hour cooldown)'),

    async execute(interaction) {
        const now = Date.now();
        const remaining = COOLDOWN - (now - lastUsed);

        if (remaining > 0) {
            const minutes = Math.ceil(remaining / 60000);

            await interaction.reply({
                content: `⏳ A Charles Leclerc photo was posted recently. Try again in ${minutes} minute(s).`,
                flags: MessageFlags.Ephemeral,
            });

            return;
        }

        lastUsed = now;

        const image =
            leclercPhotos[
                Math.floor(Math.random() * leclercPhotos.length)
            ];

        const embed = new EmbedBuilder()
            .setTitle('📸 Random Charles Leclerc Photo')
            .setDescription('Forza Ferrari 🇲🇨')
            .setImage(image)
            .setTimestamp();

        await interaction.reply({
            embeds: [embed],
        });
    },
};