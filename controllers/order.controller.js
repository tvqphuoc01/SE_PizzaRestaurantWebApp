'use strict';

const firebase = require('../db');
const Order = require('../models/order');
const firestore = firebase.firestore();

// Add new Client to Firebase
const placeOrder = async (req, res) => {
    var today = new Date();
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var date = today.getFullYear()+ '  ' +months[today.getMonth()]+ '  ' +today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
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
        if (client.cart.length === 0) {
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

            let errors = "Your cart is empty !!!";

            const subTotal = totalCart * 1000;
            totalCart = (totalCart / 100) * 10 + totalCart;
            totalCart = (totalCart + 25)  * 1000;

            res.locals.user = client;
            res.locals.cartLength = cartLength;
            res.locals.checkCart = true;
            res.locals.totals = totalCart.toString() + " VND";
            res.locals.subTotals = subTotal.toString() + " VND";
            res.locals.errors = errors;
            res.render('ShoppingCart');
        } else {
            await firestore.collection('order').doc().set({
                userId: req.cookies.userId,
                date: date,
                time: time,
                cart: client.cart,
                totals: parseInt(data.Total),
                shipFee: data.Shipping,
                status: 4,
                address: data.address,
            });
            let OrderId = "";
            const refOrder = await firestore.collection('order').where('userId', '==', req.cookies.userId).get();
            for(let i = 0; i < client.historyOrder.length + 1; i++) {
                if(client.historyOrder.includes(refOrder.docs[i].id) === false) {
                    OrderId = refOrder.docs[i].id;
                }
            }

            const newOrder = await firestore.collection('order').doc(OrderId).get();
            const clientOrder = newOrder.data();
            //Set cart cua User ve [] sau khi order
            let updates = {
                // Set update cho cart 
                cart: [],
                checkOrder: OrderId
            }
            
            await firestore.collection('client').doc(req.cookies.userId).update(updates);
            res.locals.clientOrder = clientOrder;
            res.locals.OrderId = OrderId;
            res.locals.user = client;
            res.locals.checkCart = false;
            res.render('ShoppingCart');
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
};

module.exports = {
    placeOrder
};
