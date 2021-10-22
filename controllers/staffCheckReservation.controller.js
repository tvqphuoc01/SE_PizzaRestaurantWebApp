'use strict';

const firebase = require('../db');
const Staff = require('../models/Staff');
const firestore = firebase.firestore();

const StaffCheckReservationPost = async function(req, res) {
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
    });
    // const client = ref.docs[0].data();
    // res.locals.user = client;
    const ref = await firestore.collection('staff').where('email', '==', userEmail).get();
    const userOfReservation = await firestore.collection('client').doc(req.body.Id).get();
    const refReservation = await firestore.collection('reservation').where('userId', '==', req.body.Id).get();
    const userOfOrderData = userOfReservation.data();
    let reservationList = [];
    refReservation.docs.map(docs => reservationList.push(docs.data()));
    let newReservation;
    for (let i = 0; i < reservationList.length; i++) {
      if(reservationList[i].status !== 2 && reservationList[i].status !== 3) {
        newReservation = reservationList[i];
      }
    }
    const client = ref.docs[0].data();
    res.locals.user = client;
    res.locals.newReservation = newReservation;
    res.locals.ReservationId = userOfOrderData.checkReservation;
    res.render('StaffCheckReservation');
  } else {
    res.render('StaffCheckReservation');
  }
};

module.exports = {
    StaffCheckReservationPost,
};