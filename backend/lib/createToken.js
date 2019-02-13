
var config = require('./config');
var jwt = require('jsonwebtoken');


function create(id, password) {
  var token = jwt.sign({ id: id, password: password }, config.secret, {
    expiresIn: 86400 // expires in 24 hours
  });
  return token;
}

module.exports = create;
