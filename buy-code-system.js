import { db } from "./firebase/firebase-config.js";

import {
collection,
query,
where,
getDocs,
doc,
updateDoc,
addDoc,
serverTimestamp
}
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

export async function applyBuyCode(){

const code =
document.getElementById("buyCode")
.value
.trim()
.toUpperCase();

const userId =
localStorage.getItem("userId");

const exam =
localStorage.getItem("selectedExam");

if(!code){

alert("Enter Buy Code");

return;

}

try{

const q=query(
collection(db,"buycodes"),
where("code","==",code),
where("status","==","active")
);

const snap=
await getDocs(q);

if(snap.empty){

alert("Invalid Buy Code");

return;

}

let buyCodeId="";
let buyData=null;

snap.forEach(docItem=>{

buyCodeId=docItem.id;
buyData=docItem.data();

});

if(buyData.used===true){

alert("Code Already Used");

return;

}

if(buyData.exam!==exam){

alert("Code Not Valid For This Exam");

return;

}

const unlockQuery=query(
collection(db,"user_unlocks"),
where("userId","==",userId),
where("exam","==",exam)
);

const unlockSnap=
await getDocs(unlockQuery);

if(!unlockSnap.empty){

alert("Exam Already Unlocked");

return;

}

await addDoc(
collection(db,"user_unlocks"),
{
userId:userId,
exam:exam,
buyCode:code,
unlockedAt:serverTimestamp()
}
);

await updateDoc(
doc(db,"buycodes",buyCodeId),
{
used:true,
usedBy:userId,
usedAt:serverTimestamp()
}
);

alert(
"Exam Unlocked Successfully"
);

location.reload();

}
catch(error){

console.log(error);

alert("System Error");

}

}
