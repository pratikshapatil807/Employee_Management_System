const dbConn = require('../../config/database');
const router = require('express').Router();
const { checkToken} = require("../../auth_middleware/auth")

 //.................List all Employees Salary details..............................//

//........................Fetching Employee Salary Data By Id.................................//

router.post('/id', async (req, res) => {
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
