const jwt = require('jsonwebtoken')

const requireAuth = (req, res, next) => {
    const token = req.headers.authorization;
    if (token) {
      jwt.verify(token, 'secret', (err, decodedToken) => {
        if (err) {
          console.log(err.message);
          res.status(401).send('unauthorized')
        } else {
          next();
        }
      });
    } else {
        res.status(401).send('unauthorized')
    }
  };

module.exports = { requireAuth }