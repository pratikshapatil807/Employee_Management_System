const dbConn = require('../../config/database');
const { check, validationResult, body } = require('express-validator');
const router = require('express').Router();
const upload = require('../../upload_middleware/upload');
const { checkToken} = require("../../auth_middleware/auth")


//...................Add Attendence.........................//

router.post('/', checkToken,
check('emp_id', 'emp_id is required').not().isEmpty(),
check('first_name', 'first_name is required').not().isEmpty(),
check('last_name').optional(),
check('entry_time','entry_time is required').not().isEmpty(),
check('exit_time', 'exit_time is required').optional(),


async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  let data = {
    emp_id: req.body.emp_id,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    entry_time: req.body.entry_time,
    exit_time: req.body.exit_time,
  };

  try {
   let sql = 'INSERT INTO attendence SET ?';
  let query = await dbConn.query(sql,data, (err, results) => {
    if(err) {
      res.status(500).json({
        Status:"False",
        Message:"Adding attendence failed..!!",
        Error:err
      })
    } else {
      res.status(200).json({
        Status: "True",
        Message: 'attendence Added Successfully..!!',
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

//..........................End Of Add Attendence API ..........................//
  
//....................Update Attendence..........................//

router.post('/update_attendence/id', checkToken,
async (req,res) => {
    let emp_id = req.body.emp_id;
    try {
    let sql = "UPDATE attendence SET first_name='"+req.body.first_name+"', last_name='"+req.body.last_name+"',entry_time='"+req.body.entry_time+"', exit_time='"+req.body.exit_time+"' WHERE emp_id ='" + emp_id + "'";
    let query = await dbConn.query(sql,(err, results) => { 
   if(err) {
     res.json({
       Status:"false",
       Message:"Update Failed",
       Error:err
     })
   }
      return res.status(200).json({
        Status: "True",
        Message: 'attendence Updated Successfully..!!',
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

//...................End of Update Attendence API........................//

//.............................List all Employees Attendence.........................//
  
  router.get('/', async (req, res) => {
    try {
      let sql ='SELECT * FROM attendence' ;
    let query = await dbConn.query(sql, (err, results) => {
      if(err) {
        res.status(500).json({
          Status:"False",
          Message:"Listing The employees attendence Failed...!!",
          Error: err
        })
      }
      if (results.length) {
        res.status(200).json({
          Status: "True",
          Message: 'Employee attendence Listed Successfully..!!',
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

//..........................End Of Listing All Employees Attendence API...................//

 
  module.exports = router;