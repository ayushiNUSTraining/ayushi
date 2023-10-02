const express = require ("express");
const service= express();
service.use(express.json());
let router = express.Router();
router.get("/",(request,response)=>{
    response.send("Backend service is up and running");
});


router.get("/sum", (request,response)=>{
    const a = parseFloat(request.query.num1);
    const b = parseFloat(request.query.num2);
    let sum = a+ b;
    response.send( "Sum is :"+sum);
    
}
);
router.post("/add-product", (request, response) => {
    // 1. Populate the product information from the request body
    const{name, price, brand} = request.body;
    response.send(`Received these product detAILS: NAme: ${name},Price:${price},Brand:${brand}`);
    // 2. Return a success message;
  });

  // Delete API
router.delete("/delete-product-by-id", (request, response) => {
    const { id } = request.query;
    response.send(`Deleted product with id ${id}`);
  });
// Update API
router.put("/update-product-by-id", (request, response) => {
    const { id } = request.query;
    const { name, price, brand } = request.body;
    if (!name) {
        response.status(400).send("Name is required");
        return;
      }
      if (!price) {
        response.status(400).send("Price is required");
        return;
      }
      if (!brand) {
        response.status(400).send("Brand is required");
        return;
      }
    response.send(
      `Updated product with id ${id} with these details: Name: ${name}, Brand: ${brand}, Price: ${price}`
    );
  });
  
service.use(router);
service.listen(3000,(error)=>{
        if(error){

            console.error("Error occurred while starting the service");
        }
        else {
            console.log("server started on port 3000");
        }
    }
);