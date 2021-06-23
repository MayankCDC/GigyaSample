var jwkToPem = require('jwk-to-pem'),
	jwt = require('jsonwebtoken');

var jwk = {
  "callId": "some value",
  "errorCode": 0,
  "apiVersion": 2,
  "statusCode": 200,
  "statusReason": "OK",
  "time": "2021-06-07T11:31:21.306Z",
  "kty": "RSA",
  "n": "",
   "e": "AQAB",
  "alg": "RS256",
  "use": "sig",
  "kid": "some value"
},
	pem = jwkToPem(jwk);

var res=jwt.verify(Your-JWT-Token, pem);
console.log(res);
