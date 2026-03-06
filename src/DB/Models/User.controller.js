import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema(
  {
    name: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
      unique: true,
    },
  },
  {
    collection: "User_Model",
  },
);

const UserModel = mongoose.model("user", UserSchema);
export default UserModel;
