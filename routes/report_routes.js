const express = require("express");
const router = express.Router();
const ReportController = require('../controllers/report_controller.js');

router.post("/new", ReportController.newReport);
router.patch("/update/:oid", ReportController.updateReport);
router.patch("/flag/:oid", ReportController.flagReport);

module.exports = router;