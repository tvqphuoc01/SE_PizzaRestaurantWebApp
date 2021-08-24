/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
'use strict';

const firebase = require('../db');
const Client = require('../models/client');
const { use } = require('../routers/clientRouter');
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
      });

      const findEmailAdmin = await firestore.collection('Admin').doc(req.cookies.userId).get().then((doc) => {
        if (doc.exists) {
          userEmail = doc.data().email;
          check = 2;
        } else {
          // doc.data() will be undefined in this case
        }
      });
    }
    // const client = ref.docs[0].data();
    // res.locals.user = client;
    if (check === 0) {
      const ref = await firestore.collection('client').where('email', '==', userEmail).get();
      const user = ref.docs[0].data();
      const cartLength = user.cart.length;
      res.locals.user = user;
      res.locals.cartLength = cartLength;
      res.render('index');
    } else if (check === 1) {
      const ref = await firestore.collection('staff').where('email', '==', userEmail).get();
      const user = ref.docs[0].data();
      res.locals.user = user;
      res.redirect('StaffReservation');
    } else {
      const ref = await firestore.collection('Admin').where('email', '==', userEmail).get();
      const user = ref.docs[0].data();
      res.locals.user = user;
      res.redirect('admin');
    }
  } else {
    res.render('index');
  }
};

module.exports = {
  indexGet,
};
