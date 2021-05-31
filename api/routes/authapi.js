const express = require('express');
const router = express.Router();
require("dotenv").config();
const client = require('../../dbconnection')
const NodeRSA = require('node-rsa');
const key = new NodeRSA();
router.get('/', function (req, res) {
    const randomNo=Math.floor(Math.random() * 899999 + 100000)
    const key = new NodeRSA({ b: 512 });
    const encrypted = key.encrypt(process.env.SECRET_KEY, 'base64');
    const tokenQuery=`INSERT INTO table_api_access_token (id,api_access_token,created_by,time_create,time_updated) VALUES($1,$2,$3,$4,$5)`;
    const params=[randomNo,encrypted,'admin','now()','now()'];
    client.query(tokenQuery,params,function(err,insert){
        if(!err){
            return res.status(200).send({status:"OK",message:"Token Is Created for api access"});
        }else{
            return res.status(500).send({status:"FAILED",error:err});
        }
     
    })
});
module.exports = router;