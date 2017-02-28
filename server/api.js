var express = require('express');
var emailList = require('./emailList');

var routes = express.Router();

routes.get('/listemails', function(req, res) {
  emailList.getAll(function(err, results) {
    if (err) {
      res.send('error: ' + err);
      res.end(400);
    }

    var rtn = '';
    for (var i=0;i<results.length;i++) {
      rtn += results[i].email + '<br/>';
    }

    if (!rtn) {
      rtn = 'no emails yet';
    }

    res.send(rtn);
    res.end();
  });
});

routes.get('/subscribe/:email', function(req, res) {
  var email = req.params.email;

  emailList.add(email, function(err) {
    if (err) return res.end(400);

    res.send('Thank you!');
    res.end();
  });
});

module.exports = routes;