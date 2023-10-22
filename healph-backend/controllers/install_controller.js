const asyncHandler = require('express-async-handler');


exports.downloadPHD = asyncHandler(async (req, res, next) => {
    res.attachment('../healph-ai/phd_fc_yolov4-416.tflite');
    res.download('../healph-ai/phd_fc_yolov4-416.tflite');
});

exports.downloadFoodWaste = asyncHandler(async (req, res, next) => {
    res.attachment('../healph-ai/Food_waste-yolov4-416.tflite');
    res.download('../healph-ai/Food_waste-yolov4-416.tflite');
});