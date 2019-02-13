var jwt = require('jsonwebtoken');
var config = require('./config');


function verifyToken(req, res, next) {
    var token = req.body.jwt;
    if (!token)
        return res.status(403).send({
            auth: 'False',
            message: 'No token provided.'
        });
    jwt.verify(token, config.secret, function (err, decoded) {
        if (err)
            return res.status(500).send({
                auth: 'False',
                message: 'Failed to authenticate token.'
            });
        // if everything good, save to request for use in other routes
        req.id = decoded.id;
        req.password = decoded.password;
        next();
    });
}
module.exports = verifyToken;
// jwt.verify('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IktBMTktMTIzIiwicGFzc3dvcmQiOiIxMjM0NSIsImlhdCI6MTU1MDA2OTIxOSwiZXhwIjoxNTUwMTU1NjE5fQ.JxJAj2aAMY6QfVPzcEkLltw3QgWTnqXY1Cd5qScMHr8', config.secret, function (err, decoded)
// {
//     console.log(decoded,err);
// });