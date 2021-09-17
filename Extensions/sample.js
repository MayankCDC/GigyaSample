var express = require('express');
var app = express();
var wr = require('fs');
var PORT = 3001;
var ret = {
    status: "OK"
};
var bp = require('body-parser');
var jwt_decode = require('jwt-decode');
app.use(bp.json())
app.use(bp.urlencoded({
    extended: true
}))

app.get('/test', function(req, res) {
res.setHeader('Content-Type', 'application/json');
res.send(ret);
});
app.post('/', function(req, res) {
    var decoded = jwt_decode(req.body.jws);
  //  console.log((decoded)); to see request body
     
   if (decoded.extensionPoint.toString() == "OnBeforeAccountsRegister") {
       console.log("extension triggered");
        if (!decoded.data.params.email.toString().endsWith('@xyz.com')){
            console.log("test 1 success");
            ret.status = "FAIL";
            var customMessage = "Email should belong to domain 'xyz.com'";
            if (decoded.data.params.lang === "he")
                customMessage = "אימייל צריך להיות בדומיין איקס ווי זד";
            ret.data = {
                validationErrors: [
                    { fieldName: "profile.email", message: customMessage },
                ]
            }
        }
    }
    else if (extensionPoint === "OnBeforeAccountsLogin") {
        if (decoded.data.accountInfo !== undefined &&
            decoded.data.accountInfo.profile !== undefined &&
            decoded.data.accountInfo.profile.firstName === "block" &&
            decoded.data.accountInfo.profile.lastName === "me") {
            ret.status = "FAIL";
            var customMessage = "Your account is temporarly blocked";
            if (decoded.data.params.lang === "he")
                customMessage = "חשבונך חסום באופן זמני";
            ret.data = {
                userFacingErrorMessage: customMessage
            };
        }
    }
    else if (extensionPoint === "OnBeforeSetAccountInfo")
    { console.log("else");
        if (decoded.data.params.profile !== undefined &&
            decoded.data.params.profile.firstName !== undefined &&
            decoded.data.params.profile.firstName.includes("fail"))
        {
            ret.status = "FAIL";
            var customMessage = "Invalid name - contains a word with a negetive meaning";
            var firstLetter = decoded.data.params.profile.firstName.charAt(0);
            if (decoded.data.params.lang === "he")
                customMessage = "שם לא חוקי - מכיל מילה עם משמעות שלילית";
            ret.data = {
                validationErrors: [
                    { fieldName: "profile.firstName", message: customMessage }
                ]
            };
            
        }
    }
      
    res.setHeader('Content-Type', 'application/json');
    console.log(ret);
    //res.send(ret);
});

app.listen(PORT, function(err) {
    if (err) console.log("err" + err);
    console.log("Server listening on PORT", PORT);
});
