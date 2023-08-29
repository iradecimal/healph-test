const express = require("express");
const router = express.Router();
const IntakeController = require('../controllers/daily_intake_controller.js');
const Auth = require('../auth/auth_token_handler.js');

router.post("/new/:uid", Auth.userAuth, IntakeController.newDailyIntake);
//router.patch("/update/:uid/:date", Auth.userAuth, IntakeController.updateDailyIntake);
router.get("/view/:uid/:date", Auth.userAuth, IntakeController.viewDailyIntake);
router.get("/get-hale/:uid/:date", Auth.userAuth, IntakeController.getHALE);
router.get("/get-phd/:uid/:date", Auth.userAuth, IntakeController.getPHD);


module.exports = router;