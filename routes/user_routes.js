const express = require("express");
const router = express.Router();
const UserController = require('../controllers/user_controller.js');

router.post("/signup", UserController.signup);
router.post("/login", UserController.login);
router.get("/logout", UserController.logout);
//router.post("/upload-prof-pic", UserController.uploadPicture);
router.get("/get-user/:oid", UserController.getUser);
router.get("/get-full-name/:oid", UserController.getFullName);
router.get("/get-picture/:oid", UserController.getProfilePicture);
router.get("/get-user-age/:oid", UserController.getUserAge);
router.patch("/update-height/:oid", UserController.updateHeight);
router.patch("/update-weight/:oid", UserController.updateWeight);
router.patch("/update-name/:oid", UserController.updateName);
router.patch("/update-uni/:oid", UserController.updateUni);
router.patch("/update-degree/:oid", UserController.updateDegree);
router.patch("/update-password/:oid", UserController.updatePassword);
router.get("/confirm-user/:oid", UserController.confirmUser);

module.exports = router;
