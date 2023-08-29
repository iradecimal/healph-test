const express = require("express");
const router = express.Router();
const ReportController = require('../controllers/report_controller.js');
const Auth = require('../auth/auth_token_handler.js');

router.post("/new", Auth.userAuth, ReportController.newReport);
router.get("/view/:oid", Auth.userAuth, ReportController.viewReport);
router.get("/find/:uid", Auth.userAuth, ReportController.findUserReport);
router.patch("/update/:oid", Auth.userAuth, ReportController.updateReport);
router.patch("/flag/:oid", Auth.userAuth, ReportController.flagReport);
router.delete("/delete/:oid", Auth.userAuth, ReportController.deleteReport);

//router.get("/getall", Auth.adminAuth, ReportController.getallreports);

module.exports = router;