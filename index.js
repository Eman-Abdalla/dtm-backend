const fs = require('fs');
const mysql = require('mysql');

const multer = require('multer');
const express = require('express');

const readXlsxFile = require('read-excel-file/node');
const app = express();



// -> Import Excel Data to MySQL database
var uploadIdps = function importExcelData2MySQL(filePath){
    // File path.
	readXlsxFile(filePath).then((rows) => {
		// `rows` is an array of rows
		// each row being an array of cells.	 
		console.log(rows);
	 
	 
		// Remove Header ROW
		rows.shift();


        // Create a connection to the database
		const connection = mysql.createConnection({
			host: 'localhost',
			user: 'root',
			password: 'Syb3r2g0',
			database: 'test_dtm'
		});

        // Open the MySQL connection
		connection.connect((error) => {
			if (error) {
				console.error(error);
			} else {
				let query = 'INSERT INTO idps_dataset VALUES ?';
				connection.query(query, [rows], (error, response) => {
				console.log(error || response);

				/**
				OkPacket {
				fieldCount: 0,
				affectedRows: 5,
				insertId: 0,
				serverStatus: 2,
				warningCount: 0,
				message: '&Records: 5  Duplicates: 0  Warnings: 0',
				protocol41: true,
				changedRows: 0 } 
				*/
				});
			}
		});
	});//read rows



    }

    exports.uploadIdps = uploadIdps;


  

