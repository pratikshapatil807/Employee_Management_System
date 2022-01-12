const dbConn = require('../../config/database');
const router = require('express').Router();
const { check, validationResult } = require('express-validator');
const { checkToken} = require("../../auth_middleware/auth")

//.....................Create Department.................................//

router.post('/', checkToken,
check('department_name', 'department_name is required').not().isEmpty(),
async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  let data = {
    department_name: req.body.department_name,
    description: req.body.description,
  };
  try {
   let sql = 'INSERT INTO department SET ?';
  let query = await dbConn.query(sql,data, (err, results) => {
    if(err) {
      res.status(500).json({
        Status:"False",
        Message:"Adding Department Failed..!!",
        Error:err
      })
    } else {
      res.status(200).json({
        Status: "True",
        Message: 'Department added Successfully..!!',
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

//..........................End Of Department Creation API ..........................//

//....................Update Department.............................//

router.post('/update_department/id', checkToken,
async (req,res) => {
    let id = req.body.id;
    try {
    let sql = "UPDATE department SET department_name='"+req.body.department_name+"', description='"+req.body.description+"' WHERE id ='" + id + "'";
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
        Message: 'Department Updated Successfully..!!',
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
  
//...................End of Update Department  API........................//
  
  
//.........List all Departments........................//
  
  router.get('/', async (req, res) => {
    try {
      let sql ='SELECT * FROM department' ;
    let query = await dbConn.query(sql, (err, results) => {
      if(err) {
        res.status(500).json({
          Status:"False",
          Message:"Listing The department is Failed...!!",
          Error: err
        })
      }
      if (results.length) {
        res.status(200).json({
          Status: "True",
          Message: 'Department Listed Successfully..!!',
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
  
  //..........................End Of Listing All Departments API...................//
  
  //............................Delete Department from the table By ID............................//
  
  router.post('/delete/id',  checkToken,
  async (req, res) => {
    try {
      let id = req.body.id
    let sql = "DELETE FROM department WHERE id='" + id + "'";
    let query = await dbConn.query(sql, (err, results) => {
      if(err) {
        res.status(500).json({
          Status:"False",
          Message:"Deleting Department By Id Failed...!!",
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
        Message: 'Department Deleted Succesfully ..!!',
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
  
  //..........................End of Deleing Department By Id API.................................//
  

  module.exports = router;