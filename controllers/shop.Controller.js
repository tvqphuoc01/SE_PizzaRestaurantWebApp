/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
'use strict';

const firebase = require('../db');
const Client = require('../models/client');
const firestore = firebase.firestore();

const shopGet = async function(req, res) {
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
    res.locals.user = client;
    res.locals.cartLength = cartLength;
    res.render('Shop');
  } else {
    res.render('Shop');
  }
};
const shopPost = async function(req, res) {
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
    let checkDish = 0;

    //Kiem tra mon da ton tai trong cart hay chua neu co thi them so luong
    client.cart.map(dish => {
      if(dish.Id_Mon === req.body.Id_Mon) {
        dish.quantity = parseInt(req.body.quantity) + parseInt(dish.quantity);
        checkDish = 1;
      }
    });

    //Add mon vao cart cua Client neu mon chua co trong cart
    if(checkDish === 0) {
      client.cart.push(req.body);
    }
    let updates = {
      // Set update cho cart 
      cart: client.cart
    }
    //Update cho cart cua khach hang thong qua Id => Lay Id tu cookies
    await firestore.collection('client').doc(req.cookies.userId).update(updates);
    const cartLength = client.cart.length;
    res.locals.user = client;
    res.locals.cartLength = cartLength;
    res.render('Shop');
  } else {
    res.render('Shop');
  }
}
module.exports = {
  shopGet,
  shopPost
};
