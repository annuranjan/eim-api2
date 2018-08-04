const express = require('express');
var router = express.Router();

const user = require('../controllers/user.controller');
const emp = require('../controllers/employee.controller');
const empDetails = require('../controllers/employeeDetails.controller');

router.get('/', (req, res) => {
    console.log("request received");
    res.json({
        message: "Welcome to the EIM Api"
    })
})

//User Routes
router.post('/login', user.login);
router.post('/createUser', user.createUser);
router.delete('/deleteUser', user.deleteUser);
router.put('/updateUser', user.updateUser);

//Employee Routes
// router.get('/employees', emp.getAllEmployees);
// router.get('/employees/:id', emp.getEmployeeById);
// router.put('/employees/:id', emp.updateAnEmployee);
// router.delete('/employees/:id', emp.deleteAnEmployee);
router.post('/employees/addEmployee', emp.addAnEmployee);

//EmployeeDetails Routes
router.post('/employees/:id/details', empDetails.addDetails);

module.exports = router;