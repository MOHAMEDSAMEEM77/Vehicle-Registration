const mongoose = require('mongoose');

var vehicleSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: 'This field is required.'
    },
    email: {
        type: String

    },
    Vehicle_number: {
        type: String,

        required: 'This field is required.'
    },
    city: {
        type: String,

        required: 'This field is required.'
    }
});

// Custom validation for email
vehicleSchema.path('email').validate((val) => {
    emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(val);
}, 'Invalid e-mail.');

mongoose.model('Vehicle', vehicleSchema);