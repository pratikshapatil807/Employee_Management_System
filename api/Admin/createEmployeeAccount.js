const dbConn = require('../../config/database');
const { check, validationResult } = require('express-validator');
const router = require('express').Router();
var nodemailer = require('nodemailer');
const Crypto = require('crypto');
const upload = require('../../upload_middleware/upload');
var path = require('path');
const { checkToken} = require("../../auth_middleware/auth")

//..........................Create Employee Profile.....................................//

router.post('/', checkToken,  upload.fields([
  {
    name: 'photo',
    maxCount: 1,
  },
  {
    name: 'education_documents',
    maxCount: 20,
  },
  {
    name: 'experience_documents',
    maxCount: 20,
  },
  {
    name: 'other_documents',
    maxCount: 20,
  },
]),
check('first_name', 'First Name is required').not().isEmpty(),
check('last_name').optional(),
check('date_of_birth','date_of_birth is required').not().isEmpty(),
check('gender').optional(),
check('maritial_status').optional(),
check('nationality', 'Nationalityis required').not().isEmpty(),
check('email','Email is required').isEmail(),
check('phone', 'Contact number is required ').not().isEmpty().isMobilePhone(),
check('state').optional(),
check('country','Country is required').not().isEmpty(),
check('address','address is required').not().isEmpty(),
check('joining_date','joining_date is required').not().isEmpty(),
check('department', 'Department Name is required').not().isEmpty(),
check('designation', 'Designation is required').not().isEmpty(),
check('job_type', 'job_type is required').not().isEmpty(),
check('status', 'Status is required').not().isEmpty(),
check('bank_name', 'bank_name is required').not().isEmpty(),
check('account_number', ' account_number is required').not().isEmpty(),
check('ifsc_code', 'ifsc_code is required').not().isEmpty(),
check('monthly_salary', 'monthly_salary is required').not().isEmpty(),
check('annual_salary', 'annual_salary is required').not().isEmpty(),
 (req, res) => {
   const errors = validationResult(req);
   if (!errors.isEmpty()) {
     return res.status(400).json({ errors: errors.array() });
   }
  let data = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    date_of_birth: req.body.date_of_birth,
    gender: req.body.gender,
    maritial_status:req.body.maritial_status,
    nationality:req.body.nationality,
    email: req.body.email,
    phone: req.body.phone,
    state: req.body.state,
    country: req.body.country,
    address:req.body.address,
    joining_date: req.body.joining_date,
    department: req.body.department,
    designation: req.body.designation,
    job_type:req.body.job_type,
    status: req.body.status,
    bank_name:req.body.bank_name,
    account_number:req.body.account_number,
    ifsc_code:req.body.ifsc_code,
    monthly_salary:req.body.monthly_salary,
    annual_salary: req.body.annual_salary, 
  };
  try {
    //To check email exit or not 
      if(data.email){
        dbConn.query('SELECT * FROM create_employees WHERE email = ?', [data.email], 
        (error, response, fields)=>{
            if (response.length>0){
              res.status(500).json({
                Status:"False",
                Message:"Email Exit..!!",
              })
            }else{
                let sql = 'INSERT INTO create_employees SET ?';
                let query =  dbConn.query(sql, data, (err, results) => { 
                  if(err) {
                    return res.json ({
                      Status: "Failed",
                      Message:"Creating Employee Failed..!!",
                      Error: err
                    })
                  }
                
                  //Generate the Random Password
              
                  var randomPassword = randomString();
                  function randomString(size = 5) {  
                    return Crypto
                      .randomBytes(size)
                      .toString('base64')
                      .slice(0, size)
                  }
                
                  console.log(randomPassword);
              
                  //Send the Email To the given Mail id
              
                  var transporter = nodemailer.createTransport({
                    service: 'gmail',
              
                    auth: {
                      user: 'ppratiksha94@gmail.com',
                      pass: 'pratiksha@developer',
                    },
                    tls: {
                      rejectUnauthorized: false
                    }
                  });
                
              
                  var mailOptions = {
                    from: 'ppratiksha94@gmail.com',
                    to: data.email,
                    subject: 'Employee Account Creation',
                         html:
                      "<P>Congragulations..Your Account Creation As Employee Complete.<br>To login Your Account use Given Username And Password</p><br> &username=" +
                      data.email + 
                    "<br>&password=" +
                    randomPassword +"<br>and Your Employee ID is =" + results.insertId + "<br> <b>After Login Complete Your Profile By Uploding Your Required Documents</b>",
                  };
                  transporter.sendMail(mailOptions, function (error, info) {
                    if (error) {
                      console.log(error);
                    } else {
                      console.log('Email sent: ' + info.response);
                    }
                  });
                
              
                //Update the Employee table with Random Password
              
                  let sql_lf ="INSERT INTO employee_login SET username='" + data.email + "', password='" + randomPassword + "',emp_id='" + results.insertId + "'";
                  let query_lf = dbConn.query(sql_lf, (err, results) => {
                    if(err) {
                      console.log(err)
                    }
                  });
              
              
                   //Update the Employee_salary table with Salary Details
                  
                  let sql_sm ="INSERT INTO employee_salary SET first_name='" + data.first_name + "', last_name='" + data.last_name + "',  bank_name='" + data.bank_name + "', account_number='" + data.account_number + "',ifsc_code='" + data.ifsc_code + "', monthly_salary='" + data.monthly_salary + "',annual_salary='" + data.annual_salary + "', emp_id='" + results.insertId + "'";
                  let query_sm = dbConn.query(sql_sm, (err, results) => {
                    if(err) {
                      console.log(err)
                    }
                  });
              
                  return res.status(200).json({
                    Status: "True",
                    Message: 'Employee Created Successfully..!!',
                    Employee_ID: results.insertId,
                    Mail: mailOptions,
                    Random_password: randomPassword, 
                    
                  });
                
                });
              
            }
        });
        }else{
            res.send('Enter Email');
        };     
} catch (err) {
  console.error(err.message);
  return res.status(500).send({
        Status: "False",
        Message: 'Some thing went Wrong'   
      });
}
});

//....................End Of Create Employee API................................//

//...........................Update Employee Profile..............................//

router.post('/update/id',checkToken, upload.fields([
  {
    name: 'photo',
    maxCount: 1,
  },
  {
    name: 'education_documents',
    maxCount: 20,
  },
  {
    name: 'experience_documents',
    maxCount: 20,
  },
  {
    name: 'other_documents',
    maxCount: 20,
  },
]),
async (req,res) => {
  let emp_id = req.body.emp_id;
  try {
  let sql = "UPDATE create_employees SET first_name='"+req.body.first_name+"', last_name='"+req.body.last_name+"', date_of_birth='"+req.body.date_of_birth+"', gender='"+req.body.gender+"', maritial_status='"+req.body.maritial_status+"', email ='"+req.body.email+"',nationality='"+req.body.nationality+"',phone='"+req.body.phone+"', state='"+req.body.state+"',country='"+req.body.country+"',address='"+req.body.address+"',joining_date='"+req.body.joining_date+"', department='"+req.body.department+"', designation='"+req.body.designation+"',job_type='"+req.body.job_type+"', status='"+req.body.status+"',bank_name='" + req.body.bank_name + "', account_number='"+req.body.account_number+"',ifsc_code='"+req.body.ifsc_code+"', monthly_salary='"+req.body.monthly_salary+"', annual_salary='"+req.body.annual_salary+"' WHERE emp_id='" + emp_id + "'";
  let query = await dbConn.query(sql,(err, results) => { 
 if(err) {
   res.json({
     Status:"false",
     Message:"Update Failed..!!",
     Error:err
   })
 }

    //Send the Email To the given Mail id
              
    var transporter = nodemailer.createTransport({
      service: 'gmail',
  
      auth: {
        user: 'ppratiksha94@gmail.com',
        pass: 'pratiksha@developer',
      },
      tls: {
        rejectUnauthorized: false
      }
    });
  
  
    var mailOptions = {
      from: 'ppratiksha94@gmail.com',
      to: req.body.email,
      subject: 'Updating Employee Account ',
           html:
        "<P>Your Account Updated Successfully</p>",
    };
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
 //Update the Employee_salary table with Salary Details
                  
 let sql_sm ="UPDATE employee_salary SET first_name='" + req.body.first_name + "', last_name='" + req.body.last_name + "', bank_name='" + req.body.bank_name + "', account_number='" + req.body.account_number + "',ifsc_code='" + req.body.ifsc_code + "', monthly_salary='" + req.body.monthly_salary + "',annual_salary='" + req.body.annual_salary + "'WHERE emp_id='" + emp_id + "'";
   let query_sm = dbConn.query(sql_sm, (err, results) => {
   if(err) {
  console.log(err)
  }
    });

    return res.status(200).json({
      Status: "True",
      Message: 'Employee Data Updated Successfully..!!',
      Mail: mailOptions,
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

//...................End of Update Employee Profile  API........................//


 //...................List all Employees Profile...............................//

router.get('/',async (req, res) => {
  try {
    let sql ='SELECT emp_id,first_name,last_name,email,phone,department,designation FROM create_employees' ;
  let query = await dbConn.query(sql, (err, results) => {
    if(err) {
      res.status(500).json({
        Status:"False",
        Message:"Listing The Employees is Failed...!!",
        Error: err
      })
    }
    if (results.length) {
      res.status(200).json({
        Status: "True",
        Message: 'Employee Listed Successfully..!!',
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

//..........................End Of Listing All Employees API...................//


//.........................Fetching Employee Data By Id.............................//

router.post('/id', checkToken, async (req, res) => {
  try {
    let emp_id = req.body.emp_id;
   let sql = "select * from create_employees where emp_id='" + emp_id + "'";
  let query = await dbConn.query(sql, (err, results) => {
    if(err) {
      res.status(500).json({
        Status:"False",
        Message:"Fetching Employee Data By Id Failed..!!",
        Error:err
      })
    }
    if (results.length) {
      res.status(200).json({
        Status: "True",
        Message: 'Employee Fetched Successfully..!!',
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

// .......................End Of Fetching Employee By Id API.......................//


//........................Delete all data from the table.............................//

router.delete('/deleteall', checkToken, async (req, res) => {
  try {  
  let sql = 'DELETE FROM create_employees ';
  let query = await dbConn.query(sql, (err, results) => {
    let sql_lf = 'DELETE FROM employee_login ';
    let query_lf =  dbConn.query(sql_lf, (err, results) => {});
    let sql_l = 'DELETE FROM employee_salary ';
    let query_l =  dbConn.query(sql_l, (err, results) => {});
    if(err) {
      res.status(500).json({
        Status:"False",
        Message:"Deleting All Employees Failed",
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
      Message: 'All Employees Deleted Succesfully ..!!',
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

//........................End of Deleting All Data from the table API..............................//

//.........................Delete particular Employee data from the table By ID..............................//

router.post('/delete/id', checkToken,async (req, res) => {
  try {
    let emp_id = req.body.emp_id
  let sql = "DELETE FROM create_employees WHERE emp_id='" + emp_id + "'";
  let query = await dbConn.query(sql, (err, results) => {
    let sql_lf = "DELETE FROM employee_salary WHERE emp_id='" + emp_id + "'";
    let query_lf =  dbConn.query(sql_lf, (err, results) => {});
    let sql_l = "DELETE FROM employee_login WHERE emp_id='" + emp_id + "'";
    let query_l =  dbConn.query(sql_l, (err, results) => {});
    if(err) {
      res.status(500).json({
        Status:"False",
        Message:"Deleting Employee Data By Id Failed...!!",
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
      Message: 'Employee Deleted Succesfully ..!!',
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

//..........................End of Deleing Employee By Id API.................................//

//.........................Fetching Employee Data By Designation.............................//

router.post('/designation', checkToken, async (req, res) => {
  try {
    let designation = req.body.designation;
   let sql = "select * from create_employees where designation='" + designation + "'";
  let query = await dbConn.query(sql, (err, results) => {
    if(err) {
      res.status(500).json({
        Status:"False",
        Message:"Fetching Employee Data By Id Failed..!!",
        Error:err
      })
    }
    if (results.length) {
      res.status(200).json({
        Status: "True",
        Message: 'Employee Searched Successfully..!!',
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

// .......................End Of Fetching Employee By Designation API.......................//

//.........................Fetching Employee Data By Designation.............................//

router.post('/department', checkToken, async (req, res) => {
  try {
    let department = req.body.department;
   let sql = "select * from create_employees where department='" + department + "'";
  let query = await dbConn.query(sql, (err, results) => {
    if(err) {
      res.status(500).json({
        Status:"False",
        Message:"Fetching Employee Data By Id Failed..!!",
        Error:err
      })
    }
    if (results.length) {
      res.status(200).json({
        Status: "True",
        Message: 'Employee Fetched Successfully..!!',
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

// .......................End Of Fetching Employee By department API.......................//


module.exports = router;
