import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
getFirestore
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
apiKey: "AIzaSyBeErP4iZHJYCTh4jPtxTvaSKaTQ8qBSDQ",
authDomain: "premium-test-series.firebaseapp.com",
projectId: "premium-test-series",
storageBucket: "premium-test-series.firebasestorage.app",
messagingSenderId: "602821369562",
appId: "1:602821369562:web:dfc78fd5ae99e4725acfe3",
measurementId: "G-T8CFE6HDND"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };
