# Error Code Table and Code Explanation

## Error Code Table
Error Code  | Error Message    | Relevant Resources  | Parameters
----------- | ----------|------------ |-----
1001  | request body is empty  | All Resources  | None
1002 | id should not be provided | All Resources | None
1003 | Identifier not matching any resource instance | All Resources | None
1004 | Invalid resource name {0} given | All Resources | `0 - Resource Name`
2001 | car attributes {0} in request body is incomplete | `cars` | `0 - Attribute Name`
2002 | car attributes {0} type invalid | `cars` | `0 - Attribute Name`
2003 | car attribute value is invalid | `cars` | None
2004 | car attribute value not unique | `cars` | None
3001 | driver attributes in request body is incomplete | `drivers` | None
4001 | passenger attributes in request body is incomplete | `passengers` | None

## Code Explanation
### Establish error detection funtions

A script for detecting error is created for using, named as detectErrorFuncs.js
