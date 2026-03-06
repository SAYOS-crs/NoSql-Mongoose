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
    password: {
      type: String,
      require: true,
    },
    phone: {
      type: String,
      require: true,
    },
    age: {
      type: Number,
      min: [16, "age must be +16"],
      max: [60, "age must be less then 60"],
    },
  },

  {
    collection: "User_Collection",
    timestamps: true,
  },
);

const UserModel = mongoose.model("user", UserSchema);
export default UserModel;
