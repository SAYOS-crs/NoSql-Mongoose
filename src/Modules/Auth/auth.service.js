import {
  ConflictError_Respons,
  NotFoundError_Respons,
  Successfly_Login,
  SuccessRespons,
  throwResponsError,
} from "../../common/index.js";
import jwt from "jsonwebtoken";
import { UserModel } from "../../DB/index.js";
// --------------------------------------------------
export const Signup = async (req, res) => {
  const { name, email, password, phone, age } = req.body;
  try {
    const result = await UserModel.create({
      name,
      email,
      password,
      phone,
      age,
    });

    SuccessRespons({ status: 201, res, massage: "done", data: result });
  } catch (error) {
    return ConflictError_Respons({ res, Detals: error });
  }
};
// --------------------------------------------------
export const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await UserModel.findOne({ email, password }, { _id: 1 });
  console.log(user);

  if (!user) {
    return throwResponsError({
      res,
      massage: "invalid email or password",
      status: 404,
    });
  }
  const userId = user._id;
  const token = jwt.sign(
    { email, password, userId },
    process.env.JWT_SECRET_KEY,
    { expiresIn: "1h" },
  );
  Successfly_Login({ res, token });
};
// --------------------------------------------------
