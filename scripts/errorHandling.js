/** 
 * Error Control Script for common use
 * @author Hubert Wang
 * @version 0.0.2
 */

/**
 * Error Message 
 * 1001	- attribute required	                            All Resources	None
 * 1002	- attribute value's length is less than minlength	All Resources	None
 * 1003	- attribute value's length is longer than maxlength	All Resources	None
 * 1004	- invalid attribute {0} format	                    All Resources	{0} = email, phone
 * 1005	- invalid attribute value type	                    All Resources	None
 * 1006	- identifier not matching any resource instance	    All Resources	None
 * 1007	- identifier should not provided when patching	    All Resources	None
 */

function errorHandle(err) {
    var errMsgs = [];
    for(var key in err.errors){
        if (err.errors[key].kind === "required") {
            var newMsg = {
                "errorCode": 1001,
                "errorMsg": err.errors[key].message,
                "statusCode": 400,
                "statusTxt": "Bad Request"
            };
            errMsgs.push(newMsg);
        }
        if (err.errors[key].kind === "minlength") {
            var newMsg = {
                "errorCode": 1002,
                "errorMsg": err.errors[key].message,
                "statusCode": 400,
                "statusTxt": "Bad Request"
            };
            errMsgs.push(newMsg);
        }
        if (err.errors[key].kind === "maxlength") {
            var newMsg = {
                "errorCode": 1003,
                "errorMsg": err.errors[key].message,
                "statusCode": 400,
                "statusTxt": "Bad Request"
            };
            errMsgs.push(newMsg);
        }
        if (err.errors[key].kind === "user defined") { 
            var newMsg = {
                "errorCode": 1004,
                "errorMsg": err.errors[key].message,
                "statusCode": 400,
                "statusTxt": "Bad Request"
            };
            errMsgs.push(newMsg);
        }
        if (err.errors[key].kind === "ObjectID") { 
            var newMsg = {
                "errorCode": 1007, // identifier should not provided when patching
                "errorMsg": err.errors[key].message,
                "statusCode": 400,
                "statusTxt": "Bad Request"
            };
            errMsgs.push(newMsg);
        }
    }
    if (err.kind === "ObjectId") {
        var newMsg = {
            "errorCode": 1006, // identifier not matching any resource instance
            "errorMsg": err.message,
            "statusCode": 404,
            "statusTxt": "Bad Request"
        };
        errMsgs.push(newMsg);
    }
    return errMsgs;
}

module.exports = {
    errorHandle: errorHandle
}