var admin = require("firebase-admin");
require('dotenv/config');

// var serviceAccount = require("path/to/serviceAccountKey.json");
let serviceAccount = {
    "project_id": process.env.FIREBASE_PROJECT_ID,
    "private_key": process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    "client_email": process.env.FIREBASE_CLIENT_EMAIL
};

console.log(serviceAccount);

const app = admin.initializeApp({
    credential: admin.credential.cert((serviceAccount)),
});

const db = admin.firestore();
const auth = admin.auth();

module.exports = {
    db,
    auth
};