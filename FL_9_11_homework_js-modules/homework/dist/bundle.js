!function(t){var n={};function e(o){if(n[o])return n[o].exports;var u=n[o]={i:o,l:!1,exports:{}};return t[o].call(u.exports,u,u.exports,e),u.l=!0,u.exports}e.m=t,e.c=n,e.d=function(t,n,o){e.o(t,n)||Object.defineProperty(t,n,{configurable:!1,enumerable:!0,get:o})},e.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(n,"a",n),n},e.o=function(t,n){return Object.prototype.hasOwnProperty.call(t,n)},e.p="",e(e.s=1)}([function(t,n,e){"use strict";n.a=((t,n)=>t+n);n.d=((t,n)=>t-n);n.c=((t,n)=>t*n);n.b=((t,n)=>t/n)},function(t,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var o=e(2),u=(e.n(o),e(3));document.querySelector(".root").insertAdjacentHTML("afterBegin",'\n<div class="display">\n    <input type="text" class="input">\n</div>\n<button class="button clean">CE</button>\n<div class="buttons-container">\n    <button class="button">7</button>\n    <button class="button">8</button>\n    <button class="button">9</button>\n    <button class="button div">/</button>\n    <button class="button">4</button>\n    <button class="button">5</button>\n    <button class="button">6</button>\n    <button class="button mul">*</button>\n    <button class="button">1</button>\n    <button class="button">2</button>\n    <button class="button">3</button>\n    <button class="button add">+</button>\n    <button class="button">0</button>\n    <button class="button">.</button>\n    <button class="button result">=</button>\n    <button class="button sub">-</button>\n</div>');const s=document.querySelector(".result"),r=document.querySelector(".input"),c=document.querySelector(".clean"),a=document.querySelector(".buttons-container");function b(t){const n=t.target.textContent,e=t.target;if("+"===n||"-"===n||"*"===n||"/"===n)r.value+=n;else{if(!e.classList.contains("button"))return!1;r.value+=e.textContent}}s.addEventListener("click",()=>{r.value=Object(u.a)(r.value),a.removeEventListener("click",b,!1)},!1),c.onclick=(()=>{r.value="",a.addEventListener("click",b,!1)}),r.addEventListener("keypress",t=>{t.preventDefault()},!1),r.onmousedown=(()=>!1),a.addEventListener("click",b,!1)},function(t,n){},function(t,n,e){"use strict";var o=e(0);n.a=(t=>{let n,e=u(t);switch(e.operator){case"+":n=Object(o.a)(e.firstOperand,e.secondOperand);break;case"-":n=Object(o.d)(e.firstOperand,e.secondOperand);break;case"*":n=Object(o.c)(e.firstOperand,e.secondOperand);break;case"/":n=Object(o.b)(e.firstOperand,e.secondOperand)}return isNaN(n)||!isFinite(n)?"Error! Wrong operation.":n=`${e.firstOperand}${e.operator}${e.secondOperand}=${n}`});const u=t=>{let n=[],e=[],o=t.indexOf("+");~o&&n.push(o);let u=t.indexOf("-");~u&&n.push(u);let s=t.indexOf("*");~s&&n.push(s);let r=t.indexOf("/");~r&&n.push(r);let c=(n=n.sort((t,n)=>t-n))[0]>0?t[n[0]]:t[n[1]];return e=t.split(c),{firstOperand:parseFloat(e[0]),secondOperand:parseFloat(e[1]),operator:c}}}]);