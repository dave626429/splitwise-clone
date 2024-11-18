import Router from "express";
import {
  isSessionValid,
  login,
  logOut,
  register,
} from "../../controllers/authController.js";

const router = Router();

router.get("/issessionvalid", isSessionValid);
router.post("/login", login);
router.post("/logout", logOut);

router.post("/register", register);

export default router;
