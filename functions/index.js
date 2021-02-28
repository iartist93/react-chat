const admin = require("firebase-admin");
const functions = require("firebase-functions");

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

admin.initializeApp();
const db = admin.firestore();

exports.helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", { structuredData: true });
  console.log("Hello from Firebase!");
  response.send("Hello from Firebase!");
});

// trigger function
exports.syncPresenceStatus = functions.database
  .ref("status/{userId}")
  .onUpdate((change, context) => {
    const statusObject = change.after.val();
    const status = statusObject.status;
    const lastChanged = statusObject.lastChanged;

    const userDoc = db.doc(`users/${context.params.userId}`);

    if (change.after.val().lastChanged > change.before.val().lastChanged) {
      userDoc.update({
        status: {
          status: status,
          lastChanged: Date(lastChanged),
        },
      });
    }
  });

// watch for new messages
// it the messages contain @bot
// send a new message to the channel
// set the authot to @bot
exports.botMessages = functions.firestore
  .document("channels/development/messages/{docId}")
  .onWrite((change, context) => {
    const docData = change.after.data();
    const text = docData.text;
    const mentionedBot = text.search(/@bot/gi) !== -1;
    // const author = docData.author;
    // const docId = context.params.docId;

    if (mentionedBot) {
      // get the bot user
      let botUserDoc = db.doc("users/bot");

      // delay the bot response a litte
      setTimeout(() => {
        db.collection("channels/development/messages").add({
          author: botUserDoc,
          text: "I <3 you too human!",
          created_at: new Date(),
        });
      }, 100 + 200 * Math.random() * 3);
    }
  });

// trigger a function when channel first created to add a new bot user to it
exports.addBotToChannel = functions.firestore
  .document("channels/{channelId}")
  .onWrite((change, context) => {
    const channelId = context.params.channelId;
    db.doc("users/bot").update({
      [`channels.${channelId}`]: true,
    });
  });
