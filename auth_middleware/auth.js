// const jwt = require('jsonwebtoken');
// const dbConn = require('../config/database');

// module.exports = function (req, res, next) {
//   // Get token from header
//   const token = req.header('x-auth-token');

//   // Check if not token
//   if (!token) {
//     return res.status(401).json({ msg: 'No token, authorization denied' });
//   }

//   // Verify token
//   try {
//     jwt.verify(token, dbConn.get('jwtSecret'), (error, decoded) => {
//       if (error) {
//         return res.status(401).json({ msg: 'Token is not valid' });
//       } else {
//         req.user = decoded.user;
//         next();
//       }
//     });
//   } catch (err) {
//     console.error('something wrong with auth middleware');
//     res.status(500).json({ msg: 'Server Error' });
//   }
// };

const { verify } = require('jsonwebtoken');

module.exports = {
  checkToken: (req, res, next) => {
    let token = req.get('authorization');
    if (token) {
      token = token.slice(7);
      verify(token, 'qwe1234', (err, decoded) => {
        if (err) {
          res.status(500).json({
            success: 500,
            message: 'Invalid token',
          });
        } else {
          next();
        }
      });
    } else {
      res.status(500).json({
        success: 500,
        message: 'Access denained! unauthorised usee',
      });
    }
  },
};

