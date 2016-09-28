/** 
 * Mongoose Schema for the Entity Car
 * @author Clark Jeria
 * @version 0.0.2
 */

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var CarSchema   = new Schema({
    license: String,
    driver: String
});

module.exports = mongoose.model('Car', CarSchema);