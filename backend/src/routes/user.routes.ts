import express from "express";
import { createUser, getAllUsers, getFriends, searchUsers, softDeleteUser, sortUser, updateUserProfile } from "../controllers/user.controller";
import { validateCreateUser, validateSearchUsers, validateUpdateUser, validateUsernameParam } from "../utills/validators/user.validators";
import { validateRequest } from "../middlewares/validate-request";


const router = express.Router();

router.post("/", validateCreateUser, validateRequest, createUser);

router.get('/', validateSearchUsers, validateRequest, searchUsers);
router.get("/sort", sortUser);
router.get('/all', getAllUsers)

router.get('/:username/friends', validateUsernameParam, validateRequest, getFriends)
router.patch('/:username', validateUsernameParam, validateUpdateUser, validateRequest, updateUserProfile)
router.delete("/:username", validateUsernameParam, validateRequest, softDeleteUser)


export default router