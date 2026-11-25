const ids=[...document.querySelectorAll('#side a')].map(a=>a.dataset.t),links=Object.fromEntries([...document.querySelectorAll('#side a')].map(a=>[a.dataset.t,a]));
function spy(){let cur=ids[0];for(const id of ids){const el=document.getElementById(id);if(el&&el.getBoundingClientRect().top<140)cur=id;}Object.values(links).forEach(a=>a.classList.remove('on'));if(links[cur]){links[cur].classList.add('on');document.querySelector('#burger .cur').textContent=links[cur].textContent;}}
addEventListener('scroll',spy,{passive:true});spy();
const side=document.getElementById('side'),bg=document.getElementById('burger');
const tog=o=>{const v=o===undefined?!side.classList.contains('open'):o;side.classList.toggle('open',v);bg.setAttribute('aria-expanded',v);};
bg.addEventListener('click',e=>{e.stopPropagation();tog();});
side.addEventListener('click',e=>{e.stopPropagation();if(e.target.closest('a'))tog(false);});
document.addEventListener('click',()=>tog(false));addEventListener('keydown',e=>{if(e.key==='Escape')tog(false);});
document.querySelectorAll('img.thumb[data-from]').forEach(t=>{const s=document.querySelector('#'+t.dataset.from+' img');if(s)t.src=s.src;});
document.querySelectorAll('.sec').forEach(sec=>{
 const set=n=>{const cur=sec.dataset.sel===String(n)?'':String(n);sec.dataset.sel=cur;
  sec.querySelectorAll('.hs').forEach(b=>b.classList.toggle('on',cur&&b.dataset.n===cur));
  sec.querySelectorAll('tr[data-n]').forEach(r=>{r.classList.toggle('dim',!!cur&&r.dataset.n!==cur);r.classList.toggle('on',!!cur&&r.dataset.n===cur);});};
 sec.querySelectorAll('.hs,.rn').forEach(b=>b.addEventListener('click',()=>set(b.dataset.n)));
 sec.querySelector('.all').addEventListener('click',()=>{sec.dataset.sel='';sec.querySelectorAll('.hs').forEach(b=>b.classList.remove('on'));sec.querySelectorAll('tr[data-n]').forEach(r=>r.classList.remove('dim','on'));});
});
