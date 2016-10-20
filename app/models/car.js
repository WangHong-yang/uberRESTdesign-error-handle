/** 
 * Mongoose Schema for the Entity Car
 * @author Clark Jeria, Hubert Wang
 * @version 0.0.2
 */

/**
 * Parameters constraints
 * - driver (reference, Required)
 * - make (String, 18, Required)
 * - model (Sring, 18, Required)
 * - license (String, 10, Required)
 * - doorCount (Number 1-8, Required)
 */

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var CarSchema   = new Schema({
    driver: {
        type: Schema.Types.ObjectId, ref: 'Driver'
    },
    make: {
        required: true,
        type: String,
        maxlength: 18
    },
    model: {
        required: true,
        type: String,
        maxlength: 18
    },
    license: {
        required: true,
        type: String,
        maxlength: 10
    },
    doorCount: {
        required: true,
        type: Number,
        min: 1,
        max: 8
    }
});

module.exports = mongoose.model('Car', CarSchema);