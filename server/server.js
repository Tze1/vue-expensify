// For production server & Heroku start.
var express = require('express');
var path = require('path');
var serveStatic = require('serve-static');
var app = express();
var port = process.env.PORT || 5000;

app.use(serveStatic(path.join(__dirname + '/dist')));
app.listen(port);

console.log('server started '+ port);
