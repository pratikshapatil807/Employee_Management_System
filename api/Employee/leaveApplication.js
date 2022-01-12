const dbConn = require('../../config/database');
const { check, validationResult, body } = require('express-validator');
const router = require('express').Router();
const { checkToken} = require("../../auth_middleware/auth")


//.....................Apply for Leave..........................//

router.post('/', checkToken,
check('emp_id', 'emp_id is required').not().isEmpty(),
check('first_name', 'first_name is required').not().isEmpty(),
check('last_name').optional(),
check('leave_type','leave_type is required').not().isEmpty(),
check('leave_start_date', 'leave_start_date is required').not().isEmpty(),
check('leave_end_date', 'leave_end_date required').not().isEmpty(),
check('total_days_of_leave', 'total_days_of_leave number is required ').not().isEmpty(),
check('leave_reason','leave_reason is required').not().isEmpty(),

async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  let data = {
    emp_id: req.body.emp_id,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    leave_type: req.body.leave_type,
    leave_start_date: req.body.leave_start_date,
    leave_end_date: req.body.leave_end_date,
    total_days_of_leave: req.body.total_days_of_leave,
    leave_reason: req.body.leave_reason
  };

  try {
   let sql = 'INSERT INTO leaveApplication SET ?';
  let query = await dbConn.query(sql,data, (err, results) => {
    if(err) {
      res.status(500).json({
        Status:"False",
        Message:"Adding leave failed..!!",
        Error:err
      })
    } else {
      res.status(200).json({
        Status: "True",
        Message: 'Leave Added Successfully..!!',
        Result: data
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

//..........................End Of Applying Leave API ..........................//

//...................... View leave application by id.............................//
router.post('/leaveById',checkToken,
async (req, res) => {
  try {
    let emp_id = req.body.emp_id;
    let sql = "select * from leaveApplication where emp_id='" + emp_id + "'";
  let query = await dbConn.query(sql, (err, results) => {
    if(err) {
      res.status(500).json({
        Status:"False",
        Message:"Listing  Leave Application Failed...!!",
        Error: err
      })
    }
    if (results.length) {
      res.status(200).json({
        Status: "True",
        Message: 'Leave Application Listed Successfully..!!',
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

//............................View leave application by id...........................//





  module.exports = router;