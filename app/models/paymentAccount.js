/** 
 * Mongoose Schema for the Entity PaymentAccount
 * @author Clark Jeria, Hubert Wang
 * @version 0.0.1
 */

/**
 * Parameters constraints
 * - accountType (String, 18, Required)
 * - accountNumber (Number, 18, Required)
 * - expirationDate (Number, Timestamp, Required for passenger accounts only)
 * - nameOnAccount (String, 18, Required)
 * - bank (String, 18, Required for driver accounts only)
 */

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var PaymentAccountSchema   = new Schema({
    accountType: {
        type: String,
        required: true,
        maxlength: 18
    },
    accountNumber: {
        type: Number,
        required: true,
        unique: true,
        maxlength: 18
    },
    expirationDate: {
        type: Number
    },
    nameOnAccount: {
        type: String,
        maxlength: 18,
        required: true    
    },
    bank: {
        type: Number,
        required: true,
        refer: 'Driver'
    },
    driver_id: String,
    passenger_id: String
});

module.exports = mongoose.model('Pay', PaymentAccountSchema);