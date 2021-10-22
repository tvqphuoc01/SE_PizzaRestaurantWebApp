'use strict';

const firebase = require('../db');
const firestore = firebase.firestore();

// Add new Client to Firebase
const updateStateOrderPost = async (req, res) => {
    try {
        const data = req.body;

        //Lay thong tin cua Staff
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
        const ref = await firestore.collection('staff').where('email', '==', userEmail).get();
        const userOfOrder = await firestore.collection('client').doc(req.body.UserId).get();
        const userOfOrderData = userOfOrder.data();
        const client = ref.docs[0].data();

        //Set new State for Order
        let updates = {
            status: parseInt(data.State),
        }
        
        //Update state moi cho Order
        await firestore.collection('order').doc(data.Id).update(updates);

        if(parseInt(data.State) === 5) {
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
            }); ;
            // const client = ref.docs[0].data();
            // res.locals.user = client;
            const ref = await firestore.collection('staff').where('email', '==', userEmail).get();
            const refOrderList = await firestore.collection('order').get();
            let orderList = [];
            refOrderList.docs.map(docs => orderList.push(docs.data()));
            let newOrder = [];
            for (let i = 0; i < orderList.length; i++) {
            if(orderList[i].status !== 5) {
                newOrder.push(orderList[i]);
            }
            }
            const client = ref.docs[0].data();
            res.locals.user = client;
            res.locals.newOrder = newOrder;
            res.render('StaffReservation');
        } else {
            //Lay thong tin cua Staff
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
            const ref = await firestore.collection('staff').where('email', '==', userEmail).get();
            const userOfOrder = await firestore.collection('client').doc(req.body.UserId).get();
            const userOfOrderData = userOfOrder.data();
            const client = ref.docs[0].data();
            const refOrder = await firestore.collection('order').where('userId', '==', req.body.UserId).get();
            let orderList = [];
            refOrder.docs.map(docs => orderList.push(docs.data()));
            let newOrder;
            for (let i = 0; i < orderList.length; i++) {
                if(orderList[i].status != 5) {
                    newOrder = orderList[i];
                }
            }
            newOrder.status = parseInt(data.State);
            res.locals.user = client;
            res.locals.newOrder = newOrder;
            res.locals.OrderId = userOfOrderData.checkOrder;
            res.render('StaffCheckOrder');
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
};

module.exports = {
    updateStateOrderPost
};