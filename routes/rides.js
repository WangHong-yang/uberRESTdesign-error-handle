/** 
 * Express Route: /rides
 * @author Clark Jeria, Hubert Wang
 * @version 0.0.2
 */
var express = require('express');
var router = express.Router();

var Ride = require('../app/models/ride');
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
     * @returns {object} A message and the ride created. (201 Status Code)
     * @throws Mongoose Database Error (500 Status Code)
     */
    .post(function(req, res){
        var ride = new Ride(req.body);
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

module.exports = router;