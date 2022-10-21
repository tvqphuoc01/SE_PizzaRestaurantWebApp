'use strict';

const firebase = require('../db');
const Staff = require('../models/Staff');
const firestore = firebase.firestore();

// Add new Client to Firebase
const editEmployee = async (req, res, next) => {
    try {
        const data = req.body;
        const ref = await firestore.collection('staff').where('userName', '==', data.usernamePost).get();
        const staffId = ref.docs[0].id;

        //Set new State for Order
        let updates = {
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            address: data.address,
            phone: data.phone
        }
        
        //Update state moi cho Order
        await firestore.collection('staff').doc(staffId).update(updates);

        res.redirect('admin');
    } catch (error) {
        res.status(400).send(error.message);
    }
};

module.exports = {
    editEmployee,
};
