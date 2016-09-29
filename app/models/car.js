/** 
 * Mongoose Schema for the Entity Car
 * @author Clark Jeria, Hubert Wang
 * @version 0.0.2
 */

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var CarSchema   = new Schema({
    year: String,
    maker: String,
    model: String,
    doorNum: String,
    passNum: String,
    license: String,
    driverID: String,
    insurance: String
});

module.exports = mongoose.model('Car', CarSchema);