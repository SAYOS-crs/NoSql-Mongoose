import { Router } from "express";
import {
  AllTitle_Note,
  Create_Note,
  Delete_Note,
  Get_Notes,
  Replace_Note,
  Update_Note,
} from "./note.service.js";

const router = Router();
router.get("/paginate", Get_Notes);
router.post("/", Create_Note);
router.patch("/all", AllTitle_Note);
router.patch("/:noteId", Update_Note);
router.put("/replace/:noteId", Replace_Note);
router.delete("/:noteId", Delete_Note);
export default router;
