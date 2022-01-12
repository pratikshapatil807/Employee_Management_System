const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");

//create express app
const app = express();

//setup server code port
const port = process.env.PORT || 5000;

// process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';

//Parse request Data content type appkication/x-ww-form-rulencoded
app.use(bodyParser.urlencoded({ extended: false}));

//parse request data content type appkication/json
app.use(bodyParser.json());

app.use(
    session({
      key: "userId",
      secret: "subscribe",
      resave: false,
      saveUninitialized: false,
      cookie: {
        expires: 60 * 60 * 24,
      },
    })
  );


//define the route of the server
app.get('/' ,(req, res) => {
    res.send("Hello world");
});

app.use('/api/createEmployeeAccount', require('./api/Admin/createEmployeeAccount'));
app.use('/api/employeeLogin', require('./api/Employee/employeeLogin'));
app.use('/api/registerAdmin', require('./api/Admin/registerAdmin'));
app.use('/api/emplyeeSalary', require('./api/Admin/emplyeeSalary'));
app.use('/api/adminDashboard', require('./api/Admin/adminDashboard'));
app.use('/api/departments', require('./api/Admin/departments'));
app.use('/api/leaveApplication', require('./api/Employee/leaveApplication'));
app.use('/api/leaveManagement', require('./api/Admin/leaveManagement'));
app.use('/api/attedence', require('./api/Employee/attedence'));
app.use('/api/profile', require('./api/Employee/profile'));
app.use('/api/salary', require('./api/Employee/salary'));

//listen the port
app.listen(port, () => {
    console.log(`Express is running at port ${port}`);
})