import express from "express";
import userCtrl from "../controllers/user.controller.js";
import authCtrl from "../controllers/auth.controller.js";

const router = express.Router();

// Public: create user 
router.route("/api/users").post(userCtrl.create);

// Admin: Lisst all users
router
  .route("/api/users")
  .get(authCtrl.requireSignin, authCtrl.isAdmin, userCtrl.list);

// Admin: secure endpoint
router
  .route("/api/secure/users")
  .get(authCtrl.requireSignin, authCtrl.isAdmin, userCtrl.list);

router.param("userId", userCtrl.userByID);

// Admin: read, update, delete user by ID
router
  .route("/api/users/:userId")
  .get(authCtrl.requireSignin, authCtrl.isAdmin, userCtrl.read)
  .put(authCtrl.requireSignin, authCtrl.isAdmin, userCtrl.update)
  .delete(authCtrl.requireSignin, authCtrl.isAdmin, userCtrl.remove);

// Logged-in user profile (self) → /api/profile
router
  .route("/api/profile")
  .get(authCtrl.requireSignin, userCtrl.readProfile)
  .put(authCtrl.requireSignin, userCtrl.updateProfile);

export default router;
