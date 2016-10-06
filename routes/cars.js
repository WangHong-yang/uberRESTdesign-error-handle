/** 
 * Express Route: /cars
 * @author Clark Jeria, Hubert Wang
 * @version 0.0.2
 */
var express = require('express');
var router = express.Router();

var Car = require('../app/models/car');
var EH = require('../scripts/errorHandling');
// var CEC = require('../scripts/commonErrorControl')
// var CarEC = require('../scripts/carErrorControl')

router.route('/cars') 
    /**
     * GET call for the car entity (multiple).
     * @returns {object} A list of cars. (200 Status Code)
     * @throws Mongoose Database Error (500 Status Code)
     */
    .get(function(req, res){
        Car.find(function(err, cars){
            if(err){
                res.status(500).send(err);
            }else{
                res.json(cars);
            }
        });
    })
    /**
     * POST call for the car entity.
     * @param {string} license - The license plate of the new car
     * @returns {object} A message and the car created. (201 Status Code)
     * @throws Mongoose Database Error (500 Status Code)
     */
    .post(function(req, res){
        var car = new Car(req.body);
        car.save(function(err){
            if(err){
                //res.status(500).send(err);
                res.status(400).send(err = EH.errorHandle(err));
            }else{
                //res.status(201).json({"message" : "Car Created", "car_created" : car});
                res.status(201).json(car);
            }
        });
    });

/** 
 * Express Route: /cars/:car_id
 * @param {string} car_id - Id Hash of Car Object
 */
router.route('/cars/:car_id')
    /**
     * GET call for the car entity (single).
     * @returns {object} the car with Id car_id. (200 Status Code)
     * @throws Mongoose Database Error (500 Status Code)
     */
    .get(function(req, res){
        Car.findById(req.params.car_id, function(err, car){
            if(err){
                res.status(404).send(err = EH.errorHandle(err)).end();
            }else{
                // if car === null, err
                if(car === null) {
                    res.status(404).end();
                } else {
                    res.json(car);  
                }
            }
        });  
    })
    /**
     * PATCH call for the car entity (single).
     * @returns {object} A message and the car updated. (200 Status Code)
     * @throws Mongoose Database Error (500 Status Code)
     */
    .patch(function(req, res){
        Car.findById(req.params.car_id, function(err, car){
            //CEC.throw_id_provided(res, req.body);
            if(err){
                res.send(err = EH.errorHandle(err));
                return;
                //res.status(500).send(err);
                //CEC.throw_id_not_found(res, err);
                //CarEC.throw_invalid_car_attribute_key(res, req.body, Car);
            }else{
                for (var attribute in req.body) {
                    car[attribute] = req.body[attribute];
                }
                car.save(function(err){
                    if(err){
                        res.send(err = EH.errorHandle(err));
                        return;
                        //res.status(500).send(err);
                    }else{
                        res.json({"message" : "Car Updated", "car_created" : car});
                    }
                });
            }
        });
    })
    /**
     * DELETE call for the car entity (single).
     * @returns {object} A string message. (200 Status Code)
     * @throws Mongoose Database Error (500 Status Code)
     */
    .delete(function(req, res){
        // if car id not found
        Car.findById(req.params.car_id, function(err, car){
            if(err){
                res.status(404).send(err = EH.errorHandle(err)).end();
            } else {
                Car.remove({
                    _id : req.params.car_id
                }, function(err, car){
                    if(err){
                        res.status(404).send(err = EH.errorHandle(err));
                        //CEC.throw_id_not_found(res, err);
                    }else{
                        res.status(200).json({"message" : "Car Deleted"});
                    }
                });
            }
        });
    });

module.exports = router;