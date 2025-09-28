import { Router } from "express";
import {
  GetCurrentUser,
  Login,
  Logout,
  Register,
} from "../controllers/auth.controller.js";
import { AuthMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/register", Register);
router.post("/login", Login);
router.post("/logout", Logout);
router.get("/me", AuthMiddleware, GetCurrentUser);

export { router as authRouter };
