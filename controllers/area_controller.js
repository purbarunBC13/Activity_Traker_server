const {
  getDistIdByName,
  getDistricts,
  getBlockIdByName,
  getBlockBydistrictId,
  getBlocks,
  getGpIdByName,
  getGpByBlockId,
} = require("../models/area_schema");

const getDistrict = async (req, res) => {
  try {
    const result = await getDistricts();
    if (result.length === 0) {
      res.send("Districts not found").status(404);
      return;
    }
    res.send(result).status(200);
  } catch (error) {
    res.send(error).status(500);
  }
};

const getDistrictId = async (req, res) => {
  try {
    const { name } = req.params;
    const result = await getDistIdByName(name);
    if (result.length === 0) {
      res.send("District not found").status(404);
      return;
    }
    res.send(result).status(200);
  } catch (error) {
    res.send(error).status(500);
  }
};

const getBlockByDistrict = async (req, res) => {
  try {
    const { dist_name } = req.params;
    const distId = await getDistIdByName(dist_name);
    if (distId.length === 0) {
      res.send("District not found").status(404);
      return;
    }
    const result = await getBlockBydistrictId(distId[0].district_id);
    if (result.length === 0) {
      res.send("Block not found").status(404);
      return;
    }
    res.send(result).status(200);
  } catch (error) {
    res.send(error).status(500);
  }
};

const getGpByBlock = async (req, res) => {
  try {
    const { block_name } = req.params;
    const blockId = await getBlockIdByName(block_name);
    if (blockId.length === 0) {
      res.send("Block not found").status(404);
      return;
    }
    const result = await getGpByBlockId(blockId[0].block_id);
    if (result.length === 0) {
      res.send("GP not found").status(404);
      return;
    }
    res.send(result).status(200);
  } catch (error) {
    res.send(error).status(500);
  }
};

module.exports = {
  getDistrictId,
  getDistrict,
  getBlockByDistrict,
  getGpByBlock,
};
