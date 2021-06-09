/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
'use strict';

const firebase = require('../db');
const Client = require('../models/client');
const firestore = firebase.firestore();

const clientLogin = function(req, res) {
  res.render('logIn');
};

const clientPostLogin = async function(req, res) {
  const data = req.body;
  const ref = await firestore.collection('client').where('email', '==', data.email).get();
  const client = ref.docs[0].data();
  res.locals.user = client;
  res.render('index');
};

module.exports = {
  clientLogin,
  clientPostLogin,
};
