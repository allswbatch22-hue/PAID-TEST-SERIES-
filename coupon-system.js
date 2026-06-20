import { db } from "./firebase/firebase-config.js";

import {
collection,
query,
where,
getDocs
}
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

export async function applyCoupon(){

const couponCode =
document.getElementById("couponCode")
.value
.trim()
.toUpperCase();

const originalPrice =
Number(
localStorage.getItem("examPrice")
) || 0;

if(!couponCode){

alert("Enter Coupon Code");
return;

}

try{

const q=query(
collection(db,"coupons"),
where("code","==",couponCode),
where("status","==","active")
);

const snap=
await getDocs(q);

if(snap.empty){

alert("Invalid Coupon");
return;

}

let couponData=null;

snap.forEach(doc=>{

couponData=doc.data();

});

const today=
new Date();

const expiry=
new Date(couponData.expiry);

if(expiry < today){

alert("Coupon Expired");
return;

}

const discount=
Number(
couponData.discount
);

const discountAmount=
(originalPrice*discount)/100;

const finalPrice=
originalPrice-discountAmount;

document.getElementById(
"discountBox"
).innerHTML=

discount+"% OFF";

document.getElementById(
"finalPrice"
).innerHTML=

"₹"+finalPrice;

localStorage.setItem(
"appliedCoupon",
couponCode
);

localStorage.setItem(
"discountPercent",
discount
);

localStorage.setItem(
"finalPrice",
finalPrice
);

alert(
"Coupon Applied Successfully"
);

}
catch(error){

console.log(error);

alert(
"Coupon Validation Failed"
);

}

}
