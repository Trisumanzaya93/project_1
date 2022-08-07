var admin = require("firebase-admin");

var serviceAccount = require("../../private/paiz-back-and-firebase-adminsdk-5hcuq-1d659eafbe.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://paiz-back-and-default-rtdb.firebaseio.com"
});
const firestore = admin.firestore();
console.log(firestore);
module.export={firestore}