const express = require('express');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const router = express.Router();
const client = require('../../dbconnection');
router.post('/', (req, res) => {
    const apiAccessToken = req.body.api_access_token;
    const email=req.body.email;
    const tokenExistSql = `SELECT * FROM table_api_access_token WHERE api_access_token=$1`;
    const clientParams = [apiAccessToken];
    client.query(tokenExistSql, clientParams, function (err, fetchData) {
        console.log({fetchData});
        if (fetchData.rows.length>0) {
            var token = jwt.sign({ email: email }, process.env.SECRET_KEY,{
                "expiresIn":'300s'
            });
            res.status(200).json({ message: 'Token Is Created', token: token });
        }else{
            res.status(422).send({ message: 'UnAuthorized', token: token });
        }
    })
})

module.exports = router;