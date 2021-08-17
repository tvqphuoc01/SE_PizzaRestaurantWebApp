/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
'use strict';

const firebase = require('../db');
const Client = require('../models/client');
const firestore = firebase.firestore();

const reservationGet = async function(req, res) {
  if (req.cookies.userId) {
    let userEmail;
    const findEmail = await firestore.collection('client').doc(req.cookies.userId).get().then((doc) => {
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
    const ref = await firestore.collection('client').where('email', '==', userEmail).get();
    const client = ref.docs[0].data();
    const cartLength = client.cart.length;
    
    if(client.checkReservation !== "") {
      let ReservationId = "";
      const refOrder = await firestore.collection('reservation').where('userId', '==', req.cookies.userId).get();
      for(let i = 0; i < client.historyReservation.length + 1; i++) {
          if(client.historyOrder.includes(refOrder.docs[i].id) === false) {
            ReservationId = refOrder.docs[i].id;
          }
      }
      const newReservation = await firestore.collection('reservation').doc(ReservationId).get();
      const clientReservation = newReservation.data();
      res.locals.clientReservation = clientReservation;
    }
    res.locals.user = client;
    res.locals.cartLength = cartLength;
    res.locals.checkReservation = client.checkReservation;
    res.render('reservation');
  } else {
    res.render('reservation');
  }
};

const reservationPost = async function(req, res) {
  if (req.cookies.userId) {
    let userEmail;
    const findEmail = await firestore.collection('client').doc(req.cookies.userId).get().then((doc) => {
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

    const ref = await firestore.collection('client').where('email', '==', userEmail).get();
    const client = ref.docs[0].data();
    const cartLength = client.cart.length;
    
    await firestore.collection('reservation').doc().set({
      userId: req.cookies.userId,
      UserName: req.body.Name,
      date: req.body.date,
      time: req.body.time,
      status: 0,
      address: req.body.Location,
      email: req.body.Email,
      phone: req.body.Phone,
      numberOfGuest: req.body.Guest,
      messange: req.body.Message
    });

    let ReservationId = "";
    const refOrder = await firestore.collection('reservation').where('userId', '==', req.cookies.userId).get();
    for(let i = 0; i < client.historyReservation.length + 1; i++) {
        if(client.historyOrder.includes(refOrder.docs[i].id) === false) {
          ReservationId = refOrder.docs[i].id;
        }
    }

    const newReservation = await firestore.collection('order').doc(ReservationId).get();
    const clientReservation = newReservation.data();

    let updates = {
      checkReservation: ReservationId
    }
            
    await firestore.collection('client').doc(req.cookies.userId).update(updates);

    res.locals.user = client;
    res.locals.cartLength = cartLength;
    res.locals.checkReservation = client.checkReservation;
    res.locals.clientReservation = clientReservation;
    res.redirect('reservation');
  } else {
    res.redirect('reservation');
  }
};

module.exports = {
  reservationGet,
  reservationPost
};
