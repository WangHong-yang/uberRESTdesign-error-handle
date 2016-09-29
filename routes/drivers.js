/** 
 * Express Route: /drivers
 * @author Clark Jeria
 * @version 0.0.3
 */
var express = require('express');
var router = express.Router();

var Driver = require('../app/models/driver');
var CEC = require('../scripts/commonErrorControl')
var DriverEC = require('../scripts/driverErrorControl')

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
     * POST call for the driver entity.
     * @param {string} firstName - The first name of the new driver
     * @param {string} lastName - The last name of the new driver
     * @param {date} dateOfBirth - The date of birth of the new driver
     * @param {string} licenseType - The license type of the new driver
     * @param {string} username - The username of the new driver
     * @param {string} password - The password of the new driver
     * @param {string} addressLine1 - The address line 1 of the new driver
     * @param {string} addressLine2 - The address line 2 of the new driver
     * @param {string} city - The city of the new driver
     * @param {string} state - The state of the new driver
     * @param {number} zip - The zip code of the new driver
     * @param {number} phoneNumber - The phone number of the new driver
     * @returns {object} A message and the driver created. (201 Status Code)
     * @throws Mongoose Database Error (500 Status Code)
     */
    .post(function(req, res){
        var driver = new Driver(req.body);
        /* Error Handle start */
        CEC.throw_empty_request_body(res, req.body);
        DriverEC.throw_missing_driver_attribute(res, req.body);
        CEC.throw_id_provided(res, req.body);
        DriverEC.throw_wrong_driver_attribute_type(res, req.body);
        DriverEC.throw_invalid_driver_attribute_value(res, req.body);
        DriverEC.throw_duplicate_driver_attribute_value(res, req.body, Driver);
        DriverEC.throw_invalid_driver_attribute_key(res, req.body, Driver);
        /* Error Handle end */

        driver.save(function(err){
            if(err){
                res.status(500).send(err);
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
                CEC.throw_id_not_found(res, err);
                //res.status(500).send(err);
            }else{
                res.json(driver);
            }
        });  
    })
    /**
     * PATCH call for the driver entity (single).
     * @param {string} firstName - The first name of the new driver
     * @param {string} lastName - The last name of the new driver
     * @param {date} dateOfBirth - The date of birth of the new driver
     * @param {string} licenseType - The license type of the new driver
     * @param {string} username - The username of the new driver
     * @param {string} password - The password of the new driver
     * @param {string} addressLine1 - The address line 1 of the new driver
     * @param {string} addressLine2 - The address line 2 of the new driver
     * @param {string} city - The city of the new driver
     * @param {string} state - The state of the new driver
     * @param {number} zip - The zip code of the new driver
     * @param {number} phoneNumber - The phone number of the new driver
     * @returns {object} A message and the driver updated. (200 Status Code)
     * @throws Mongoose Database Error (500 Status Code)
     */
    .patch(function(req, res){
        Driver.findById(req.params.driver_id, function(err, driver){
            if(err){
                //res.status(500).send(err);
                CEC.throw_id_not_found(res, err);
            }else{
                for (var attribute in req.body) {
                    driver[attribute] = req.body[attribute];
                }

                driver.save(function(err){
                    if(err){
                        res.status(500).send(err);
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
                //res.status(500).send(err);
                CEC.throw_id_not_found(res, err);
            }else{
                res.json({"message" : "Driver Deleted"});
            }
        });
    });

module.exports = router;