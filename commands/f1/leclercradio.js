import { SlashCommandBuilder } from 'discord.js';
import axios from 'axios';

export default {
    data: new SlashCommandBuilder()
        .setName('leclercradio')
        .setDescription('Gets a random Charles Leclerc team radio clip'),

    async execute(interaction) {
        await interaction.deferReply();

        try {
            const response = await axios.get(
                'https://api.openf1.org/v1/team_radio?driver_number=16'
            );

            const radios = response.data;

            if (!radios || radios.length === 0) {
                await interaction.editReply(
                    'No Charles Leclerc radio clips were found for the latest session.'
                );
                return;
            }

            const randomRadio =
                radios[Math.floor(Math.random() * radios.length)];

            const clipDate = new Date(randomRadio.date)
                .toUTCString();

            await interaction.editReply(
                `📻 Charles Leclerc Team Radio\n\n` +
                `🗓️ ${clipDate}\n` +
                `🎧 ${randomRadio.recording_url}`
            );
        } catch (error) {
            console.error(error);

            await interaction.editReply(
                `Failed to fetch Leclerc radio clips: ${error.message}`
            );
        }
    },
};