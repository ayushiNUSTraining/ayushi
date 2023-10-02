
const mysql = require('mysql');
require("dotenv").config();
parameters = {
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    multipleStatements: true,
};

mysqlConnection = mysql.createConnection(parameters);

mysqlConnection.connect((err) => {
    if (err) {
        console.log(err);

    } else {
        console.log("Connected to My SQL")
    }
});
module.exports= {mysqlConnection};