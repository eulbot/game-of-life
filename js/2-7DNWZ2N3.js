(()=>{function b(t,n,e){let o=t.length-1,r=t[0].length-1;return[n==0?o:n-1,n,n>=o?0:n+1].flatMap(a=>[e==0?r:e-1,e,e>=r?0:e+1].map(l=>({c:a,r:l}))).filter(a=>!(a.c==n&&a.r==e))}function p(t,n,e){return b(t,n,e).reduce((r,a)=>r+(t[a.c][a.r]?1:0),0)}function c(t,n,e){return Array(t).fill(!1).map(()=>Array(n).fill(!1).map(()=>!!(e&&Math.random()>e)))}function f(t){let n=t.map(e=>e.slice());for(let e=0;e<t.length;e++)for(let o=0;o<t[e].length;o++){let r=p(n,e,o);t[e][o]==!1&&r==3&&(t[e][o]=!0),t[e][o]==!0&&!(r==2||r==3)&&(t[e][o]=!1)}return t}function m(t,n){let e=null;return function(...o){clearTimeout(e),e=window.setTimeout(()=>t.apply(this,o),n)}}var i=20,u=document.getElementById("playground"),s=u.getContext("2d");function d(t){s.fillStyle="black",s.fillRect(0,1,u.width,u.height);for(let n=0;n<t.length;n++)for(let e=0;e<t[n].length;e++)s.fillStyle=t[n][e]?"black":"white",s.fillRect(n*i,e*i,i-1,i-1)}function h(){let t=document.body.clientWidth,n=document.body.clientHeight;return u.width=t,u.height=n,c(Math.ceil(t/i),Math.ceil(n/i),.85)}function v(){var t=h(),n=!1;window.addEventListener("resize",m(()=>{t=h()},200)),u.addEventListener("mousedown",r=>{n=!0,e(r)}),u.addEventListener("mousemove",r=>e(r)),u.addEventListener("touchmove",r=>{if(r.touches.length<=0)return 0;e(r.touches[0])}),u.addEventListener("mouseup",()=>n=!1);function e(r){if(!n)return 0;let a=Math.floor(r.pageX/i),l=Math.floor(r.pageY/i);t[a][l]=!0,d(t)}function o(){n||(d(t),t=f(t)),setTimeout(()=>{requestAnimationFrame(o)},1e3/10)}o()}v();})();