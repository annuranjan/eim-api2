const mongoose = require('mongoose');
const Employee = require('../models/employee.model');

// router.get('/employees', emp.getAllEmployees);
// router.get('/employees/:id', emp.getEmployeeById);
// router.put('/employees/:id', emp.updateAnEmployee);
// router.delete('/employees/:id', emp.deleteAnEmployee);
// router.post('/employees/addEmployee', emp.addAnEmployee);

exports.addAnEmployee = (req, res) => {
    // if (!req.body.firstname || !req.body.lastname || !req.body.usertype || !req.body.domainname) {
    //     res.status(400).send({
    //         message: "Need [firstname, lastname, usertype, domainname] to register an employee!"
    //     });
    // }

    const d = new Date();
    const date_now = d.getDate() + "/" + d.getMonth() + "/" + d.getFullYear() + " " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
    let newEmpCode = '';

    let emp = new Employee({
        _id: new mongoose.Types.ObjectId(),
        empId: "",
        name: {
            firstname: req.body.firstname,
            middlename: req.body.middlename,
            lastname: req.body.lastname
        },
        usertype: req.body.usertype,
        domainname: req.body.domainname
    })

    Employee.find({}).sort({
        _id: -1
    }).limit(1).then((result) => {
        console.log("result of search all and find id");
        console.log(result);
        if (result[0]) {
            emp.empId = +(result[0].empId) + 1;
        } else emp.empId = 1;
        emp.save().then((reslt) => {
            res.status(201).send(reslt)
        });
    }).catch(error => {
        console.log(error);
        res.status(500).send(error);
    });
}
// var nameSchema = new Schema({
//     firstname: String,
//     middlename: String,
//     lastname: String
// });

// var EmployeeSchema = new Schema({
//     _id: mongoose.Schema.Types.ObjectId,
//     empId: {
//         type: Number,
//         index: true,
//         unique: true
//     },
//     name: nameSchema,
//     usertype: String,
//     domainname: String
// });