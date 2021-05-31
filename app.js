const express = require('express');
const app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const authRoute=require('./api/routes/auth');
const pgTableCreate=require('./api/routes/dbtablecreate');
const apiAccessTokens=require('./api/routes/authapi');
const userApiAccess=require('./api/routes/users');
const productApi=require('./api/routes/products');
const cors=require('cors');
app.use(express.json());
const client=require('./dbconnection');
app.use('/api/auth-token-create',authRoute);
app.use('/api/app-pg-db-create',pgTableCreate);
app.use('/api/api-access-token-create',apiAccessTokens)
app.use('/api/user',userApiAccess);
app.use('/api/products',productApi)
app.use('/api/products/:id',productApi)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.listen(5000,function(){
    console.log("server is runnning");
})