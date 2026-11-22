document.getElementById('yr').textContent=new Date().getFullYear();
(async()=>{const box=document.getElementById('posts');if(!box)return;
let posts=[];try{posts=(await (await fetch('content/posts.json')).json()).posts||[]}catch(e){box.innerHTML='<p>Posts could not be loaded.</p>';return}
posts.sort((a,b)=>new Date(b.date)-new Date(a.date));
const esc=s=>String(s||'').replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
function draw(f){const l=posts.filter(p=>f==='all'||p.type===f);
box.innerHTML=l.length?l.map(p=>`<article class="post" data-i="${posts.indexOf(p)}" tabindex="0"><div class="cover" style="${p.image?`background-image:url('${esc(p.image)}')`:''}">${p.image?'':esc(p.title)}</div><h3>${esc(p.title)}</h3><p class="meta">${esc(p.type)} &middot; ${new Date(p.date).toLocaleDateString('en-GB',{day:'numeric',month:'long',year:'numeric'})}</p><p>${esc(p.excerpt)}</p></article>`).join(''):'<p>Nothing here yet.</p>'}
draw('all');
document.querySelectorAll('.filters button').forEach(b=>b.onclick=()=>{document.querySelectorAll('.filters button').forEach(x=>x.classList.remove('on'));b.classList.add('on');draw(b.dataset.f)});
const open=a=>{const p=posts[a.dataset.i];dt.textContent=p.title;dm.textContent=p.type;
db.innerHTML=esc(p.body||p.excerpt).split(/\n\n+/).map(t=>`<p>${t}</p>`).join('')+(p.link?`<p><a class="btn" href="${esc(p.link)}" target="_blank" rel="noopener">${p.type==='Book'?'Get the book':'Read more'}</a></p>`:'');dlg.showModal()};
box.addEventListener('click',e=>{const a=e.target.closest('.post');if(a)open(a)});
box.addEventListener('keydown',e=>{if(e.key==='Enter'){const a=e.target.closest('.post');if(a)open(a)}});
})();
if(window.netlifyIdentity)netlifyIdentity.on('init',u=>{if(!u)netlifyIdentity.on('login',()=>location.href='/admin/')});
