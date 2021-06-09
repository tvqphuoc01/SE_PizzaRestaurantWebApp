/* eslint-disable no-unused-vars */
'use strict';

const firebase = require('../db');
const Client = require('../models/client');
const firestore = firebase.firestore();

// Render Sign Up Page
const clientGet = function(req, res) {
  res.render('signUp');
};


// Add new Client to Firebase
const addClient = async (req, res, next) => {
  try {
    const data = req.body;
    await firestore.collection('client').doc().set({
      email: data.email,
      userName: data.userName,
      passWord: data.passWord,
      firstName: data.FirstName,
      lastName: data.LastName,
      gender: data.Gender,
      cart: [],
    });
    res.render('logIn');
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = {
  addClient,
  clientGet,
};
