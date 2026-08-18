/* ============================================================
   HERO — GSAP entrance timeline + parallax on the floating cards
   ============================================================ */

(function(){

const reduceMotion=window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if(typeof gsap==='undefined'||reduceMotion)return;

/* ---------- entrance timeline ---------- */
const tl=gsap.timeline({defaults:{ease:'power3.out'}});

tl.from('.home-eyebrow',{opacity:0,y:16,duration:.7})
.from('.home-text h1',{opacity:0,y:26,duration:.9},'-=.45')
.from('.home-text p',{opacity:0,y:18,duration:.8},'-=.55')
.fromTo('.home-cta a',{opacity:0,y:16},{opacity:1,y:0,duration:.7,stagger:.1},'-=.5')
.from('.home-stats > div',{opacity:0,y:14,duration:.6,stagger:.08},'-=.45')
.from('.hv-card',{opacity:0,y:40,scale:.94,duration:.9,stagger:.14},'-=.9')
.from('.home-visual .hero-float',{opacity:0,y:18,duration:.7},'-=.4');

/* ---------- parallax on pointer move (desktop only) ---------- */
const visual=document.getElementById('hero-visual');
const canHover=window.matchMedia('(hover:hover)').matches;

if(!visual||!canHover)return;

const cardsEls=visual.querySelectorAll('.hv-card');

visual.addEventListener('mousemove',(e)=>{

const rect=visual.getBoundingClientRect();
const px=(e.clientX-rect.left)/rect.width-.5;
const py=(e.clientY-rect.top)/rect.height-.5;

cardsEls.forEach((card,i)=>{

const depth=(i+1)*6;

gsap.to(card,{
x:px*depth,
y:py*depth,
duration:.6,
ease:'power2.out',
overwrite:'auto'
});

});

});

visual.addEventListener('mouseleave',()=>{

cardsEls.forEach(card=>{
gsap.to(card,{x:0,y:0,duration:.6,ease:'power2.out'});
});

});

})();
/* ============================================================
   MARQUEE STRIP — seamless infinite loop via GSAP
   ============================================================ */

(function(){

const track=document.getElementById('marqueeTrack');

if(!track)return;

const reduceMotion=window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if(reduceMotion||typeof gsap==='undefined')return;

const SPEED=70; /* px per second — controls how fast the strip scrolls */

let tween;

function buildTween(){

if(tween)tween.kill();

gsap.set(track,{xPercent:0});

/* track contains 2 identical groups back-to-back — moving exactly
   half its total width creates a perfectly seamless loop */
const distance=track.scrollWidth/2;
const duration=distance/SPEED;

tween=gsap.to(track,{
xPercent:-50,
duration:duration,
ease:'none',
repeat:-1
});

}

buildTween();

/* rebuild on resize so speed stays visually consistent at any width */
let resizeTimer;
window.addEventListener('resize',()=>{
clearTimeout(resizeTimer);
resizeTimer=setTimeout(buildTween,200);
});

/* light hover effect: smoothly ease speed down, not an abrupt stop */
const canHover=window.matchMedia('(hover:hover)').matches;

if(canHover){

track.addEventListener('mouseenter',()=>{
if(tween)gsap.to(tween,{timeScale:.35,duration:.6,ease:'power2.out'});
});

track.addEventListener('mouseleave',()=>{
if(tween)gsap.to(tween,{timeScale:1,duration:.6,ease:'power2.out'});
});

}

})();
