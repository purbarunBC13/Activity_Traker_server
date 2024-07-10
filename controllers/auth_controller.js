const { validateIMEI, userSchema } = require("../models/auth_schema");
const { getGpIdByName } = require("../models/area_schema");

const validateImei = async (req, res) => {
  try {
    const { district_name, block_name, gp_name, imei_number } = req.body;
    const gpID = await getGpIdByName(gp_name);

    if (!gpID || gpID.length === 0) {
      res.status(404).send({ message: "GP not found" });
      return;
    }

    const result = await validateIMEI(gpID[0].gp_id);

    if (result.length === 0) {
      res.status(404).send({ message: "IMEI not found" });
      return;
    } else if (result[0].imei_number !== imei_number) {
      res.status(404).send({ message: "IMEI not matched" });
      return;
    }

    res.status(200).send({
      message: "IMEI matched login successful",
      result: result,
    });
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = { validateImei };
