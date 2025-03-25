import express from "express";
import { createUser, getFriends, searchUsers, softDeleteUser, sortUser } from "../controllers/user.controller";
import { validateCreateUser, validateSearchUsers, validateUsernameParam } from "../utills/validators/user.validators";
import { validateRequest } from "../middlewares/validate-request";


const router = express.Router();

router.post("/", validateCreateUser, validateRequest, createUser);
router.get('/', validateSearchUsers, validateRequest, searchUsers);
router.get("/sort", sortUser)
router.get('/:username/friends', validateUsernameParam, validateRequest, getFriends)
router.delete("/:username", validateUsernameParam, validateRequest, softDeleteUser)


export default router