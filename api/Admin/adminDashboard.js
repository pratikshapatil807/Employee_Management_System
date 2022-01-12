const dbConn = require('../../config/database');
const router = require('express').Router();

//................Total number of employees..................................//
  
  router.get('/total_employees', async (req, res) => {
    try {
      let sql ='SELECT COUNT(emp_id) FROM create_employees;' ;
    let query = await dbConn.query(sql, (err, results) => {
      if(err) {
        res.status(500).json({
          Status:"False",
          Message:"Failed...!!",
          Error: err
        })
      }
      if (results.length) {
        res.status(200).json({
          Status: "True",
          Message: 'Success..!!',
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

//................ End of Total number of employees..................................//

//...................Total number of employees by department.................................//
  
  router.post('/department_employees', async (req, res) => {
    try {
        let department_name = req.body.department_name;
      let sql ="SELECT COUNT(department_name) FROM department where department_name='" + department_name +  "'" ;
    let query = await dbConn.query(sql, (err, results) => {
      if(err) {
        res.status(500).json({
          Status:"False",
          Message:"Failed...!!",
          Error: err
        })
      }
      if (results.length) {
        res.status(200).json({
          Status: "True",
          Message: 'Success..!!',
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

//................... End of Total number of employees by department.................................//
  
//.........................Total number of employees by Status(Active/Inactive)................................//
  
  router.post('/status_employees', async (req, res) => {
    try {
        let status = req.body.status;
      let sql ="SELECT COUNT(status) FROM create_employees where status='" + status +  "'" ;
    let query = await dbConn.query(sql, (err, results) => {
      if(err) {
        res.status(500).json({
          Status:"False",
          Message:"Failed...!!",
          Error: err
        })
      }
      if (results.length) {
        res.status(200).json({
          Status: "True",
          Message: 'Success..!!',
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

  //.......................End of Total number of employees by Status(Active/Inactive)................................//
  
//......................Total number of Departments...............................//
  
  router.get('/total_department', async (req, res) => {
    try {
      let sql ='SELECT COUNT(id) FROM department;' ;
    let query = await dbConn.query(sql, (err, results) => {
      if(err) {
        res.status(500).json({
          Status:"False",
          Message:"Failed...!!",
          Error: err
        })
      }
      if (results.length) {
        res.status(200).json({
          Status: "True",
          Message: 'Success..!!',
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

//...................... End Of Total number of Departments...............................//
  

  module.exports = router;