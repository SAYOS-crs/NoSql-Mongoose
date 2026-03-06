import mongoose from "mongoose";

export const DataBase_Connection = async () => {
  try {
    mongoose.connection.on("connected", () =>
      console.log("DataBase Connected"),
    );
    mongoose.connection.on("error", (error) =>
      console.log("DB Error Connection", error),
    );
    mongoose.connect(process.env.DB_URL);
  } catch (error) {
    console.log(error);
  }
};
