'use strict';

const firebase = require('../db');
const Staff = require('../models/Staff');
const firestore = firebase.firestore();

const StaffCheckDoneOrderPost = async function(req, res) {
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
    const refOrder = await firestore.collection('order').doc(req.body.IdOfOrder).get();
    const newOrder = refOrder.data();
    
    const client = ref.docs[0].data();
    res.locals.user = client;
    res.locals.newOrder = newOrder;
    res.locals.OrderId = req.body.IdOfOrder;
    res.render('StaffCheckOrder');
  } else {
    res.render('StaffCheckOrder');
  }
};

module.exports = {
    StaffCheckDoneOrderPost,
};