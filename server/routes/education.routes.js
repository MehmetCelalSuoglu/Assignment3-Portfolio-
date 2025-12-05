import express from "express";
import educationCtrl from "../controllers/education.controller.js";
import authCtrl from "../controllers/auth.controller.js";

const router = express.Router();

// CRUD routes
router
  .route("/api/qualifications")
  .post(authCtrl.requireSignin, authCtrl.isAdmin, educationCtrl.create)
  .get(educationCtrl.list); 

router
  .route("/api/qualifications/:educationId")
  .get(educationCtrl.read) 
  .put(authCtrl.requireSignin, authCtrl.isAdmin, educationCtrl.update)
  .delete(authCtrl.requireSignin, authCtrl.isAdmin, educationCtrl.remove);

// Middleware to handle :educationId
router.param("educationId", educationCtrl.educationByID);

export default router;
