import { Router } from "express";
import { forgotPassword, resetPassword, getResetToken } from "../controllers/password-reset.js";

const router = Router()

router.route('/forgot-password').post(forgotPassword);
router.route('/reset-password/:id/:token').get(getResetToken).post(resetPassword);

export default router;