const dbConn = require('../../config/database');
const { check, validationResult, body } = require('express-validator');
const router = require('express').Router();
const upload = require('../../upload_middleware/upload');
const bcrypt = require('bcryptjs');
const { sign } = require("jsonwebtoken");
const { checkToken} = require("../../auth_middleware/auth");

//Register Admin

router.post('/', upload.single("profile"),
check('first_name', 'First Name is required').not().isEmpty(),
check('last_name').optional(),
check('date_of_birth','date_of_birth is required').not().isEmpty(),
check('gender').optional(),
check('email','Email is required').isEmail(),
check('password', 'password is required').not().isEmpty(),
check('nationality', 'Nationalityis required').not().isEmpty(),
check('phone', 'Contact number is required ').not().isEmpty().isMobilePhone(),
check('state').optional(),
check('country','Country is required').not().isEmpty(),
check('address','address is required').not().isEmpty(),
 (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  let data = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    date_of_birth:req.body.date_of_birth,
    gender: req.body.gender,
    email: req.body.email,
    password:req.body.password,
    nationality:req.body.nationality,
    phone:req.body.phone,
    state:req.body.state,
    country:req.body.country,
    address:req.body.address,
  };

  // To encrypt the password 
  const salt = bcrypt.genSaltSync(10);
  data.password = bcrypt.hashSync(data.password, salt)

  try {
    //Make email as a unique 
    if(data.email){
      dbConn.query('SELECT * FROM adminLogin WHERE email = ?', [data.email], 
      (error, response, fields)=>{
          if (response.length>0){
            res.status(500).json({
              Status:"False",
              Message:"Email Exit..!!",
            })
          } else
              {
                 let sql = 'INSERT INTO adminLogin SET ?';
  let query =  dbConn.query(sql,data, (err, results) => {
    if(err) {
      res.status(500).json({
        Status:"False",
        Message:"Admin Registeration Failed..!!",
        Error:err
      })
    } else {
      res.status(200).json({
        Status: "True",
        Message: 'Admin Registeration Successfully..!!',
        Result: data
      });
    }
  });
}       
 }
   )}
} catch (err) {
  console.error(err.message);
  return res.status(500).send({
        Status: "False",
        Message: 'Some thing went Wrong'   
      });
}
});

//..........................End Of Register Admin ..........................//


//.........Admin Login By Email And Password............//

router.post('/adminLogin', 
check('password', 'password is required').not().isEmpty(),
check('email','email is required').not().isEmpty(),
async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    let email = req.body.email;
    let password = req.body.password;
   let sql = "select * from adminLogin where email='" + email + "'";
  let query = await dbConn.query(sql, (err, results) => {
    if(err) {
      res.status(500).json({
        Status:"False",
        Message:"Login Failed..!!",
        Error:err
      })
    }
    //To generate The Json Web Token
    const jsontoken = sign({results:results},'qwe1234', {
      expiresIn: '24h',
    });

    if (results.length > 0) {
      //Compare the hashed password from the database
      bcrypt.compare(password, results[0].password, function(err, response) {
        if (response) {
          req.user = results;
          res.status(200).json({
            Status: "True",
            Message: 'Login Successfully..!!',
            Result: results,
            token:jsontoken
          });
        } else {
          res.status(500).json({ message: "Wrong username/password combination!" });
        }
      });
 
    } else {
      res.status(500).json({
        Status: "False",
        Message: 'User does not find..!!',
      });
    }
  });
} catch (err) {
  console.error(err.message);
  return res.status(500).send({
        Status: "False",
        Message: 'Some thing went Wrong'   
      });
}
});

//..........................End Of Admin Login By Email And Password..........................//

//...........................Update Admin Profile..............................//

router.post('/update/id',checkToken,upload.single("profile"), async (req,res) => {
    let admin_id = req.body.admin_id;
    try {
    let sql = "UPDATE adminLogin SET first_name='"+req.body.first_name+"', last_name='"+req.body.last_name+"', date_of_birth='"+req.body.date_of_birth+"',  gender='"+req.body.gender+"',   email ='"+req.body.email+"', password = '"+req.body.password+"',nationality='"+req.body.nationality+"',phone='"+req.body.phone+"', state='"+req.body.state+"',country='"+req.body.country+"',address='"+req.body.address+"' WHERE admin_id='" + admin_id + "'";
    let query = await dbConn.query(sql,(err, results) => { 
   if(err) {
     res.json({
       Status:"false",
       Message:"Update Failed..!!",
       Error:err
     })
   }
      return res.status(200).json({
        Status: "True",
        Message: 'Admin Data Updated Successfully..!!',
      });
    });
  
  } catch (err) {
    console.error(err.message);
    return res.status(500).send({
          Status: "False",
          Message: 'Some thing went Wrong'   
        });
  }
  });

  //...................End of Update Admin Profile  API........................//
  
  router.get('/', async (req, res) => {
    try {
      
      let sql ='SELECT admin_id, first_name, last_name, email, phone FROM adminLogin' ;
    let query = await dbConn.query(sql, (err, results) => {
      if(err) {
        res.status(500).json({
          Status:"False",
          Message:"Listing The Admin is Failed...!!",
          Error: err
        })
      }
      if (results.length) {
        res.status(200).json({
          Status: "True",
          Message: 'Admin Listed Successfully..!!',
          Result: results
        });
        return;
      }
      res.status(500).json({
        Status: "False",
        Message: 'Record Not Found..!!',
      });
    });
  } catch (err) {
    console.error(err.message);
    return res.status(500).send({
          Status: "False",
          Message: 'Some thing went Wrong'   
        });
  }
  });
  
  //..........................End Of Listing All Admin Profile API...................//
  
  //.....................Fetching Admin Data By Id.............................//

  router.post('/id', checkToken, async (req, res) => {
    try {
      let admin_id = req.body.admin_id;
     let sql = "select * from adminLogin where admin_id='" + admin_id + "'";
    let query = await dbConn.query(sql, (err, results) => {
      if(err) {
        res.status(500).json({
          Status:"False",
          Message:"Fetching Admin Data By Id Failed..!!",
          Error:err
        })
      }
      if (results.length) {
        res.status(200).json({
          Status: "True",
          Message: 'Admin Fetched Successfully..!!',
          Result: results[0]
        });
        return;
      }
      res.status(500).json({
        Status: "False",
        Message: 'Record Not Found ..!!',
      });
    });
  } catch (err) {
    console.error(err.message);
    return res.status(500).send({
          Status: "False",
          Message: 'Some thing went Wrong'   
        });
  }
  });
  
  // .......................End Of Fetching Admin By Id API.......................//
  
  //.....................Delete particular Admin data from the table By ID...........................//
  
  router.post('/delete/id', checkToken, async (req, res) => {
    try {
      let admin_id = req.body.admin_id
    let sql = "DELETE FROM adminLogin WHERE admin_id='" + admin_id + "'";
    let query = await dbConn.query(sql, (err, results) => {
      if(err) {
        res.status(500).json({
          Status:"False",
          Message:"Deleting Admin Data By Id Failed...!!",
          Error:err
        })
      }
      if (results.affectedRows == 0) {
        res.status(500).json({
          Status: "False",
          Message: 'Record Not Found..!!',
        });
        return;
      }
      res.status(200).json({
        Status: "True",
        Message: 'Admin Deleted Succesfully ..!!',
        Result: results.affectedRows
      });
    });
  } catch (err) {
    console.error(err.message);
    return res.status(500).send({
          Status: "False",
          Message: 'Some thing went Wrong'   
        });
  }
  });
  
  //..........................End of Deleing Admin By Id API.................................//
  

  module.exports = router;