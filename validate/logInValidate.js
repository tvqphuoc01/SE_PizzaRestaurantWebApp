/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
/* eslint-disable prefer-const */
/* eslint-disable no-unused-vars */
'use strict';

const firebase = require('../db');
const Client = require('../models/client');
const firestore = firebase.firestore();

module.exports.validateLoginClient = async function(req, res, next) {
  const clients = await firestore.collection('client');
  const clientDocs = await clients.get();
  const data = req.body;

  let checkClientEmail;
  let checkClientPass;

  let errors = [];

  if (!data.email) {
    errors.push('Email is required !!!');
  }

  if (!data.passWord) {
    errors.push('Password is required !!!');
  }

  if (errors.length !== 0) {
    res.render('login', {
      errors: errors,
    });

    return;
  }

  errors = [];

  firestore.collection('client').where('email', '==', data.email)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          checkClientEmail = doc.data().email;
          checkClientPass = doc.data().passWord;
          if (!checkClientEmail) {
            errors.push('User does not exist !!!');
          }

          if (checkClientPass !== data.passWord) {
            errors.push('Wrong PASSWORD !!');
          }

          if (errors.length !== 0) {
            res.render('logIn', {
              errors: errors,
            });

            return;
          }
        });
      });

  const ref = await firestore.collection('client').where('email', '==', data.email).get();

  const refId = ref.docs[0].id;
  res.cookie('userId', refId);
  next();
};
