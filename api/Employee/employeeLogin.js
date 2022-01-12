const dbConn = require('../../config/database');
const { check, validationResult } = require('express-validator');
const router = require('express').Router();
const { sign } = require("jsonwebtoken");
const { checkToken} = require("../../auth_middleware/auth");

//Employee Login By Given Username And Password

router.post('/', 
check('password', 'password is required').not().isEmpty(),
check('username','User Name is required').not().isEmpty(),
async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    let username = req.body.username;
    let password = req.body.password;
   let sql = "select * from employee_login where username='" + username + "' AND password='" +password + "'";
  let query = await dbConn.query(sql, (err, results) => {
    let sql_lf = "select * from create_employees where email='" + req.body.username + "' ";
    let query_lf =  dbConn.query(sql_lf, (err, results1) => {
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
    if (results.length) {
      res.status(200).json({
        Status: "True",
        Message: 'Login Successfully..!!',
        Result: results[0],
        Data:results1,
        token:jsontoken
      });
      return;
    }
    res.status(500).json({
      Status: "False",
      Message: 'User Name And Password is not Correct..!!',
    });
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

//..........................End Of Employee Login By Given Username And Password..........................//


//.........................Change Password.....................................//

router.post('/changePassword', checkToken,
async (req,res) => {
  let emp_id = req.body.emp_id;
  try {
  let sql = "UPDATE employee_login SET password='"+req.body.password+"'WHERE emp_id='" + emp_id + "'";
  let query = await dbConn.query(sql,(err, results) => { 
 if(err) {
   res.json({
     Status:"false",
     Message:"Change Password Failed..!!",
     Error:err
   })
 }
    return res.status(200).json({
      Status: "True",
      Message: 'Password Changed Successfully..!!',
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

//...................................End Of Change Password...............................//

  module.exports = router;