const upload = require("../configs/multer");
const {postProgressData, ProgressDetails, getWorkStatus,getLatestWorkDetails} = require("../controllers/progress_controller");
const router = require("express").Router();

router.post("/progress", postProgressData);
router.post("/workStatus", getWorkStatus);
router.post("/uploadProgress", upload.single("image"), ProgressDetails);
router.get("/latestWorkDetails",getLatestWorkDetails);

module.exports = router;