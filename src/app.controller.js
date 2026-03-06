import { UserRouter } from "./Modules/index.js";

export default async function BootStrap(app, express) {
  app.use("/", UserRouter);
}
