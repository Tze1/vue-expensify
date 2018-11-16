// For production server & Heroku start.
var express = require('express');
var history = require('connect-history-api-fallback');
var path = require('path');
var serveStatic = require('serve-static');
var app = express();
var port = process.env.PORT || 3000;

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config(path.join(__dirname, '..', '.env.development'));
}

app.use(serveStatic(path.join(__dirname, '..', 'dist')));
app.use(history({
  disableDotRule: true,
  verbose: true
}));
app.get('*', (req, res) => {
  res.sendFile(path.joins(__dirname, '..', 'dist', 'index.html'));
})
app.listen(port);

console.log('server started on port '+ port);
