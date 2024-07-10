const {postProgressData, ProgressDetails, getWorkStatus,getLatestWorkDetails , getWorkIds} = require("../controllers/progress_controller");
const router = require("express").Router();

router.post("/progress", postProgressData);
router.post("/workStatus", getWorkStatus);
router.get("/progress", getWorkIds);

router.post("/uploadProgress", ProgressDetails);
router.get("/latestWorkDetails",getLatestWorkDetails);

module.exports = router;