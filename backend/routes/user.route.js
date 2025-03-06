import express from 'express'
import { login, signup ,logout, getOtherUsers} from '../controllers/user.controller.js';
import isAuthenticated from '../middleware/isAuthenticated.js';

const router = express.Router()

router.post("/signup" , signup)
router.post("/login" , login)
router.get("/logout" , logout)
router.get("/getotherusers" , isAuthenticated , getOtherUsers)

export default router;