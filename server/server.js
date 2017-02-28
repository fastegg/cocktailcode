'strict';

var webpack = require('webpack');
var config = require('./webpack.config');
var express = require('express');
var webpack = require('webpack');
var MemoryFS = require("memory-fs");
var path = require('path');
var mongoose = require('mongoose');

var api = require('./api');

var app;

var dbaddress = process.env.db || 'mongodb://localhost/cocktailcode';

mongoose.connect(dbaddress);

if (process.env.PROD==='1') {
  console.log('running in production');
  app = express();

  var staticBuilds = express.static('builds');
  app.use('/builds', staticBuilds);
} else {
  var WebpackDevServer = require('webpack-dev-server');

  app = new WebpackDevServer(webpack(config), {
    publicPath: config.output.publicPath,
    hot: true,
    historyApiFallback: true
  }).app;
}

app.get('/app', function(req, res) {
  res.send('reqesting the app page');
  res.end();
});

app.use('/api', api);

var staticPages = express.static('public', {index: 'index.html'});
app.use('/', staticPages);

app.listen(process.env.PORT || 3000, function (err) {
  if (err) {
    console.log(err);
  }
  console.log('Listening at port:' + (process.env.PORT || 3000));
});

