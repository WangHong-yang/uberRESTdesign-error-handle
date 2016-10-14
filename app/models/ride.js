/** 
 * Mongoose Schema for the Entity PaymentAccount
 * @author Hubert Wang
 * @version 0.0.1
 */

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

/**
 * - passenger (reference)
 * - driver (reference)
 * - car (reference)
 * - rideType (String, [ECONOMY, PREMIUM, EXECUTIVE], Required)
 * - startPoint  Object (lat: Decimal, long: Decimal) (latitude/longitude combination, Required)
 * - endPoint Object (lat: Decimal, long: Decimal) (latitude/longitude combination, Required)
 * - requestTime (Number, TimeStamp, Required)
 * - pickupTime (Number, TimeStamp, Required)
 * - dropOffTime (Number, TimeStamp, Required)
 * - status (String, [REQUESTED, AWAITING_DRIVER, DRIVE_ASSIGNED, IN_PROGRESS, ARRIVED, CLOSED], Required)
 * - fare (Number)
 * - route (series of latitude/longitude values)
 */
var RideSchema   = new Schema({
    passenger: {
        type: Schema.Types.ObjectId,
        ref: 'Passenger',
    },
    driver: {
        type: Schema.Types.ObjectId,
        ref: 'Driver',
    },
    car: {
        type: Schema.Types.ObjectId,
        ref: 'Car',
    },
    rideType: {
        type: String,
        required: true,
        enum:[
         'ECONOMY', 
         'PREMIUM', 
         'EXECUTIVE'
        ]
    },
    startPoint: {
        lat: {
            type: Number,
            required:true
        },
        long:{
            type: Number,
            required:true
        }
    }, 
    endPoint: {
        lat:{
            type: Number,
            required:true
        },
        long:{
            type: Number,
            required:true
        }
    },
    requestTime: {
        type: Number,
        required: true
    },
    pickupTime: {
        type: Number,
        required: true
    },
    dropOffTime: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        required: true,
        enum:[
         'REQUESTED', 
         'AWAITING_DRIVER', 
         'DRIVER_ASSIGNED',
         'IN_PROGRESS',
         'ARRIVED',
         'CLOSED'
        ]
    },
    fare: {
        type: Number, 
        required:true
    },
    route: {
        points:[{}]
    }
});

module.exports = mongoose.model('Ride', RideSchema);