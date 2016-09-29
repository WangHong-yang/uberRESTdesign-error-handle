/** 
 * Express Route: /passengers
 * @author Clark Jeria
 * @version 0.0.3
 */
var express = require('express');
var router = express.Router();

var Passenger = require('../app/models/passenger');
var CEC = require('../scripts/commonErrorControl')
var PassengerEC = require('../scripts/passengerErrorControl')

router.route('/passengers') 
    /**
     * GET call for the passenger entity (multiple).
     * @returns {object} A list of passengers. (200 Status Code)
     * @throws Mongoose Database Error (500 Status Code)
     */
    .get(function(req, res){
        Passenger.find(function(err, passengers){
            if(err){
                res.status(500).send(err);
            }else{
                res.json(passengers);
            }
        });
    })
    /**
     * POST call for the passenger entity.
     * @param {string} firstName - The first name of the new passenger
     * @param {string} lastName - The last name of the new passenger
     * @param {date} dateOfBirth - The date of birth of the new passenger
     * @param {string} username - The username of the new passenger
     * @param {string} password - The password of the new passenger
     * @param {string} addressLine1 - The address line 1 of the new passenger
     * @param {string} addressLine2 - The address line 2 of the new passenger
     * @param {string} city - The city of the new passenger
     * @param {string} state - The state of the new passenger
     * @param {number} zip - The zip code of the new passenger
     * @param {number} phoneNumber - The phone number of the new passenger
     * @returns {object} A message and the passenger created. (201 Status Code)
     * @throws Mongoose Database Error (500 Status Code)
     */
    .post(function(req, res){
        var passenger = new Passenger(req.body);
        /* Error Handle start */
        CEC.throw_empty_request_body(res, req.body);
        PassengerEC.throw_missing_passenger_attribute(res, req.body);
        CEC.throw_id_provided(res, req.body);
        PassengerEC.throw_wrong_passengerattribute_type(res, req.body);
        PassengerEC.throw_invalid_passenger_attribute_value(res, req.body);
        PassengerEC.throw_duplicate_passenger_attribute_value(res, req.body, Passenger);
        PassengerEC.throw_invalid_passenger_attribute_key(res, req.body, Passenger);
        /* Error Handle end */

        passenger.save(function(err){
            if(err){
                res.status(500).send(err);
            }else{
                res.status(201).json({"message" : "Passenger Created", "passengerCreated" : passenger});
            }
        });
    });

/** 
 * Express Route: /passengers/:passenger_id
 * @param {string} passenger_id - Id Hash of passenger Object
 */
router.route('/passengers/:passenger_id')
    /**
     * GET call for the passenger entity (single).
     * @returns {object} the passenger with Id passenger_id. (200 Status Code)
     * @throws Mongoose Database Error (500 Status Code)
     */
    .get(function(req, res){
        Passenger.findById(req.params.passenger_id, function(err, passenger){
            if(err){
                CEC.throw_id_not_found(res, err);
                //res.status(500).send(err);
            }else{
                res.json(passenger);
            }
        });  
    })
    /**
     * PATCH call for the passenger entity (single).
     * @param {string} firstName - The first name of the new passenger
     * @param {string} lastName - The last name of the new passenger
     * @param {date} dateOfBirth - The date of birth of the new passenger
     * @param {string} username - The username of the new passenger
     * @param {string} password - The password of the new passenger
     * @param {string} addressLine1 - The address line 1 of the new passenger
     * @param {string} addressLine2 - The address line 2 of the new passenger
     * @param {string} city - The city of the new passenger
     * @param {string} state - The state of the new passenger
     * @param {number} zip - The zip code of the new passenger
     * @param {number} phoneNumber - The phone number of the new passenger
     * @returns {object} A message and the passenger updated. (200 Status Code)
     * @throws Mongoose Database Error (500 Status Code)
     */
    .patch(function(req, res){
        Passenger.findById(req.params.passenger_id, function(err, passenger){
            if(err){
                CEC.throw_id_not_found(res, err);
                //res.status(500).send(err);
            }else{
                for (var attribute in req.body) {
                    passenger[attribute] = req.body[attribute];
                }

                passenger.save(function(err){
                    if(err){
                        res.status(500).send(err);
                    }else{
                        res.json({"message" : "Passenger Updated", "passengerUpdated" : passenger});
                    }
                });
            }
        });
    })
    /**
     * DELETE call for the passenger entity (single).
     * @returns {object} A string message. (200 Status Code)
     * @throws Mongoose Database Error (500 Status Code)
     */
    .delete(function(req, res){
        Passenger.remove({
            _id : req.params.passenger_id
        }, function(err, passenger){
            if(err){
                //res.status(500).send(err);
                CEC.throw_id_not_found(res, err);
            }else{
                res.json({"message" : "Passenger Deleted"});
            }
        });
    });

module.exports = router;