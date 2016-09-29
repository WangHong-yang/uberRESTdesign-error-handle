/** 
 * Express Route: /rides
 * @author Clark Jeria
 * @version 0.0.3
 */
var express = require('express');
var router = express.Router();

var Ride = require('../app/models/ride');
var CEC = require('../scripts/commonErrorControl')
var RideEC = require('../scripts/rideErrorControl')

router.route('/rides') 
    /**
     * GET call for the ride entity (multiple).
     * @returns {object} A list of ride. (200 Status Code)
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
     */
    .post(function(req, res){
        var ride = new Ride(req.body);
        /* Error Handle start */
        CEC.throw_empty_request_body(res, req.body);
        RideEC.throw_missing_pa_attribute(res, req.body);
        CEC.throw_id_provided(res, req.body);
        RideEC.throw_wrong_pa_attribute_type(res, req.body);
        RideEC.throw_invalid_pa_attribute_value(res, req.body);
        RideEC.throw_duplicate_pa_attribute_value(res, req.body, Ride);
        RideEC.throw_invalid_pa_attribute_key(res, req.body, Ride);
        /* Error Handle end */

        ride.save(function(err){
            if(err){
                res.status(500).send(err);
            }else{
                res.status(201).json({"message" : "Ride Created", "Ride" : ride});
            }
        });
    });

/** 
 * Express Route: /Ride/:ride_id
 * @param {string} ride_id - Id Hash of Ride Object
 */
router.route('/rides/:ride_id')
    /**
     * GET call for the ride entity (single).
     * @returns {object} the ride with Id ride. (200 Status Code)
     * @throws Mongoose Database Error (500 Status Code)
     */
    .get(function(req, res){
        Ride.findById(req.params.ride, function(err, ride){
            if(err){
                res.status(500).send(err);
            }else{
                res.json(ride);
            }
        });  
    })
    /**
     * PATCH call for the ride entity (single).
     */
    .patch(function(req, res){
        if(typeof req.body.accountType === 'undefined'){
            res.status(422).json({"errorCode": "1002", "errorMessage" : util.format("Missing required parameter %s", "accountType"), "statusCode" : "422"});
            return;
        }
        if(typeof req.body.accountNumber === 'undefined'){
            res.status(422).json({"errorCode": "1002", "errorMessage" : util.format("Missing required parameter %s", "accountNumber"), "statusCode" : "422"});
            return;
        }
        if(typeof req.body.expirationDate === 'undefined'){
            res.status(422).json({"errorCode": "1002", "errorMessage" : util.format("Missing required parameter %s", "expirationDate"), "statusCode" : "422"});
            return;
        }
        if(typeof req.body.nameOnAccount === 'undefined'){
            res.status(422).json({"errorCode": "1002", "errorMessage" : util.format("Missing required parameter %s", "nameOnAccount"), "statusCode" : "422"});
            return;
        }
        if(typeof req.body.bank === 'undefined'){
            res.status(422).json({"errorCode": "1002", "errorMessage" : util.format("Missing required parameter %s", "bank"), "statusCode" : "422"});
            return;
        }

        Ride.findById(req.params.ride_id, function(err, ride){
            if(err){
                res.status(500).send(err);
            }else{
                ride.accountType = req.body.accountType;
                ride.accountNumber = req.body.accountNumber;
                ride.expirationDate = req.body.expirationDate;
                ride.nameOnAccount = req.body.nameOnAccount;
                ride.bank = req.body.bank;

                ride.save(function(err){
                    if(err){
                        res.status(500).send(err);
                    }else{
                        res.json({"message" : "ride Updated", "ride" : paymentAccount});
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
        Ride.remove({
            _id : req.params.ride_id
        }, function(err, ride){
            if(err){
                res.status(500).send(err);
            }else{
                res.json({"message" : "ride Deleted"});
            }
        });
    });

module.exports = router;