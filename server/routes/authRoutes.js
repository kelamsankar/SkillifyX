import express from "express";
import {
  signup,
  resendOtp,
  verifyOtp,
  login,
  forgotPassword,
  resetPassword
} from "../controllers/authController.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/resend", resendOtp);
router.post("/verify", verifyOtp);
router.post("/login", login);
router.post("/forgot", forgotPassword);
router.post("/reset/:token", resetPassword);
export default router;