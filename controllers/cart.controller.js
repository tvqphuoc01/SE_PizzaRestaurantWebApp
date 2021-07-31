'use strict';

const firebase = require('../db');
const Client = require('../models/client');
const firestore = firebase.firestore();

const cartGet = async function(req, res) {
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
    res.locals.user = client;
    res.render('ShoppingCart');
  } else {
    res.render('ShoppingCart');
  }
};

module.exports = {
  cartGet,
};