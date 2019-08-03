// Foster Community Connect Server
require('dotenv').config()
var nodemailer = require('nodemailer');

const express = require('express')
const app = express()
let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}
const gmail_username = process.env.GMAIL_USERNAME;
const gmail_password = process.env.GMAIL_PASSWORD;

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: gmail_username,
      pass: gmail_password
    }
  });
  
  var mailOptions = {
    from: 'shaylalane522@gmail.com',
    to: 'shaylalane522@gmail.com',
    subject: 'Sending Email using Node.js',
    text: 'That was easy!'
  };

app.get('/', function(req, res) {
    transporter.sendMail(mailOptions, function(error, info){
        if(error) {
            //res.status(status).send(body);
            res.send("Error type:" + error.name);
            res.send("SMTP log:" + error.data);
        } else {
            res.send('Congratulations you little genius. Email sent:' +info.response);
        }
    });
});

app.listen(port);
