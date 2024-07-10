const upload = require("../configs/multer");
const {postProgressData , getWorkIds} = require("../controllers/progress_controller");
const router = require("express").Router();

router.post("/progress", postProgressData);

router.get("/progress", getWorkIds);

router.post("/upload", upload.single("image"), (req, res) => {
  res.send("Image uploaded successfully");
});

module.exports = router;