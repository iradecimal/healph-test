const express = require('express');
const router = express.Router();
const InstallController = require('../controllers/install_controller');

/* GET home page. */
router.get('/installPHD', InstallController.downloadPHD);
router.get('/installFW', InstallController.downloadFoodWaste);

module.exports = router;
