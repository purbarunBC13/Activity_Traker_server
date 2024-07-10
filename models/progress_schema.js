const { pool } = require("../configs/db");

const postProgress = async (data) => {
  try {
    const { category, indicator, work_status, work_id } = data;
    const sql = `INSERT INTO WorkDetails (category,indicator,work_status,work_id) VALUES (?, ?, ?, ?)`;
    const [rows, fields] = await pool.query(sql, [
      category,
      indicator,
      work_status,
      work_id,
    ]);
    return rows;
  } catch (error) {
    console.log(error);
  }
};

const setValidation = async (data) => {
  try {
    const { work_id } = data;
    const sql = `UPDATE WorkDetails SET valid = 0 WHERE work_id = ?`;
    const [rows, fields] = await pool.query(sql, [work_id]);
    return rows;
  } catch (error) {
    console.log(error);
  }
};

const checkValidation = async (data) => {
  try {
    const { work_id } = data;
    const sql = `SELECT valid FROM WorkDetails WHERE work_id = ?`;
    const [rows, fields] = await pool.query(sql, [work_id]);
    return rows;
  } catch (error) {
    console.log(error);
  }
};

const findWorkID = async (data) => {
  try {
    const { work_id } = data;
    const sql = `SELECT * FROM WorkDetails WHERE work_id = ?`;
    const [rows, fields] = await pool.query(sql, [work_id]);
    return rows;
  } catch (error) {
    console.log(error);
  }
};

// fetch all work ids

const fetchWorkId = async () => {
  try {
    const sql = `SELECT work_id,work_desc FROM listofactivity`;
    const [rows, fields] = await pool.query(sql);
    return rows;
  } catch (error) {
    console.log(error);
  }
};

const checkWorkStatus = async (data) => {
  try {
    const { work_id } = data;
    const sql = `SELECT work_status FROM ListOfActivity WHERE work_id = ?`;
    const [rows, fields] = await pool.query(sql, [work_id]);
    return rows;
  } catch (error) {
    console.log(error);
  }
};

const updateWorkStatus = async (data) => {
  try {
    const { work_id, work_status } = data;
    const sql = `UPDATE WorkDetails SET work_status = ? WHERE work_id = ?`;
    const [rows, fields] = await pool.query(sql, [work_status, work_id]);
    return rows;
  } catch (error) {
    console.log(error);
  }
};

const updateListOfActivity = async (data) => {
  try {
    const { work_id, work_status } = data;
    const sql = `UPDATE ListOfActivity SET work_status = ? WHERE work_id = ?`;
    const [rows, fields] = await pool.query(sql, [work_status, work_id]);
    return rows;
  } catch (error) {
    console.log(error);
  }
};

const postProgressDetails = async (data) => {
  try {
    const {
      remark,
      estimated_physical_progress,
      estimated_financial_overview,
      image,
      work_id,
      expected_completion_date,
    } = data;
    const sql = `INSERT INTO ProgressDetails (remark,estimated_physical_progress,estimated_financial_overview,image,work_id,expected_completion_date) VALUES (?,?,?,?,?,?)`;
    const [rows, fields] = await pool.query(sql, [
      remark,
      estimated_physical_progress,
      estimated_financial_overview,
      image,
      work_id,
      expected_completion_date,
    ]);
    return rows;
  } catch (error) {
    console.log(error);
  }
};

const findLatestWorkDeatils = async () => {
  try {
    const sql = "SELECT * FROM WorkDetails WHERE updated_at = (SELECT MAX(updated_at) FROM WorkDetails);";
    const [rows, fields] = await pool.query(sql);
    return rows;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  postProgress,
  setValidation,
  checkValidation,
  findWorkID,
  fetchWorkId,
  checkWorkStatus,
  updateWorkStatus,
  updateListOfActivity,
  postProgressDetails,
  findLatestWorkDeatils,
};
