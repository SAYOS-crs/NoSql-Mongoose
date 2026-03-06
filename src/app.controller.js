import { AuthRouter, UserRouter } from "./Modules/index.js";

export default async function BootStrap(app, express) {
  app.use("/auth", AuthRouter);
  app.use("/users", UserRouter);
}
