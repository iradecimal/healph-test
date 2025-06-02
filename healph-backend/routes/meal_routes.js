const express = require("express");
const router = express.Router();
const MealController = require('../controllers/meal_controller.js');
const multer  = require('multer');
const path = require("path");
const Auth = require('../auth/auth_token_handler.js');


const picStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './mealpics');
    },
    filename: function(req, file, cb){
        console.log(file);
        cb(null, req.params.oid +  path.extname(file.originalname));
    }
})

const boundStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './mealbounds');
    },
    filename: function(req, file, cb){
        console.log(file);
        cb(null, req.params.oid +  path.extname(file.originalname));
    }
})


const picUpload = multer({ storage: picStorage });
const boundUpload = multer({ storage: boundStorage });

router.post("/new", Auth.userAuth, MealController.newMeal);
router.get("/get/:oid", Auth.userAuth, MealController.getMeal);
router.get("/getall/:uid", Auth.userAuth, MealController.getAllMeals);
router.post("/uploadpic/:oid", Auth.userAuth, picUpload.single("image"), function (req, res){
    console.log(req.file);
    res.send("Single File upload success");
});

router.post("/uploadpic/:oid", Auth.userAuth, boundUpload.single("file"), function (req, res){
    console.log(req.file);
    res.send("Single File upload success");
});

module.exports = router;
