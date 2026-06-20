import { db } from "./firebase/firebase-config.js";

import {
collection,
addDoc,
serverTimestamp
}
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

export async function submitPayment(){

const studentName =
localStorage.getItem("studentName");

const mobile =
localStorage.getItem("studentMobile");

const exam =
localStorage.getItem("selectedExam");

const amount =
localStorage.getItem("finalPrice") ||
localStorage.getItem("examPrice");

const screenshot =
document.getElementById(
"screenshotUrl"
).value;

if(!screenshot){

alert("Upload Screenshot");

return;

}

try{

await addDoc(
collection(db,"payments"),
{

studentName,
mobile,
exam,
amount,
screenshot,

status:"pending",

submittedAt:
serverTimestamp()

}
);

alert(
"Payment Submitted Successfully"
);

window.location.href=
"payment-success.html";

}
catch(error){

console.log(error);

alert(
"Payment Submission Failed"
);

}

}
