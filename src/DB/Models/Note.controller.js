import mongoose, { Schema } from "mongoose";
import Title_Filter from "../../helpers/Validators/UpperCaseCheck.js";

const NoteSchema = new Schema(
  {
    title: {
      type: String,
      require: true,
      validate: {
        validator: Title_Filter,
        massage: "Upper case not allowed",
      },
    },
    content: {
      type: String,
      require: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      require: true,
    },
  },
  {
    collection: "Note_Collection",
    timestamps: true,
  },
);

const NoteModel = mongoose.model("note", NoteSchema);
export default NoteModel;
