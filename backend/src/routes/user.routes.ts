import express from "express";
import { createUser, getFriends } from "../controllers/user.controller";

const router = express.Router();

router.post("/", createUser);

router.get('/:username/friends', getFriends)



export default router