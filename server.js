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
console.log("tessstttt  >>>>")



app.get("/foriegn_get-states-location", (request, response) => {
    const req=request.query
    con.query('SELECT state,locality, coordinated_lat, coordinated_lng FROM foriegn_dataset', (err,rows) => {
      if(err) throw err;
    
      response.json({data:rows})
    
    });
    
    })

    /** get IDPs  -- individuals */
    app.get("/idps_total_count", (request, response) => {
      const req=request.query
      con.query('SELECT SUM(round_2_ind) AS idps_total_count FROM idps_dataset ', (err,rows) => {
        if(err) throw err;
      
        response.json({data:rows})
      
      });
      
      })
      
       /** get IDPs states count --Governates */
    app.get("/idps_total_states", (request, response) => {
      const req=request.query
      con.query('SELECT  COUNT(DISTINCT state_admin1) AS idps_total_states FROM idps_dataset WHERE 1', (err,rows) => {
        if(err) throw err;
      
        response.json({data:rows})
      
      });
      
      })

       /** get IDPs states count --Districts */
    app.get("/idps_total_districts", (request, response) => {
      const req=request.query
      con.query('SELECT  COUNT(DISTINCT locality_admin2) AS idps_total_districts FROM idps_dataset WHERE 1', (err,rows) => {
        if(err) throw err;
      
        response.json({data:rows})
      
      });
      
      })


            /** get IDPs location count */
    app.get("/idps_total_locations", (request, response) => {
      const req=request.query
      con.query('SELECT  COUNT(DISTINCT location_admin3) AS idps_total_locations FROM idps_dataset WHERE 1', (err,rows) => {
        if(err) throw err;
      
        response.json({data:rows})
      
      });
      
      })

       /** get returnees  -- total individuals */
    app.get("/returnees_total_count", (request, response) => {
      const req=request.query
      con.query('SELECT SUM(returnees_ind) AS returnees_total_count FROM returnees_ind_view ', (err,rows) => {
        if(err) throw err;
      
        response.json({data:rows})
      
      });
      
      })



                       /** get returnees location count --Governates */
    app.get("/returnees_states_count", (request, response) => {
      const req=request.query
      con.query('SELECT  (COUNT(DISTINCT permenant_returnees.state_admin1)+ COUNT(DISTINCT seasonal_returnees.state_admin_1)+ COUNT(DISTINCT from_abroad.state_admin1) ) AS returnees_locations_count FROM permenant_returnees, seasonal_returnees, from_abroad', (err,rows) => {
        if(err) throw err;
      
        response.json({data:rows})
      
      });
      
      })

      /** get returnees states count --districts */
    app.get("/returnees_districts_count", (request, response) => {
      const req=request.query
      con.query('SELECT  (COUNT(DISTINCT permenant_returnees.locality_admin2)+ COUNT(DISTINCT seasonal_returnees.locality_admin_2)+ COUNT(DISTINCT from_abroad.locality_admin2) ) AS returnees_locations_count FROM permenant_returnees, seasonal_returnees, from_abroad', (err,rows) => {
        if(err) throw err;
      
        response.json({data:rows})
      
      });
      
      })

       /** get returnees states count --Locations  */
    app.get("/returnees_locations_count", (request, response) => {
      const req=request.query
      con.query('SELECT  (COUNT(DISTINCT permenant_returnees.location_admin3)+ COUNT(DISTINCT seasonal_returnees.location_admin_3)+ COUNT(DISTINCT from_abroad.location_admin3) ) AS returnees_locations_count FROM permenant_returnees, seasonal_returnees, from_abroad', (err,rows) => {
        if(err) throw err;
      
        response.json({data:rows})
      
      });
      
      })

   /** GET INDIVIDUALS FOR EVERY STATE OR DISTRICT FOR PERMENANT RETURNEES */
   app.get("/permenant_returnees", (request, response) => {
    const req=request.query
    con.query('SELECT DISTINCT (state_admin1), SUM(returnees_ind) AS returnees_individuals FROM permenant_returnees GROUP BY (state_admin1)', (err,rows) => {
      if(err) throw err;
    
      response.json({data:rows})
    
    });
    
    })

       /** GET INDIVIDUALS FOR EVERY STATE OR DISTRICT FOR SEASONAL RETURNEES */
   app.get("/seasonal_returnees", (request, response) => {
    const req=request.query
    con.query('SELECT DISTINCT (state_admin_1), SUM(returnees_ind) AS seasonal_returnees_ind   FROM seasonal_returnees  GROUP BY (state_admin_1)', (err,rows) => {
      if(err) throw err;
    
      response.json({data:rows})
    
    });
    
    })

  //      /** GET INDIVIDUALS FOR EVERY STATE OR DISTRICT FOR RETURNEES FROM ABROAD */
   app.get("/abroad_returnees", (request, response) => {
    const req=request.query
     con.query('SELECT DISTINCT (state_admin1), SUM(returnees_ind) AS abroad_returnees FROM from_abroad  GROUP BY (state_admin1)', (err,rows) => {
       if(err) throw err;
    
       response.json({data:rows})

      //  console.log("tessstttt  %rows", rows)

     
    
     });
   })

 
  
    


          /** GET INDIVIDUALS FOR EVERY STATE OR DISTRICT FOR IDPS */
   app.get("/idps_individuals", (request, response) => {
    const req=request.query
    con.query('SELECT state_admin1, idps_ind , state_code, state_path FROM idps', function(error, results, fields) {
      if(error) throw error;
    
      // var rows = JSON.parse(JSON.stringify(results));
      // for(i=0; i<rows.length; i++){
      //   if(JSON.stringify(rows[i]['state_admin1']).includes("Blue Nile")){

      //   }
      // }
      
      response.json({data:results})
    
    });
    
    })

    app.get("/returnees_individuals", (request, response) => {
      const req=request.query
      con.query('SELECT state_admin1, returnees_ind , state_code, state_path FROM returnees_ind_view ', function(error, results, fields) {
        if(error) throw error;
      
        var rows = JSON.parse(JSON.stringify(results));
        for(i=0; i<rows.length; i++){
          if(JSON.stringify(rows[i]['state_admin1']).includes("Blue Nile")){
  
          }
        }
        
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

//   con.query('SELECT DISTINCT (state_admin1), SUM(returnees_ind) FROM permenant_returnees GROUP BY (state_admin1)',function(error, results, fields) {
//     if(error) {
//         console.log(error);
//         return;
//     }
//     var rows = JSON.parse(JSON.stringify(results));
//     var blue_nile = 0;
//     var central_darfur = 0;
//     var east_darfur = 0;
//     var north_darfur = 0;
//     var south_darfur= 0;
//     var south_kordufan= 0;
//     var west_darfur= 0;
//     var wast_kordufan= 0;
    
//   for (var i = 0; i < rows.length; i++) {
//       if(JSON.stringify(rows[i]['state_admin1']).includes("Blue Nile")){
//       blue_nile += rows[i]['SUM(returnees_ind)']
//       }else if(JSON.stringify(rows[i]['state_admin1']).includes("Central Darfur")){
//         central_darfur += rows[i]['SUM(returnees_ind)']
//       }else if(JSON.stringify(rows[i]['state_admin1']).includes("East Darfur")){
//         east_darfur += rows[i]['SUM(returnees_ind)']

//       }else if(JSON.stringify(rows[i]['state_admin1']).includes("North Darfur")){
//         north_darfur += rows[i]['SUM(returnees_ind)']

//       }else if(JSON.stringify(rows[i]['state_admin1']).includes("South Darfur")){
//         south_darfur += rows[i]['SUM(returnees_ind)']

//       }else if(JSON.stringify(rows[i]['state_admin1']).includes("South Kordofan")){
//         south_kordufan += rows[i]['SUM(returnees_ind)']

//       }else if(JSON.stringify(rows[i]['state_admin1']).includes("West Darfur")){
//         west_darfur += rows[i]['SUM(returnees_ind)']

//       }else if(JSON.stringify(rows[i]['state_admin1']).includes("West Kordofan")){
//         blue_nile += rows[i]['SUM(returnees_ind)']

//       }
   
//   }
//   console.log("blue nilee>> ",JSON.stringify(blue_nile))
    
// });