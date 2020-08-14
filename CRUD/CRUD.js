const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Vehicle = mongoose.model('Vehicle');

router.get('/', (req, res) => {
    res.render("vehicle/addOrEdit", {
        viewTitle: "Add Vehicle"
    });
});

router.post('/', (req, res) => {
    if (req.body._id == '')
        insertRecord(req, res);
        else
        updateRecord(req, res);
});


function insertRecord(req, res) {
    var vehicle = new Vehicle();
    vehicle.Name = req.body.Name;
    vehicle.email = req.body.email;
    vehicle.Vehicle_number = req.body.Vehicle_number;
    vehicle.city = req.body.city;
    vehicle.save((err, doc) => {
        if (!err)
            res.redirect('vehicle/list');
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("vehicle/addOrEdit", {
                    viewTitle: "Insert Vehicle",
                    vehicle: req.body
                });
            }
            else
                console.log('Error during record insertion : ' + err);
        }
    });
}

function updateRecord(req, res) {
    Vehicle.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
        if (!err) { res.redirect('vehicle/list'); }
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("vehicle/addOrEdit", {
                    viewTitle: 'Update Vehicle',
                    vehicle: req.body
                });
            }
            else
                console.log('Error during record update : ' + err);
        }
    });
}


router.get('/list', (req, res) => {
    Vehicle.find((err, docs) => {
        if (!err) {
            res.render("vehicle/list", {
                list: docs
            });
        }
        else {
            console.log('Error in retrieving vehicle list :' + err);
        }
    });
});


function handleValidationError(err, body) {
    for (field in err.errors) {
        switch (err.errors[field].path) {
            case 'Name':
                body['NameError'] = err.errors[field].message;
                break;
            case 'email':
                body['emailError'] = err.errors[field].message;
                break;
            default:
                break;
        }
    }
}

router.get('/:id', (req, res) => {
    Vehicle.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.render("vehicle/addOrEdit", {
                viewTitle: "Update Vehicle",
                vehicle: doc
            });
        }
    });
});

router.get('/delete/:id', (req, res) => {
    Vehicle.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/vehicle/list');
        }
        else { console.log('Error in vehicle delete :' + err); }
    });
});

module.exports = router;