/** 
 * Mongoose Schema for the Entity PaymentAccount
 * @author Hubert Wang
 * @version 0.0.1
 */

/**
 * Parameters constraints
 * - passenger (reference)
 * - driver (reference)
 * - car (reference)
 * - rideType (String, [ECONOMY, PREMIUM, EXECUTIVE], Required)
 * - startPoint  Object (lat: Number, long: Number, Required)
 * - endPoint Object (lat: Number, long: Number, Required)
 * - requestTime (Number, TimeStamp, Required)
 * - pickupTime (Number, TimeStamp, Required)
 * - dropOffTime (Number, TimeStamp, Required)
 * - status (String, [REQUESTED, AWAITING_DRIVER, DRIVE_ASSIGNED, IN_PROGRESS, ARRIVED, CLOSED], Required)
 * - fare (Number)
 * - route (series of latitude/longitude values)
 */

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var RideSchema   = new Schema({
    passenger: {
        type: Schema.Types.ObjectId,
        ref: 'Passenger',
        required: true
    },
    driver: {
        type: Schema.Types.ObjectId,
        ref: 'Driver',
        required: true
    },
    car: {
        type: Schema.Types.ObjectId,
        ref: 'Car',
        required: true
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