// Foster Community Connect Server
require('dotenv').config()
var nodemailer = require('nodemailer')
const express = require('express')
const cors = require('cors')
const app = express()

app.use(cors())

let port = process.env.PORT
if (port == null || port == '') {
  port = 3000
}

var transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.GMAIL_USERNAME,
    pass: process.env.GMAIL_PASSWORD
  }
})


var name;

app.get('/ff792xyp872', function(req, res) {
    var name = req.query.firstName + ' ' + req.query.lastName;
    var emailAddress = req.query.email;
    var phone = req.query.phoneNumber;
    var items = req.query.description;

    var mailOptions = {
      from: emailAddress,
      to: 'shaylalane522@gmail.com',
      subject: 'Request from ' + name,
      text: name + ' is requesting: ' + items + '\n\n' + name +"'s phone number is " + phone + '\n' + name + "'s email address is " + emailAddress
    };



    transporter.sendMail(mailOptions, function(error, info){
        if(error) {
            console.log(error);
            res.send("SMTP log:" + error.data);
        } else {

            res.send('Congratulations you little genius. Email sent:' + info.response);
            console.log(req.originalUrl);
            for (const key in req.query) {
              console.log(key, req.query[key])
            }

            var first = req.query.firstName;
            console.log(first);
        }
    });
});

app.listen(port);
