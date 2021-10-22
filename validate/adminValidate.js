/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
/* eslint-disable prefer-const */
/* eslint-disable no-unused-vars */
'use strict';

const firebase = require('../db');
const Client = require('../models/client');
const firestore = firebase.firestore();

module.exports.validateLoginAdmin = async function(req, res, next) {
  
  //Client collections
  const admin = await firestore.collection('Admin');

  //Client Docs
  const adminDocs = await admin.get();
  
  const data = req.body;

  let errors = [];

  if (!data.email) {
    errors.push('Email is required !!!');
  }

  if (!data.passWord) {
    errors.push('Password is required !!!');
  }

  if (errors.length !== 0) {
    res.render('AdminLogIn', {
      errors: errors,
    });

    return;
  }

  errors = [];

  const ref = await firestore.collection('Admin').where('email', '==', data.email).get();
  
  if (ref.docs[0] === undefined) {
    errors.push('User does not exist !!!');

    if (errors.length !== 0) {
      res.render('AdminLogIn', {
        errors: errors,
      });

      return;
    }
  } else if (ref.docs[0].data().password !== data.passWord) {
    errors.push('Wrong PASSWORD !!');
    if (errors.length !== 0) {
      res.render('AdminLogIn', {
        errors: errors,
      });

      return;
    }
  } else {
    const refId = ref.docs[0].id;
    res.cookie('userId', refId, {expires: new Date(Date.now() + 3600000), httpOnly: true});
    next();
  }
};