'use strict';

const firebase = require('../db');
const Client = require('../models/client');
const firestore = firebase.firestore();

module.exports.validateNewOrder = async function(req, res, next) {
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
    let errors = [];

    if (req.body.address === "") {
        errors.push('Please Enter Your Address !!!');
    }
    
    if (cartLength === 0) {
        errors.push('Your Carrt is Empty!!!');
    }

    if (errors.length !== 0) {
        const cartLength = client.cart.length;
        let totalCart = 0;
        for (let i = 0; i < cartLength; i++) {
            totalCart += parseInt(client.cart[i].price) * parseInt(client.cart[i].quantity);
        }
        const subTotal = totalCart * 1000;
        totalCart = (totalCart / 100) * 10 + totalCart;
        totalCart = (totalCart + 25)  * 1000;

        res.locals.errors = errors;
        res.locals.checkCart = true;
        res.locals.user = client;
        res.locals.cartLength = cartLength;
        res.locals.totals = totalCart.toString() + " VND";
        res.locals.subTotals = subTotal.toString() + " VND";
        res.render('ShoppingCart')
        return;
    }

    next();
};
