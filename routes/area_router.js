const {
  getDistrictId,
  getDistrict,
  getBlockByDistrict,
  getGpByBlock,
} = require("../controllers/area_controller");

const router = require('express').Router();

// ? Get District by name
router.get('/districts', getDistrict);
router.get('/district/:name', getDistrictId);

// ? Get Block by district name
router.get('/block/:dist_name', getBlockByDistrict);

// ? Get GP by block name
router.get('/gp/:block_name', getGpByBlock);

module.exports = router;