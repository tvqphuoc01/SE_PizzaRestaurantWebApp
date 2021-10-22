'use strict';

const firebase = require('../db');
const firestore = firebase.firestore();

// Add new Client to Firebase
const updateStateReservationPost = async (req, res) => {
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
        const userOfReservation = await firestore.collection('client').doc(req.body.UserId).get();
        const userOfReservationData = userOfReservation.data();
        const client = ref.docs[0].data();

        //Set new State for Order
        let updates = {
            status: parseInt(data.State),
        }
        
        //Update state moi cho Order
        await firestore.collection('reservation').doc(data.Id).update(updates);

        if(parseInt(data.State) === 2) {
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
            const refOrderList = await firestore.collection('order').get();
            const refReservationList = await firestore.collection('reservation').get();
            
            let orderList = [];
            let reservationList = [];
            
            //Order
            refOrderList.docs.map(docs => orderList.push(docs.data()));
            let newOrder = [];
            for (let i = 0; i < orderList.length; i++) {
                if(orderList[i].status !== 5 && orderList[i].status !== 1) {
                    newOrder.push(orderList[i]);
                }
            }

            //Reservation
            refReservationList.docs.map(docs => reservationList.push(docs.data()));
            let newReservation = [];
            for (let i = 0; i < reservationList.length; i++) {
                if(reservationList[i].status !== 2) {
                    newReservation.push(reservationList[i]);
                }
            }
            
            const client = ref.docs[0].data();
            res.locals.user = client;
            res.locals.newOrder = newOrder;
            res.locals.newReservation = newReservation;
            res.redirect('StaffReservation');
        } else {
            const refReservation = await firestore.collection('reservation').where('userId', '==', req.body.UserId).get();
            let reservationList = [];
            refReservation.docs.map(docs => reservationList.push(docs.data()));
            let newReservation;
            for (let i = 0; i < reservationList.length; i++) {
                if(reservationList[i].status !== 2) {
                    newReservation = reservationList[i];
                }
            }
        
            newReservation.status = parseInt(data.State);
            res.locals.user = client;
            res.locals.newReservation = newReservation;
            res.locals.ReservationId = userOfReservationData.checkOrder;
            res.render('StaffCheckReservation');
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
};

module.exports = {
    updateStateReservationPost
};