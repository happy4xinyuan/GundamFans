let mongoose = require("mongoose");

//schema setup
let commentSchema = new mongoose.Schema({
    author: {
        id:{ type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        username: String, //由于经常使用,所以专门提取出来
    },
    text: String,
    date: {type:Date, default:Date.now()}
});

module.exports = mongoose.model("comment",commentSchema);