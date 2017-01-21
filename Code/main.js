"use strict";
function addImage(a) {
  var e=a.clientX,
  n=a.clientY,
  t=document.createElement("img");
 t.className="card",
 t.style.top=n-198+"px"
 ,t.style.left=e-143+"px",
 t.draggable=!1,
 t.ondragstart=function(){return!1},
 main.appendChild(t),
 Math.random()>=.85?(t.src="Pictures/Gold.png",altSound.play()):(t.src="Pictures/Regular.png",sound.play())}var sound=new Howl({src:["Sound/Courier.ogg"]}),
 altSound=new Howl({src:["Sound/Attack.ogg"]}),
 main=document.getElementById("main");
 main.addEventListener("click",addImage);
