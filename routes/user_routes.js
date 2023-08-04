const express = require("express");
const router = express.Router();
const UserController = require('../controllers/user_controller.js');
const multer  = require('multer');
const path = require("path");


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../profpics');
    },
    filename: function(req, file, cb){
        console.log(file);
        cb(null, req.params.uid +  path.extname(file.originalname));
    }
})

const upload = multer({ storage: storage });

router.post("/signup", UserController.signup);
router.post("/login", UserController.login);
router.get("/logout", UserController.logout);
router.post("/upload-pic/:uid", upload.single("image"), UserController.uploadPicture);
router.get("/get-user/:uid", UserController.getUser);
router.get("/get-full-name/:uid", UserController.getFullName);
router.get("/get-pic/:uid", UserController.getProfilePicture);
router.get("/get-age/:uid", UserController.getUserAge);
router.patch("/update-metrics/:uid", UserController.updateMetrics);
router.patch("/update-bio/:uid", UserController.updateBio);
router.patch("/update-password/:uid", UserController.updatePassword);
//router.get("/confirm-user/:uid", UserController.confirmUser);

module.exports = router;
