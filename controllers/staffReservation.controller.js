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
    const refOrderList = await firestore.collection('order').get();
    const refReservationList = await firestore.collection('reservation').get();
    
    let orderList = [];
    let reservationList = [];
    
    //Order
    refOrderList.docs.map(docs => orderList.push(docs.data()));
    let newOrder = [];
    for (let i = 0; i < orderList.length; i++) {
      if(orderList[i].status !== 5 && orderList[i].status !== 1) {
        newOrder.push(orderList[i]);
      }
    }

    //Reservation
    refReservationList.docs.map(docs => reservationList.push(docs.data()));
    let newReservation = [];
    for (let i = 0; i < reservationList.length; i++) {
      if(reservationList[i].status === 0) {
        newReservation.push(reservationList[i]);
      }
    }
    
    const client = ref.docs[0].data();
    res.locals.user = client;
    res.locals.newOrder = newOrder;
    res.locals.newReservation = newReservation;
    res.render('StaffReservation');
  } else {
    res.render('StaffReservation');
  }
};

module.exports = {
  staffReservationGet,
};