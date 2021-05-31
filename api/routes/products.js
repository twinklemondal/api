const express = require('express');
require("dotenv").config();
const router = express.Router();
const client = require('../../dbconnection')
const helper = require('../../helper/tokenauthentication');
router.get('/', helper.tokenCheck, async (req, res) => {
    const productList = [];
    const fetchSql=`SELECT * FROM table_products`;
    var params='';
    client.query(fetchSql,function(err,result){
        console.log(result.rows);
        if(result.rows.length>0){
            return res.status(200).send({ status: "OK", product: result.rows })  
        }else{
            return res.status(200).send({ status: "OK", product: productList })   
        }
    });
   
});
router.post('/add', helper.tokenCheck, (req, res) => {
    const randomNo=Math.floor(Math.random() * 899999 + 100000)
    const {name,price}=req.body;
    const image='default.png';
    const insertQuery=`INSERT INTO table_products (id,name,price,image,time_create,time_update) VALUES ($1,$2,$3,$4,$5,$6)`;
    const insertQueryParams=[randomNo,name,price,image,'now()','now()'];
    client.query(insertQuery,insertQueryParams,function(err,inserted){
        console.log({err});
        if(!err){
            return res.status(200).send({ status: "OK", message: "Product is Added" })
        }else{
            return res.status(422).send({ status: "FAILED" })
        }
    });
    
});
router.post('/edit', helper.tokenCheck, (req, res) => {
    const {productId,name,price}=req.body;
    const sqlQuery=`SELECT * FROM table_products WHERE id=$1`;
    const sqlParams=[productId];
    client.query(sqlQuery,sqlParams,function(err,products){
        if(products.rows.length>0){
            var product_name=products.rows[0].name;
            var product_price=products.rows[0].price;
            if(name!=""){
                product_name=name
            }
            if(price!=""){
                product_price=price;
            }
            const prductUpdateQuery=`UPDATE table_products SET name=$1,price=$2,time_update='now()' WHERE id=$3`;
            const productUpdateParams=[product_name,product_price,productId]
            client.query(prductUpdateQuery,productUpdateParams,function(err,updateProducts){
                if(!err){
                    return res.status(200).send({status:"OK",message:"Product Is Updated"});
                }else{
                    return res.status(422).send({status:"OK",error:err});
                }
            })
        }else{
            return res.status(404).send({status:"OK",message:"Product not found"});
        }
    });
    return res.status(200).send({ status: "OK", message: "Product is Updated" })
});
router.post('/delete', helper.tokenCheck, async (req, res) => {
    const {productId}=req.body;
    const productExistCheck=await checkProductExist(productId);
    console.log({productExistCheck});
    if(productExistCheck){
        const productDeleteQuery=`DELETE FROM table_products WHERE id=$1`;
        const params=[productId]
        client.query(productDeleteQuery,params,function(err,productdelete){
            if(!err){
                return res.status(200).send({ status: "OK", message: "Product is successfully deleted" })
            }else{
                return res.status(422).send({ status: "FAILED", error:err })
            }
        })
    }
    else{
        return res.status(404).send({ status: "OK", message: "Product Not Found." })
    }
});
function checkProductExist(productid){
    console.log({productid});
    return new Promise(function(resolve,reject){
        const sqlQuery=`SELECT * FROM table_products WHERE id=${productid}`;
        client.query(sqlQuery,function(err,products){
            console.log(err,products.rowCount)
            if(products.rowCount>0){
                console.log("product found");
                resolve(true)
            }else{
                resolve(false)
            }
        });
    })
   
}
module.exports = router;