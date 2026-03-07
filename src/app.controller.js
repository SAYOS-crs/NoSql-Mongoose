import { AuthRouter, NoteRouter, UserRouter } from "./Modules/index.js";

export default async function BootStrap(app, express) {
  app.use("/auth", AuthRouter);
  app.use("/users", UserRouter);
  app.use("/notes", NoteRouter);
}
