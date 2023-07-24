const express = require("express");
const router = express.Router();
const IntakeController = require('../controllers/daily_intake_controller.js');

router.get("/new-daily-intake", IntakeController.newDailyIntake);
router.post("/update-daily-intake/:date", IntakeController.updateDailyIntake);
router.get("/view-daily-intake/:date", IntakeController.viewDailyIntake);
router.get("/get-hale/:date", IntakeController.getHALE);
router.get("/get-phd/:date", IntakeController.getPHD);

module.exports = router;