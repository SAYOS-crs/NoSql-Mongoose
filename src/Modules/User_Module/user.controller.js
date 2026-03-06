import { Router } from "express";
import {
  delete_user,
  find_user_byid,
  update_user_info,
} from "./user.service.js";

const router = Router();
router.patch("/", update_user_info);
router.delete("/", delete_user);
router.get("/", find_user_byid);
export default router;
