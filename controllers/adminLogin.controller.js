'use strict';

const firebase = require('../db');
const Staff = require('../models/Staff');
const firestore = firebase.firestore();

const adminLogin = function(req, res) {
  res.render('AdminLogin');
};

const adminPostLogin = async function(req, res) {
  const data = req.body;
  const ref = await firestore.collection('Admin').where('email', '==', data.email).get();
  const client = ref.docs[0].data();
  res.locals.user = client;
  res.redirect('admin');
};

module.exports = {
    adminLogin,
    adminPostLogin,
};
