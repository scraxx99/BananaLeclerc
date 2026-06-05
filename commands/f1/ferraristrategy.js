import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';

const strategies = [
    "Box now. No wait. Actually... stay out. Box next lap. Never mind.",
    "Softs in heavy rain. Trust us.",
    "Plan A, B, and C are all active simultaneously.",
    "We forgot to tell Charles about the strategy change.",
    "Pit stop was perfect. Unfortunately it was for the wrong car.",
    "Undercut attempt failed by 0.3 seconds. Pain.",
    "We will extend the stint... until disaster happens.",
    "Engine mode: confusion.",
    "Driver asked question. No answer available.",
    "Tyres: medium. Weather: unknown. Strategy: vibes.",
    "Boxing one lap too early (Ferrari classic edition).",
    "Everything is fine. (It is not fine.)",
    "We are checking… still checking… forever checking."
];

const emojis = ["🟥", "🏎️", "💀", "📉", "🔥"];

export default {
    data: new SlashCommandBuilder()
        .setName('ferraristrategy')
        .setDescription('Generates a Ferrari strategy moment'),

    async execute(interaction) {
        await interaction.deferReply();

        const strategy =
            strategies[Math.floor(Math.random() * strategies.length)];

        const emoji =
            emojis[Math.floor(Math.random() * emojis.length)];

        const embed = new EmbedBuilder()
            .setTitle(`${emoji} Ferrari Strategy Department`)
            .setDescription(`**Race Engineer Simulation**\n\n> ${strategy}`)
            .setColor(0xff1801)
            .setFooter({ text: "Scuderia Strategy Generator™" })
            .setTimestamp();

        await interaction.editReply({ embeds: [embed] });
    },
};