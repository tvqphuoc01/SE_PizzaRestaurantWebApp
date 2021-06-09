/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
module.exports.authMiddleware = async function(req, res, next) {
  if (!req.cookies.userId) {
    res.redirect('/logIn');
    return;
  }
  next();
};
