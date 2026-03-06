import { Router } from "express";
import { login, Signup } from "./auth.service.js";

const router = Router();
// ________________________________________________________________________________________________________________________________
// 1. Signup (make sure that the email does not exist before) (Don’t forget to hash the password and encrypt the phone). (0.5 Grade)
router.post("/signup", Signup);
// ________________________________________________________________________________________________________________________________
// ________________________________________________________________________________________________________________________________
/*
2-Create an API for authenticating users (Login) and return a JSON Web Token (JWT) that contains the userId and will expire
after “1 hour”. (Get the email and the password from the body). (0.5 Grade) • URL: POST /users/login*/
router.post("/login", login);
// ________________________________________________________________________________________________________________________________
// ________________________________________________________________________________________________________________________________
// 3. Update logged-in user information (Except Password). (If user want to update the email, check the new email
// doesn’t exist before. (Get the id for the logged-in user (userId) from the token not the body) (send the token in the
// headers) (0.5 Grade)

export default router;
