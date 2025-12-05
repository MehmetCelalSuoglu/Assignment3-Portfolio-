import express from "express";
import contactCtrl from "../controllers/contact.controller.js";
import authCtrl from "../controllers/auth.controller.js";

const router = express.Router();

router
  .route("/api/contacts")
  .post(contactCtrl.create)   
  .get(authCtrl.requireSignin, authCtrl.isAdmin, contactCtrl.list)
  .delete(authCtrl.requireSignin, authCtrl.isAdmin, contactCtrl.removeAll);

router.param("contactId", contactCtrl.contactByID);

router
  .route("/api/contacts/:contactId")
  .get(authCtrl.requireSignin, authCtrl.isAdmin, contactCtrl.read)
  .put(authCtrl.requireSignin, authCtrl.isAdmin, contactCtrl.update)
  .delete(authCtrl.requireSignin, authCtrl.isAdmin, contactCtrl.remove);

export default router;





