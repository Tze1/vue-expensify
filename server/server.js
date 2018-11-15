// For production server & Heroku start.
var express = require('express');
var history = require('connect-history-api-fallback');
var path = require('path');
var serveStatic = require('serve-static');
var app = express();
var port = process.env.PORT || 3000;

app.use(history());
app.use(serveStatic(path.join(__dirname, '..', 'dist')));
app.listen(port);

console.log('server started on port '+ port);
