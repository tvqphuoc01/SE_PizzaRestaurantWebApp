'use strict';
const dotenv = require('dotenv');
const assert = require('assert');

dotenv.config();

const {
    API_KEY,
    AUTH_DOMAIN,
    PROJECT_ID,
    STORAGE_BUCKET,
    MESSAGING_SENDER_ID,
    APP_ID,
    MEASUREMENT_ID
} = process.env;

module.exports = {
    firebaseConfig: {
        apiKey: "AIzaSyDlR5DYVBszVW2fU5NwzvvqPTOmDwALBpw",
        authDomain: "pizza-project-8878d.firebaseapp.com",
        projectId: "pizza-project-8878d",
        storageBucket: "pizza-project-8878d.appspot.com",
        messagingSenderId: "131525536349",
        appId: "1:131525536349:web:d9e1d04ca0e65bec553bb4",
        measurementId: "G-508F52KKH0"
      }
}
