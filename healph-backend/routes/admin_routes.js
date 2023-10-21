const express = require("express");
const router = express.Router();
const AdminController = require('../controllers/admin_controller.js');

router.post("/signup", AdminController.signup);
router.post("/login", AdminController.login);
router.get("/logout", AdminController.logout);
//router.patch("/update-password/:uid", AdminController.updatePassword);
module.exports = router;