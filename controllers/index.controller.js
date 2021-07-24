/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
'use strict';

const firebase = require('../db');
const Client = require('../models/client');
const firestore = firebase.firestore();

const indexGet = async function(req, res) {
  // Check Cookie and get email
  if (req.cookies.userId) {
    let userEmail;
    let check = 0;
    const findEmailClient = await firestore.collection('client').doc(req.cookies.userId).get().then((doc) => {
      if (doc.exists) {
        userEmail = doc.data().email;
      } else {
        // doc.data() will be undefined in this case
      }
    })
    if (userEmail === undefined) {
      const findEmailStaff = await firestore.collection('staff').doc(req.cookies.userId).get().then((doc) => {
        if (doc.exists) {
          userEmail = doc.data().email;
          check = 1;
        } else {
          // doc.data() will be undefined in this case
        }
      })
    }
    // const client = ref.docs[0].data();
    // res.locals.user = client;
    if (check === 0) {
      const ref = await firestore.collection('client').where('email', '==', userEmail).get();
      const user = ref.docs[0].data();
      res.locals.user = user;
    } else {
      const ref = await firestore.collection('staff').where('email', '==', userEmail).get();
      const user = ref.docs[0].data();
      res.locals.user = user;
    }
    res.render('index');
  } else {
    res.render('index');
  }
};

module.exports = {
  indexGet,
};
