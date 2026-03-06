import {
  ConflictError_Respons,
  SuccessRespons,
  throwResponsError,
} from "../../common/index.js";
import { UserModel } from "../../DB/index.js";

export const User_Add = async (req, res) => {
  const { name, email } = req.body;
  try {
    const result = await UserModel.create({ name, email });
    SuccessRespons({ status: 201, res, massage: "done", data: result });
  } catch (error) {
    return ConflictError_Respons({ res, Detals: error });
  }
};
