let express = require("express");
let router = express.Router();
let gundamMS = require("../modules/MS.js");

let comment = require("../modules/comment.js");

//===============
//COMMENT ROUTES
//===============

//show create comment form
router.get("/wiki/:id/comment/new",isLoggedIn ,function(req,res){
    gundamMS.findById(req.params.id)
    .populate('comments')
    .exec(function(err,findms){
        if(err){
            console.log(err);
        } else {
            console.log(findms);
            res.render("newcomment",{ms:findms});
        }
    });

})
//handle create comment
//此时一定已经login
router.post("/wiki/:id/comment",isLoggedIn,function(req,res){
    let newcomment = {
        text: req.body.comText,
        author:{id:req.user._id, username: req.user.username } 
    }
    comment.create(newcomment,function(err,newlycreated){
        if(err){
            console.log(err);
        } else {
            gundamMS.findById(req.params.id)
            .exec(function(err,findms){
                if(err){
                    console.log(err);
                } else {
                    console.log("username: "+req.user.username);
                    findms.comments.push(newlycreated);
                    findms.save();
                }
            });
            res.redirect("/wiki/"+req.params.id);
        }
    })
})


//插入在router的middleware
function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = router;