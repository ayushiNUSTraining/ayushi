const express = require ("express");
const cors= require("cors");
const user = require ("./apis/user");
const account = require("./apis/account");

const service= express();
service.use(express.json());
service.use(cors());
service.use("/user",user.router);
service.use("/account",account.router);
//"/user is a short form when calling an api"

//let router = express.Router();

service.listen(3000, (error) => {
    if (error) {
      console.error("Error occurred while starting the service");
    } else {
      console.log("Server started on port 3000");
    }
  });
// File 1 - Mock Data Layer
// File 2 - Logic for all the APIs
// File 3 - Logic to start the service