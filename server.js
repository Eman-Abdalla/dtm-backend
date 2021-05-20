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

app.get("/foriegn_get-states-location", (request, response) => {
    const req=request.query
    con.query('SELECT state,locality, coordinated_lat, coordinated_lng FROM foriegn_dataset', (err,rows) => {
      if(err) throw err;
    
      response.json({data:rows})
    
    });
    
    })

    /** get IDPs count */
    app.get("/idps_total_count", (request, response) => {
      const req=request.query
      con.query('SELECT (SUM(less_than_1_male )+SUM(less_than_1_female )+SUM(from_1_5_male)+SUM(from_1_5_female)+SUM(from_6_17_male)+SUM(from_6_17_female)+SUM(from_18_59_male)+SUM(from_18_59_female)+SUM(over_60_male)+SUM(over_60_female)) AS Total FROM idps_dataset ', (err,rows) => {
        if(err) throw err;
      
        response.json({data:rows})
      
      });
      
      })
      
       /** get IDPs states count */
    app.get("/idps_total_states", (request, response) => {
      const req=request.query
      con.query('SELECT DISTINCT COUNT(state_admin1) FROM idps_dataset WHERE 1', (err,rows) => {
        if(err) throw err;
      
        response.json({data:rows})
      
      });
      
      })


            /** get IDPs location count */
    app.get("/idps_total_locations", (request, response) => {
      const req=request.query
      con.query('SELECT DISTINCT COUNT(location_admin3) FROM idps_dataset WHERE 1', (err,rows) => {
        if(err) throw err;
      
        response.json({data:rows})
      
      });
      
      })

                /** get returnees location count */
    app.get("/returnees_total_location", (request, response) => {
      const req=request.query
      con.query('SELECT DISTINCT COUNT(location_admin3) FROM permenant_returnees  WHERE 1', (err,rows) => {
        if(err) throw err;
      
        response.json({data:rows})
      
      });
      
      })

                   /** get returnees location count */
    app.get("/returnees_count", (request, response) => {
      const req=request.query
      con.query('SELECT DISTINCT SUM(returnees_ind) FROM permenant_returnees  WHERE 1', (err,rows) => {
        if(err) throw err;
      
        response.json({data:rows})
      
      });
      
      })

                       /** get returnees location count */
    app.get("/returnees_states_count", (request, response) => {
      const req=request.query
      con.query('SELECT DISTINCT SUM(state_admin1) FROM permenant_returnees  WHERE 1', (err,rows) => {
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