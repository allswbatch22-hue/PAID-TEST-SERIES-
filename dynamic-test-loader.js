import { db }
from "./firebase/firebase-config.js";

import {
collection,
getDocs,
query,
where
}
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

async function loadSelectedTest(){

const selectedTestId =
localStorage.getItem(
"selectedTestId"
);

if(!selectedTestId){

alert("Test Not Found");
return;

}

try{

const q = query(
collection(db,"tests"),
where("__name__","==",selectedTestId)
);

const snap =
await getDocs(q);

if(snap.empty){

alert("Invalid Test");
return;

}

let testData=null;

snap.forEach(doc=>{

testData=doc.data();

});

localStorage.setItem(
"selectedExam",
testData.exam
);

localStorage.setItem(
"selectedTest",
testData.title
);

localStorage.setItem(
"selectedJson",
testData.jsonPath
);

window.location.href=
"cbt-test-engine.html";

}
catch(error){

console.log(error);

alert("Loading Failed");

}

}

window.loadSelectedTest=
loadSelectedTest;
