'use strict';

const firebase = require('../db');
const Staff = require('../models/Staff');
const firestore = firebase.firestore();

const adminOrderGet = async function(req, res) {
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
    let orderList = [];
    let IdOfOrder = [];
    refOrderList.docs.map(docs => orderList.push(docs.data()));
    let cancelOrder = [];
    let doneOrder = [];
    
    for (let i = 0; i < orderList.length; i++) {
        IdOfOrder.push(refOrderList.docs[i].id);
    }

    for (let i = 0; i < orderList.length; i++) {
      if(orderList[i].status === 1) {
        cancelOrder.push(orderList[i]);
      }
      if(orderList[i].status === 5) {
        doneOrder.push([orderList[i],IdOfOrder[i]]);
      }
    }
    const client = ref.docs[0].data();
    
    res.locals.user = client;
    res.locals.cancelOrder = cancelOrder;
    res.locals.doneOrder = doneOrder;
    res.render('adminOrder');
  } else {
    res.render('adminOrder');
  }
};

module.exports = {
    adminOrderGet,
};