// Foster Community Connect Server
require('dotenv').config()
const express = require('express')
const app = express()
let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}
const gmail_username = process.env.GMAIL_USERNAME;
const gmail_password = process.env.GMAIL_PASSWORD;

app.get('/', function(req, res) {
    res.send(gmail_password);
});

app.listen(port);
