import {
  ConflictError_Respons,
  NotFoundError_Respons,
  Successfly_Login,
  SuccessRespons,
  throwResponsError,
} from "../../common/index.js";
import jwt from "jsonwebtoken";
import { UserModel } from "../../DB/index.js";

export const update_user_info = async (req, res) => {
  //step-1 get the token and the data
  const { token } = req.headers;
  const { name, email, age } = req.body;

  try {
    //validation----------------------------------
    if (!token) {
      return NotFoundError_Respons({ res });
    }
    const emailFinder = await UserModel.findOne({ email });
    if (emailFinder) {
      return ConflictError_Respons({ res, Detals: "email already exist !" });
    }
    // -----------------------------------------------
    // -----------------------------------------------
    // step -2 decode the token and  destructing the id from the token
    const { userId } = jwt.verify(token, process.env.JWT_SECRET_KEY);
    // ------------------------------
    // step-3 update the user by id
    const result = await UserModel.findByIdAndUpdate(
      userId,
      {
        $set: { name, email, age },
        $inc: { __v: 1 },
      },
      {
        new: true,
      },
    );
    SuccessRespons({
      res,
      massage: "info updated successfly",
      data: result,
    });
  } catch (error) {
    NotFoundError_Respons({ res, Detals: error });
  }
};

export const delete_user = async (req, res) => {
  const { token } = req.headers;
  try {
    if (!token) {
      NotFoundError_Respons({ res, status: 404 });
    }
    const { userId } = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const result = await UserModel.findByIdAndDelete(userId);
    if (!result) {
      NotFoundError_Respons({ res, status: 404 });
    }
    SuccessRespons({ res, massage: "user deleted successfly", data: result });
  } catch (error) {
    throwResponsError({ res, massage: "server error", status: 500 });
  }
};

export const find_user_byid = async (req, res) => {
  const { token } = req.headers;
  if (!token) {
    NotFoundError_Respons({ res, status: 404 });
  }
  try {
    // setp-1 decode the token
    const { userId } = jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (!userId) {
      return ConflictError_Respons({ res, Detals: "invalid token" });
    }
    const result = await UserModel.findById(userId);
    SuccessRespons({ res, massage: "done", data: result });
  } catch (error) {
    throwResponsError({
      status: 500,
      res,
      massage: "server error",
      Detals: error,
    });
  }
};
