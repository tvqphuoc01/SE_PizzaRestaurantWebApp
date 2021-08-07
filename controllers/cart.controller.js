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

    if(client.checkOrder === "") {
      const cartLength = client.cart.length;
      let totalCart = 0;
      for (let i = 0; i < cartLength; i++) {
        totalCart += parseInt(client.cart[i].price);
      }
      const subTotal = totalCart * 1000;
      totalCart = (totalCart / 100) * 10 + totalCart;
      totalCart = (totalCart + 25)  * 1000;

      res.locals.checkCart = true;
      res.locals.user = client;
      res.locals.cartLength = cartLength;
      res.locals.totals = totalCart.toString() + " VND";
      res.locals.subTotals = subTotal.toString() + " VND";
    } else {
      const refOrder = await firestore.collection('order').doc(client.checkOrder).get();
      const clientOrder = refOrder.data();
      
      //Neu don hang van con thi ko cho nguoi dung add them hang vao cart
      let updates = {
        // Set update cho cart 
        cart: [],
      }
    
      await firestore.collection('client').doc(req.cookies.userId).update(updates);

      res.locals.clientOrder = clientOrder;
      res.locals.OrderId = client.checkOrder;
      res.locals.user = client;
      res.locals.checkCart = false;
    }
    res.render('ShoppingCart');
  } else {
    res.render('ShoppingCart');
  }
};

const cartPost = async function(req, res) {
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
    let ref = await firestore.collection('client').where('email', '==', userEmail).get();
    let client = ref.docs[0].data();
    let cartLength = client.cart.length;
    let totalCart = 0;

    let newCart = [];

    for(let i = 0; i < cartLength; i++) {
      if(client.cart[i].Id_Mon !== req.body.Id_Mon) {
        newCart.push(client.cart[i]);
      }
    }

    cartLength = newCart.length;

    for (let i = 0; i < cartLength; i++) {
      totalCart += parseInt(client.cart[i].price);
    }
    let updates = {
      // Set update cho cart 
      cart: newCart
    }
    //Update cho cart cua khach hang thong qua Id => Lay Id tu cookies
    await firestore.collection('client').doc(req.cookies.userId).update(updates);
    ref = await firestore.collection('client').where('email', '==', userEmail).get();
    client = ref.docs[0].data();

    const subTotal = totalCart * 1000;
    totalCart = (totalCart / 100) * 10 + totalCart;
    totalCart = (totalCart + 25)  * 1000;

    res.locals.user = client;
    res.locals.cartLength = cartLength;
    res.locals.checkCart = true;
    res.locals.totals = totalCart.toString() + " VND";
    res.locals.subTotals = subTotal.toString() + " VND";
    res.render('ShoppingCart');
  } else {
    res.render('ShoppingCart');
  }
}
module.exports = {
  cartGet,
  cartPost
};