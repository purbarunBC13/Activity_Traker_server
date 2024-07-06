const {
  getDistIdByName,
  getDistricts,
  getBlockIdByName,
  getBlockBydistrictId,
  getBlocks,
  getGpIdByName,
} = require("../models/area_schema");

const getDistrict = async (req, res) => {
  try {
    const result = await getDistricts();
    if (result.length === 0) {
      res.send("Districts not found").status(404);
      return;
    }
    const districts = result.map((district) => district.district_name);
    res.send(districts).status(200);
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
    const blocks = result.map((block) => block.block_name);
    res.send(blocks).status(200);
  } catch (error) {
    res.send(error).status(500);
  }
};


module.exports = { getDistrictId, getDistrict, getBlockByDistrict};
