/* eslint-disable prefer-const */
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
    //req.body.avatar = req.file.path.split('\\').slice(1).join('/');
    const data = req.body;

    await firestore.collection('client').doc().set({
      email: data.email,
      userName: data.userName,
      passWord: data.passWord,
      firstName: data.FirstName,
      lastName: data.LastName,
      gender: data.Gender,
      address: data.address,
      phone: data.phone,
      cart: [],
      avatar: "",
      checkOrder: "",
      historyOrder: []
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
