import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';

const quotes = [
    {
        text: "I am stupid. I am stupid.",
        context: "Self critique after mistake",
    },
    {
        text: "Why I am so slow?",
        context: "Classic frustrated radio moment",
    },
    {
        text: "No no no NO NO NO!",
        context: "Brake / strategy frustration",
    },
    {
        text: "We are... checking.",
        context: "Ferrari engineer response loop",
    },
    {
        text: "Box? But... why now?",
        context: "Confused strategy call",
    },
    {
        text: "This is so frustrating.",
        context: "General Ferrari experience",
    },
    {
        text: "Guys, the car is undriveable.",
        context: "Overreaction after setup issues",
    },
    {
        text: "We lost so much time... so much.",
        context: "Post-session analysis pain",
    },
    {
        text: "No grip, no pace, nothing.",
        context: "Classic race despair arc",
    },
    {
        text: "It was my mistake, sorry.",
        context: "Peak accountability moment",
    },
    {
        text: "Why always me?",
        context: "Ferrari experience summary",
    },
    {
        text: "We had the pace... but something happened.",
        context: "Universal Ferrari explanation"
    }
];

const emojis = ["💀", "📻", "🏎️", "🔥", "🇲🇨"];

export default {
    data: new SlashCommandBuilder()
        .setName('leclercchaos')
        .setDescription('Funny Charles Leclerc radio moments'),

    async execute(interaction) {
        await interaction.deferReply();

        const quote =
            quotes[Math.floor(Math.random() * quotes.length)];

        const emoji =
            emojis[Math.floor(Math.random() * emojis.length)];

        const embed = new EmbedBuilder()
            .setTitle(`${emoji} Leclerc Radio Chaos`)
            .setDescription(`> "${quote.text}"`)
            .addFields({
                name: "Context",
                value: quote.context
            })
            .setColor(0xff1801)
            .setFooter({ text: "Ferrari Emotional Damage Simulator™" })
            .setTimestamp();

        await interaction.editReply({ embeds: [embed] });
    },
};