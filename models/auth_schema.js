const {pool} = require('../configs/db');

const validateIMEI = async (gpID) => {
    try {
        const sql = `select imei_number from imei_numbers where gp_id = '${gpID}'`;
        const [rows, fields] = await pool.query(sql);
        return rows;
    } catch (error) {
        console.log(error);
    }
}

const userSchema = async (district, block, gp, imei) => {
  try {
    const sql = `INSERT INTO users (district_name, block_name, gp_name, imei_number) VALUES (?, ?, ?, ?)`;
    const [rows, fields] = await pool.query(sql, [district, block, gp, imei]);
    return rows;
  } catch (error) {
    console.log(error);
  }
};

module.exports = { validateIMEI, userSchema };