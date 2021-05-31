const express = require('express');
const router = express.Router();
const client=require('../../dbconnection')
router.post('/', function (req, res) {
   const {tableCreateQuery} = req.body;
   console.log({tableCreateQuery});
   client.query(tableCreateQuery,(err,data)=>{
       console.log({err});
    if(!err){
        return res.status(200).json({message:'Table is Created'})
    }else{
        return res.status(500).json({errors:err})
    }
   });

});
module.exports = router;