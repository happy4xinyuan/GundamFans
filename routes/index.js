let express = require("express");
let router = express.Router();
let passport = require("passport");
let User = require("../modules/user.js");
//show landing page
router.get("/",function(req,res){
    res.render("landing");
})


//===============
//AUTH ROUTES
//===============
//show register form
router.get("/register",function(req,res){
    res.render("register");
})
//handle sign up request
router.post("/register",function(req,res){
    let newUser = new User({username: req.body.username}); //form与User中必须定义为username
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            console.log(err);
            res.render("register");
        } else {
            passport.authenticate("local",
            { 
                successRedirect: '/wiki',
                failureRedirect: '/register', 
            })(req, res, function(){
            })
        }
    })
})
//show login form
router.get("/login",function(req,res){
    res.render("login");
})

//handle login request
//router.post("login", middleware, callback)
router.post("/login",passport.authenticate("local",
    {
        successRedirect: '/wiki',
        failureRedirect: '/login', 
    }), function(req,res){
})
//logout route
router.get("/logout", function(req,res){
    req.logout();
    res.redirect("/wiki");
})



//插入在router的middleware
function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = router;