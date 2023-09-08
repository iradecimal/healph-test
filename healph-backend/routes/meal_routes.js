const express = require("express");
const router = express.Router();
const MealController = require('../controllers/meal_controller.js');
const multer  = require('multer');
const path = require("path");
const Auth = require('../auth/auth_token_handler.js');


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './mealpics');
    },
    filename: function(req, file, cb){
        console.log(file);
        cb(null, Date.now() + "--"  + req.params.oid +  path.extname(file.originalname));
    }
})

const upload = multer({ storage: storage });

router.post("/new", Auth.userAuth, MealController.newMeal);
router.get("/get/:oid", Auth.userAuth, MealController.getMeal);
router.post("/upload/:oid", Auth.userAuth, upload.single("image"), function (req, res){
    console.log(req.file);
    res.send("Single File upload success");
});

module.exports = router;
