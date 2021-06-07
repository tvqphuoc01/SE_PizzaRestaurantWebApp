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
    await firestore.collection('client').doc().set(data);
    res.send('Record saved successfuly');
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = {
  addClient,
  clientGet
};
