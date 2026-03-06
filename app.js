import express from "express";
import dotenv from "dotenv";
import path from "node:path";
import BootStrap from "./src/app.controller.js";
dotenv.config({ path: path.resolve("./config/.env") });
const app = express();
const port = process.env.PORT;

BootStrap;

app.listen(port, (error) => {
  if (!error) {
    console.log(`server connected successfly on port : ${port}`);
    return;
  }
  return console.log("error : ", error);
});
