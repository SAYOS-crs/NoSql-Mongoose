import { Router } from "express";
import { User_Add } from "./user.service.js";

const router = Router();

router.post("/", User_Add);

export default router;
