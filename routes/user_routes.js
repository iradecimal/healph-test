const express = require("express");
const router = express.Router();
const UserController = require('../controllers/user_controller.js');

router.get("/signup", UserController.signup);
router.get("/login", UserController.login);
router.get("/get-full-name/:oid", UserController.getFullName);
router.get("/get-profile-picture/:oid", UserController.getProfilePicture);
router.get("/get-user-age/:oid", UserController.getUserAge);
router.post("/update-height/:oid", UserController.updateHeight);
router.post("/update-weight/:oid", UserController.updateWeight);
router.post("/update-name/:oid", UserController.updateName);
router.post("/update-profile-picture/:oid", UserController.updateProfilePicture);
router.post("/update-uni/:oid", UserController.updateUni);
router.post("/update-degree/:oid", UserController.updateDegree);
router.post("/update-password/:oid", UserController.updatePassword);

export default router;
