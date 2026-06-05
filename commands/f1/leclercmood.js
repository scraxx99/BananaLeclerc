import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';

const moods = [
    "optimistic but emotionally damaged",
    "fast in qualifying, confused on Sunday",
    "Ferrari coping mechanism engaged",
    "believes in miracles (again)",
    "questioning everything but still smiling",
    "P3 energy trapped in P7 reality",
    "quietly plotting a pole lap",
    "suffering, but in a professional way",
    "engine whispering Italian regrets",
    "hopium levels dangerously high",
    "strategic trust issues detected",
    "main character in a tragedy arc"
];

const emojis = ["🇲🇨", "🏎️", "💀", "🔥", "📉"];

export default {
    data: new SlashCommandBuilder()
        .setName('leclercmood')
        .setDescription('Check Leclerc’s current emotional state'),

    async execute(interaction) {
        await interaction.deferReply();

        const mood = moods[Math.floor(Math.random() * moods.length)];
        const emoji = emojis[Math.floor(Math.random() * emojis.length)];

        const embed = new EmbedBuilder()
            .setTitle(`${emoji} Leclerc Mood Simulator`)
            .setDescription(`**Charles Leclerc is currently:**\n\n> ${mood}`)
            .setColor(0xff1801)
            .setFooter({ text: "Ferrari Emotional Telemetry System™" })
            .setTimestamp();

        await interaction.editReply({ embeds: [embed] });
    },
};