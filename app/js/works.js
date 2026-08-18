/* ============================================================
   WORKS — render + filter the portfolio grid
   Runs synchronously (before script.js) so tilt/magnetic/video-hover
   listeners in script.js can find these cards on first pass.
   ============================================================ */

(function(){

const grid=document.getElementById('works-grid');
const tabsWrap=document.getElementById('work-tabs');
const countEl=document.getElementById('work-count');

const worksData=[
...(typeof sitesData!=='undefined'?sitesData:[]),
...(typeof themesData!=='undefined'?themesData:[])
];

if(!grid||!worksData.length)return;

const CATEGORY_LABEL={
sites:"Сайт-визитка",
runpad:"Runpad PRO",
gameclass:"GameClass"
};

const TABS=[
//{key:"all",label:"Все работы"},
{key:"runpad",label:"Runpad PRO"},
{key:"gameclass",label:"GameClass"},
{key:"sites",label:"Сайты для бизнеса"}    
];

/* ---------- render tabs ---------- */
tabsWrap.innerHTML=TABS.map((t,i)=>
`<button class="work-tab${i===0?' active':''}" data-filter="${t.key}">${t.label}</button>`
).join('');

/* ---------- render media (video preview or CSS site mockup) ---------- */
function renderMedia(item){

if(item.media.type==='video'){
return `
<video src="${item.media.src}" muted loop playsinline preload="metadata"></video>
<button class="work-fs fullscreen-btn" aria-label="Развернуть превью">
<i class='bx bx-fullscreen'></i>
</button>
`;
}

/* CSS-built site preview mockup — no external asset required */
return `
<div class="mock mock-v${item.media.variant}">
<div class="mock-bar">
<span class="mock-dot"></span><span class="mock-dot"></span><span class="mock-dot"></span>
</div>
<div class="mock-body">
<div class="mock-hero"></div>
<div class="mock-line w60"></div>
<div class="mock-line w40"></div>
<div class="mock-grid"><span></span><span></span><span></span></div>
</div>
</div>
`;

}

/* ---------- render cards ---------- */
grid.innerHTML=worksData.map(item=>`
<div class="work-card reveal tilt" data-category="${item.category}">

<div class="work-media${item.media.type==='mock'?' is-mock':''}">
<span class="work-tag">${CATEGORY_LABEL[item.category]||''}</span>
${item.badge?`<span class="work-badge">${item.badge}</span>`:''}
${renderMedia(item)}
</div>

<div class="work-body">
<h3 class="work-title">${item.title}</h3>
<p class="work-desc">${item.subtitle}</p>

<div class="work-bottom">
<div class="work-price"><i class='bx bx-wallet'></i>${item.price}</div>
<a href="${item.ctaLink}" class="work-cta" target="_blank">
<i class='bx bx-cart'></i> ${item.ctaLabel||'Заказать'}
</a>
</div>
</div>

</div>
`).join('');

const cards=()=>Array.from(grid.querySelectorAll('.work-card'));

function updateCount(filter){

if(!countEl)return;

const n=filter==='all'?worksData.length:worksData.filter(w=>w.category===filter).length;

countEl.textContent=`${n} ${plural(n)}`;

}

function plural(n){

const mod10=n%10, mod100=n%100;

if(mod10===1&&mod100!==11)return'работа';
if([2,3,4].includes(mod10)&&![12,13,14].includes(mod100))return'работы';
return'работ';

}

const reduceMotion=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const hasGSAP=typeof gsap!=='undefined';

/* ---------- filtering ---------- */
function applyFilter(filter){

updateCount(filter);

const all=cards();
const toShow=all.filter(c=>filter==='all'||c.dataset.category===filter);
const toHide=all.filter(c=>!(filter==='all'||c.dataset.category===filter));

if(!hasGSAP||reduceMotion){
toHide.forEach(c=>c.style.display='none');
toShow.forEach(c=>{c.style.display='';c.style.opacity=1;c.style.transform='none';});
return;
}

if(toHide.length){
gsap.to(toHide,{
opacity:0,scale:.94,duration:.25,ease:'power2.in',
onComplete:()=>toHide.forEach(c=>c.style.display='none')
});
}

toShow.forEach(c=>c.style.display='');

gsap.fromTo(toShow,
{opacity:0,y:16},
{opacity:1,y:0,duration:.5,ease:'power3.out',stagger:.05,delay:toHide.length?.18:0}
);

}

tabsWrap.addEventListener('click',(e)=>{
    const btn=e.target.closest('.work-tab');
    if(!btn)return;

    tabsWrap.querySelectorAll('.work-tab').forEach(t=>t.classList.remove('active'));
    btn.classList.add('active');

    applyFilter(btn.dataset.filter);
});

applyFilter('runpad');
    
})();
