// File will contain all the APIs related to the User handling
const express = require("express");
database = require ("../database/database");

//.. represents the parent folder 
//. represents the current folder

const router = express.Router();

router.get("/get-all",(request,response)=>{
const users = database.get_all_users();
response.send(users);
}
);
router.get("/getUserby-userid",(request,response)=>{
    const  {id } = request.query;
    const usersbyid = database.get_user_by_user_id(id);
    response.send(usersbyid);
    }
    );

    router.get("/getUserby-username",(request,response)=>{
      const  {username} = request.query;
      const usersbyname = database.get_user_by_username(username);
      response.send(usersbyname);
      }
      );

    router.post("/add", (request, response) => {
        const { first_name, last_name, email, phone, username,password } = request.body;
        database.add_user({
          first_name: first_name,
          last_name: last_name,
          email: email,
          phone: phone,
          username:username,
          password:password,
        });
        response.send("User added successfully");
      });
      
module.exports = {router};
