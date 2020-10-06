let mongoose = require("mongoose"),
    comment = require("./comment");
//schema setup
let gundamMSSchema = new mongoose.Schema({
    name: String,
    img: String,
    description: {type:String, default:"Not available"},
    author: {
        id:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        }
    },
    comments: [ { type: mongoose.Schema.Types.ObjectId, ref: 'comment' }]
});


module.exports = mongoose.model("gundamMS",gundamMSSchema);