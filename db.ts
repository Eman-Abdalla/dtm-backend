import { env } from "node:process";

const express = require("express");
var mysql = require('mysql');
import * as dotenv from "dotenv";
dotenv.config();

var con = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PWD,
  database: process.env.DB_NAME
});