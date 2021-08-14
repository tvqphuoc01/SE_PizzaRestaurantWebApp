'use strict';

const firebase = require('../db');
const Staff = require('../models/Staff');
const firestore = firebase.firestore();

const StaffCheckOrderPost = async function(req, res) {
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
    const userOfOrder = await firestore.collection('client').doc(req.body.Id).get();
    const refOrder = await firestore.collection('order').where('userId', '==', req.body.Id).get();
    const userOfOrderData = userOfOrder.data();
    let orderList = [];
    refOrder.docs.map(docs => orderList.push(docs.data()));
    let newOrder;
    for (let i = 0; i < orderList.length; i++) {
      if(orderList[i].status !== 5 && orderList[i].status !== 1) {
        newOrder = orderList[i];
      }
    }
    const client = ref.docs[0].data();
    res.locals.user = client;
    res.locals.newOrder = newOrder;
    res.locals.OrderId = userOfOrderData.checkOrder;
    res.render('StaffCheckOrder');
  } else {
    res.render('StaffCheckOrder');
  }
};

module.exports = {
    StaffCheckOrderPost,
};