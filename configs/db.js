
const dotenv = require('dotenv');
const path = require("path");
const mysql = require('mysql2');

require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASS,
}).promise();

let sql = "select * from test";

const test = async () =>{
    try {
        const [rows, fields] = await pool.query(sql);
        return rows;
    } catch (error) {
        console.log(error);
    }
}

module.exports = test;