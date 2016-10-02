/** 
 * Express Route: /drivers
 * @author Clark Jeria
 * @version 0.0.3
 */
var express = require('express');
var router = express.Router();

var Driver = require('../app/models/driver');
var EH = require('../scripts/errorHandling');

router.route('/drivers') 
    /**
     * GET call for the driver entity (multiple).
     * @returns {object} A list of drivers. (200 Status Code)
     * @throws Mongoose Database Error (500 Status Code)
     */
    .get(function(req, res){
        Driver.find(function(err, drivers){
            if(err){
                res.status(500).send(err);
            }else{
                res.json(drivers);
            }
        });
    })
    /**
     * POST call for the driver entity
     */
    .post(function(req, res){
        var driver = new Driver(req.body);

        driver.save(function(err){
            if(err){
                res.send(err = EH.errorHandle(err));
                return;
                // res.status(500).send(err);
            }else{
                res.status(201).json({"message" : "Driver Created", "driverCreated" : driver});
            }
        });
    });

/** 
 * Express Route: /drivers/:driver_id
 * @param {string} driver_id - Id Hash of driver Object
 */
router.route('/drivers/:driver_id')
    /**
     * GET call for the driver entity (single).
     * @returns {object} the driver with Id driver_id. (200 Status Code)
     * @throws Mongoose Database Error (500 Status Code)
     */
    .get(function(req, res){
        Driver.findById(req.params.driver_id, function(err, driver){
            if(err){
                // CEC.throw_id_not_found(res, err);
                //res.status(500).send(err);
                res.send(err = EH.errorHandle(err));
                return;
            }else{
                res.json(driver);
            }
        });  
    })
    /**
     * PATCH call for the driver entity (single).
     */
    .patch(function(req, res){
        Driver.findById(req.params.driver_id, function(err, driver){
            if(err){
                res.send(err = EH.errorHandle(err));
                return;
                //res.status(500).send(err);
            }else{
                for (var attribute in req.body) {
                    driver[attribute] = req.body[attribute];
                }

                driver.save(function(err){
                    if(err){
                        // res.status(500).send(err);
                        res.send(err = EH.errorHandle(err));
                        return;
                    }else{
                        res.json({"message" : "Driver Updated", "driverUpdated" : driver});
                    }
                });
            }
        });
    })
    /**
     * DELETE call for the driver entity (single).
     * @returns {object} A string message. (200 Status Code)
     * @throws Mongoose Database Error (500 Status Code)
     */
    .delete(function(req, res){
        Driver.remove({
            _id : req.params.driver_id
        }, function(err, driver){
            if(err){
                res.status(500).send(err);
                //CEC.throw_id_not_found(res, err);
            }else{
                res.json({"message" : "Driver Deleted"});
            }
        });
    });

module.exports = router;