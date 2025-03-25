import express from "express";
import { createUser, getFriends, searchUsers } from "../controllers/user.controller";

const router = express.Router();

router.post("/", createUser);
router.get('/', searchUsers);  

router.get('/:username/friends', getFriends)



export default router