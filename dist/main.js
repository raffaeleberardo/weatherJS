!function(e){var t={};function n(o){if(t[o])return t[o].exports;var r=t[o]={i:o,l:!1,exports:{}};return e[o].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)n.d(o,r,function(t){return e[t]}.bind(null,r));return o},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t){const n=document.querySelector("#show-table"),o=document.querySelector("#hide-table"),r=document.querySelector("input"),c=document.querySelector("#response"),i=document.querySelector("#paese"),u=document.querySelector("#id-paese"),a=document.querySelector("#description"),s=document.querySelectorAll(".weather-icon"),l=document.querySelector("#temperatura"),d=document.querySelector("#humidity"),m=document.querySelector("#wind-icon"),p=document.querySelector("#wind-speed"),y=document.querySelector("#view"),f=document.querySelector("#pressure"),S=document.querySelector("#table"),b=document.querySelector("#massima"),g=document.querySelector("#minima"),v=document.querySelector("#percepita");let w=("http"===location.protocol?"http:":"https")+"://api.openweathermap.org/data/2.5/weather?appid=0e4aa715a8d35e3c1e58eae8734a233b&units=metric&lang=it&";function q(e){$.ajax({async:!0,url:e,success:function(e){!function(e){const t=e.id;let n=e.weather[0].description;const o=e.weather[0].id,r=e.main,c=r.temp,S=r.humidity,w=e.wind.deg,q=e.wind.speed,h=e.visibility,x=r.pressure,C=e.main.temp_max,j=e.main.temp_min,_=e.main.feels_like;i.innerHTML=e.name+e.sys.country.sub(),u.textContent="ID: "+t;for(let t=0;t<s.length;t++)s[t].className="wi wi-owm-"+(e.sys.sunrise<e.dt&&e.dt<e.sys.sunset?"day-":"night-")+o;n=n.replace(n[0],n[0].toUpperCase()),a.textContent=n,l.textContent=c+"°C",d.textContent=S+"%",m.className=void 0!==w?m.className.replace(/\d+/g,w):m.className.replace(/\d+/g,"0"),p.textContent=void 0===q?"-":q+"m/s",y.textContent=isNaN(h)?"-":h/1e3+"km",f.textContent=x/100+"mbar",b.textContent=C+"°C",g.textContent=j+"°C",v.textContent=_+"°C"}(e),c.setAttribute("src","icons/checkmark.svg")},error:function(){c.setAttribute("src","icons/wrong.svg")},dataType:"json",type:"GET"})}r.focus(),r.select(),r.addEventListener("keyup",(function(){"Inserisci città"!==r.value&&(paese=r.value,q(w+"q="+paese))})),window.addEventListener("load",(function(){"geolocation"in navigator&&navigator.geolocation.getCurrentPosition((function(e){q(w+"lat="+e.coords.latitude+"&lon="+e.coords.longitude)}))})),n.addEventListener("click",(function(){S.style.width="100%"})),o.addEventListener("click",(function(){S.style.width="0"}))}]);