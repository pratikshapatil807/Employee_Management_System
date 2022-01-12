const dbConn = require('../../config/database');
const router = require('express').Router();
const { checkToken } = require("../../auth_middleware/auth")
// const excel = require('exceljs');

 //.................List all Employees Salary details..............................//

router.get('/salary',async (req, res) => {
  try {
    let sql ='SELECT emp_id,first_name,last_name,monthly_salary,annual_salary FROM employee_salary' ;
  let query = await dbConn.query(sql, (err, results) => {
    if(err) {
      res.status(500).json({
        Status:"False",
        Message:"Listing The Employees details is Failed...!!",
        Error: err
      })
    }
    if (results.length) {
      res.status(200).json({
        Status: "True",
        Message: 'Employees Salary Listed Successfully..!!',
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

//..........................End Of Listing All Employees Salary API...................//


//........................Fetching Employee Salary Data By Id.................................//

router.post('/id', checkToken, async (req, res) => {
  try {
    let emp_id = req.body.emp_id;
   let sql = "select * from employee_salary where emp_id='" + emp_id + "'";
  let query = await dbConn.query(sql, (err, results) => {
    if(err) {
      res.status(500).json({
        Status:"False",
        Message:"Fetching Employee Salary Data By Id Failed..!!",
        Error:err
      })
    }
    if (results.length) {
      res.status(200).json({
        Status: "True",
        Message: 'Employee Salary Fetched Successfully..!!',
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

// .......................End Of Fetching Employee Salary By Id API.......................//



module.exports = router;
