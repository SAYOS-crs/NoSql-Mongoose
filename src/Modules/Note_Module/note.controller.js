import { Router } from "express";
import {
  Aggregate_Note,
  AllTitle_Note,
  Create_Note,
  Delete_Note,
  DeleteAll_Note,
  Get_All_NoteAndUser,
  Get_Note_by_content,
  Get_Note_by_ID,
  Get_Notes,
  Replace_Note,
  Update_Note,
} from "./note.service.js";

const router = Router();
router.get("/paginate", Get_Notes);
router.get("/note-by-content", Get_Note_by_content);
router.get("/note-with-user", Get_All_NoteAndUser);
router.get("/aggregate", Aggregate_Note);
router.get("/:noteId", Get_Note_by_ID);
// -------------------------------------
router.post("/", Create_Note);
// -------------------------------------
router.patch("/all", AllTitle_Note);
router.patch("/:noteId", Update_Note);
// -------------------------------------
router.put("/replace/:noteId", Replace_Note);
// -------------------------------------
router.delete("/", DeleteAll_Note);
router.delete("/:noteId", Delete_Note);
// -------------------------------------
export default router;
