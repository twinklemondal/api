const { Pool, Client } = require('pg')
const connectionString = 'postgres://uhgbcfsc:rzjp9HG6jxGQh1KoXtSpYvgQn4ef3oeQ@tuffi.db.elephantsql.com:5432/uhgbcfsc'
const client = new Client({
    connectionString,
  })
  
try {
    client.connect()
    console.log("db is connected");
}
catch (err) {
    console.log({ err });
}
module.exports=client;

