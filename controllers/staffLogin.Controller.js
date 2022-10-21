'use strict';

const firebase = require('../db');
const Staff = require('../models/Staff');
const firestore = firebase.firestore();

const staffLogin = function(req, res) {
  res.render('staffLogin');
};

const staffPostLogin = async function(req, res) {
  const data = req.body;
  const ref = await firestore.collection('staff').where('email', '==', data.email).get();
  const client = ref.docs[0].data();
  res.locals.user = client;
  res.redirect('StaffReservation');
};

module.exports = {
  staffLogin,
  staffPostLogin,
};
