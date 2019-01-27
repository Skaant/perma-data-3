const admin = require('firebase-admin')
const functions = require('firebase-functions')
const app = require('./server/app/app')

admin.initializeApp(functions.config().firebase)
global.db = admin.firestore()
global.db.settings({ timestampsInSnapshots: true })

exports.app = functions.https.onRequest(app)
