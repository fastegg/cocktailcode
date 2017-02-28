var mongoose = require('mongoose');

var Schema = mongoose.Schema;
 
var EmailList = new Schema({
    email: {type: String, index: true, unique: true},
    dateAdded: {type: Date, default: Date.now},
});

EmailList.path('email').set(function (val) {
  return val.toLowerCase();
});

var EmailModel = mongoose.model('EmailList', EmailList);

function addToEmailList(email, cb) {
  var entry = new EmailModel();
  entry.email = email;
  entry.save(cb);
}

function unsubscribe(email, cb) {
  EmailModel.remove({email: email}, cb);
}

function getAll(cb) {
  EmailModel.find({}, cb);
}

exports.add = addToEmailList;
exports.remove = unsubscribe;
exports.getAll = getAll;