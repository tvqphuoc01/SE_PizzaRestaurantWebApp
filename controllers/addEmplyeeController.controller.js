'use strict';

const firebase = require('../db');
const Staff = require('../models/staff');
const firestore = firebase.firestore();

// Add new Client to Firebase
const addEmployee = async (req, res, next) => {
  try {
    //req.body.avatar = req.file.path.split('\\').slice(1).join('/');
    const data = req.body;

    await firestore.collection('staff').doc().set({
      email: data.email,
      userName: "Staff" + (parseInt(data.numberOfStaff) + 1),
      passWord: "123456789",
      firstName: data.firstName,
      lastName: data.lastName,
      gender: "1",
      address: data.address,
      phone: data.phone,
      avatar: ""
    });
    res.redirect('admin');
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = {
    addEmployee,
};
