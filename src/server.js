import "dotenv/config";
import express from "express";
import UserController from "./app/controllers/UserController";
import ProductsController from "./app/controllers/ProductsController";
const app = express();

app.use(express.json());

app.post("/users", UserController.store);

app.get("/products", ProductsController.index);
app.get("/products/report", ProductsController.report);

app.listen(8820, () => {
  console.log("Server running on localhost:8820");
});
