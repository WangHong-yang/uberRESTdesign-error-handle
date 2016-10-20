/** 
 * Express Route: /rides
 * @author Clark Jeria, Hubert Wang
 * @version 0.0.2
 */
var express = require('express');
var router = express.Router();

var Ride = require('../app/models/ride');
var Car = require('../app/models/car');
var Driver = require('../app/models/driver');
var Passenger = require('../app/models/passenger');
var mongoose = require('mongoose');

var EH = require('../scripts/errorHandling');

router.route('/rides') 
    /**
     * GET call for the ride entity (multiple).
     * @returns {object} A list of rides. (200 Status Code)
     * @throws Mongoose Database Error (500 Status Code)
     */
    .get(function(req, res){
        Ride.find(function(err, rides){
            if(err){
                res.status(500).send(err);
            }else{
                res.json(rides);
            }
        });
    })
    /**
     * POST call for the ride entity.
     * @param {reference} passenger - reference to passenger
     * @param {reference} driver - reference to driver
     * @param {reference} car - reference to car
     * @param {String} rideType - ride type, select from ['ECONOMY', 'PREMIUM', 'EXECUTIVE']
     * @param {Number} startPoint {lat, long} - ride start point latitude and longitude
     * @param {Number} endPoint {lat, long} - ride end point latitude and longitude
     * @param {Number} requestTime - the time of passenger request ride
     * @param {Number} pickupTime - the time of driver pick up passenger
     * @param {Number} dropOffTime - the time of driver drop off passenger
     * @param {String} status - the status of current ride, select from ['REQUESTED', 'AWAITING_DRIVER', 'DRIVER_ASSIGNED', 'IN_PROGRESS', 'ARRIVED', 'CLOSED']
     * @param {Number} fare - fare of this trip
     * @returns {} A message and the ride created. (201 Status Code)
     * @throws bad request Error (400 Status Code)
     */
    .post(function(req, res){
        var ride = new Ride(req.body);

        ride.save(function(err){
            if(err){
                res.status(400).send(err = EH.errorHandle(err));
            }else{
                res.status(201).json(ride);
            }
        });
    });

/** 
 * Express Route: /rides/:ride_id
 * @param {string} ride_id - Id Hash of Ride Object
 */
router.route('/rides/:ride_id')
    /**
     * GET call for the ride entity (single).
     * @returns {object} the ride with Id ride_id. (200 Status Code)
     * @throws bad request Error (404 Status Code)
     */
    .get(function(req, res){
        Ride.findById(req.params.ride_id, function(err, ride){
            if(err){
                res.status(404).send(err = EH.errorHandle(err)).end();
            }else{
                // if ride === null, err
                if(ride === null) {
                    res.status(404).end();
                } else {
                    res.json(ride);  
                }
            }
        });  
    })
    /**
     * PATCH call for the ride entity (single).
     * @param {reference} passenger - reference to passenger
     * @param {reference} driver - reference to driver
     * @param {reference} car - reference to car
     * @param {String} rideType - ride type, select from ['ECONOMY', 'PREMIUM', 'EXECUTIVE']
     * @param {Number} startPoint {lat, long} - ride start point latitude and longitude
     * @param {Number} endPoint {lat, long} - ride end point latitude and longitude
     * @param {Number} requestTime - the time of passenger request ride
     * @param {Number} pickupTime - the time of driver pick up passenger
     * @param {Number} dropOffTime - the time of driver drop off passenger
     * @param {String} status - the status of current ride, select from ['REQUESTED', 'AWAITING_DRIVER', 'DRIVER_ASSIGNED', 'IN_PROGRESS', 'ARRIVED', 'CLOSED']
     * @param {Number} fare - fare of this trip
     * @returns {object} A message and the ride updated. (200 Status Code)
     * @throws Mongoose Database Error (500 Status Code)
     */
    .patch(function(req, res){
        Ride.findById(req.params.ride_id, function(err, ride){
            if(err){
                res.send(err = EH.errorHandle(err));
                return;
            }else{
                for (var attribute in req.body) {
                    ride[attribute] = req.body[attribute];
                }
                ride.save(function(err){
                    if(err){
                        res.send(err = EH.errorHandle(err));
                        return;
                    }else{
                        res.json({"message" : "ride Updated", "ride_created" : ride});
                    }
                });
            }
        });
    })
    /**
     * DELETE call for the ride entity (single).
     * @returns {object} A string message. (200 Status Code)
     * @throws Bad Request Error (404 Status Code)
     */
    .delete(function(req, res){
        // if ride id not found
        Ride.findById(req.params.ride_id, function(err, ride){
            if(err){
                res.status(404).send(err = EH.errorHandle(err)).end();
            } else {
                Ride.remove({
                    _id : req.params.ride_id
                }, function(err, ride){
                    if(err){
                        res.status(404).send(err = EH.errorHandle(err));
                    }else{
                        res.status(200).json({"message" : "ride Deleted"});
                    }
                });
            }
        });
    });

/** 
 * Express Route: /rides/:id/routePoints 
 * @param {string} ride_id - Id Hash of Ride Object
 */
router.route('/rides/:ride_id/routePoints')
    /**
     * GET call for the ride route point in ride entity.
     * @returns {object} the ride with Id ride_id. (200 Status Code)
     * @throws Bad Request Error (404 Status Code)
     */
    .get(function(req, res){
        /**
         * Add extra error handling rules here
         */
        Ride.findById(req.params.ride_id, function(err, ride){
            if(err){
                res.status(404).send(err = EH.errorHandle(err)).end();
            } else {
                res.json(ride.route);
            }
        });
    })
    /**
     * POST call for the ride route points.
     * @param {Number} lat - the latitude of route point
     * @param {Number} long - the longtitude of route point
     * @returns {} A message and the ride point created. (201 Status Code)
     * @throws bad request Error (404 Status Code)
     */
    .post(function(req, res){
        Ride.findById(req.params.ride_id, function(err, ride){
            // find corresonding resource first
            if(err){
                res.status(404).send(err = EH.errorHandle(err)).end();
            }else{
                ride.points = req.body;
                ride.save(function(err){
                    if(err){
                        res.send(err = EH.errorHandle(err));
                        return;
                    } else {
                        res.json(ride);
                    }
                });
            };
        });
    });

/** 
 * Express Route: /rides/:id/routePoint/current
 * @param {string} ride_id - Id Hash of Ride Object
 */
router.route('/rides/:ride_id/routePoints/current')
    /**
     * GET call for the current route point in ride entity.
     * @returns {object} the ride with Id ride_id. (200 Status Code)
     * @throws Bad Request Error (404 Status Code)
     */
    .get(function(req, res){
        Ride.findById(req.params.ride_id, function(err, ride){
            if(err){
                res.status(404).send(err = EH.errorHandle(err)).end();
            } else {
                var current = ride.route.slice(-1)[0];
                res.json(current);
            };
        });
    });

module.exports = router;