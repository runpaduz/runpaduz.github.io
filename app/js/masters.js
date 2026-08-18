const mastersContainer=document.getElementById('masters-container');

mastersData.forEach(master=>{

mastersContainer.innerHTML+=`

<div class="master-card reveal">

<div class="master-head">

<div class="master-user">

<div class="master-avatar">
<img src="${master.avatar}" alt="${master.name}">
</div>

<div class="master-info">

<h3>${master.name}</h3>

<div class="master-city">
<i class='bx bx-map'></i>
${master.city}
</div>

<div class="master-level">
<i class='bx bx-shield-quarter'></i>
Проверенный мастер
</div>

</div>

</div>

<div class="master-rating">
<i class='bx bxs-star'></i>
${master.rating}
</div>

</div>

<p class="master-desc">
${master.description}
</p>

<div class="master-tags">
${master.tags.map(tag=>`<span>${tag}</span>`).join('')}
</div>

<div class="master-stats">

<div class="master-stat">
<h4>120+</h4>
<span>Проектов</span>
</div>

<div class="master-stat">
<h4>24/7</h4>
<span>Поддержка</span>
</div>

<div class="master-stat">
<h4>5 лет</h4>
<span>Опыт</span>
</div>

</div>

<div class="master-price">
<i class='bx bx-wallet'></i>
${master.price}
</div>

<div class="master-bottom">

<a href="${master.telegram}" target="_blank" class="master-btn">
<i class='bx bxl-telegram'></i>
Написать
</a>

<a href="tel:${master.phone}" class="master-profile">
<i class='bx bx-phone-call'></i>
</a>

</div>

</div>

`;

});