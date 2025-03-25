import express from "express";
import { createUser, getFriends, searchUsers, softDeleteUser } from "../controllers/user.controller";

const router = express.Router();

router.post("/", createUser);
router.get('/', searchUsers);

router.get('/:username/friends', getFriends)


router.delete("/:username", softDeleteUser)


export default router