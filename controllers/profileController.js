/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
'use strict';

const firebase = require('../db');
const Client = require('../models/client');
const firestore = firebase.firestore();

const updateClient = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.avatar = req.file.path.split('\\').slice(1).join('/');
    }
    const data = req.body;
    const client = await firestore.collection('client').doc(req.cookies.userId);
    await client.update(data);
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
    // const client = ref.docs[0].data();
    // res.locals.user = client;
    const ref = await firestore.collection('client').where('email', '==', userEmail).get();
    const localClient = ref.docs[0].data();
    res.locals.user = localClient;
    res.render('profilePage');
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const profileGet = async function(req, res) {
  if (req.cookies.userId) {
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
    // const client = ref.docs[0].data();
    // res.locals.user = client;
    const ref = await firestore.collection('client').where('email', '==', userEmail).get();
    const client = ref.docs[0].data();
    res.locals.user = client;
    res.render('profilePage');
  } else {
    res.render('profilePage');
  }
};

module.exports = {
  updateClient,
  profileGet,
};
