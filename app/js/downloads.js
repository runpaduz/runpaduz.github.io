const container=document.getElementById('downloads-container');

downloadsData.forEach(item=>{

let buttons='';

item.files.forEach(file=>{

buttons+=`
<a href="${file.link}" download>
<i class='bx bx-download'></i>
${file.name}
</a>
`;

});

container.innerHTML+=`

<div class="v-card reveal">

<div class="v-head">

<div class="v-icon">
<img src="${item.image}" alt="${item.title}">
</div>

<div class="v-info">
<h3>${item.title}</h3>
<span>${item.type}</span>
</div>

</div>

<div class="v-text">
${item.description}
</div>

<div class="v-files">
${buttons}
</div>

</div>

`;

});