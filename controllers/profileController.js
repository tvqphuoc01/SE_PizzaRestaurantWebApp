/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
'use strict';

const firebase = require('../db');
const Client = require('../models/client');
const firestore = firebase.firestore();

const updateUser = async (req, res, next) => {
  try {
    // if (req.file) {
    //   req.body.avatar = req.file.path.split('\\').slice(1).join('/');
    // }
    // const data = req.body;
    // const user = await firestore.collection('client').doc(req.cookies.userId);
    // if (user === undefined) {
    //   user = await firestore.collection('staff').doc(req.cookies.userId);
    //   console.log(user);
    // }
    // await user.update(data);
    let userEmail;
    let check = 0;
    const findEmail = await firestore.collection('client').doc(req.cookies.userId).get().then((doc) => {
      if (doc.exists) {
        userEmail = doc.data().email;
      } else {
        // doc.data() will be undefined in this case
      }
    });
    if (userEmail === undefined) {
      const findEmailStaff = await firestore.collection('staff').doc(req.cookies.userId).get().then((doc) => {
        if (doc.exists) {
          userEmail = doc.data().email;
          check = 1;
        } else {
          // doc.data() will be undefined in this case
        }
      })
    }
    // const client = ref.docs[0].data();
    // res.locals.user = client;
    if (check === 0) {
      //Update new Info
      if (req.file) {
        req.body.avatar = req.file.path.split('\\').slice(1).join('/');
      }
      const data = req.body;
      const userUpdate = await firestore.collection('client').doc(req.cookies.userId);
      await userUpdate.update(data);

      const ref = await firestore.collection('client').where('email', '==', userEmail).get();
      const user = ref.docs[0].data();
      const cartLength = user.cart.length;
      res.locals.cartLength = cartLength;
      res.locals.user = user;
    } else {
      //Update new Info
      if (req.file) {
        req.body.avatar = req.file.path.split('\\').slice(1).join('/');
      }
      const data = req.body;
      const userUpdate = await firestore.collection('staff').doc(req.cookies.userId);
      await userUpdate.update(data);

      const ref = await firestore.collection('staff').where('email', '==', userEmail).get();
      const user = ref.docs[0].data();
      res.locals.user = user;
    }
    res.render('profilePage');
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const profileGet = async function(req, res) {
  if (req.cookies.userId) {
    let userEmail;
    let check = 0;
    const findEmailClient = await firestore.collection('client').doc(req.cookies.userId).get().then((doc) => {
      if (doc.exists) {
        userEmail = doc.data().email;
      } else {
        // doc.data() will be undefined in this case
      }
    })
    if (userEmail === undefined) {
      const findEmailStaff = await firestore.collection('staff').doc(req.cookies.userId).get().then((doc) => {
        if (doc.exists) {
          userEmail = doc.data().email;
          check = 1;
        } else {
          // doc.data() will be undefined in this case
        }
      })
    }
    // const client = ref.docs[0].data();
    // res.locals.user = client;
    if (check === 0) {
      const ref = await firestore.collection('client').where('email', '==', userEmail).get();
      const user = ref.docs[0].data();
      res.locals.user = user;
    } else {
      const ref = await firestore.collection('staff').where('email', '==', userEmail).get();
      const user = ref.docs[0].data();
      res.locals.user = user;
    }
    res.render('profilePage');
  } else {
    res.render('profilePage');
  }
};

module.exports = {
  updateUser,
  profileGet,
};
