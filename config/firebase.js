var admin = require("firebase-admin");
require('dotenv/config');

let serviceAccount = {
    "project_id": process.env.FIREBASE_PROJECT_ID,
    "private_key": process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    "client_email": process.env.FIREBASE_CLIENT_EMAIL
};

console.log(serviceAccount);

const app = admin.initializeApp({
    credential: admin.credential.cert((serviceAccount)),
});

const db = admin.storage();
const auth = admin.auth();

module.exports = {
    db,
    auth
};