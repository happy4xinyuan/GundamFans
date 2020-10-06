let mongoose = require("mongoose"),
    gundamMS = require("./MS"),
    comment = require("./comment");
   


let data = [
    {name:"GN-001RE Gundam Exia Repair",
    img:"https://vignette.wikia.nocookie.net/gundam/images/9/9c/GN-001RE.jpg/revision/latest/scale-to-width-down/310?cb=20141024014832",
    description:"The GN-001RE Gundam Exia Repair (aka Exia Repair) is a repaired version of the GN-001 Gundam Exia appearing in Mobile Suit Gundam 00 season 2. It is piloted by Setsuna F. Seiei."    
    },
    {name:"GN-001REIV Gundam Exia Repair IV",
    img:"https://vignette.wikia.nocookie.net/gundam/images/1/16/GN-001REIV_Gundam_Exia_Repair_IV_%28Front%29.jpg/revision/latest/scale-to-width-down/310?cb=20180415135551",
    description:"The GN-001REIV Gundam Exia Repair IV (aka Gundam Exia Repair IV, Exia R4) is the upgraded version of the GN-001REIII Gundam Exia Repair III appearing in Mobile Suit Gundam 00 Festival 10 \"Re:vision\". It was piloted by Graham Aker."
    },
    {name:"GNT-0000 00 Qan［T］",
    img:"https://vignette.wikia.nocookie.net/gundam/images/a/ae/00Q_Weaponless.jpg/revision/latest/scale-to-width-down/310?cb=20100503183803",
    description:"The GNT-0000 00 Qan[T] (aka 00Q, 00 Qan[T], pronounced \"Double-Oh Quanta\") is the successor to the GN-0000+GNR-010 00 Raiser in Mobile Suit Gundam 00 The Movie: Awakening of the Trailblazer. It is piloted by Setsuna F. Seiei."
    },

    {name:"GN-0000/7S 00 Gundam Seven Sword",
    img:"https://vignette.wikia.nocookie.net/gundam/images/4/41/00_7s_Gundam_Front.jpg/revision/latest/scale-to-width-down/310?cb=20101223130743",
    description:"The GN-0000/7S 00 Gundam Seven Sword (aka 00 Gundam Seven Sword, 00 Seven Sword), is a weapons pack/equipment variation for the GN-0000 00 Gundam that appeares in the Mobile Suit Gundam 00V side story. It is later given a additional weapon and re-designated as GN-0000GNHW/7SG 00 Gundam Seven Sword/G."
    },
]
    function seedDB(){
        //remove all
        gundamMS.deleteMany({},function(err){
            if(err){
                console.log(err);
            } else {
                console.log("removed all MS");
                //add MS
                data.forEach(function(e){
                    gundamMS.create(e,function(err,newms){
                        if(err){
                            console.log(err);
                        } else {
                            
                            comment.create({
                                author: "TOM",
                                text: "I love this gundam!!!!!"
                            }, function(err,newcomment){
                                if(err){
                                    console.log(err);
                                } else{
                                    newms.comments.push(newcomment);
                                    newms.save();
                                    console.log(newms);
                                }
                            }
                            );
                            
                        }
                    })
                })
                }
        });
        
    }

module.exports = seedDB;    