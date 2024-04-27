import express from "express";
import { validateSignUp } from "../utils/validation";
import { signUp, logIn } from "../controllers/userController";

const router = express.Router();

/* router.get("/", function(req, res) {
    res.send({ msg: "hello" });
}); */

router.post("/sign-up", validateSignUp, signUp);

router.post("/login", logIn);

export default router;
