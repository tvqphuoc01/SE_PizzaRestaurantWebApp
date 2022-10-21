'use strict';

const firebase = require('../db');
const Staff = require('../models/Staff');
const firestore = firebase.firestore();

const deleteEmployee = async (req, res, next) => {
    try {
        const data = req.body;
        const ref = await firestore.collection('staff').where('userName', '==', data.usernamePost).get();
        const staffId = ref.docs[0].id;
        
        await firestore.collection('staff').doc(staffId).delete();

        res.redirect('admin');
    } catch (error) {
        res.status(400).send(error.message);
    }
};

module.exports = {
    deleteEmployee,
};
