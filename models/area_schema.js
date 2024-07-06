const {pool} = require('../configs/db');


// ? District Schema

const getDistIdByName = async (name) => {
    try {
        const sql = `select district_id from district where district_name = '${name}'`;
        const [rows, fields] = await pool.query(sql);
        return rows;
    } catch (error) {
        console.log(error);
    }
}

const getDistricts = async () => {
    try {
        const sql = `select * from district`;
        const [rows, fields] = await pool.query(sql);
        return rows;
    } catch (error) {
        console.log(error);
    }
}



// ? Block Schema

const getBlockIdByName = async (name) => {
    try {
        const sql = `select block_id from block where block_name = '${name}'`;
        const [rows, fields] = await pool.query(sql);
        return rows;
    } catch (error) {
        console.log(error);
    }
}

const getBlockBydistrictId = async (id) => {
  try {
    const sql = `select * from block where district_id = ${id}`;
    const [rows, fields] = await pool.query(sql);
    return rows;
  } catch (error) {
    console.log(error);
  }
};

const getBlocks = async () => {
    try {
        const sql = `select * from block`;
        const [rows, fields] = await pool.query(sql);
        return rows;
    } catch (error) {
        console.log(error);
    }
}



// ? GP Schema

const getGpIdByName = async (name) => {
    try {
        const sql = `select gp_id from gp where gp_name = '${name}'`;
        const [rows, fields] = await pool.query(sql);
        return rows;
    } catch (error) {
        console.log(error);
    }
}

const getGps = async () => {
    try {
        const sql = `select * from gp`;
        const [rows, fields] = await pool.query(sql);
        return rows;
    } catch (error) {
        console.log(error);
    }
}

const getGpByBlockId = async (id) => {
    try {
        const sql = `select * from gp where block_id = ${id}`;
        const [rows, fields] = await pool.query(sql);
        return rows;
    } catch (error) {
        console.log(error);
    }
}

module.exports = {getDistIdByName, getDistricts, getBlockIdByName, getBlockBydistrictId, getBlocks, getGpIdByName, getGps, getGpByBlockId};