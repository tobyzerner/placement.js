var placement=function(){"use strict";const e={size:["height","width"],clientSize:["clientHeight","clientWidth"],offsetSize:["offsetHeight","offsetWidth"],maxSize:["maxHeight","maxWidth"],before:["top","left"],marginBefore:["marginTop","marginLeft"],after:["bottom","right"],marginAfter:["marginBottom","marginRight"],scrollOffset:["pageYOffset","pageXOffset"]};return function(t,o,f="bottom",i="center"){const n=function(e){do{if("fixed"===getComputedStyle(e).position)return!0;e=e.parentNode}while(e.parentNode);return!1}(t),r=t.getBoundingClientRect(),a=getComputedStyle(o),s={},l={};for(const t in e)s[t]=e[t]["top"===f||"bottom"===f?0:1],l[t]=e[t]["top"===f||"bottom"===f?1:0];o.style.position=n?"fixed":"absolute",o.style.maxWidth="",o.style.maxHeight="";const m=r[s.before],c=document.documentElement[s.clientSize]-r[s.after];(f===s.before&&o[s.offsetSize]>m||f===s.after&&o[s.offsetSize]>c)&&(f=m>c?s.before:s.after);const d=parseInt(a[s.marginBefore])+parseInt(a[s.marginAfter]),u=(f===s.before?m:c)-d;o[s.offsetSize]>u&&(o.style[s.maxSize]=u+"px");const g=n?0:window[s.scrollOffset];f===s.before?(o.style[s.before]="auto",o.style[s.after]=-g+document.documentElement[s.clientSize]-r[s.before]+"px"):(o.style[s.before]=g+r[s.after]+"px",o.style[s.after]="auto");const p=parseInt(a[l.marginAfter])+parseInt(a[l.marginBefore]),b=document.documentElement[l.clientSize]-p;o[l.offsetSize]>b&&(o.style[l.maxSize]=b+"px");const S=n?0:window[l.scrollOffset],z=e=>Math.max(0,Math.min(e,document.documentElement[l.clientSize]-o[l.offsetSize]-p));switch(i){case"start":o.style[l.before]=S+z(r[l.before])+"px",o.style[l.after]="auto";break;case"end":o.style[l.before]="auto",o.style[l.after]=S+z(document.documentElement[l.clientSize]-r[l.after])+"px";break;default:o.style[l.before]=S+z(r[l.before]+t[l.offsetSize]/2-o[l.offsetSize]/2)+"px",o.style[l.after]="auto"}o.dataset.side=f,o.dataset.align=i}}();
