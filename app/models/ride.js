/** 
 * Mongoose Schema for the Entity PaymentAccount
 * @author Hubert Wang
 * @version 0.0.1
 */

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var RideSchema   = new Schema({
    passenger: { type: Schema.Types.ObjectId, ref: 'Passenger' },
    driver: { type: Schema.Types.ObjectId, ref: 'Driver' },
    car: { type: Schema.Types.ObjectId, ref: 'Car' },
    rideType: String, 
    startPoint: String,
    endPoint: String,
    requestTime: Date,
    pickupTime: Date,
    dropOffTime: Date,
    status: String,
    fare: String,
    route: String
});

module.exports = mongoose.model('Ride', RideSchema);