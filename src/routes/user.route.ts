import express from "express";
import { addUser, login } from "../controllers/user.controller";

const router = express.Router();

router.post("/addUser", addUser);
router.post("/login", login);

export default router;
