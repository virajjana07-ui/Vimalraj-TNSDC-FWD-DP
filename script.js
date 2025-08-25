const projects = [

  {id:1,title:'Portfolio Website',type:'web',img:'https://picsum.photos/seed/p1/800/600',desc:'A responsive portfolio built with HTML/CSS and vanilla JS. Includes animations and a small CMS for easy editing.'},

  {id:2,title:'Pixel Runner (Game)',type:'game',img:'https://picsum.photos/seed/p3/800/600',desc:'A small 2D platformer game made with Phaser and solo assets.'},

  {id:3,title:'Calculator App',type:'web',img:'https://picsum.photos/seed/p6/800/600',desc:'A modern calculator with keyboard support and expression parsing.'}

];

const $ = s => document.querySelector(s);

const $$ = s => Array.from(document.querySelectorAll(s));

function renderProjects(filter='all'){

  const grid = $('#projectGrid'); grid.innerHTML='';

  const list = projects.filter(p=> filter==='all' ? true : p.type===filter);

  document.getElementById('projCount').textContent = projects.length;

  list.forEach(p=>{

    const card = document.createElement('article'); card.className='card'; card.setAttribute('tabindex','0');

    card.innerHTML = `

      <img alt="Screenshot of ${p.title}" src="${p.img}" />

      <h4 style="margin:8px 0 4px 0">${p.title}</h4>

      <p class="muted" style="margin:0;font-size:13px">${p.desc.slice(0,80)}...</p>

      <div class="tags"><span class="tag">${p.type}</span><button class="btn btn-ghost" data-id="${p.id}" style="margin-left:auto">Details</button></div>

    `;

    grid.appendChild(card);

  });

}

function openModal(html){

  const bg = $('#modalBg'); bg.style.display='flex'; bg.setAttribute('aria-hidden','false'); $('#modalContent').innerHTML = html;

}

function closeModal(){

  const bg = $('#modalBg'); bg.style.display='none'; bg.setAttribute('aria-hidden','true'); $('#modalContent').innerHTML = '';

document.addEventListener('click', e => {

  if(e.target.matches('.filter')){

    $$('.filter').forEach(b=>b.classList.remove('active'));

    e.target.classList.add('active');

    renderProjects(e.target.dataset.filter);

  }

  if(e.target.closest('[data-id]')){

    const id = Number(e.target.closest('[data-id]').dataset.id);

    const p = projects.find(x=>x.id===id);

    openModal(`<h2>${p.title}</h2><img src="${p.img}" style="width:100%;height:240px;object-fit:cover;border-radius:8px;margin-top:8px"/><p class='muted' style='margin-top:10px'>${p.desc}</p><p style='margin-top:10px'><strong>Tech:</strong> HTML, CSS, JS</p><p style='margin-top:10px'><a href='#' class='btn btn-primary' onclick='alert("Open project link (placeholder)")'>Open project</a></p>`);

  }

  if(e.target.id==='closeModal' || e.target.id==='modalBg') closeModal();

});

document.addEventListener('keydown', e=>{ if(e.key==='Escape') closeModal(); });

$('#copyEmail').addEventListener('click', async ()=>{

  try{

    await navigator.clipboard.writeText('your.email@example.com');

    alert('Email copied to clipboard');

  } catch(err){ alert('Could not copy — try manually'); }

});

$('#contactForm').addEventListener('submit', e=>{

  e.preventDefault();

  const name = $('#name').value.trim(), email = $('#email').value.trim(), message = $('#message').value.trim();

  if(!name || !email || !message){ $('#formFeedback').textContent='Please fill all fields.'; return; }

  $('#formFeedback').textContent='Sending...';

  setTimeout(()=>{ $('#formFeedback').textContent='Message sent! I will get back to you soon.'; $('#contactForm').reset(); },00);

});

const themeToggle = $('#themeToggle');

function applyTheme(t){ document.documentElement.setAttribute('data-theme',t); themeToggle.setAttribute('aria-pressed', t==='dark' ? 'false' : 'true'); }

const saved = localStorage.getItem('theme') || 'dark'; applyTheme(saved);

themeToggle.addEventListener('click', ()=>{

  const next = document.documentElement.getAttribute('data-theme')==='light'?'dark':'light';

  applyTheme(next); localStorage.setItem('theme',next);

});

$('#viewProjects').addEventListener('click', ()=>{ document.getElementById('projects').scrollIntoView({behavior:'smooth'}); });

$('#contactMe').addEventListener('click', ()=>{

  document.getElementById('name').focus();

  window.scrollTo({top:document.querySelector('aside').offsetTop - 20, behavior:'smooth'})

});

document.getElementById('year').textContent = new Date().getFullYear();

renderProjects();

(function quickCustom(){

  const nameEl = document.getElementById('yourNameInline');

  const siteName = document.getElementById('siteName');

  const savedName = localStorage.getItem('student_name');

  if(savedName){ nameEl.textContent = savedName; siteName.textContent = savedName; }

  nameEl.addEventListener('dblclick', ()=>{

    const v = prompt('Enter your name');

    if(v){ nameEl.textContent=v; siteName.textContent=v; localStorage.setItem('student_name',v); }

  });

})();