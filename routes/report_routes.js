const express = require("express");
const router = express.Router();
const ReportController = require('../controllers/report_controller.js');

router.post("/new-report", ReportController.newReport);
router.patch("/update-report/:oid", ReportController.updateReport);
router.patch("/flag-report/:oid", ReportController.flagReport);

module.exports = router;