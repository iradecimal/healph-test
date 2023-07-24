const express = require("express");
const router = express.Router();
const IntakeController = require('../controllers/daily_intake_controller.js');

router.post("/new-daily-intake/:uid", IntakeController.newDailyIntake);
router.patch("/update-daily-intake/:uid/:date", IntakeController.updateDailyIntake);
router.get("/view-daily-intake/:uid/:date", IntakeController.viewDailyIntake);
router.get("/get-hale/:uid/:date", IntakeController.getHALE);
router.get("/get-phd/:uid/:date", IntakeController.getPHD);

module.exports = router;