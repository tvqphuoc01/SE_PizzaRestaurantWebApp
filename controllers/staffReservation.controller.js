'use strict';

const firebase = require('../db');
const Staff = require('../models/Staff');
const firestore = firebase.firestore();

const staffReservationGet = async function(req, res) {
  if (req.cookies.userId) {
    let userEmail;
    const findEmail = await firestore.collection('staff').doc(req.cookies.userId).get().then((doc) => {
      if (doc.exists) {
        userEmail = doc.data().email;
      } else {
        // doc.data() will be undefined in this case
        console.log('No such document!');
      }
    }).catch((error) => {
      console.log('Error getting document:', error);
    }); ;
    // const client = ref.docs[0].data();
    // res.locals.user = client;
    const ref = await firestore.collection('staff').where('email', '==', userEmail).get();
    const client = ref.docs[0].data();
    res.locals.user = client;
    res.render('StaffReservation');
  } else {
    res.render('StaffReservation');
  }
};

module.exports = {
  staffReservationGet,
};