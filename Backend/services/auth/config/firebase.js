import admin from "firebase-admin"
import serviceAccount from "../serviceAccountKey.json" with {type: "json"};

export const app = admin.initializeApp({
  credential: admin.cert(serviceAccount)
});
