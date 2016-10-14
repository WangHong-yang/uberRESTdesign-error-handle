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
     * @param {string} license - The license plate of the new ride
     * @param {integer} doorCount - The amount of doors of the new ride
     * @param {string} make - The make of the new ride
     * @param {string} model - The model of the new ride
     * @returns {object} A message and the ride created. (201 Status Code)
     * @throws Mongoose Database Error (500 Status Code)
     */
    .post(function(req, res){
        var ride = new Ride(req.body);
        // ride.rideType = req.body.rideType;
        // ride.startPoint.lat = req.body.startPoint.lat;
        // ride.startPoint.long = req.body.startPoint.long;
        // ride.endPoint.lat = req.body.endPoint.lat;
        // ride.endPoint.long = req.body.endPoint.long;
        // ride.requestTime = req.body.requestTime;
        // ride.pickupTime = req.body.pickupTime;
        // ride.dropoffTime = req.body.dropoffTime;
        // ride.status = req.body.status;
        // ride.fare = req.body.fare;
        // ride.driver = mongoose.Types.ObjectId(req.body.driver);
        // ride.passenger = mongoose.Types.ObjectId(req.body.passenger);
        // ride.car = mongoose.Types.ObjectId(req.body.car);

        ride.save(function(err){
            if(err){
                //res.status(500).send(err);
                res.status(400).send(err = EH.errorHandle(err));
            }else{
                //res.status(201).json({"message" : "ride Created", "ride_created" : ride});
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
     * @throws Mongoose Database Error (500 Status Code)
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
     * @param {string} license - The license plate of the new ride
     * @param {integer} doorCount - The amount of doors of the new ride
     * @param {string} make - The make of the new ride
     * @param {string} model - The model of the new ride
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
                        //res.status(500).send(err);
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
     * @throws Mongoose Database Error (500 Status Code)
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
                        //CEC.throw_id_not_found(res, err);
                    }else{
                        res.status(200).json({"message" : "ride Deleted"});
                    }
                });
            }
        });
    });

/**
 * Here you must add the routes for the Ride entity
 * /rides/:id/routePoints (POST)
 * /rides/:id/routePoints (GET)
 * /rides/:id/routePoint/current (GET)
 */
router.route('/rides/:ride_id/routePoints')
    /**
     * GET call for the ride entity (single).
     * @returns {object} the ride with Id ride_id. (200 Status Code)
     * @throws Mongoose Database Error (500 Status Code)
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

router.route('/rides/:ride_id/routePoints/current')
    /**
     * GET call for the ride entity (single).
     * @returns {object} the ride with Id ride_id. (200 Status Code)
     * @throws Mongoose Database Error (500 Status Code)
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