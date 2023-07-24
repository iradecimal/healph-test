const express = require("express");
const router = express.Router();
const ReportController = require('../controllers/report_controller.js');

router.get("/new-report", ReportController.newReport);
router.post("/update-report/:oid", ReportController.updateReport);
router.post("/flag-report/:oid", ReportController.flagReport);

module.exports = router;