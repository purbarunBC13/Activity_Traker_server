const {
  getDistrictId,
  getDistrict,
  getBlockByDistrict,
} = require("../controllers/area_controller");

const router = require('express').Router();

router.get('/district/:name', getDistrictId);
router.get('/districts', getDistrict);

router.get('/block/:dist_name', getBlockByDistrict);

module.exports = router;