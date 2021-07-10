const express = require("express");
var mysql = require('mysql');
const cors = require('cors');
var request = require('request');
const readXlsxFile = require('read-excel-file/node');

var multer  =   require('multer');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Syb3r2g0",
  database: 'dtm'
});

const app = express();
global.__basedir = __dirname;

//define port
const port=3000;
//run the application
var corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.use(cors())
app.options("*", cors())
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
      con.query('SELECT SUM(value) AS returnees_total_count FROM returnees_ind_view ', (err,rows) => {
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
    con.query('SELECT * FROM idps', function(error, results, fields) {
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
      con.query('SELECT * FROM returnees_ind_view ', function(error, results, fields) {
        if(error) throw error;
      
      
        
        response.json({data:results})
      
      });
      
      })
      



app.get("/", (req, res) => {

res.json({message:'Root page'})

})
app.get("/index.html", (req, res) => {

  res.sendFile(__dirname + '/index.html');
  
  })



app.listen(port, () => {
  console.log(`running at port ${port}`);
});



con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
  });
 

  app.get("/getPbiAccessToken", (myrequest, res) => {
    // const req=myrequest.request

    request({
      headers: {
        'Content-Type': 'application/form-data'
      },
      url: "https://login.microsoftonline.com/1588262d-23fb-43b4-bd6e-bce49c8e6186/oauth2/token",
      method: "POST",
      json: true,   // <--Very important!!!,
      form:  { 
        grant_type: 'password',
      scope: 'openid',
      resource: 'https://analysis.windows.net/powerbi/api',
      client_id: '370db508-5807-47d2-afa2-ee8e527538d4',
      username: 'omosman@iom.int',
      password: 'Admin123==========',
      client_secret: '1Bo.Gvt7~qS~fR~y2roJFUR62VDp.yF8rr'
    }
  }, function (error, response, body){
      // console.log(response);
      res.json(body)
  });

 

    // res.json({message:'Root page'})
    
    });

    app.get('/index', function(req, res) {
      res.sendFile('/index.html');
    });


    const storage = multer.diskStorage({
      destination: (req, file, cb) => {
         cb(null, __basedir + '/uploads/')
      },
      filename: (req, file, cb) => {
        console.log("fileIs>> "+ file.fieldname);
        if(file.fieldname === "idpsfile")
         cb(null, "idps.xlsx")
         else if(file.fieldname === "permanent")
         cb(null, "permanent.xlsx")
         else console.log("none of them>>>");
      }
    });
    
    const upload = multer({storage: storage}).fields([{name: "idpsfile"}, {name: "permanent"}]);;
    var objTest= require("./index.js");
    
    // -> Express Upload RestAPIs
    app.post('/uploadfile', upload, (req, res) =>{

      // console.log("fileRequestIs:: "+ req.files['idpsfile'][0].filename);
      
      objTest.uploadIdps(__basedir + '/uploads/' + "permanent.xlsx", "permanent");


              objTest.uploadIdps(__basedir + '/uploads/' + "idps.xlsx", "idps");



        
      // importExcelData2MySQL(__basedir + '/uploads/' + req.file.filename);
      res.json({
            'msg': 'File uploaded/import successfully!', 'file': req.files
          });

          // console.log("FileName: "+ req.files.filename);

    });
    
   
    
  
