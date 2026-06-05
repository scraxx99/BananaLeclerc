import { SlashCommandBuilder } from 'discord.js';
import axios from 'axios';

export default {
    data: new SlashCommandBuilder()
        .setName('drivers')
        .setDescription('Shows F1 drivers'),

    async execute(interaction) {
        await interaction.deferReply();

        try {
            console.log("Fetching drivers...");

            const response = await axios.get(
                'https://api.openf1.org/v1/drivers?session_key=latest'
            );

            console.log(`Found ${response.data.length} drivers`);

            const drivers = response.data
                .slice(0, 20)
                .map(
                    d => `#${d.driver_number} - ${d.full_name}`
                )
                .join('\n');

            await interaction.editReply(
                `🏎️ Drivers:\n\n${drivers}`
            );
        } catch (error) {
            console.error(error);

            await interaction.editReply(
                `Error: ${error.message}`
            );
        }
    },
};