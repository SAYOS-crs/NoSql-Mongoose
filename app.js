import express from "express";
import dotenv from "dotenv";
import path from "node:path";
import BootStrap from "./src/app.controller.js";
import { DataBase_Connection, UserModel } from "./src/DB/index.js";
dotenv.config({ path: path.resolve("./config/.env") });
const app = express();
const port = process.env.PORT;
// --------------------------------
app.use(express.json());
// --------------------------------
BootStrap(app, express);
// --------------------------------
DataBase_Connection();
UserModel.syncIndexes();
// --------------------------------
app.use("/*dummy", (req, res) => {
  res.json({ massage: "not found" });
});
app.listen(port, (error) => {
  if (!error) {
    console.log(`BE Server Connected Successfly on port : ${port}`);
    return;
  }
  return console.log("error : ", error);
});
