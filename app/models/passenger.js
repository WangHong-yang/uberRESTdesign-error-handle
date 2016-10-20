/** 
 * Mongoose Schema for the Entity Passenger
 * @author Clark Jeria, Hubert Wang
 * @version 0.0.3
 */

/**
 * Parameters constraints
 * firstName (String, 1-15)
 * lastName (String, 1-15)
 * emailAddress (Reegex /[a-zA-Z0-9_.]+\@[a-zA-Z](([a-zA-Z0-9-]+).)*\/ , Required)
 * password (Used for POST only, String, 8-16, Required - No constraints, Store clear text)
 * addressLine1 (String, 50)
 * addressLine2 (String, 50)
 * city (String, 50)
 * state (String, 2)
 * zip (String, 5)
 * phoneNumber (String, Regex XXX-XXX-XXXX, Required)
 */

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;
var mongooseHidden = require('mongoose-hidden')();

var PassengerSchema   = new Schema({
    firstName: {
        type: String,
        minlength: 1,
        maxlength: 15
    },
    lastName: {
        type: String,
        minlength: 1,
        maxlength: 15
    },
    emailAddress: {
        type: String,
        required: true,
        validate: function(val) {
            var re = /[a-zA-Z0-9_.]+\@[a-zA-Z](([a-zA-Z0-9-]+).)*/;
            return re.test(val);
        }
    },
    password: {
        type: String,
        hide: true,
        required: true,
        minlength: 6,
        maxlength: 16
    },
    addressLine1: {
        type: String,
        maxlength: 50
    },
    addressLine2: {
        type: String,
        maxlength: 50
    },
    city: {
        type: String,
        maxlength: 50
    },
    state: {
        type: String,
        minlength: 2,
        maxlength: 2
    },
    zip: {
        type: String,
        minlength: 5,
        maxlength: 5
    },
    phoneNumber: {
        type: String,
        required: true,
        validate: function(val) {
            var re = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
            return re.test(val);
        }
    }
});

// use mongooseHidden to hide password when return
PassengerSchema.plugin(mongooseHidden);

module.exports = mongoose.model('Passenger', PassengerSchema);