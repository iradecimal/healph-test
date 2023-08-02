const express = require("express");
const router = express.Router();
const ReportController = require('../controllers/report_controller.js');

router.post("/new", ReportController.newReport);
router.get("/view/:oid", ReportController.viewReport);
router.get("/find/:uid", ReportController.findUserReport);
router.patch("/update/:oid", ReportController.updateReport);
router.patch("/flag/:oid", ReportController.flagReport);
router.delete("/delete/:oid", ReportController.deleteReport);

module.exports = router;