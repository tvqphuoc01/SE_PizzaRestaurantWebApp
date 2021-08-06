'use strict';

const firebase = require('../db');
const firestore = firebase.firestore();

// Add new Client to Firebase
const doneOrderPost = async (req, res) => {
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
        const refOrder = await firestore.collection('order').where('userId', '==', req.cookies.userId).get();
        let OrderId = refOrder.docs[0].id;
        client.historyOrder.push(OrderId);
        //Set checkOrder cua User ve "" sau khi order
        let updates = {
            // Set update cho checkOrder 
            checkOrder: "",
            historyOrder: client.historyOrder
        }
        
        await firestore.collection('client').doc(req.cookies.userId).update(updates);
        res.locals.user = client;
        res.render('index');
    } catch (error) {
        res.status(400).send(error.message);
    }
};

module.exports = {
    doneOrderPost
};
