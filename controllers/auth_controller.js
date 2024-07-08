const { validateIMEI, userSchema } = require("../models/auth_schema");
const { getGpIdByName } = require("../models/area_schema");

const validateImei = async (req, res) => {
  try {
    const { district_name, block_name, gp_name, imei_number } = req.body;
    const gpID = await getGpIdByName(gp_name);
    const result = await validateIMEI(gpID[0].gp_id);
    if (result.length === 0) {
      res.send("User not found").status(404);
      return;
    } else if (result[0].imei_number != imei_number) {
      res.send("IMEI not matched").status(404);
      return;
    }
    // const user = await userSchema(
    //   district_name,
    //   block_name,
    //   gp_name,
    //   imei_number
    // );
    // if (user.affectedRows === 0) {
    //   res.send("Login failed").status(404);
    //   return;
    // }
    res
      .send({
        message: "IMEI matched login Successful",
        result: result,
      })
      .status(200);
  } catch (error) {
    res.send(error).status(500);
  }
};

// const AddUser = async (req, res) => {
//   try {
//     const { district, block, gp, imei } = req.body;
//     const gpID = await getGpIdByName(gp);
//     const result = await userSchema(district, block, gpID[0].gp_id, imei);
//     res.send(result).status(200);
//   } catch (error) {
//     res.send(error).status(500);
//   }
// };

module.exports = { validateImei };