'use strict';

const firebase = require('../db');
const Staff = require('../models/Staff');
const firestore = firebase.firestore();

const adminReservationGet = async function(req, res) {
  if (req.cookies.userId) {
    let userEmail;
    const findEmail = await firestore.collection('Admin').doc(req.cookies.userId).get().then((doc) => {
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
    const ref = await firestore.collection('Admin').where('email', '==', userEmail).get();
    const refReservationList = await firestore.collection('reservation').get();
    let reservationList = [];
    let IdOfReservation = [];
    refReservationList.docs.map(docs => reservationList.push(docs.data()));
    let cancelledReservation = [];
    let doneReservation = [];
    
    for (let i = 0; i < reservationList.length; i++) {
        IdOfReservation.push(refReservationList.docs[i].id);
    }

    for (let i = 0; i < reservationList.length; i++) {
      if(reservationList[i].status === 2) {
        cancelledReservation.push(reservationList[i]); 
      }
      if(reservationList[i].status === 3) {
        doneReservation.push(reservationList[i]); 
      }
    }
    const client = ref.docs[0].data();
    
    res.locals.user = client;
    res.locals.cancelledReservation = cancelledReservation;
    res.locals.doneReservation = doneReservation;
    res.render('adminReservation');
  } else {
    res.render('adminReservation');
  }
};

module.exports = {
    adminReservationGet,
};