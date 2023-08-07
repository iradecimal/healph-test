const express = require("express");
const router = express.Router();
const UserController = require('../controllers/user_controller.js');

router.post("/signup", UserController.signup);
router.post("/login", UserController.login);
router.get("/logout", UserController.logout);
//router.post("/upload-prof-pic", UserController.uploadPicture);
router.get("/get-user/:uid", UserController.getUser);
router.get("/get-full-name/:uid", UserController.getFullName);
router.get("/get-picture/:uid", UserController.getProfilePicture);
router.get("/get-age/:uid", UserController.getUserAge);
router.patch("/update-metrics/:uid", UserController.updateMetrics);
router.patch("/update-bio/:uid", UserController.updateBio);
router.patch("/update-password/:uid", UserController.updatePassword);
//router.get("/confirm-user/:uid", UserController.confirmUser);

module.exports = router;
