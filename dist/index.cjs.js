"use strict";Object.defineProperty(exports,"__esModule",{value:!0});const t={x:{start:"left",Start:"Left",end:"right",End:"Right",size:"width",Size:"Width"},y:{start:"top",Start:"Top",end:"bottom",End:"Bottom",size:"height",Size:"Height"}};exports.place=function(e,n,o){var i;const s=o.placement||"bottom";let[a,d]=s.split("-");const r=["top","bottom"].includes(a)?"y":"x",l="y"===r?"x":"y",c=t[r],u=t[l],p=n.style;p.position="absolute",p.maxWidth=p.maxHeight="";const f=e.getBoundingClientRect(),m=(null===(i=function(t){for(;(t=t.parentNode)&&t instanceof Element;){const e=getComputedStyle(t).overflow;if(["auto","scroll"].includes(e))return t}}(n))||void 0===i?void 0:i.getBoundingClientRect())||(h=0,g=0,x=window.innerWidth,S=window.innerHeight,{top:h,left:g,right:x,bottom:S,width:x,height:S});var h,g,x,S;p["max"+u.Size]=m[u.size]+"px";const z={[c.start]:f[c.start]-m[c.start],[c.end]:m[c.end]-f[c.end]};let y;n["offset"+c.Size]>z[a]&&(a=z[c.start]>z[c.end]?c.start:c.end),p["max"+c.Size]=z[a]+"px";const b=n.offsetParent;if(b&&b!==document.body){const e=b.getBoundingClientRect(),n=getComputedStyle(b);y=o=>e[t[o].start]+parseInt(n["border"+t[o].Start+"Width"])}const w=(e,o)=>Math.max(m[t[o].start],Math.min(e,m[t[o].end]-n["offset"+t[o].Size]))-(y?y(o):0),v=document.documentElement;if(a===c.start?(p[c.start]="auto",p[c.end]=w(v["client"+c.Size]-f[c.start],r)+"px"):(p[c.start]=w(f[c.end],r)+"px",p[c.end]="auto"),"end"===d)p[u.start]="auto",p[u.end]=w(v["client"+u.Size]-f[u.end],l)+"px";else{let t=0;if("start"!==d){t=f[u.size]/2-n["offset"+u.Size]/2}p[u.start]=w(f[u.start]+t,l)+"px",p[u.end]="auto"}n.dataset.placement=a+(d?"-"+d:"")};
