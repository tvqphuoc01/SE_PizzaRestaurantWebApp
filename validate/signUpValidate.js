/* eslint-disable no-unused-vars */
'use strict';

const firebase = require('../db');
const Client = require('../models/client');
const firestore = firebase.firestore();

module.exports.validateNewUser = async function(req, res, next) {
  const clients = await firestore.collection('client');
  const clientDocs = await clients.get();
  const data = req.body;
  const emailArray = [];
  const userNameArray = [];
  clientDocs.forEach((doc) => {
    emailArray.push(doc.data().email);
    userNameArray.push(doc.data().userName);
  });


  let checkEmail = true;
  let checkUserName = true;

  emailArray.map((email) => {
    if (email === data.email) {
      checkEmail = false;
    }
  });

  userNameArray.map((username) => {
    if (username === data.userName) {
      checkUserName = false;
    }
  });

  let errors = [];

  if (!req.body.userName) {
    errors.push('Username is required !!!');
  }

  if (!req.body.passWord) {
    errors.push('Password is required !!!');
  }

  if (!req.body.email) {
    errors.push('Email is required !!!');
  }

  if (!req.body.FirstName) {
    errors.push('First name is required !!!');
  }

  if (!req.body.LastName) {
    errors.push('Last name is required !!!');
  }

  if (!req.body.Gender) {
    errors.push('Gender is required !!!');
  }

  if (errors.length !== 0) {
    res.render('signUp', {
      errors: errors,
    });

    return;
  }

  errors = [];

  if (checkUserName === false) {
    errors.push('Sorry...Username already exist !!!');
  }

  if (checkEmail === false) {
    errors.push('This email has been taken, Do you already has an account?');
  }

  if (req.body.passWord.length < 8) {
    errors.push('Password must have at least 8 characters !!!');
  }

  if (errors.length !== 0) {
    res.render('signUp', {
      errors: errors,
    });

    return;
  }

  next();
};
