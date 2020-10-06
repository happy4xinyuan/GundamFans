let mongoose = require("mongoose");
let passportLocalMongoose = require("passport-local-mongoose");

let UserSchema = new mongoose.Schema({
    username: String,
    password: String
});

//为user植入authentication各种方法
UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User",UserSchema);

