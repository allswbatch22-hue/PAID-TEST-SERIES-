let deferredPrompt;

window.addEventListener(
"beforeinstallprompt",
(e)=>{

e.preventDefault();

deferredPrompt=e;

const installBtn=
document.getElementById(
"installBtn"
);

if(installBtn){

installBtn.style.display=
"block";

}

}
);

window.installApp=async()=>{

if(!deferredPrompt){

alert(
"Install Not Available"
);

return;

}

deferredPrompt.prompt();

const result=
await deferredPrompt.userChoice;

if(result.outcome==="accepted"){

console.log(
"App Installed"
);

}

deferredPrompt=null;

};
