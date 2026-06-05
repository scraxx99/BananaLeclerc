import {
    SlashCommandBuilder,
    EmbedBuilder,
} from 'discord.js';

// Global cooldown (shared by everyone)
let lastUsed = 0;
const COOLDOWN = 60 * 60 * 1000; // 1 hour

const leclercPhotos = [
    'https://www.google.com/imgres?q=charles%20leclerc%20images&imgurl=https%3A%2F%2Fmedia.formula1.com%2Fimage%2Fupload%2Ft_16by9North%2Fc_lfill%2Cw_3392%2Fq_auto%2Fv1740000001%2Ftrackside-images%2F2025%2FF1_Grand_Prix_of_Spain%2F2218110005.webp&imgrefurl=https%3A%2F%2Fwww.formula1.com%2Fen%2Flatest%2Farticle%2Fleclerc-very-happy-with-unexpected-podium-finish-in-spain-as-he-outlines.5hMNzvPWT76JEpvcpFRWh4&docid=LxqRffNekxrfIM&tbnid=umE9feYpAXhhTM&vet=12ahUKEwi-zZr32PCUAxXHpVYBHe1bCfEQnPAOegQIFBAB..i&w=3392&h=1908&hcb=2&ved=2ahUKEwi-zZr32PCUAxXHpVYBHe1bCfEQnPAOegQIFBAB'
];

export default {
    data: new SlashCommandBuilder()
        .setName('leclercphoto')
        .setDescription('Posts a random Charles Leclerc photo (1 hour cooldown)'),

    async execute(interaction) {
        const now = Date.now();

        const remaining = COOLDOWN - (now - lastUsed);

        if (remaining > 0) {
            const minutes = Math.ceil(remaining / 60000000000000000000000000);

            await interaction.reply({
                content: `⏳ A Charles Leclerc photo was posted recently. Try again in ${minutes} minute(s).`,
                ephemeral: true,
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