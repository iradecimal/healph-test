const express = require("express");
const router = express.Router();
const UserController = require('../controllers/user_controller.js');
const multer  = require('multer');
const path = require("path");
const Auth = require('../auth/auth_token_handler.js');


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './profpics');
    },
    filename: function(req, file, cb){
        console.log(file);
        cb(null, req.params.uid +  path.extname(file.originalname));
    }
})

const upload = multer({ storage: storage });
router.get("/unique", UserController.checkUnique);
router.post("/signup", UserController.signup);
router.post("/login", UserController.login);
router.get("/logout", Auth.userAuth, UserController.logout);
router.post("/upload-pic/:uid", Auth.userAuth,  upload.single("image"), function (req, res){
    console.log(req.file);
    res.send("Single File upload success");
});
router.get("/get-user/:uid", Auth.userAuth, UserController.getUser);
router.get("/get-full-name/:uid", Auth.userAuth, UserController.getFullName);
router.get("/get-pic/:uid", Auth.userAuth, UserController.getProfilePicture);
router.get("/get-age/:uid", Auth.userAuth, UserController.getUserAge);
router.patch("/update-metrics/:uid", Auth.userAuth, UserController.updateMetrics);
router.patch("/update-bio/:uid", Auth.userAuth, UserController.updateBio);
router.patch("/update-password/:uid", Auth.userAuth, UserController.updatePassword);
//router.get("/confirm-user/:uid", UserController.confirmUser);

module.exports = router;
