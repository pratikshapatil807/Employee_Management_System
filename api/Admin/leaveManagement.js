const dbConn = require('../../config/database');
const router = require('express').Router();
const { checkToken} = require("../../auth_middleware/auth")

//..................................List all Leave Applications............................//
  
  router.get('/allLeave', async (req, res) => {
    try {
      let sql ='SELECT emp_id,leave_type,total_days_of_leave FROM leaveApplication' ;
    let query = await dbConn.query(sql, (err, results) => {
      if(err) {
        res.status(500).json({
          Status:"False",
          Message:"Listing The Leave Application Failed...!!",
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
  
//..........................End Of Listing All Leave Applications API...................//

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

//.........................Update Leave Status .........................//

router.post('/leaveStatus',checkToken, async (req,res) => {
  let id = req.body.id;
  try {
  let sql = "UPDATE leaveApplication SET status='"+req.body.status+"', reason='"+req.body.reason+"' WHERE id='" + id + "'";
  let query = await dbConn.query(sql,(err, results) => { 
 if(err) {
   res.json({
     Status:"false",
     Message:"Leave status Update Failed",
     Error:err
   })
 }
    return res.status(200).json({
      Status: "True",
      Message: 'leave  status Updated Successfully..!!',
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

//......................................End of Updating Leave status API...........................//

  module.exports = router;