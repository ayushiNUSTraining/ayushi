// File will contain all the APIs related to the Account handling
express = require("express");
database = require ("../database/database");


const router = express.Router();
router.get("/get-all",(request,response) => {
    const users= database.mysqlConnection.query("SELECT * from accounts",(error,results) =>{
    if(error){
        console.error(error);
        response.status(500).send("Internal Server Error");
    }
    else {
        response.status(200).send(results);
      }
});
});

router.get("/get-by-id",(request,response)=>{
    const {id} = request.query;
    database.mysqlConnection.query(`SELECT * from accounts where id = ${id}`,
    (error,results)=>{
if(error){
    console.error(error);
    response.status(500).send("Internal Server Error");
}
else {
    response.status(200).send(results);
}
    });
});
router.get("/getUserby-username",(request,response)=>{
    const {username } = request.query;
    database.mysqlConnection.query(`SELECT * from profile where username = '${username}'`,
    (error,results)=>{
if(error){
    console.error(error);
    response.status(500).send("Internal Server Error");
}
else {
    response.status(200).send(results);
}
    });
});


router.get("/get-transactions-by-id",(request,response)=>{
    const {username} = request.query;
    const {startdate}= request.query;
    const {enddate}= request.query;
    database.mysqlConnection.query(`SELECT transaction_date as date,
     transaction_amount as Amount,
    category as Category,
    merchant_name as Description,
    account_number as Account
       from Transactions t
       join profile p 
       on p.profile_id = t.profile_id where p.username = '${username}' and transaction_date >='${startdate}' and transaction_date <= '${enddate}'`,
    (error,results)=>{
if(error){
    console.error(error);
    response.status(500).send("Internal Server Error");
}
else {
    response.status(200).send(results);
}
    });
});


router.post("/createUser",(request,response)=>{
    data = request.body;
    database.mysqlConnection.query(`INSERT INTO profile (
        first_name,
        last_name,
        username,
        password,
        type,
        creation_date
    )VALUES (
'${request.body.first_name}',
'${request.body.last_name}',
'${request.body.username}',
'${request.body.password}',
'${request.body.type},
'${request.body.creation_date}'
    )` ,(error,results)=>{
if(error){
    console.error(error);
    response.status(500).send("Internal Server Error");
}
else {
    response.status(200).send(results);
}
    });
});

router.post("/addUser", (request, response) => {
    data = request.body;
    console.log(request);
    database.mysqlConnection.query(
      `insert into profile ( 
        first_name,
        last_name,
        username,
        password,
        type,
        creation_date) values (?,?,?,?,?,?)`,
      [data.first_name, data.last_name, data.username, data.password, data.type,data.creation_date],
      (error, results) => {
        if (error) {
          console.error(error);
          response.status(500).send("Internal Server Error");
        } else {
          response.status(200).send("Transaction added successfully");
        }
      }
    );
  });
module.exports = { router };

