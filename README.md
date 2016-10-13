# README #

To Setup the Environment for the first time:
```
#!javascript

npm install
```
To Run Codes:
```
#!javascript

node server.js
```
To Run Tests:
```
#!javascript

./node_modules/.bin/mocha -u exports tests
```

### What is this repository for? ###

* Quick summary: Code of Uber REST design with error handle 
* Code based on: [Clark](https://github.com/clarkjeria)'s [Frame Code](https://bitbucket.org/appcmusv/transportation-express-api)
* Version
0.0.2
* Error Handling Functions are in: **[scripts/errorHandling.js](https://github.com/WangHong-yang/uberRESTdesign-error-handle/blob/master/scripts/errorHandling.js)**

### The Detailed Error-Code Table

Error Code  | Error Message    | Relevant Resources  | Parameters
----------- | ----------|------------ |-----
1001 | attribute required | All Resources | None
1002 | attribute value's length is less than minlength | All Resources | None
1003 | attribute value's length is longer than maxlength | All Resources | None
1004 | invalid attribute {0} format | All Resources | {0} = email, phone
1005 | invalid attribute value type | All Resources | None
1006 | identifier not matching any resource instance | All Resources | None
1007 | identifier should not provided when patching | All Resources | None
1008 | Missing username when ask for token | All Resources | None
1009 | Missing password when ask for token | All Resources | None
1010 | Username does not match when ask for token | All Resources | None
1011 | Password does not match when ask for token | All Resources | None
1012 | Missing token | All Resources | None
1013 | Invalid Token | All Resources | None
1014 | Expired Token | All Resources | None

### Unit Test Results

All unit tests passed:
![](https://ws3.sinaimg.cn/large/7359a3efgw1f8igvxfzykj21kw107ahn.jpg)

### Encrypt and Decrypt
> **Encrypt:**
is in session.js, using encryption, hashing as well as base64 for encoding. Token will be returned in response body if given username and password are valid.

*encrypt success:*
![](http://ww2.sinaimg.cn/large/7359a3efgw1f8qq5bu6vij21h00n6dk3.jpg)

*encrypt error: username does not match*
![](http://ww3.sinaimg.cn/large/7359a3efgw1f8qq501cr1j21h00oqdjn.jpg)

>**Decrypt:** is in server.js, when use services (other than sessions), token is required.

*decrypt success:*
![](http://ww2.sinaimg.cn/large/7359a3efgw1f8qq4zu6dhj21h00qm0x2.jpg)

*decrypt error: missing token*
![](http://ww1.sinaimg.cn/large/7359a3efgw1f8qq53p0ysj21h20mg77t.jpg)

*decrypt error: invalid token*
![](http://ww3.sinaimg.cn/large/7359a3efgw1f8qq4yp0zhj21gu0k60w0.jpg)