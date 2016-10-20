/** 
 * Express Route: /passengers
 * @author Clark Jeria
 * @version 0.0.3
 */
var express = require('express');
var router = express.Router();

var Passenger = require('../app/models/passenger');
var EH = require('../scripts/errorHandling');

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
     * @param {String} emailAddress - email address of passenger, contain format checking: example@xxx.com
     * @param {String} password - password of passenger, hidden using mongooseHidden
     * @param {string} phoneNumber - phone number of passenger, contain format checking: xxx-xxx-xxxx
     * @returns {} A message and the passenger created. (201 Status Code)
     * @throws Bad Request Error (400 status code)
     */
    .post(function(req, res){
        var passenger = new Passenger(req.body);

        passenger.save(function(err){
            if(err){
                res.status(400).send(err = EH.errorHandle(err));
                return;
            }else{
                res.status(201).json(passenger);
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
     * @throws Bad Request Error (404 Status Code)
     */
    .get(function(req, res){
        Passenger.findById(req.params.passenger_id, function(err, passenger){
            if(err){
                res.status(404).send(err = EH.errorHandle(err));
            }else{
                // if passenger == null, err
                if(passenger === null) {
                    res.status(404).end();
                } else {
                    res.status(200).json(passenger);
                }
            }
        });
    })
    /**
     * PATCH call for the passenger entity (single).
     * @param {String} emailAddress - email address of passenger, contain format checking: example@xxx.com
     * @param {String} password - password of passenger, hidden using mongooseHidden
     * @param {string} phoneNumber - phone number of passenger, contain format checking: xxx-xxx-xxxx
     * @returns {Object} A message and the passenger created. (201 Status Code)
     * @throws Bad Request Error (400 status code)
     */
    .patch(function(req, res){
        Passenger.findById(req.params.passenger_id, function(err, passenger){
            if(err){
                res.send(err = EH.errorHandle(err));
                return;
            }else{
                for (var attribute in req.body) {
                    passenger[attribute] = req.body[attribute];
                }

                passenger.save(function(err){
                    if(err){
                        res.send(err = EH.errorHandle(err));
                        return;
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
     * @throws Bad Request Error (404 Status Code)
     */
    .delete(function(req, res){
        Passenger.findById(req.params.passenger_id, function(err, passenger){
            if(err){
                res.status(404).send(err = EH.errorHandle(err)).end();
            } else {
                Passenger.remove({
                    _id : req.params.passenger_id
                }, function(err, passenger){
                    if(err){
                        res.status(404).send(err);
                    }else{
                        res.status(200).json({"message" : "Passenger Deleted"});
                    }
                });
            }
        })
        
    });

module.exports = router;