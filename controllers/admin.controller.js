'use strict';

const firebase = require('../db');
const Admin = require('../models/Admin');
const firestore = firebase.firestore();

const adminGet = async function(req, res) {
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
    const refOrderList = await firestore.collection('order').get();
    const refReservationList = await firestore.collection('reservation').get();
    const refStaff = await firestore.collection('staff').get();
    const refClient = await firestore.collection('client').get();

    let orderList = [];
    let reservationList = [];
    let staffList = [];
    
    //Client
    let clientList = [];
    refClient.docs.map(docs => clientList.push(docs.data()));
    
    //Staff
    refStaff.docs.map(docs => staffList.push(docs.data()));
    //Sort staff by FirstName
    staffList.sort(
      function(a, b){
        if(a.firstName < b.firstName) { return -1; }
        if(a.firstName > b.firstName) { return 1; }
        return 0;
      }
    );

    //Order
    refOrderList.docs.map(docs => orderList.push(docs.data()));
    let countDoneOrder = 0;
    let countCancelOrder = 0;
    let pendingOrder = 0;
    let sumEarning = 0;
    for (let i = 0; i < orderList.length; i++) {
      if(orderList[i].status === 5) {
        countDoneOrder++;
        sumEarning += orderList[i].totals
      } else if(orderList[i].status === 1) {
        countCancelOrder++;
      } else {
        pendingOrder++;
      }
    }

    //Reservation
    refReservationList.docs.map(docs => reservationList.push(docs.data()));
    let countDoneReservation = 0;
    let countCancelReservation = 0;
    let pendingReservation = 0;
    for (let i = 0; i < reservationList.length; i++) {
      if(reservationList[i].status === 3) {
        countDoneReservation++;
      } else if(reservationList[i].status === 2) {
        countCancelReservation++;
      } else {
        pendingReservation++;
      }

    }

    const client = ref.docs[0].data();
    res.locals.user = client;
    res.locals.targetOrder = (countDoneOrder/10) * 100; 
    res.locals.targetReservation = (countDoneReservation/5) * 100; 
    res.locals.countDoneOrder = countDoneOrder;
    res.locals.countCancelOrder = countCancelOrder;
    res.locals.countDoneReservation = countDoneReservation;
    res.locals.countCancelReservation = countCancelReservation;
    res.locals.pendingReservation = pendingReservation;
    res.locals.pendingOrder = pendingOrder;
    res.locals.staffList = staffList;
    res.locals.staffListLength = staffList.length;
    res.locals.clientListLength = clientList.length;
    res.locals.sumEarning = sumEarning;
    res.render('admin');
  } else {
    res.render('admin');
  }
};

module.exports = {
    adminGet,
};