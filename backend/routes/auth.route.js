import express from "express"
import { checkAuth, getMe, login, logout, signup } from "../controllers/auth.controller.js"
import verifyToken from "../middlewares/verifyToken.js"
const router = express.Router()

router.post("/signup", signup)

router.post("/login", login)

router.post("/logout", logout)

router.get("/checkAuth", verifyToken, checkAuth)

router.get("/getMe", verifyToken, getMe)

export default router