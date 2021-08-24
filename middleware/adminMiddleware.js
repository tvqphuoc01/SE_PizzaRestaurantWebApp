/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
module.exports.AdminMiddleware = async function(req, res, next) {
    if (!req.cookies.userId) {
      res.redirect('/AdminLogIn');
      return;
    }
    next();
  };
  