var express = require('express');
var bodyParser = require('body-parser');
var contacter = require('./contacter');
var Recaptcha = require('recaptcha').Recaptcha;
var app = express();
var https = require('https');

var SECRET = "6LeMix0TAAAAAJU9QPUUz7xeZQ77n7jhV1YMenJu";


app.use(express.static('public'));

app.use(express.static('web'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}))

// Enables CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});




//
app.post('/', function(req, res) {

  console.log(req.body["g-recaptcha-response"]);

  verifyRecaptcha(req.body["g-recaptcha-response"], function(success) {
    if (success) {

      console.log("Making a: " + req.body.action);

      /* @ Desc: Handles The Contact Rquests */
      if (req.body.action === "contact") {
        contacter.transporter.message = {
          from: '"Matt Hesby" <matthesby@gmail.com>', // CHANGE TO TBE //
          to: "'Matt' <matthesby@gmail.com>", // CHANGE TO TBE //
          replyTo: "no-name <no-name@gmail.com>",
          subject: "Contact from matt.hesby.io",
          text: "empty",
          html: "empty",
        }

        contacter.transporter.message.replyTo = req.body.replyTo;
        contacter.transporter.message.subject = req.body.subject;
        contacter.transporter.message.text = req.body.text;
        contacter.transporter.message.html = req.body.html;

        contacter.generator.generateToken(function(error, token, accessToken) {
          if (error) {
            console.log("token provider error: " + error);
          } else {
            console.log(" here accessToken: " + accessToken);
            contacter.generator.updateToken(accessToken);
          }
        })

        contacter.transporter.sendMail(contacter.transporter.message,

          function(err, response) {
            console.log("sending mail");

            if (err) {
              console.log(err);
              return;
            } else {
              console.log("Message sent" + response.message);
            }
            contacter.transporter.close();
          })

      }

      res.end("Success!");
      // TODO: do registration using params in req.body
    } else {
      res.end("Captcha failed, sorry.");
      // TODO: take them back to the previous page
      // and for the love of everyone, restore their inputs
    }
  });




})


// Helper function to make API call to recatpcha and check response
function verifyRecaptcha(key, callback) {


  https.get("https://www.google.com/recaptcha/api/siteverify?secret=" + SECRET + "&response=" + key, function(res) {
    var data = "";
    res.on('data', function(chunk) {
      data += chunk.toString();
    });
    res.on('end', function() {
      try {
        var parsedData = JSON.parse(data);
        callback(parsedData.success);
      } catch (e) {
        callback(false);
      }
    });
  });
}


var server = app.listen(8080, function() {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
