let express = require("express"),
    app = express(),
    bodyparser = require("body-parser"),
    mongoose = require("mongoose"),
    passport = require("passport"),
    LocalStrategy = require("passport-local"),
    expressSanitized = require("express-sanitized"),
    User = require("./modules/user.js"),
    seedDB = require("./modules/seed.js");

// requiring routes
let indexRouter = require("./routes/index"),
    commentRouter = require("./routes/comment"),
    gundammsRouter = require("./routes/gundamms");

//指示express来serve public目录
app.use(express.static(__dirname+"/public"));
// 设置使得body自动被parse,可以直接使用req.body.name
app.use(bodyparser.urlencoded({extended:true}));
app.use(expressSanitized());
app.set("view engine","ejs");
//passport设置
app.use(require("express-session")({
    secret: "My favorite gundam is exia!",
    resave: false,
    saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
//called by every route middleware function
//after passport
app.use(function(req,res,next){
    res.locals.currentUser = req.user;
    next();
});

//连接MongoDB
mongoose.connect("mongodb+srv://Xinyuan:6898061@cluster0.z0lj8.mongodb.net/GundamFans?retryWrites=true&w=majority",{useUnifiedTopology: true,useNewUrlParser: true });

seedDB();

app.use(indexRouter);
app.use(gundammsRouter);
app.use(commentRouter);

app.listen(3000,function(){
    console.log("gundam runnig");
})
