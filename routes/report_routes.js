const express = require("express");
const router = express.Router();
import ReportController from '../controllers/report_controller.js';

router.get("/new-report", ReportController.newReport);
router.post("/update-report/:oid", ReportController.updateReport);
router.post("/flag-report/:oid", ReportController.flagReport);

export default router;