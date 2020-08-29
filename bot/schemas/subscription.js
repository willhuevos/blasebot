const Mongoose = require("mongoose");


let subscription = new Mongoose.Schema({
    channel_id: String,
    guild_id: String,
    team: String
});

let summary = new Mongoose.Schema({
    channel_id: String,
    guild_id: String,
    team: String
});

subscription.index("team");

module.exports = {
    subscriptions: Mongoose.model("subscriptions",subscription),
    summaries: Mongoose.model("summaries", summary)
};