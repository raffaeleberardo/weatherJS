!function(e){var t={};function n(o){if(t[o])return t[o].exports;var r=t[o]={i:o,l:!1,exports:{}};return e[o].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)n.d(o,r,function(t){return e[t]}.bind(null,r));return o},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t){let n="0e4aa715a8d35e3c1e58eae8734a233b";const o=document.querySelector("input"),r=document.querySelector("#response"),u=document.querySelector("#paese"),i=(document.querySelector("#icon-span"),document.querySelector("#icon")),c=document.querySelector("#description"),a=document.querySelector("#temp"),l=document.querySelector("#feels_like"),s=document.querySelector("#pressure"),d=document.querySelector("#humidity"),p=document.querySelector("#temp_min"),m=document.querySelector("#temp_max"),f=document.querySelector("#vento"),y=document.querySelector("#direzione");function g(e){$.ajax({async:!0,url:e,success:function(e){!function(e){e.sys.id;const t=e.weather[0].icon;let n=e.weather[0].description;const o=e.main,r=o.temp,g=o.feels_like,b=o.pressure,x=o.humidity,S=o.temp_min,v=o.temp_max;u.innerHTML=e.name+e.sys.country.sub(),i.setAttribute("src","http://openweathermap.org/img/wn/"+t+"@2x.png"),i.style.backgroundColor="#87ceeb",i.style.borderRadius="20px",n=n.replace(n[0],n[0].toUpperCase()),c.textContent=n,a.textContent=r+"° C",l.textContent=g+"° C",s.textContent=b+" hpa",d.textContent=x+"%",p.textContent=S+"° C",m.textContent=v+"° C",f.textContent=e.wind.speed+" m/s",y.textContent=void 0===e.wind.deg?" - ":e.wind.deg+"°"}(e),r.setAttribute("src","../icons/checkmark.svg")},error:function(){r.setAttribute("src","../icons/wrong.svg")},dataType:"json",type:"GET"})}o.focus(),o.select(),o.addEventListener("keyup",(function(){let e;if("Inserisci città"!==o.value){let t=o.value;e="http://api.openweathermap.org/data/2.5/weather?q="+t+"&appid="+n+"&units=metric&lang=it",g(e)}})),window.addEventListener("load",(function(){"geolocation"in navigator&&navigator.geolocation.getCurrentPosition((function(e){url="http://api.openweathermap.org/data/2.5/weather?lat="+e.coords.latitude+"&lon="+e.coords.longitude+"&appid="+n+"&units=metric&lang=it",g(url)}))}))}]);