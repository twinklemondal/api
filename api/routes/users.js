const express = require('express');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const router = express.Router();
const client = require('../../dbconnection');
const moment=require('moment');
const helper=require('../../helper/tokenauthentication')
router.post('/', async (req, res) => {
    const api_access_token = req.body.token;
    const checkToken=await helper.tokenExpireCheck(api_access_token);
    if(!checkToken){
        return res.status(422).send({message:"Token Is Expired"}); 
    }else{
        return res.status(200).send({message:"Token Is Authorized"});  
    }
})
module.exports = router;