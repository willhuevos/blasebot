const { getTeam } = require("../util/teamUtils");
const {subscriptions} = require("../schemas/subscription");

const command = {
    name: "subscribe",
    aliases: [],
    description: "Subscribes a channel to a teams games\nA guild can only have one channel per team at max, and one team per channel.\nbb!subscribe [team name]",
    async execute(message, args) {

        if(!message.guild) return message.channel.send("This command must be used in a guild!");
        if(!message.channel.permissionsFor(message.member).has("MANAGE_CHANNELS")) return message.channel.send("You require the manage channel permission to run this command!");

        let team = await getTeam(args.join(" "));
        if(!team) return message.channel.send("I can't find that team!");

        let err, docs = await subscriptions.find({$or: [{channel_id: message.channel.id},{guild_id:message.guild.id, team:team.id}]});
        if(err) throw err;
        if(docs.length > 0) return message.channel.send("You already have subscibed this channel to a team, or this team to a channel! use bb!unsubscibre to remove the subscription");

        // eslint-disable-next-line no-unused-vars
        let savErr, doc = new subscriptions({
            channel_id: message.channel.id,
            guild_id: message.guild.id,
            team: team.id
        }).save();
        if(savErr) throw savErr;
        return message.channel.send(`Subscribed this channel to the ${team.nickname}'s games!`);

    },
};

module.exports = command;