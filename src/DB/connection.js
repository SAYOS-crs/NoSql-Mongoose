import mongoose from "mongoose";

export const DataBase_Connection = async () => {
  try {
    mongoose.connection.on("connected", () =>
      console.log("DataBase Connected"),
    );
    mongoose.connection.on("connected", () => console.log("Cluster is Online"));
    mongoose.connection.on("error", () => console.log("DB Error Connection"));

    mongoose.connect(process.env.DB_URL);
  } catch (error) {
    console.log(error);
  }
};
