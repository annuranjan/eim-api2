const bcrypt = require('bcrypt');
const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

// router.delete('/deleteUser', user.deleteUser);

exports.login = (req, res) => {

    //Validation for both username and password
    if (!req.body.username || !req.body.password) {
        return res.status(412).json({
            error: "Need both username and password to login"
        });
    }


    User.findOne({
        username: req.body.username
    }).then((result) => {
            if (!result) {
                return res.status(401).send({
                    "Error": {
                        "message": "Either username/password is wrong - user not found!"
                    }
                });
            }
            console.log(result);
            bcrypt.compare(req.body.password, result[0], (err, response) => {
                if (err) {
                    console.log(err);
                    return res.status(401).send({
                        "Error": {
                            message: "Either username/password is wrong!",
                        }
                    });
                }
                console.log(response);
                return res.status().send({
                    token: jwt.sign({
                        username: req.body.username,
                        usertype: response.usertype,
                        empId: respone.empId
                    }, "MySuperSecretPrivateKey", {
                        expiresIn: '1hr'
                    }),
                    Respone: result
                });
            });
        },
        (error) => {
            console.log(error);
        });

}

exports.createUser = (req, res) => {
    if (!req.body.username || !req.body.password || !req.body.usertype || !req.body.empId) {
        return res.status(400).send({
            message: "Need [usernmae, password, usertype, empId] to sign up!"
        });
    }
    if (req.body.password !== req.body.confirmPassword) {
        return res.status(400).send({
            message: "Passwords do not match!"
        });
    }

    bcrypt.hash(req.body.password, 10, (error, hash) => {
        if (error) {
            return res.status(500).send({
                message: "Internal server error. Please try again!"
            })
        }

        var user = new User({
            _id: new mongoose.Types.ObjectId,
            empId: req.body.empId,
            username: req.body.username,
            password: hash,
            usertype: req.body.usertype
        });

        user.save().then((result) => {
            console.log("result of new creation");
            console.log(result);
            return res.status(201).send({
                message: "The user has been successfully saved!",
                user: {
                    empId: result.empId,
                    username: result.username,
                    usertype: result.usertype
                }
            });
        }, (error) => {
            return res.status(500).send({
                //Note: User may not be saved because there might be entry that already exist for that user.
                message: "Problem encountered while saving the user. Please try again!"
            })
        });
    });

}

exports.deleteUser = (req, res) => {
    User.deleteOne({
        empId: req.body.empId
    }).then(
        (result) => {
            console.log(result);
            return res.status(200).send({
                empId: req.body.empId,
                message: "User with empId: " + req.body.empId + " removed successfully!",
            })
        },
        (error) => {
            console.log(error);
            return res.status(500).send("Failed to remove the user!");
        }
    );

}

exports.updateUser = (req, res) => {
    User.update({
        empId: req.body.empId
    }, {
        username: req.body.username,
        password: req.body.password,
        usertype: req.body.usertype
    }, (err, response) => {
        if (err) {
            return res.status(500).send(err);
        }
        return res.status(200).send({
            response: response,
            user: {
                empId: req.body.empId,
                username: req.body.username,
                usertype: req.body.usertype
            }
        });
    });
}