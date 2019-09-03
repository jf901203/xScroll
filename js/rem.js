let oWidth=document.documentElement.clientWidth || document.body.clientWidth;
let oHtml=document.getElementsByTagName('html')[0];
oHtml.style.fontSize=oWidth/10+'px'
window.addEventListener('resize',function (e) { 
    let oWidth=document.documentElement.clientWidth || document.body.clientWidth;
    oHtml.style.fontSize=oWidth/10+'px'
 })