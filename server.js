const express = require("express");
var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Syb3r2g0",
  database: 'dtm'
});

const app = express();

//define port
const port=3000;

app.get("/get-states-location", (request, response) => {
    const req=request.query
    con.query('SELECT state,locality, coordinated_lat, coordinated_lng FROM foriegn_dataset', (err,rows) => {
      if(err) throw err;
    
      response.json({data:rows})
    
    });
    
    })



app.get("/", (req, res) => {

res.json({message:'Root page'})

})

//run the application
app.listen(port, () => {
  console.log(`running at port ${port}`);
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
  });