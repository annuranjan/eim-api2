const mongoose = require('mongoose');
const Employee = require('../models/employee.model');
const fs = require('fs');

// router.get('/employees', emp.getAllEmployees);
// router.get('/employees/:id', emp.getEmployeeById);
// router.put('/employees/:id', emp.updateAnEmployee);
// router.delete('/employees/:id', emp.deleteAnEmployee);
// router.post('/employees/addEmployee', emp.addAnEmployee);

exports.addAnEmployee = (req, res) => {
    // fs.writeFileSync();
    let emp = new Employee({
        _id: new mongoose.Types.ObjectId(),
        name: {
            firstname: req.body.firstname,
            middlename: req.body.middlename,
            lastname: req.body.lastname
        },
        usertype: req.body.usertype,
    })

    Employee.find({}).sort({
        _id: -1
    }).limit(1).then((result) => {
        console.log("result of search all and find id");
        console.log(result);
        if (result[0]) {
            emp.empId = +(result[0].empId) + 1;
        } else emp.empId = 1;

        // let buff = fs.readFileSync(req.body.img, 'base64');
        let buff = req.body.img;
        // const photo = "empId-" + emp.empId + "-profilePhoto";
        fs.writeFile("./abcde.png", buff, {
            encoding: 'base64'
        }, (err) => {
            if (err) throw err;
            console.log('The file has been saved!');
        });
        console.log('***************************');
        emp.save().then((reslt) => {
            res.status(201).send(reslt)
        });
    }).catch(error => {
        console.log(error);
        res.status(500).send(error);
    });
}


//FLAG - P A G I N A T I O N
exports.getAllEmployees = (req, res) => {
    Employee.find({
        status: "active"
    }).then(result => {
        res.status(200).send(result)
    }).catch(error => {
        console.log(error);
        res.status(500).send(error)
    });
}

exports.getEmployeeById = (req, res) => {
    Employee.find({
        empId: req.params.id
    }, (err, emp) => {
        if (err) {
            return res.status(500).send(err);
        }
        return res.status(200).send(emp);
    });
}

exports.updateAnEmployee = (req, res) => {
    const empId = req.params.id;
    Employee.update({
        empId: empId
    }, {
        $set: {
            name: {
                firstname: req.body.firstname,
                middlename: req.body.middlename,
                lastname: req.body.lastname
            },
            usertype: req.body.usertype
        }
    }, (error, rawResult) => {
        if (error) {
            console.log("Error" + error);
            return res.status(500).send(error);
        }
        res.status(200).send({
            message: "Employee deleted successfully!"
        });
    })
}

exports.deleteAnEmployee = (req, res) => {
    const empId = req.params.id;
    console.log("delelteing employee+++++++++++" + empId);
    Employee.update({
        empId: empId
    }, {
        $set: {
            status: "left/removed"
        }
    }, (error, result) => {
        if (error) {
            return res.status(500).send(error);
        }
        res.status(200).send(result);
    });
}