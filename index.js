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

const route_path = process.env.ROUTE_PATH
const recipient_email_address = process.env.RECIPIENT_EMAIL_ADDRESS

app.get(route_path, function(req, res) {
  var name = req.query.firstName + ' ' + req.query.lastName
  var emailAddress = req.query.email
  var phone = req.query.phoneNumber
  var items = req.query.description

  var mailOptions = {
    from: emailAddress,
    to: recipient_email_address,
    subject: 'Request from ' + name,
    text: name + ' is requesting: ' + items + '\n\n' + name +"'s phone number is " + phone + '\n' + name + "'s email address is " + emailAddress
  }

  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      console.log(error)
      res.send("SMTP log:" + error.data)
    } else {
      res.send('Congratulations you little genius. Email sent:' + info.response)
    }
  })
})

app.listen(port)
