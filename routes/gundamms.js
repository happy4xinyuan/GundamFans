let express = require("express");
let router = express.Router();
let gundamMS = require("../modules/MS.js");

//show all gundam info
// req.user 结构体包含 username 和 _id
router.get("/wiki",function(req,res){
    //获取所有ms信息
    gundamMS.find({},function(err,mslist){
        if(err){
            console.log(err);
        } else {
            res.render("index",{mslist: mslist});
        }
    })
})

router.post("/wiki",isLoggedIn,function(req,res){
    let newms = req.body.ms;
    
    gundamMS.create(newms,function(err,newlycreated){
        if(err){
            console.log(err);
        } else {
            res.redirect("/wiki");
        }
    })
})

//show gundam info form
router.get("/wiki/new",isLoggedIn,function(req,res){
    res.render("newms");
})

//显示更多机体信息
router.get("/wiki/:id",function(req,res){
    //index中的btn link包含_id,利用_id去获取description,(req.params.id获取域名中的参数)
    gundamMS.findById(req.params.id)
            .populate('comments')
            .exec(function(err,findms){
                if(err){
                    console.log(err);
                } else {
                    console.log(findms);
                    res.render("show",{ms:findms});
                }
            });
    
})

//插入在router的middleware
function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = router;