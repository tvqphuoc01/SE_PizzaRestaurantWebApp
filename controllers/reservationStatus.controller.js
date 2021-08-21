'use strict';

const firebase = require('../db');
const Staff = require('../models/Staff');
const firestore = firebase.firestore();

const reservationStatusGet = async function(req, res) {
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
    const refReservationList = await firestore.collection('reservation').get();
    let reservationList = [];
    let IdOfReservation = [];
    refReservationList.docs.map(docs => reservationList.push(docs.data()));
    let newReservation = [];
    let acceptReservation = [];
    let cancelledReservation = [];
    let doneReservation = [];
    
    for (let i = 0; i < reservationList.length; i++) {
        IdOfReservation.push(refReservationList.docs[i].id);
    }

    for (let i = 0; i < reservationList.length; i++) {
      if(reservationList[i].status === 0) {
        newReservation.push(reservationList[i]);
      }
      if(reservationList[i].status === 1) {
        acceptReservation.push(reservationList[i]);  
      }
      if(reservationList[i].status === 2) {
        cancelledReservation.push(reservationList[i]); 
      }
      if(reservationList[i].status === 3) {
        doneReservation.push(reservationList[i]); 
      }
    }
    const client = ref.docs[0].data();
    
    res.locals.user = client;
    res.locals.newReservation = newReservation;
    res.locals.acceptReservation = acceptReservation;
    res.locals.cancelledReservation = cancelledReservation;
    res.locals.doneReservation = doneReservation;
    res.render('reservationStatus');
  } else {
    res.render('reservationStatus');
  }
};

module.exports = {
    reservationStatusGet,
};