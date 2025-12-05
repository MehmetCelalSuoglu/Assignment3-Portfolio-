import express from "express";
import authCtrl from "../controllers/auth.controller.js";
import userCtrl from "../controllers/user.controller.js";

const router = express.Router();

// AUTH routes
router.route("/auth/signup").post(authCtrl.signup);
router.route("/auth/signin").post(authCtrl.signin);
router.route("/auth/signout").get(authCtrl.signout);

// PROTECTED ROUTES 
router
  .route("/api/secure/users")
  .get(authCtrl.requireSignin, userCtrl.list);

export default router;
