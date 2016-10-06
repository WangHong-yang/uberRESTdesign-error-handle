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

### Unit Test Results

All unit tests passed:
![](https://ws3.sinaimg.cn/large/7359a3efgw1f8igvxfzykj21kw107ahn.jpg)