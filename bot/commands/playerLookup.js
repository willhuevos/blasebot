const {generatePlayerCard} = require("../util/playerUtils");
const {getPlayer} = require("../blaseball-api/players");
const {getGuild} = require("../util/guildUtils");
const { messageError } = require("../util/miscUtils");

const command = {
    name: "player",
    aliases: [],
    description: "Looks up a player\nbb!player [player name]",
    root: false,
    async execute(message, args) {
        let playerName = args.join(" ");
        let player = await getPlayer(playerName);
        if(!player) return message.channel.send("I couldn't find that player!").then(global.stats.messageFreq.mark()).catch(messageError);
        let guild = await getGuild(message.guild?.id??message.channel.id);
        let playerCard = await generatePlayerCard(player, guild.forbidden);
        await message.channel.send(playerCard).then(global.stats.messageFreq.mark()).catch(messageError);
    },
};


module.exports = command;