/* ---------- mobile menu ---------- */
let menu=document.querySelector('.menu-icon');
let navbar=document.querySelector('.menu');

menu.onclick=()=>{
navbar.classList.toggle('active');
menu.classList.toggle('move');
bell.classList.remove('active');
}

/* ---------- menu links: close menu, then smooth-scroll (no autofocus / no keyboard) ---------- */
(function(){

const menuLinks=document.querySelectorAll('.navbar a[href^="#"]');

menuLinks.forEach(link=>{

link.addEventListener('click',(e)=>{

e.preventDefault();

const targetId=link.getAttribute('href').slice(1);
const target=document.getElementById(targetId);

if(!target)return;

/* make sure no form field keeps focus and pops up a keyboard */
if(document.activeElement&&typeof document.activeElement.blur==='function'){
document.activeElement.blur();
}

const scrollToTarget=()=>{
target.scrollIntoView({behavior:'smooth',block:'start'});
};

const wasOpen=navbar.classList.contains('active');

/* close the fullscreen menu overlay */
navbar.classList.remove('active');
menu.classList.remove('move');

if(!wasOpen){
/* menu wasn't open (e.g. desktop) — scroll right away */
scrollToTarget();
return;
}

/* wait for the menu's own closing animation, then scroll */
let done=false;

const onTransitionEnd=(ev)=>{
if(ev.target!==navbar)return;
if(done)return;
done=true;
navbar.removeEventListener('transitionend',onTransitionEnd);
scrollToTarget();
};

navbar.addEventListener('transitionend',onTransitionEnd);

/* fallback in case transitionend never fires */
setTimeout(()=>{
if(done)return;
done=true;
navbar.removeEventListener('transitionend',onTransitionEnd);
scrollToTarget();
},420);

});

});

})();

/* ---------- contact popover ---------- */
let bell=document.querySelector('.notification');

document.querySelector('#bell-icon').onclick=()=>{
bell.classList.toggle('active');
navbar.classList.remove('active');
menu.classList.remove('move');
}

/* ---------- scroll progress bar ---------- */
window.onscroll=function(){mufunction()};

function mufunction(){
var winScroll=document.body.scrollTop||document.documentElement.scrollTop;
var height=document.documentElement.scrollHeight-document.documentElement.clientHeight;
var scrolled=height>0?(winScroll/height)*100:0;
document.getElementById('scroll-bar').style.width=scrolled+'%';
}

/* ---------- theme preview videos ---------- */
document.querySelectorAll('.box video, .work-card video').forEach(video=>{

video.muted=true;

video.addEventListener('mouseenter',()=>{
video.play().catch(()=>{});
});

video.addEventListener('mouseleave',()=>{
video.pause();
});

});

document.querySelectorAll('.fullscreen-btn').forEach(btn=>{

btn.addEventListener('click',async(e)=>{

e.preventDefault();

const box=btn.closest('.box, .work-card');
const video=box.querySelector('video');

try{

if(document.fullscreenElement){

await document.exitFullscreen();

}else{

video.play().catch(()=>{});

if(box.requestFullscreen){

await box.requestFullscreen();

}else if(box.webkitRequestFullscreen){

box.webkitRequestFullscreen();

}else if(box.msRequestFullscreen){

box.msRequestFullscreen();

}

}

}catch(err){

console.log(err);

}

});

});

/* ---------- Telegram contact form ---------- */
const TOKEN='8109711650:AAFIAX-DYNon_VDen00akAoCWDkPw-xRsMk';
const CHAT_ID='-4714866066';

const form=document.getElementById('telegram-form');

form.addEventListener('submit',async(e)=>{

e.preventDefault();

const name=document.getElementById('name').value;
const contact=document.getElementById('contact-phone').value;
const message=document.getElementById('message').value;

const text=
`🆕 Новая заявка с сайта

👤 Имя: ${name}
📞 Контакт: ${contact}

💬 Сообщение:
${message}`;

const btn=form.querySelector('.send-btn');

btn.innerHTML='Отправка...';
btn.disabled=true;

try{

await fetch(`https://api.telegram.org/bot${TOKEN}/sendMessage`,{
method:'POST',
headers:{
'Content-Type':'application/json'
},
body:JSON.stringify({
chat_id:CHAT_ID,
text:text
})
});

btn.innerHTML='Отправлено ✓';

form.reset();

setTimeout(()=>{
btn.innerHTML='Отправить';
btn.disabled=false;
},2000);

}catch(error){

btn.innerHTML='Ошибка';

setTimeout(()=>{
btn.innerHTML='Отправить';
btn.disabled=false;
},2000);

}

});

/* ---------- scroll reveal ---------- */
const reduceMotion=window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function initReveal(){

const targets=document.querySelectorAll('.reveal:not(.in-view)');

if(reduceMotion||!('IntersectionObserver' in window)){
targets.forEach(el=>el.classList.add('in-view'));
return;
}

const observer=new IntersectionObserver((entries)=>{

entries.forEach((entry,i)=>{

if(entry.isIntersecting){

entry.target.style.transitionDelay=(i%6)*60+'ms';
entry.target.classList.add('in-view');
observer.unobserve(entry.target);

}

});

},{threshold:.15,rootMargin:'0px 0px -40px 0px'});

targets.forEach(el=>observer.observe(el));

}

/* ---------- animated counters ---------- */
function initCounters(){

const counters=document.querySelectorAll('.counter:not([data-done])');

if(!counters.length)return;

if(reduceMotion||!('IntersectionObserver' in window)){
counters.forEach(el=>{
el.textContent=el.dataset.target;
el.setAttribute('data-done','1');
});
return;
}

const observer=new IntersectionObserver((entries)=>{

entries.forEach(entry=>{

if(!entry.isIntersecting)return;

const el=entry.target;
const target=parseInt(el.dataset.target,10)||0;
const duration=1100;
const start=performance.now();

function tick(now){

const progress=Math.min((now-start)/duration,1);
const eased=1-Math.pow(1-progress,3);

el.textContent=Math.round(eased*target);

if(progress<1){
requestAnimationFrame(tick);
}else{
el.textContent=target;
el.setAttribute('data-done','1');
}

}

requestAnimationFrame(tick);

observer.unobserve(el);

});

},{threshold:.4});

counters.forEach(el=>observer.observe(el));

}

/* run once on load, and again shortly after for content injected by data scripts */
window.addEventListener('DOMContentLoaded',()=>{
initReveal();
initCounters();
});

window.addEventListener('load',()=>{
initReveal();
initCounters();
});

/* ---------- cursor spotlight (desktop only) ---------- */
(function(){

const spot=document.getElementById('spotlight');
const canHover=window.matchMedia('(hover:hover)').matches;

if(!spot||!canHover||reduceMotion)return;

let raf=null;

window.addEventListener('pointermove',(e)=>{

spot.classList.add('active');

if(raf)cancelAnimationFrame(raf);

raf=requestAnimationFrame(()=>{
spot.style.setProperty('--sx',e.clientX+'px');
spot.style.setProperty('--sy',e.clientY+'px');
});

});

window.addEventListener('pointerleave',()=>spot.classList.remove('active'));

})();

/* ---------- magnetic buttons (desktop only) ---------- */
(function(){

const canHover=window.matchMedia('(hover:hover)').matches;

if(!canHover||reduceMotion)return;

document.querySelectorAll('.magnetic').forEach(btn=>{

btn.addEventListener('mousemove',(e)=>{

const rect=btn.getBoundingClientRect();
const relX=e.clientX-rect.left-rect.width/2;
const relY=e.clientY-rect.top-rect.height/2;

btn.style.transform=`translate(${relX*.25}px,${relY*.35}px)`;

});

btn.addEventListener('mouseleave',()=>{
btn.style.transform='';
});

});

})();

/* ---------- tilt cards (desktop only) ---------- */
(function(){

const canHover=window.matchMedia('(hover:hover)').matches;

if(!canHover||reduceMotion)return;

document.querySelectorAll('.tilt').forEach(card=>{

card.addEventListener('mousemove',(e)=>{

const rect=card.getBoundingClientRect();
const px=(e.clientX-rect.left)/rect.width-.5;
const py=(e.clientY-rect.top)/rect.height-.5;

card.style.transform=`translateY(-6px) rotateX(${py*-6}deg) rotateY(${px*8}deg)`;

});

card.addEventListener('mouseleave',()=>{
card.style.transform='';
});

});

})();

/* ---------- FAQ accordion ---------- */
document.querySelectorAll('.faq-item').forEach(item=>{

const q=item.querySelector('.faq-q');
const a=item.querySelector('.faq-a');

q.addEventListener('click',()=>{

const isOpen=item.classList.contains('open');

document.querySelectorAll('.faq-item.open').forEach(openItem=>{
if(openItem!==item){
openItem.classList.remove('open');
openItem.querySelector('.faq-a').style.maxHeight=null;
}
});

if(isOpen){
item.classList.remove('open');
a.style.maxHeight=null;
}else{
item.classList.add('open');
a.style.maxHeight=a.scrollHeight+'px';
}

});

});

/* ---------- showcase video: play only while in view ---------- */
(function(){

const video=document.querySelector('.showcase-frame video');

if(!video||!('IntersectionObserver' in window))return;

const observer=new IntersectionObserver((entries)=>{

entries.forEach(entry=>{

if(entry.isIntersecting){
video.play().catch(()=>{});
}else{
video.pause();
}

});

},{threshold:.35});

observer.observe(video);

})();
