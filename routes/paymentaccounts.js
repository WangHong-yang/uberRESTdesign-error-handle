/** 
 * Express Route: /payments
 * @author Clark Jeria, Hubert Wang
 * @version 0.0.2
 */
var express = require('express');
var router = express.Router();

var Pay = require('../app/models/paymentAccount');
var EH = require('../scripts/errorHandling');

router.route('/pays') 
    /**
     * GET call for the pay entity (multiple).
     * @returns {object} A list of pays. (200 Status Code)
     * @throws Mongoose Database Error (500 Status Code)
     */
    .get(function(req, res){
        Pay.find(function(err, pays){
            if(err){
                res.status(500).send(err);
            }else{
                res.json(pays);
            }
        });
    })
    /**
     * POST call for the pay entity.
     * @param {String} accountType - the card account type
     * @param {Number} accountNumber - the card account Number
     * @param {String} nameOnAccount - name on the card
     * @param {Number} bank - bank number
     * @returns {object} A message and the pay created. (201 Status Code)
     * @throws Bad Request Error (400 Status Code)
     */
    .post(function(req, res){
        var pay = new Pay(req.body);
        pay.save(function(err){
            if(err){
                res.status(400).send(err = EH.errorHandle(err));
            }else{
                res.status(201).json(pay);
            }
        });
    });

/** 
 * Express Route: /pays/:pay_id
 * @param {string} pay_id - Id Hash of pay Object
 */
router.route('/pays/:pay_id')
    /**
     * GET call for the pay entity (single).
     * @returns {object} the pay with Id pay_id. (200 Status Code)
     * @throws Mongoose Database Error (500 Status Code)
     */
    .get(function(req, res){
        Pay.findById(req.params.pay_id, function(err, pay){
            if(err){
                res.status(404).send(err = EH.errorHandle(err)).end();
            }else{
                // if pay === null, err
                if(pay === null) {
                    res.status(404).end();
                } else {
                    res.json(pay);  
                }
            }
        });  
    })
    /**
     * PATCH call for the pay entity (single).
     * @param {String} accountType - the card account type
     * @param {Number} accountNumber - the card account Number
     * @param {String} nameOnAccount - name on the card
     * @param {Number} bank - bank number
     * @returns {object} A message and the pay updated. (200 Status Code)
     * @throws Bad Request Error (400 Status Code)
     */
    .patch(function(req, res){
        Pay.findById(req.params.pay_id, function(err, pay){
            if(err){
                res.send(err = EH.errorHandle(err));
                return;
            }else{
                for (var attribute in req.body) {
                    pay[attribute] = req.body[attribute];
                }
                pay.save(function(err){
                    if(err){
                        res.send(err = EH.errorHandle(err));
                        return;
                    }else{
                        res.json({"message" : "pay Updated", "pay_created" : pay});
                    }
                });
            }
        });
    })
    /**
     * DELETE call for the pay entity (single).
     * @returns {object} A string message. (200 Status Code)
     * @throws Mongoose Database Error (500 Status Code)
     */
    .delete(function(req, res){
        // if pay id not found
        Pay.findById(req.params.pay_id, function(err, pay){
            if(err){
                res.status(404).send(err = EH.errorHandle(err)).end();
            } else {
                Pay.remove({
                    _id : req.params.pay_id
                }, function(err, pay){
                    if(err){
                        res.status(404).send(err = EH.errorHandle(err));
                    }else{
                        res.status(200).json({"message" : "pay Deleted"});
                    }
                });
            }
        });
    });

module.exports = router;