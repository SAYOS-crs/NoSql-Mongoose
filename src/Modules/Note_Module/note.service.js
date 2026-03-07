import {
  ConflictError_Respons,
  NotFoundError_Respons,
  SuccessRespons,
  throwResponsError,
} from "../../common/index.js";
import jwt from "jsonwebtoken";
import { UserModel, NoteModel } from "../../DB/index.js";
import mongoose, { isObjectIdOrHexString } from "mongoose";
// ---------------------------------------------------------
// ---------------------------------------------------------
// ---------------------------------------------------------
/*1. Create a Single Note (Get the id for the logged-in user (userId) from the token not the body) (send the token in the headers) (0.5 Grade)*/
export const Create_Note = async (req, res) => {
  const { title, content } = req.body;
  const { token } = req.headers;
  if (!token)
    throwResponsError({ status: 400, massage: "token is required", res });
  try {
    const { userId } = jwt.verify(token, process.env.JWT_SECRET_KEY);
    // -----------------------------------------------------------------------
    // -----------------------------------------------------------------------
    const finduser = await UserModel.findById(userId);
    if (!finduser) NotFoundError_Respons({ res, Detals: "invalid token" });
    // -----------------------------------------------------------------------
    // -----------------------------------------------------------------------

    const result = await NoteModel.insertOne({ title, content, userId });
    SuccessRespons({
      status: 201,
      massage: "note add successfly",
      data: result,
      res,
    });
  } catch (error) {
    throwResponsError({ res, massage: "server error", Detals: error });
  }
};
// ---------------------------------------------------------
// ---------------------------------------------------------
// 2. Update a single Note by its id and return the updated note. (Only the owner of the note can make this operation)
// (Get the id for the logged-in user (userId) from the token not the body) (0.5 Grade)
export const Update_Note = async (req, res) => {
  const { noteId } = req.params;
  const { token } = req.headers;
  const { title, content } = req.body;
  if (!token)
    throwResponsError({ res, status: 400, massage: "token is required" });
  try {
    const { userId } = jwt.verify(token, process.env.JWT_SECRET_KEY);
    // ---------------------------------------------------------------
    // ---------------------------------------------------------------
    // ---------------------------------------------------------------
    const { userId: userId_Note } = await NoteModel.findById(noteId, {
      userId: 1,
      _id: 0,
    });
    // -----------------------------------
    // -----------------------------------
    // -----------------------------------
    const decoded_userId = new mongoose.Types.ObjectId(userId);
    if (!userId_Note.equals(decoded_userId)) {
      return ConflictError_Respons({
        res,
        Detals: "you are not the owner of the note",
      });
    }
    // -----------------------------------
    // -----------------------------------
    // -----------------------------------
    const result = await NoteModel.findOneAndUpdate(
      { _id: noteId },
      { $set: { title, content }, $inc: { __v: 1 } },
      { new: true, runValidators: true },
    );
    SuccessRespons({
      status: 200,
      res,
      massage: "note updated successfly",
      data: result,
    });
  } catch (error) {
    throwResponsError({
      res,
      status: 500,
      massage: "server error",
      Detals: error,
    });
  }
};
// ---------------------------------------------------------
// ---------------------------------------------------------
// 3. Replace the entire note document with the new data provided in the request body. (Only the owner of the note can
// make this operation) (Get the id for the logged-in user (userId) from the token not the body) (0.5 Grade) • URL:
export const Replace_Note = async (req, res) => {
  const { noteId } = req.params;
  const { token } = req.headers;
  const { title, content } = req.body;
  if (!token)
    throwResponsError({ res, status: 400, massage: "token is required" });
  try {
    const { userId } = jwt.verify(token, process.env.JWT_SECRET_KEY);
    // ---------------------------------------------------------------
    // ---------------------------------------------------------------
    // ---------------------------------------------------------------
    const { userId: userId_Note } = await NoteModel.findById(noteId, {
      userId: 1,
      _id: 0,
    });
    if (!userId_Note) {
      NotFoundError_Respons({ res });
    }
    // -----------------------------------
    // -----------------------------------
    // -----------------------------------
    const decoded_userId = new mongoose.Types.ObjectId(userId);
    if (!userId_Note.equals(decoded_userId)) {
      return ConflictError_Respons({
        res,
        Detals: "you are not the owner of the note",
      });
    }
    // -----------------------------------
    // -----------------------------------
    // -----------------------------------
    const result = await NoteModel.findOneAndReplace(
      { _id: noteId },
      {
        title,
        content,
        userId,
        __v: 0,
      },
      {
        new: true,
        runValidators: true,
      },
    );
    SuccessRespons({
      status: 200,
      res,
      massage: "note updated successfly",
      data: result,
    });
  } catch (error) {
    throwResponsError({
      res,
      status: 500,
      massage: "server error",
      Detals: error,
    });
  }
};
// ---------------------------------------------------------
// ---------------------------------------------------------
// 4. Updates the title of all notes created by a logged-in user.)
// (Get the new Title from the body) (Get the id for the
// logged-in user (userId) from the token not the body) (0.5 Grade) • URL: PATCH /notes/all
export const AllTitle_Note = async (req, res) => {
  const { title } = req.body;
  const { token } = req.headers;
  if (!token)
    throwResponsError({ res, massage: "token is required", status: 400 });
  try {
    const { userId } = jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (!userId) {
      NotFoundError_Respons({ res });
    }
    const result = await NoteModel.updateMany(
      { userId },
      { title },
      { runValidators: true },
    );
    SuccessRespons({ res, massage: "done", data: result });
    NotFoundError_Respons({ res });
  } catch (error) {
    throwResponsError({
      res,
      massage: "server error",
      Detals: error,
      status: 500,
    });
  }
};
// ---------------------------------------------------------
// ---------------------------------------------------------
// 5. Delete a single Note by its id and return the deleted note. (Only the owner of the note can make this operation)
// (Get the id for the logged-in user from the token not the body) (0.5 Grade)
export const Delete_Note = async (req, res) => {
  const { noteId } = req.params;
  const { token } = req.headers;
  if (!token)
    throwResponsError({ res, status: 400, massage: "token is required" });
  try {
    const { userId } = jwt.verify(token, process.env.JWT_SECRET_KEY);
    // ---------------------------------------------------------------
    // ---------------------------------------------------------------
    // ---------------------------------------------------------------
    const { userId: userId_Note } = await NoteModel.findById(noteId, {
      userId: 1,
      _id: 0,
    });
    // -----------------------------------
    // -----------------------------------
    // -----------------------------------
    const decoded_userId = new mongoose.Types.ObjectId(userId);
    if (!userId_Note.equals(decoded_userId)) {
      return ConflictError_Respons({
        res,
        Detals: "you are not the owner of the note",
      });
    }
    // -----------------------------------
    // -----------------------------------
    // -----------------------------------
    const result = await NoteModel.findByIdAndDelete(noteId);

    SuccessRespons({
      status: 200,
      res,
      massage: "note deleted successfly",
      data: result,
    });
  } catch (error) {
    throwResponsError({
      res,
      status: 500,
      massage: "server error",
      Detals: error,
    });
  }
};
// ---------------------------------------------------------
// ---------------------------------------------------------
// 6. Retrieve a paginated list of notes for the logged-in user, sorted by “createdAt”in descending order. (Get page and
// limit from query parameters) (Get the id for the logged-in user (userId) from the token not the body) (send the
// token in the headers) (0.5 Grade)
export const Get_Notes = async (req, res) => {
  const { token } = req.headers;
  const { limit } = req.query;
  if (!token) {
    throwResponsError({ res, massage: "token is required", status: 400 });
  }
  try {
    const { userId } = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const result = await NoteModel.find({ userId })
      .sort({ createdAt: 1 })
      .limit(limit);
    SuccessRespons({ res, massage: "done", data: result });
  } catch (error) {
    throwResponsError({
      res,
      massage: "server error",
      Detals: error,
      status: 500,
    });
  }
};
// ---------------------------------------------------------
// ---------------------------------------------------------
// 7. Get a note by its id. (Only the owner of the note can make this operation) (Get the id for the logged-in user (userId)
// from the token not the body) (0.5 Grade)
export const Get_Note_by_ID = async (req, res) => {
  const { noteId } = req.params;
  const { token } = req.headers;
  if (!token) {
    throwResponsError({ res, massage: "token is requird" });
  }
  // ------------------------------------------------
  try {
    const { userId } = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const Note_Info = await NoteModel.findById(noteId);
    if (!Note_Info.userId.equals(userId)) {
      return ConflictError_Respons({
        res,
        Detals: "you are not the Note Owner",
      });
    }
    SuccessRespons({ res, massage: "done", data: Note_Info });
  } catch (error) {
    throwResponsError({
      res,
      massage: "server error",
      Detals: error,
      status: 500,
    });
  }
};
// ---------------------------------------------------------
// ---------------------------------------------------------
// 8. Get a note for logged-in user by its content. (Get the id for the logged-in user (userId) from the token not the body)
// (0.5 Grade)
export const Get_Note_by_content = async (req, res) => {
  const { token } = req.headers;
  const { content } = req.query;
  if (!token) {
    throwResponsError({ res, massage: "token is requird" });
  }
  // ------------------------------------------------
  try {
    const { userId } = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const Note_Info = await NoteModel.findOne({ content });
    if (!Note_Info.userId.equals(userId)) {
      return ConflictError_Respons({
        res,
        Detals: "you are not the Note Owner",
      });
    }
    SuccessRespons({ res, massage: "done", data: Note_Info });
  } catch (error) {
    throwResponsError({
      res,
      massage: "server error",
      Detals: error,
      status: 500,
    });
  }
};
// ---------------------------------------------------------
// ---------------------------------------------------------
// 9. Retrieves all notes for the logged-in user with user information, selecting only the “title, userId and createdAt”
// from the note and the “email” from the user. (Get the id for the logged-in user (userId) from the token not the
// body) (0.5 Grade)
export const Get_All_NoteAndUser = async (req, res) => {
  const { token } = req.headers;
  if (!token) {
    throwResponsError({ res, massage: "token is requird" });
  }
  // ------------------------------------------------
  try {
    const { userId } = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const Note_Info = await NoteModel.find({ userId }, { title: 1 }).populate([
      { path: "userId", select: "email" },
    ]);
    if (!Note_Info) {
      return NotFoundError_Respons({ res });
    }
    SuccessRespons({ res, massage: "done", data: Note_Info });
  } catch (error) {
    throwResponsError({
      res,
      massage: "server error",
      Detals: error,
      status: 500,
    });
  }
};
// ---------------------------------------------------------
// ---------------------------------------------------------
// 10. Using aggregation, retrieves all notes for the logged-in user with user information (name and email) and allow
// searching notes by the title. (1 Grade)
export const Aggregate_Note = async (req, res) => {
  const { token } = req.headers;
  let { title: NoteTitle } = req.query;
  console.log(NoteTitle);

  if (NoteTitle === undefined) {
    NoteTitle = String;
  }
  if (!token) {
    throwResponsError({ res, massage: "token is requird" });
  }

  try {
    const { userId } = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const userID_ofNote = new mongoose.Types.ObjectId(userId);
    const result = await NoteModel.aggregate([
      { $match: { $and: [{ userId: userID_ofNote }, { title: NoteTitle }] } },
      {
        $lookup: {
          from: "User_Collection",
          localField: "userId",
          foreignField: "_id",
          as: "Creator",
        },
      },
    ]);
    SuccessRespons({ res, massage: "done", data: result });
  } catch (error) {
    throwResponsError({
      res,
      massage: "server error",
      Detals: error,
      status: 500,
    });
  }
};
// ---------------------------------------------------------
// ---------------------------------------------------------
// 11. Delete all notes for the logged-in user. (Get the id for the logged-in user (userId) from the token not the body) (0.5
// Grade)

export const DeleteAll_Note = async (req, res) => {
  const { token } = req.headers;
  if (!token)
    throwResponsError({ res, status: 400, massage: "token is required" });
  try {
    const { userId } = jwt.verify(token, process.env.JWT_SECRET_KEY);
    // ---------------------------------------------------------------
    // ---------------------------------------------------------------
    // ---------------------------------------------------------------
    // -----------------------------------
    // -----------------------------------
    // -----------------------------------
    // const ID = new mongoose.Types.ObjectId(userId);
    const result = await NoteModel.deleteMany({ userId });

    SuccessRespons({
      status: 200,
      res,
      massage: "notes deleted successfly",
      data: result,
    });
  } catch (error) {
    throwResponsError({
      res,
      status: 500,
      massage: "server error",
      Detals: error,
    });
  }
};
