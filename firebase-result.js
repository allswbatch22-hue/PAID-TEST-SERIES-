import { db } from "./firebase/firebase-config.js";

import {
collection,
addDoc,
serverTimestamp
}
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

export async function saveResultToFirebase(resultData){

try{

await addDoc(
collection(db,"results"),
{
studentName:
resultData.studentName,

mobile:
resultData.mobile,

exam:
resultData.exam,

testName:
resultData.testName,

totalQuestions:
resultData.totalQuestions,

attempted:
resultData.attempted,

correct:
resultData.correct,

wrong:
resultData.wrong,

score:
resultData.score,

percentage:
resultData.percentage,

rank:
resultData.rank,

submittedAt:
serverTimestamp()
}
);

console.log(
"Result Saved Successfully"
);

}
catch(error){

console.error(
"Firebase Save Error",
error
);

}

}
