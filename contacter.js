var nodemailer = require('nodemailer');
var xoauth2 = require('xoauth2'), generator;


generator = xoauth2.createXOAuth2Generator({
  user: "matthesby@gmail.com", // Your gmail address. // CHANGE THIS TO TBE //
  clientId: "556514325539-j4rips0k8fl8h3gh4r8p3hnvdddcbcbi.apps.googleusercontent.com",// Your gmail address. // CHANGE THIS TO TBE //
  clientSecret: "sFxOMX_ka-Tic-q_HobfG98E",// Your gmail address. // CHANGE THIS TO TBE //
  refreshToken: "1/zFpdFoBF3iVoxXDVhZhyrBpEfAJmYDS9kpMAHPPtEbE",// Your gmail address. // CHANGE THIS TO TBE //
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
