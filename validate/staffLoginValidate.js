'use strict';

const firebase = require('../db');
const Staff = require('../models/staff');
const firestore = firebase.firestore();

module.exports.validateLoginStaff = async function(req, res, next) {
  
  //Staff collections
  const staffs = await firestore.collection('staff');

  //Staff Docs
  const staffDocs = await staffs.get();
  
  const data = req.body;

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

  const ref = await firestore.collection('staff').where('email', '==', data.email).get();
  
  if (ref.docs[0] === undefined) {
    errors.push('User does not exist !!!');

    if (errors.length !== 0) {
      res.render('logIn', {
        errors: errors,
      });

      return;
    }
  } else if (ref.docs[0].data().passWord !== data.passWord) {
    errors.push('Wrong PASSWORD !!');
    if (errors.length !== 0) {
      res.render('logIn', {
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