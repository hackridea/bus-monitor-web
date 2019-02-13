
var config = require('./config');
var jwt = require('jsonwebtoken');


function create(username, pasword) {
  var token = jwt.sign({ id: id, password: pasword }, config.secret, {
    expiresIn: 86400 // expires in 24 hours
  });
  return token;
}

module.exports = create;
