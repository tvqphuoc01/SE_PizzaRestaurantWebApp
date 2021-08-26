'use strict';

const firebase = require('../db');
const firestore = firebase.firestore();

// Add new Client to Firebase
const cancelOrderPost = async (req, res) => {
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
        client.historyOrder.push(client.checkOrder);
        //Set checkOrder cua User ve "" sau khi order
        let updates = {
            // Set update cho checkOrder 
            checkOrder: "",
            historyOrder: client.historyOrder
        }
        
        let updatesForOrder = {
            // Set update cho Order
            status: 1
        }

        await firestore.collection('client').doc(req.cookies.userId).update(updates);
        await firestore.collection('order').doc(client.checkOrder).update(updatesForOrder);

        res.locals.user = client;
        res.render('index');
    } catch (error) {
        res.status(400).send(error.message);
    }
};

module.exports = {
    cancelOrderPost
};