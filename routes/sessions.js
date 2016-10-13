/** 
 * Express Route: /drivers
 * @author Hubert Wang
 * @version 0.0.3
 */
var express = require('express');
var router = express.Router();
var CryptoJS=require("crypto-js");
var base64=require("js-base64").Base64;

router.route('/sessions')
    .post(function(req, res){
        /* Kept in database, start */
        const usernameDB = "john";
        const clearPasswordDB = "12315"; 
        const hashPasswordDB = CryptoJS.HmacSHA1(clearPasswordDB,"pw").toString();
        /* Kept in database, end */

        // If no name in request body
        if(req.body.username == undefined) {
            res.status(400).json({
                "errorCode": 1008, // Missing Name when asking for token
                "errorMsg": "Missing username when ask for token",
                "statusCode": 404,
                "statusTxt": "Bad Request"
            }).end();
            return;
        }
        // If no password given
        if(req.body.password === undefined) {
            res.status(400).json({
                "errorCode": 1009, // Missing password when asking for token
                "errorMsg": "Missing password when ask for token",
                "statusCode": 400,
                "statusTxt": "Bad Request"
            }).end();
            return;
        }
        // If username does not match
        if(req.body.username !== usernameDB) {
            res.status(404).json({
                "errorCode": 1010, // username does not match
                "errorMsg": "Username does not match",
                "statusCode": 404,
                "statusTxt": "Bad Request"
            }).end();
            return;
        }
        // If password does not match
        var hashPassword = CryptoJS.HmacSHA1(req.body.password, "pw").toString();
        if(hashPassword !== hashPasswordDB) {
            res.status(404).json({
                "errorCode": 1011, // password does not match
                "errorMsg": "Password does not match",
                "statusCode": 404,
                "statusTxt": "Bad Request"
            }).end();
            return;
        }
        
        var username = req.body.username;
        var password = req.body.password;

        expiration = (parseInt(Date.now()/1000) + 3600);
        
        // encryption
        clearString = username+":"+expiration;
        hashString = CryptoJS.HmacSHA1(clearString,"APP");
        cryptString = CryptoJS.AES.encrypt(clearString+":"+hashString,"Secret").toString(); //
        response = {token: base64.encode(cryptString)};
        res.status(200).json(response);
    });

module.exports = router;