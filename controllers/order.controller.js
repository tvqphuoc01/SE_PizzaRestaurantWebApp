'use strict';

const firebase = require('../db');
const Order = require('../models/order');
const firestore = firebase.firestore();

// Add new Client to Firebase
const placeOrder = async (req, res) => {
    var datetime = new Date();
    try {
        const data = req.body;
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
        const ref = await firestore.collection('client').where('email', '==', userEmail).get();
        const client = ref.docs[0].data();
        await firestore.collection('order').doc().set({
            userId: req.cookies.userId,
            date: datetime,
            cart: client.cart,
            totals: data.Total,
            shipFee: data.Shipping
        });

        res.render('index');
    } catch (error) {
        res.status(400).send(error.message);
    }
};

module.exports = {
    placeOrder
};
