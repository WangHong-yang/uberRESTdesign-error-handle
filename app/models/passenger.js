/** 
 * Mongoose Schema for the Entity Passenger
 * @author Clark Jeria
 * @version 0.0.3
 */

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var PassengerSchema   = new Schema({
    firstName: String,
    lastName: String,
    dateOfBirth: Date,
    username: String,
    emailAddress: String,
    password: String,
    addressLine1: String,
    addressLine2: String,
    city: String,
    state: String,
    zip: Number,
    phoneNumber: Number,    
    paymentAccount: { type: Schema.Types.ObjectId, ref: 'PaymentAccount' }
});

module.exports = mongoose.model('Passenger', PassengerSchema);