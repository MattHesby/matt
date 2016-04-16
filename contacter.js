var nodemailer = require('nodemailer');
var xoauth2 = require('xoauth2'), generator;


generator = xoauth2.createXOAuth2Generator({
  user: "matthesby@gmail.com", // Your gmail address. // CHANGE THIS TO TBE //
  clientId: "clientID",// Your gmail address. // CHANGE THIS TO TBE //
  clientSecret: "clientSecret",// Your gmail address. // CHANGE THIS TO TBE //
  refreshToken: "REFRESHTOKENHERE",// Your gmail address. // CHANGE THIS TO TBE //
});

var transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        xoauth2: generator
      }
    })

module.exports = {
  transporter,
  generator
}
