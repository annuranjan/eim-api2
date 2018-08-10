const express = require('express');
var router = express.Router();


const user = require('../controllers/user.controller');
const emp = require('../controllers/employee.controller');
const empDetails = require('../controllers/employeeDetails.controller');

//For testing
const Employee = require('../models/employee.model');
const EmployeeDetails = require('../models/employeeDetails.model');
const User = require('../models/user.model');

router.get('/', (req, res) => {
    console.log("request received");
    res.json({
        message: "Welcome to the EIM Api"
    })
})

//To clear the User, Employees and EmployeeDetails db 
router.delete('/employees', (req, res) => {
    Employee.deleteMany({}, (err, resp) => {
        res.status(200).json({
            message: "all employees deleted"
        });
    });
})
router.delete('/employees', (req, res) => {
    EmployeeDetails.deleteMany({}, (err, resp) => {
        res.status(200).json({
            message: "all employee-details deleted"
        });
    });
})
router.delete('/employees', (req, res) => {
    User.deleteMany({}, (err, resp) => {
        res.status(200).json({
            message: "all users deleted"
        });
    });
})

//User Routes
router.post('/login', user.login);
router.post('/createUser', user.createUser);
router.delete('/deleteUser', user.deleteUser);
router.put('/updateUser', user.updateUser);

//Employee Routes
router.get('/employees', emp.getAllEmployees);
router.get('/employees/:id', emp.getEmployeeById);
router.put('/employees/:id', emp.updateAnEmployee);
router.delete('/employees/:id', emp.deleteAnEmployee);
router.post('/employees/addEmployee', emp.addAnEmployee);

//EmployeeDetails Routes
router.post('/employees/:id/details', empDetails.addDetails);

module.exports = router;