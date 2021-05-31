require('dotenv').config();
const jwt = require('jsonwebtoken');
const moment=require('moment');
const tokenExpireCheck=function(token){
    console.log({token});
    return new Promise(function(resolve,reject){
        jwt.verify(token, process.env.SECRET_KEY, function (err, decoded) {
            if (err) {
                console.log(err.expiredAt);
                const newDate = new Date();
                var start_date = moment(newDate, 'YYYY-MM-DD HH:mm:ss');
                var end_date = moment(err.expiredAt, 'YYYY-MM-DD HH:mm:ss');
                var duration = moment.duration(start_date.diff(end_date));
                var tripchecktime = duration.asSeconds();
                console.log({tripchecktime});
                if(tripchecktime>300){
                    resolve(false);
                }else{
                    resolve(false);
                }
                console.log({ tripchecktime });
    
            }else{
                console.log({decoded});
                resolve(true);
            }
        });
    });
    
}
//add middleware code for token validate or not
const tokenCheck=function(req,res,next){
    console.log("token check is calling");
    const token=req.headers['token-access'];
   
    jwt.verify(token, process.env.SECRET_KEY, function (err, decoded) {
        if (err) {
            console.log(err.expiredAt);
            const newDate = new Date();
            var start_date = moment(newDate, 'YYYY-MM-DD HH:mm:ss');
            var end_date = moment(err.expiredAt, 'YYYY-MM-DD HH:mm:ss');
            var duration = moment.duration(start_date.diff(end_date));
            var tripchecktime = duration.asSeconds();
            console.log({tripchecktime});
            if(tripchecktime>300){
                return res.status(422).send({message:"Token Is Expired"});
            }else{
                return res.status(422).send({message:"Token Is Expired"});
            }
           

        }else{
            next();
        }
    });
    //next();
};
module.exports={
    tokenExpireCheck,
    tokenCheck   
}