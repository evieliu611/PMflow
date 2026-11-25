/* SyncSpec 雛型共用腳本：外殼、圖示、頁籤、浮層、討論模式、地圖引擎（離線可用，無外部依賴） */
(function(){
const ICON={
 logo:'<path d="M5 8l7-4 7 4v8l-7 4-7-4z"/><path d="M12 12l7-4M12 12v8M12 12L5 8"/>',
 folder:'<path d="M3 7a2 2 0 012-2h4l2 2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>',
 home:'<path d="M4 11l8-7 8 7v8a1 1 0 01-1 1h-4v-6H9v6H5a1 1 0 01-1-1z"/>',
 list:'<path d="M8 6h12M8 12h12M8 18h12M4 6h.01M4 12h.01M4 18h.01"/>',
 files:'<path d="M14 3H7a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 002-2V8z"/><path d="M14 3v5h5M9 13h6M9 17h6"/>',
 book:'<path d="M4 5a2 2 0 012-2h13v16H6a2 2 0 00-2 2z"/><path d="M4 19V5M9 7h6"/>',
 users:'<circle cx="9" cy="8" r="3.2"/><path d="M3 20a6 6 0 0112 0M16 5a3.2 3.2 0 010 6M18 14a6 6 0 013 6"/>',
 gear:'<circle cx="12" cy="12" r="3"/><path d="M19 12a7 7 0 00-.2-1.6l2-1.5-2-3.4-2.3 1a7 7 0 00-2.7-1.6L13.4 2h-2.8l-.4 2.9a7 7 0 00-2.7 1.6l-2.3-1-2 3.4 2 1.5A7 7 0 005 12c0 .5.1 1.1.2 1.6l-2 1.5 2 3.4 2.3-1a7 7 0 002.7 1.6l.4 2.9h2.8l.4-2.9a7 7 0 002.7-1.6l2.3 1 2-3.4-2-1.5c.1-.5.2-1.100.2-1.600z"/>',
 spark:'<path d="M12 3l1.8 5.2L19 10l-5.200 1.800L12 17l-1.800-5.200L5 10l5.200-1.800z"/><path d="M19 16l.7 2 2 .7-2 .7L19 21l-.7-1.600-2-.7 2-.7z"/>',
 send:'<path d="M21 3L10 14M21 3l-7 18-4-7-7-4z"/>',
 plus:'<path d="M12 5v14M5 12h14"/>',
 x:'<path d="M6 6l12 12M18 6L6 18"/>',
 check:'<path d="M5 12.500l4.500 4.500L19 7.500"/>',
 chev:'<path d="M6 9l6 6 6-6"/>',
 chevr:'<path d="M9 6l6 6-6 6"/>',
 search:'<circle cx="11" cy="11" r="6.500"/><path d="M20 20l-4.200-4.200"/>',
 upload:'<path d="M12 16V4M7 9l5-5 5 5M4 16v3a1 1 0 001 1h14a1 1 0 001-1v-3"/>',
 download:'<path d="M12 4v12M7 11l5 5 5-5M4 20h16"/>',
 doc:'<path d="M14 3H7a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 002-2V8z"/><path d="M14 3v5h5"/>',
 slides:'<rect x="3" y="4" width="18" height="12" rx="2"/><path d="M8 20h8M12 16v4"/>',
 split:'<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M12 4v16M7 9h2M7 13h2M15 9h2"/>',
 code:'<path d="M8 8l-5 4 5 4M16 8l5 4-5 4M14 5l-4 14"/>',
 pin:'<path d="M12 21s7-6.300 7-11a7 7 0 00-14 0c0 4.700 7 11 7 11z"/><circle cx="12" cy="10" r="2.500"/>',
 layers:'<path d="M12 3l9 5-9 5-9-5z"/><path d="M3 13l9 5 9-5M3 17.500l9 5 9-5"/>',
 target:'<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="3.500"/>',
 clock:'<circle cx="12" cy="12" r="8.500"/><path d="M12 7v5l3 2"/>',
 shield:'<path d="M12 3l8 3v6c0 5-3.500 8-8 9-4.500-1-8-4-8-9V6z"/><path d="M9 12l2 2 4-4"/>',
 trash:'<path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3"/>',
 edit:'<path d="M4 20h4l11-11-4-4L4 16z"/>',
 eye:'<path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
 link:'<path d="M10 14a4 4 0 005.700 0l3-3a4 4 0 00-5.700-5.700l-1 1M14 10a4 4 0 00-5.700 0l-3 3a4 4 0 005.700 5.700l1-1"/>',
 undo:'<path d="M9 14L4 9l5-5M4 9h10a6 6 0 010 12h-3"/>',
 flag:'<path d="M5 21V4M5 4h11l-2 4 2 4H5"/>',
 grid:'<rect x="4" y="4" width="7" height="7" rx="1.500"/><rect x="13" y="4" width="7" height="7" rx="1.500"/><rect x="4" y="13" width="7" height="7" rx="1.500"/><rect x="13" y="13" width="7" height="7" rx="1.500"/>',
 msg:'<path d="M4 5h16v11H9l-5 4z"/>',
 sliders:'<path d="M4 7h10M18 7h2M4 17h2M10 17h10"/><circle cx="16" cy="7" r="2"/><circle cx="8" cy="17" r="2"/>',
 star:'<path d="M12 3l2.700 5.600 6.100.9-4.400 4.300 1 6.100L12 17l-5.400 2.900 1-6.100L3.200 9.500l6.100-.9z"/>',
 more:'<path d="M5 12h.01M12 12h.01M19 12h.01"/>',
 refresh:'<path d="M20 11a8 8 0 00-14-4M4 5v4h4M4 13a8 8 0 0014 4M20 19v-4h-4"/>',
 image:'<rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="9" cy="10" r="1.800"/><path d="M21 16l-5-5-9 9"/>',
 table:'<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 10h18M9 5v14"/>',
 lock:'<rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 018 0v3"/>',
 alert:'<path d="M12 4l9 16H3z"/><path d="M12 10v4M12 17h.01"/>',
 paperclip:'<path d="M20 11l-8 8a5 5 0 01-7-7l9-9a3.500 3.500 0 015 5l-9 9a2 2 0 01-3-3l8-8"/>'
};
window.ic=(n,c)=>'<svg class="ic '+(c||'')+'" viewBox="0 0 24 24">'+(ICON[n]||'')+'</svg>';
const $=(s,r)=>(r||document).querySelector(s), $$=(s,r)=>[...(r||document).querySelectorAll(s)];
window.$=$;window.$$=$$;

const PAGES={projects:'雛型_v1_01_專案列表.html',home:'雛型_v1_02_專案總覽.html',manage:'雛型_v1_03_專案管理.html',items:'雛型_v1_04_工項清單.html',work:'雛型_v1_05_工項工作區.html',materials:'雛型_v1_06_專案素材.html',library:'雛型_v1_07_公司素材庫.html',admin:'雛型_v1_08_後台管理.html',proto:'雛型_v1_09_完整雛型.html'};
window.PAGES=PAGES;
/* v2 模式：從 v2 進來後，連 v1 頁面的導覽也一路是 v2（網址加 ?ver=1 或點頂端「v2 草稿」可切回 v1） */
window.applyV2=function(){if(window.__v2)return;window.__v2=1;
 Object.assign(PAGES,{projects:'雛型_v2_01_專案列表.html',home:'雛型_v2_02_專案總覽.html',contract2:'雛型_v2_03_合約與工項.html',archive:'雛型_v2_06_對話存檔.html',library:'雛型_v2_07_知識與規範.html'});
 window.RAIL=[['home','home','總覽'],['items','list','工項'],['proto','grid','雛型'],['archive','clock','存檔'],['materials','files','素材']];
 window.LIBNAME='公司知識庫';
 window.addEventListener('load',()=>{const M={'雛型_v1_01_專案列表.html':PAGES.projects,'雛型_v1_02_專案總覽.html':PAGES.home,'雛型_v1_07_公司素材庫.html':PAGES.library};
  document.querySelectorAll('a[href]').forEach(a=>{const m=a.getAttribute('href').match(/^(雛型_v1_\d\d_[^?#]*\.html)([?#].*)?$/);if(!m)return;let t=M[m[1]];if(!t&&m[1]==='雛型_v1_03_專案管理.html'&&(m[2]||'').indexOf('#contract')>-1)t=PAGES.contract2;if(t)a.setAttribute('href',t+(m[2]||''))});
  if(!document.getElementById('v2tag')){const f=document.createElement('a');f.id='v2tag';f.textContent='v2 草稿';f.title='目前一路使用 v2；點這裡切回 v1';f.href='#';f.onclick=e=>{e.preventDefault();try{sessionStorage.setItem('ss_ver','1')}catch(x){}location.href='雛型_v1_01_專案列表.html?ver=1'};document.body.appendChild(f)}})};
window.applyV3=function(){if(window.__v2||window.__v3)return;window.__v3=1;
 Object.assign(PAGES,{projects:'雛型_v3_01_專案列表.html',home:'雛型_v3_02_專案總覽.html',contract2:'雛型_v3_03_合約與工項.html',manage:'雛型_v3_04_專案設定.html',work:'雛型_v3_05_工項工作區.html',library:'雛型_v3_07_知識庫.html',cold:'雛型_v3_08_冷啟動匯入.html',kbadmin:'雛型_v3_10_知識庫維護人.html',kbdetail:'雛型_v3_11_知識詳情.html',materials:'雛型_v3_12_專案素材.html'});
 window.RAIL=[['home','home','總覽'],['items','list','工項'],['proto','grid','雛型'],['materials','files','素材']];window.RAILB=[['manage','gear','設定']];window.NOPMENU=1;
 window.LIBNAME='公司知識庫';window.SETLABEL='專案設定與知識';window.KBADMIN=1;
 window.addEventListener('load',()=>{const M={'雛型_v1_01_專案列表.html':PAGES.projects,'雛型_v1_02_專案總覽.html':PAGES.home,'雛型_v1_07_公司素材庫.html':PAGES.library,'雛型_v1_05_工項工作區.html':PAGES.work,'雛型_v1_06_專案素材.html':PAGES.materials};
  document.querySelectorAll('a[href]').forEach(a=>{const m=a.getAttribute('href').match(/^(雛型_v1_\d\d_[^?#]*\.html)([?#].*)?$/);if(!m)return;let t=M[m[1]];if(!t&&m[1]==='雛型_v1_03_專案管理.html')t=(m[2]||'').indexOf('#contract')>-1?PAGES.contract2:PAGES.manage;if(t)a.setAttribute('href',t+(m[2]||''))});
  if(!document.getElementById('v2tag')){const f=document.createElement('a');f.id='v2tag';f.textContent='v3 草稿';f.title='目前一路使用 v3；點這裡切回 v1';f.href='#';f.onclick=e=>{e.preventDefault();try{sessionStorage.setItem('ss_ver','1')}catch(x){}location.href='雛型_v1_01_專案列表.html?ver=1'};document.body.appendChild(f)}})};
(function(){let v=null;try{const q=new URLSearchParams(location.search).get('ver');if(q==='1'||q==='2'||q==='3')sessionStorage.setItem('ss_ver',q);v=sessionStorage.getItem('ss_ver')}catch(e){}if(v==='2')window.applyV2();else if(v==='3')window.applyV3()})();
window.go=k=>{location.href=DB.href(PAGES[k])};

function shell(){
  const B=document.body.dataset,nav=B.nav||'',crumb=B.crumb||'',scope=B.scope||'project';
  const page=$('#page'); if(!page) return;
  const P=DB.cur(),flush=B.flush==='1',H=k=>DB.href(PAGES[k]);
  const app=document.createElement('div');app.className='app'+(scope==='global'?' g':' p');
  const sysmenu=`<div class="menu"><button>${ic('shield')}系統管理${ic('chev')}</button><div class="pop"><a href="${PAGES.admin}#kb">${ic('book')}公司素材庫審核</a><a href="${PAGES.admin}#cats">${ic('grid')}工項分類清單</a><a href="${PAGES.admin}#audit">${ic('clock')}稽核與用量</a>${window.KBADMIN?'<a href="'+PAGES.kbadmin+'">'+ic('users')+'知識庫維護人</a>':''}</div></div>`;
  const user=`<div class="row" style="gap:8px"><div class="avatar">E</div><span class="sm">EvieLiu</span></div>`;
  let rail='',topL='',topR='';
  if(scope==='project'){
    const items=window.RAIL||[['home','home','總覽'],['items','list','工項'],['proto','grid','雛型'],['materials','files','素材']];
    rail=`<nav class="rail">${items.map(([k,i,t])=>`<a href="${H(k)}" class="${nav===k?'on':''}">${ic(i)}<span>${t}</span></a>`).join('')}${window.RAILB?'<div class="sp"></div>'+window.RAILB.map(([k,i,t])=>`<a href="${H(k)}" class="${nav===k?'on':''}">${ic(i)}<span>${t}</span></a>`).join(''):''}</nav>`;
    topL=`<a class="logo sm" href="${PAGES.projects}" title="回專案列表">${ic('logo')}</a><div class="menu"><div class="proj-sw" id="psw"><div class="dot">${P.name.slice(0,1)}</div><div><small>目前專案</small><b>${P.name}</b></div>${ic('chev')}</div><div class="pop" style="left:0;right:auto;min-width:260px">${Object.values(DB.P).filter(x=>!DB.isClosed(x)||x.id===P.id).map(x=>`<a data-p="${x.id}" style="${x.id===P.id?'background:var(--brand-bg)':''}"><div class="avatar" style="width:26px;height:26px;border-radius:8px;background:var(--brand-bg);color:var(--brand)">${x.name.slice(0,1)}</div><div><b>${x.name}</b><div class="xs muted">${x.client} · ${x.sub}</div></div></a>`).join('')}<div class="sep"></div><a href="${PAGES.projects}">${ic('folder')}所有專案…</a></div></div>
     <a class="btn sm ghost" href="${H('library')}">${ic('book')}${window.LIBNAME||'公司素材庫'}</a>`;
    topR=`<div class="menu"><button>${ic('sliders')}專案管理${ic('chev')}</button><div class="pop"><a href="${H('manage')}#contract">${ic('doc')}合約拆工項</a><a href="${H('manage')}#members">${ic('users')}成員</a><a href="${H('manage')}#settings">${ic('gear')}${window.SETLABEL||'專案設定與參考知識'}</a></div></div>${sysmenu}${user}`;
  }else{
    topL=`<a class="logo sm" href="${PAGES.projects}">${ic('logo')}</a><b style="font-size:16px">SyncSpec</b>
     <a class="btn sm ${nav==='projects'?'primary':'ghost'}" href="${PAGES.projects}">${ic('folder')}專案列表</a><a class="btn sm ${nav==='library'?'primary':'ghost'}" href="${H('library')}">${ic('book')}${window.LIBNAME||'公司素材庫'}</a>`;
    topR=`${sysmenu}${user}`;
  }
  if(window.NOPMENU)topR=topR.replace(/<div class="menu"><button>[^]*?專案管理[^]*?<\/div><\/div>/,'');
  app.innerHTML=`${rail}<header class="top">${topL}<div class="crumb">${crumb}</div><div class="grow"></div>${topR}</header><main class="content${flush?' flush':''}"></main>`;
  const main=$('.content',app);
  if(scope==='project'&&DB.isClosed(P)){const bn=document.createElement('div');bn.className='banner warn';bn.style.cssText='margin:-6px 0 16px;border-radius:12px';bn.innerHTML=ic('lock')+'<span class="grow"><b>此專案已結案（'+DB.isClosed(P)+'）</b>，內容唯讀；需要修改請先重新開啟。</span><a class="btn sm" href="'+DB.href(PAGES.manage)+'#settings">前往專案設定重新開啟</a>';page.insertBefore(bn,page.firstChild)}
  while(page.firstChild) main.appendChild(page.firstChild);
  if(window.__v3&&nav==='items'&&B.flush!=='1'){const on=B.strip==='contract'?'contract':'items';main.insertAdjacentHTML('afterbegin','<div class="v3strip"><a class="'+(on==='items'?'on':'')+'" href="'+H('items')+'">工項清單</a><a class="'+(on==='contract'?'on':'')+'" href="'+H('contract2')+'">合約</a></div>')}
  page.replaceWith(app);
  window.fixLinks=()=>$$('a[href^="雛型_v1_"]').forEach(a=>{if(!/[?&]p=/.test(a.getAttribute('href'))){const h=a.getAttribute('href').split('#');a.setAttribute('href',DB.href(h[0])+(h[1]?'#'+h[1]:''))}});window.fixLinks();
  $$('[data-p]',app).forEach(a=>a.addEventListener('click',()=>{DB.set(a.dataset.p);const u=new URL(location.href);u.searchParams.set('p',a.dataset.p);u.searchParams.delete('i');location.href=u.toString()}));
  $$('.menu>button,.menu>.proj-sw').forEach(b=>b.addEventListener('click',e=>{e.stopPropagation();const m=b.parentElement,o=m.classList.contains('open');$$('.menu').forEach(x=>x.classList.remove('open'));if(!o)m.classList.add('open')}));
  document.addEventListener('click',()=>$$('.menu').forEach(x=>x.classList.remove('open')));
}
function tabs(){
  const init=(location.hash||'').slice(1);
  $$('.tab[data-tab]').forEach(t=>{
    t.addEventListener('click',()=>activate(t.dataset.g,t.dataset.tab));
  });
  function activate(g,name){
    $$('.tab[data-g="'+g+'"]').forEach(x=>x.classList.toggle('on',x.dataset.tab===name));
    $$('[data-panel][data-g="'+g+'"]').forEach(x=>x.classList.toggle('on',x.dataset.panel===name));
  }
  const groups=[...new Set($$('.tab[data-tab]').map(t=>t.dataset.g))];
  groups.forEach(g=>{
    const names=$$('.tab[data-g="'+g+'"]').map(t=>t.dataset.tab);
    activate(g,names.includes(init)?init:(($('.tab.on[data-g="'+g+'"]')||{dataset:{tab:names[0]}}).dataset.tab));
  });
  window.activateTab=activate;
}

function modals(){
  document.addEventListener('click',e=>{
    const o=e.target.closest('[data-open]');
    if(o){e.preventDefault();const m=document.getElementById(o.dataset.open);if(m){m.classList.add('open');if(m.onopen)m.onopen(o)}}
    const c=e.target.closest('[data-close]');
    if(c){const m=c.closest('.modal-back');if(m)m.classList.remove('open')}
    if(e.target.classList&&e.target.classList.contains('modal-back'))e.target.classList.remove('open');
    const opt=e.target.closest('.opt');
    if(opt){const grp=opt.parentElement;$$('.opt',grp).forEach(x=>x.classList.remove('on'));opt.classList.add('on');const i=$('input',opt);if(i)i.checked=true}
  });
  document.addEventListener('keydown',e=>{if(e.key==='Escape')$$('.modal-back.open').forEach(m=>m.classList.remove('open'))});
}
let tt;window.toast=(msg,act,fn)=>{let t=$('.toast');if(!t){t=document.createElement('div');t.className='toast';document.body.appendChild(t)}
  t.innerHTML=msg+(act?' <a>'+act+'</a>':'');const a=$('a',t);if(a&&fn)a.onclick=fn;t.classList.add('on');clearTimeout(tt);tt=setTimeout(()=>t.classList.remove('on'),3600)};

function layers(){
  const q=new URLSearchParams(location.search);
  if(q.get('spec')==='1')document.body.classList.add('show-spec');
  const notes=window.NOTES||[];
  const btn=document.createElement('button');btn.id='notesBtn';btn.innerHTML='討論模式 · '+notes.length;
  const pan=document.createElement('div');pan.id='notesPanel';
  pan.innerHTML='<div class="nh"><b>① 今天要決定的（'+notes.length+' 項）</b><div class="xs muted">只列未決事項；已定案的在確認紀錄</div></div>'+
   notes.map(n=>`<div class="ni"><b>${n.id}</b> ${n.tech?'<span class="chip sun xs">⚠️ 待技術確認</span>':''}<div>${n.text}</div><div class="xs muted">決策者：${n.who}</div></div>`).join('')+
   (window.NOTES_EXTRA||'');
  document.body.append(btn,pan);
  const set=on=>{btn.classList.toggle('on',on);pan.classList.toggle('on',on);document.body.classList.toggle('show-notes',on)};
  btn.onclick=()=>set(!pan.classList.contains('on'));
  if(q.get('notes')==='1')set(true);
}


/* ---------- 誰處理（PG／PM／問客戶） ---------- */
window.WHOS=d=>{const m={'技術':'PG','PG':'PG','PM':'PM','PL':'PL','客戶':'問客戶','主管':'問主管'};return String(d||'PM').split(/[／\/、]/).map(x=>m[x.trim()]||x.trim()).filter((x,i,a)=>a.indexOf(x)===i)};
window.WHO=d=>WHOS(d).map(x=>'<span class="chip '+(x==='PG'?'mint':x==='PM'||x==='PL'?'brand':'sun')+' xs">'+(/^(PG|PM|PL)$/.test(x)?x+' 處理':x)+'</span>').join(' ');
/* ---------- 每一步要做什麼（新專案起步引導） ---------- */
window.NEXTSTEPS=p=>{if(window.__v3&&window.V3STEPS)return window.V3STEPS(p);const un=p.contract.filter(c=>!c[5]).length,hasC=p.contract.length>0,dev=p.items;
 return [
  {t:'上傳合約',d:'把合約或需求書交給 AI，會自動拆出工作項目並分類',done:hasC,href:PAGES.manage+'#contract',cta:'上傳合約'},
  {t:'核對工項與分類',d:'AI 拆得不準的地方改一下；信心偏低的會標出來',done:hasC&&un===0,href:PAGES.manage+'#contract',cta:'去核對'},
  {t:'加入成員、指定負責 PM',d:'公司 AD 帳號加入，每個工項都要有負責 PM',done:p.members.length>1,href:PAGES.manage+'#members',cta:'管理成員'},
  {t:'選要參考的公司素材庫',d:'規劃時 AI 會一併參考過往專案經驗與領域知識',done:DB.refOf(p).length>0,href:PAGES.manage+'#settings',cta:'去設定'},
  {t:'開始規劃第一個功能開發工項',d:'在工項裡跟 AI 對話，談構想、產生雛型',done:dev.some(i=>i.stage>=1),href:PAGES.work+'?i=0',cta:'開始規劃'},
  {t:'處理待定、產出圖文對照與規格',d:'待定標有誰要處理（PG／PM／問客戶）；確認後產出文件交付',done:dev.length>0&&dev.every(i=>i.stage>=4),href:PAGES.items,cta:'看工項清單'}];};
window.guideCard=p=>{const S=NEXTSTEPS(p),cur=S.findIndex(x=>!x.done);if(cur<0)return '';const c=S[cur];
 return '<div class="card guide"><div class="row spread" style="flex-wrap:wrap;gap:10px"><div><h2 style="margin:0">接下來要做什麼</h2><div class="sub" style="margin:2px 0 0">第 '+(cur+1)+' 步 / 共 '+S.length+' 步</div></div>'+(c.href==='#ai'?'<a class="btn primary" href="#" onclick="GAI.prefill(\'我想跟你討論這個專案的整體方向：\');return false">':'<a class="btn primary" href="'+c.href+'">')+c.cta+'</a></div><div class="gsteps">'+S.map((x,i)=>'<a class="gs '+(x.done?'done':i===cur?'now':'')+'" '+(x.href==='#ai'?'href="#" onclick="GAI.prefill(\'我想跟你討論這個專案的整體方向：\');return false"':'href="'+x.href+'"')+'><i>'+(x.done?'✓':i+1)+'</i><div><b>'+x.t+'</b><span>'+x.d+'</span></div></a>').join('')+'</div></div>'};
/* ---------- 專案記憶：跨工項的資訊由 AI 對應到工項 ---------- */
const PM_STOP=['管理','資料','功能','系統','專案','需求','整體','方向','下載','上傳','紀錄'];
window.PMEM={
 list(pid){try{return JSON.parse(localStorage.getItem('ss_pmem_'+pid))||[]}catch(e){return[]}},
 add(pid,arr){const l=PMEM.list(pid).concat(arr);try{localStorage.setItem('ss_pmem_'+pid,JSON.stringify(l))}catch(e){}},
 map(text,p){const T=String(text).toLowerCase(),hit=[];
  p.items.forEach(i=>{const nm=i.name.toLowerCase();let ok=new RegExp('(^|[^0-9.])'+i.no.replace(/\./g,'\\.')+'(?![0-9])').test(T);
   if(!ok&&(nm.match(/[a-z0-9]{2,}/g)||[]).some(w=>T.includes(w)))ok=true;
   if(!ok){const zh=nm.match(/[\u4e00-\u9fff]/g)||[];for(let k=0;k<zh.length-1;k++){const g=zh[k]+zh[k+1];if(!PM_STOP.includes(g)&&T.includes(g)){ok=true;break}}}
   if(ok)hit.push(i.no)});return hit},
 now(){const d=new Date(),z=n=>String(n).padStart(2,'0');return z(d.getMonth()+1)+'/'+z(d.getDate())+' '+z(d.getHours())+':'+z(d.getMinutes())}};
/* ---------- AI 幫手（全站同一個：浮動視窗或常駐面板） ---------- */
function gai(){const B=document.body.dataset;if(B.noai==='1')return;const P=DB.cur(),proj=(B.scope||'project')==='project',v3=!!window.__v3;
 const lk=(pg,q)=>{const h=DB.href(pg);return h+(q?(h.indexOf('?')>-1?'&':'?')+q:'')};
 const SK='ss_aih_'+(proj?P.id:'g'),PK='ss_aih';
 let pref={mode:'float',open:false,big:false};try{pref=Object.assign(pref,JSON.parse(localStorage.getItem(PK))||{})}catch(e){}
 const savePref=()=>{try{localStorage.setItem(PK,JSON.stringify(pref))}catch(e){}};
 const btn=document.createElement('button');btn.id='gaiBtn';btn.innerHTML='<span class="ai-badge">AI</span>'+(v3?'AI 幫手':'問 AI');
 const pan=document.createElement('div');pan.id='gaiPanel';let files=[];
 const sugg=proj?(v3?['現在最該先做什麼？','有哪些事要處理？誰處理？','幫我整理目前的整體方向','我想上傳會議紀錄']:['現在最該先做什麼？','有哪些事要處理？誰處理？','目前進度怎麼樣？']):['新專案要怎麼開始？','公司知識庫是做什麼的？'];
 pan.innerHTML='<div class="gh"><span class="ai-badge">AI</span><b>'+(v3?'AI 幫手':(proj?'專案 AI 助理':'AI 助理'))+(proj?' · '+P.name:'')+'</b><span class="grow"></span><button id="gaiMode" title="切換浮動視窗／常駐面板"></button><button id="gaiBig" title="放大／縮小">放大</button><button id="gaiX" title="收起">✕</button></div><div class="gm" id="gaiM"></div><div class="gsug" id="gaiS">'+sugg.map(x=>'<button>'+x+'</button>').join('')+'</div><div class="gfiles" id="gaiF"></div><div class="gi"><button class="btn ghost sm" id="gaiAtt" title="上傳素材：合約、會議紀錄、需求文件、雛型…（也可以直接拖進來）">'+ic('paperclip')+'</button><input type="file" id="gaiFile" multiple style="display:none"><textarea id="gaiT" rows="2" placeholder="問專案內容、談規劃方向、貼會議結論，或上傳素材（Enter 送出）"></textarea><button class="btn ai sm" id="gaiGo">送出</button></div>';
 document.body.append(btn,pan);
 const M=pan.querySelector('#gaiM'),hist=[];
 const put=(w,h)=>{const d=document.createElement('div');d.className='gmsg '+w;d.innerHTML=h;M.appendChild(d);M.scrollTop=M.scrollHeight};
 const say=(w,h)=>{put(w,h);hist.push([w,h]);if(hist.length>60)hist.shift();try{sessionStorage.setItem(SK,JSON.stringify(hist))}catch(e){}};
 const esc=t=>String(t).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
 const itemLink=no=>{const k=P.items.findIndex(i=>i.no===no),it=P.items[k];return it?'<a href="'+lk(PAGES.work,'i='+k+'&tab=mem')+'">'+it.no+' '+esc(it.name)+'</a>':no};
 const drawF=()=>{pan.querySelector('#gaiF').innerHTML=files.map((f,i)=>'<span class="chip brand xs">'+esc(f.name)+' <a data-x="'+i+'" style="cursor:pointer">✕</a></span>').join('')};
 const addFiles=l=>{[...l].forEach(f=>files.push(f));drawF()};
 const KW=/決議|決定|結論|同意|確認|不做|先不|改為|改成|需要|要做|待辦|應該|必須|請/,DEC=/決議|決定|結論|同意|確認|不做|先不|改為|改成/;
 const lines=t=>t.split(/\r?\n|。/).map(x=>x.replace(/^[\s\-\*\d\.、）)]+/,'').trim()).filter(x=>x.length>=6);
 const readText=f=>new Promise(r=>{if(!(/\.(txt|md|csv)$/i.test(f.name)||/^text\//.test(f.type)))return r(null);const fr=new FileReader();fr.onload=()=>r(String(fr.result));fr.onerror=()=>r(null);fr.readAsText(f)});
 const statusOf=nos=>nos.map(no=>{const i=P.items.find(x=>x.no===no);return i?'<li>'+itemLink(no)+'：'+DB.STG[i.stage]+(i.tbd.length?'，待確認 '+i.tbd.length+' 項':'')+'</li>':''}).join('');
 const cta=c=>c.href==='#ai'?'<a class="btn sm primary" style="margin-top:6px" href="#" onclick="GAI.prefill(\'我想跟你討論這個專案的整體方向：\');return false">'+c.cta+'</a>':'<a class="btn sm primary" style="margin-top:6px" href="'+c.href+'">'+c.cta+'</a>';
 const ans=q=>{if(!proj){return /開始|新專案|怎麼/.test(q)?'先在「專案列表」按<b>建立專案</b>，接著到專案裡完成基本設定、<b>上傳合約</b>，AI 會先簡單拆出工項；之後可以隨時跟我討論。':'公司知識庫放跨專案共用的知識與規範，專案會自動帶入；單位知識只有經手過的人看得到。'}
  const S=NEXTSTEPS(P),cur=S.find(x=>!x.done),its=P.items,hit=PMEM.map(q,P);
  if(hit.length&&/狀態|進度|怎麼樣|如何|現在|到哪/.test(q))return '相關工項目前狀況：<ul>'+statusOf(hit)+'</ul>';
  if(/待|處理|決定|誰/.test(q)){const L=[];its.forEach(i=>i.tbd.forEach(t=>L.push('<li><b>'+i.no+' '+i.name+'</b>：'+t[1]+' '+WHO(t[2])+'</li>')));return L.length?'目前有 <b>'+L.length+'</b> 件事要處理：<ul>'+L.join('')+'</ul>':'目前沒有待處理事項。'}
  if(/先做|下一步|該做|開始|怎麼做/.test(q)){return cur?'<b>下一步：'+cur.t+'</b><br>'+cur.d+'<br>'+cta(cur):'起步的步驟都完成了，可以到工項清單挑要推進的項目。'}
  if(/進度|狀態/.test(q)){const st=DB.stat(P);return '共 <b>'+st.all+'</b> 個工項，其中功能開發 <b>'+st.dev+'</b> 個、已產出規格 <b>'+st.spec+'</b> 個、待確認 <b>'+st.tbd+'</b> 項。'+(its.length?'<ul>'+its.map(i=>'<li>'+itemLink(i.no)+'：'+DB.STG[i.stage]+'</li>').join('')+'</ul>':'')}
  if(/合約|工項/.test(q)){return P.contract.length?'合約共拆出 <b>'+P.contract.length+'</b> 個工項。<a href="'+lk(window.__v3?PAGES.contract2:PAGES.manage,'')+(window.__v3?'':'#contract')+'">到合約頁</a>':'素材裡還沒有合約，請先到「素材」上傳，再到「工項 › 合約」選它來拆工項。<a href="'+lk(window.__v3?PAGES.contract2:PAGES.manage,'')+(window.__v3?'':'#contract')+'">到工項 › 合約</a>'}
  if(/整理|整體方向/.test(q)){const L=PMEM.list(P.id).slice(-5);return L.length?'目前記下的重點：<ul>'+L.map(e=>'<li>'+esc(e.text)+'</li>').join('')+'</ul>':'目前還沒有記下方向。直接告訴我你的想法，我會整理並歸到對應的工項。'}
  if(/會議|紀錄|決議|上傳/.test(q))return '把會議紀錄、需求文件或雛型直接拖進來，或按迴紋針上傳。我會自己分類（合約、會議、畫面…），並歸到對應的工項；合約上傳後，到「工項 › 合約」選它來拆工項。';
  return '我可以：回答專案內容（進度、待處理、下一步）、跟你談規劃方向、讀你上傳的素材。談到的內容我會自己歸到對應的工項。'};
 const record=(ents)=>{PMEM.add(P.id,ents);const by={};ents.forEach(e=>(e.items.length?e.items:['專案層級']).forEach(n=>by[n]=(by[n]||0)+1));
  return '已整理 <b>'+ents.length+'</b> 條，並歸到：<ul>'+Object.keys(by).map(n=>'<li>'+(n==='專案層級'?'<b>專案層級</b>（沒對到特定工項，每個工項都會看到）':itemLink(n))+'：'+by[n]+' 條</li>').join('')+'</ul><div class="xs muted" style="margin-top:6px">逐條內容在各工項「工項說明」下方的「來自專案對話／檔案」。歸錯了，直接告訴我「這條改放到 X」。</div>'};
 const isProtoFile=(f,q)=>/雛型|prototype|mockup/i.test(f.name+' '+(q||''))||/\.html?$/i.test(f.name);
 const send=async q=>{q=(q||'').trim();const fs_=files.slice();if(!q&&!fs_.length)return;files=[];drawF();
  say('me',(q?esc(q):'')+(fs_.length?'<div class="xs" style="opacity:.85;margin-top:4px">'+fs_.map(f=>'📎 '+esc(f.name)).join('<br>')+'</div>':''));pan.querySelector('#gaiS').style.display='none';
  if(window.GAI&&GAI.ctx&&GAI.ctx.onSend&&q&&!fs_.length){let h=false;try{h=GAI.ctx.onSend(q)}catch(e){}if(h)return}
  const ents=[];let note='';const got=[],protos=[];let contractFound=false;
  for(const f of fs_){
   if(v3&&proj&&isProtoFile(f,q)){const hit=PMEM.map(f.name+' '+q,P);protos.push([f.name,hit]);hit.forEach(no=>{const it=P.items.find(x=>x.no===no);if(it&&window.V3)V3.addProto(P,it,f.name)});continue}
   if(v3&&proj&&window.V3&&V3.matClassify){const c=V3.matClassify(f.name);V3.addMaterial(P,{name:f.name,ext:c.ext,cat:c.cat,conf:c.conf,sens:c.sens,meta:'剛剛上傳・AI 幫手'});got.push([f.name,c]);if(c.cat==='合約與需求書')contractFound=true}
   const tx=await readText(f);if(tx){const L=lines(tx).filter(x=>KW.test(x));(L.length?L:lines(tx).slice(0,6)).forEach(x=>ents.push({at:PMEM.now(),src:f.name,kind:DEC.test(x)?'決議':'方向',text:x,items:PMEM.map(x,P)}))}
   else if(!v3){note+='<div class="xs muted">「'+esc(f.name)+'」不是文字檔，示意版無法解析內容，這裡只依檔名對應；實際版會由 AI 讀取內容。</div>';ents.push({at:PMEM.now(),src:f.name,kind:'資料',text:'收到檔案「'+f.name+'」',items:PMEM.map(f.name,P)})}}
  const isQ=q&&(/[?？]$/.test(q)||/嗎|怎麼|如何|哪些|誰|幾個|多少|什麼|現在|進度|狀態|下一步|整理/.test(q))&&q.length<40;
  if(q&&!isQ&&proj&&!fs_.length){lines(q).concat(lines(q).length?[]:[q]).forEach(x=>ents.push({at:PMEM.now(),src:'與 AI 對話',kind:DEC.test(x)?'決議':'方向',text:x,items:PMEM.map(x,P)}))}
  setTimeout(()=>{let out='';
   if(got.length)out+='已收進素材並自動分類：<ul>'+got.map(g=>'<li>'+esc(g[0])+' → <b>'+g[1].cat+'</b>（信心 '+g[1].conf+'%）</li>').join('')+'</ul><div class="xs muted">要看原檔與擷取重點，到「素材」頁。知識由我自行判斷要不要提取，不用手動操作。</div>';
   if(contractFound)out+='<div style="margin-top:6px">偵測到<b>合約</b>：到<a href="'+lk(PAGES.contract2||PAGES.manage,'')+'">「工項 › 合約」</a>選它來拆工項或更新工項。</div>';
   if(protos.length)out+=protos.map(p=>p[1].length?'<div style="margin-top:6px">已把雛型「'+esc(p[0])+'」歸到：'+p[1].map(itemLink).join('、')+'，該工項會出現「雛型」分頁。</div>':'<div style="margin-top:6px">收到雛型「'+esc(p[0])+'」，但我不確定要歸到哪個工項，請告訴我（例如「這是 2.6 的雛型」）。</div>').join('');
   if(protos.length&&window.onGAIChange)onGAIChange();
   if(ents.length&&proj)out+=(out?'<div style="margin-top:8px"></div>':'')+record(ents);
   if(out)say('ai',out+note);else if(q)say('ai',ans(q)+note);else say('ai','請告訴我要怎麼處理這些檔案，或直接把內容的重點貼給我。')},550)};
 const greet=v3?'嗨，我是 AI 幫手。你可以直接跟我談整體方向、問專案內容、上傳素材（會議紀錄、需求文件、雛型）——我會自己分類，並歸到對應的工項。':(proj?'嗨，我是這個專案的 AI 助理。可以問專案資訊、直接跟我談規劃方向，也可以丟會議紀錄給我。':'嗨，有問題都可以問我。');
 let old=[];try{old=JSON.parse(sessionStorage.getItem(SK))||[]}catch(e){}
 if(old.length){old.forEach(m=>{put(m[0],m[1]);hist.push(m)});pan.querySelector('#gaiS').style.display='none'}else say('ai',greet);
 const modeBtn=pan.querySelector('#gaiMode'),bigBtn=pan.querySelector('#gaiBig');
 const apply=()=>{const on=!!pref.open,dock=pref.mode==='dock'&&window.innerWidth>900;pan.classList.toggle('on',on);pan.classList.toggle('dock',dock);pan.classList.toggle('big',!dock&&!!pref.big);btn.style.display=on?'none':'';document.body.classList.toggle('ai-dock',on&&dock);modeBtn.textContent=pref.mode==='dock'?'改浮動':'改常駐';bigBtn.style.display=dock?'none':'';bigBtn.textContent=pref.big?'縮小':'放大'};
 const open=(on,big)=>{pref.open=on;if(big!==undefined)pref.big=!!big;savePref();apply()};
 btn.onclick=()=>open(true);pan.querySelector('#gaiX').onclick=()=>open(false);bigBtn.onclick=()=>open(true,!pref.big);modeBtn.onclick=()=>{pref.mode=pref.mode==='dock'?'float':'dock';pref.open=true;savePref();apply()};
 window.addEventListener('resize',apply);
 pan.querySelector('#gaiS').onclick=e=>{if(e.target.tagName==='BUTTON')send(e.target.textContent)};
 pan.querySelector('#gaiGo').onclick=()=>{const t=pan.querySelector('#gaiT');const v=t.value;t.value='';send(v)};
 pan.querySelector('#gaiT').addEventListener('keydown',e=>{if(e.key==='Enter'&&!e.shiftKey&&!e.isComposing){e.preventDefault();pan.querySelector('#gaiGo').click()}});
 pan.querySelector('#gaiAtt').onclick=()=>pan.querySelector('#gaiFile').click();pan.querySelector('#gaiFile').onchange=e=>{addFiles(e.target.files);e.target.value=''};
 pan.querySelector('#gaiF').onclick=e=>{const x=e.target.dataset&&e.target.dataset.x;if(x!==undefined&&x!==''){files.splice(+x,1);drawF()}};
 M.addEventListener('click',e=>{if(window.GAI&&GAI.ctx&&GAI.ctx.onClick)GAI.ctx.onClick(e)});
 ['dragenter','dragover'].forEach(n=>pan.addEventListener(n,e=>{e.preventDefault();pan.classList.add('drop')}));['dragleave','drop'].forEach(n=>pan.addEventListener(n,e=>{e.preventDefault();pan.classList.remove('drop')}));pan.addEventListener('drop',e=>{if(e.dataTransfer&&e.dataTransfer.files.length)addFiles(e.dataTransfer.files)});
 apply();
 window.GAI={ctx:null,open:(q,big)=>{open(true,big);if(q)send(q)},send:q=>{open(true);return send(q)},say:(w,h)=>say(w,h),prefill:t=>{open(true);const ta=pan.querySelector('#gaiT');ta.value=t;ta.focus()}};}
document.addEventListener('DOMContentLoaded',()=>{shell();tabs();modals();layers();gai();if(window.pageInit)window.pageInit();if(window.fixLinks)window.fixLinks()});

/* ---------------- 地圖引擎（純 SVG，可拖曳、滾輪縮放、圖層開關） ---------------- */
const TW=[[121.54,25.30],[121.93,25.00],[121.85,24.60],[121.75,24.35],[121.60,23.95],[121.45,23.50],[121.35,23.10],[121.20,22.80],[120.90,22.35],[120.86,21.92],[120.70,22.05],[120.60,22.45],[120.30,22.60],[120.15,23.00],[120.10,23.40],[120.20,23.75],[120.40,24.00],[120.55,24.35],[120.75,24.70],[121.00,24.95],[121.15,25.05],[121.40,25.15]];
const X=lon=>(lon-119.9)*220, Y=lat=>(25.5-lat)*240;
function pip(x,y,poly){let c=false;for(let i=0,j=poly.length-1;i<poly.length;j=i++){const[xi,yi]=poly[i],[xj,yj]=poly[j];if(((yi>y)!==(yj>y))&&(x<(xj-xi)*(y-yi)/(yj-yi)+xi))c=!c}return c}
function rng(s){return()=>{s=(s*16807)%2147483647;return(s-1)/2147483646}}
window.SyncMap=function(el,opt){
  opt=opt||{};
  const W=el.clientWidth||800,H=el.clientHeight||600;
  const ns='http://www.w3.org/2000/svg';
  el.classList.add('map');
  el.innerHTML='<svg><g class="w"></g></svg><div class="zoom"><button data-z="1">+</button><button data-z="-1">−</button></div><div class="scale"><span class="sc">20 km</span><i style="width:60px"></i></div><div class="coord">120.62, 23.80</div>';
  const svg=$('svg',el),g=$('.w',el);
  const mk=(t,a,p)=>{const n=document.createElementNS(ns,t);for(const k in a)n.setAttribute(k,a[k]);(p||g).appendChild(n);return n};
  /* 底圖 */
  mk('rect',{x:-2000,y:-2000,width:5000,height:5000,fill:'#CFE3F0'});
  for(let lon=119;lon<=123;lon+=.5)mk('line',{x1:X(lon),y1:-500,x2:X(lon),y2:2000,stroke:'#B9D2E4','stroke-width':1,'vector-effect':'non-scaling-stroke'});
  for(let lat=21;lat<=26;lat+=.5)mk('line',{x1:-500,y1:Y(lat),x2:2000,y2:Y(lat),stroke:'#B9D2E4','stroke-width':1,'vector-effect':'non-scaling-stroke'});
  const pts=TW.map(([a,b])=>X(a)+','+Y(b)).join(' ');
  mk('polygon',{points:pts,fill:'#F1EBDD',stroke:'#C9BFA4','stroke-width':1.5,'vector-effect':'non-scaling-stroke','stroke-linejoin':'round'});
  /* 山區示意 */
  mk('polygon',{points:[[121.0,24.9],[121.4,24.3],[121.35,23.4],[121.1,22.7],[120.9,22.5],[120.85,23.2],[120.9,24.0],[120.9,24.6]].map(([a,b])=>X(a)+','+Y(b)).join(' '),fill:'#E3E0C9',opacity:.8});
  /* 圖層 */
  const L={};['poly','pts','grid','kml'].forEach(k=>{L[k]=mk('g',{id:'ly-'+k})});
  const r=rng(42),land=TW.map(p=>[p[0],p[1]]);
  const P=[];while(P.length<46){const lon=120.0+r()*.75,lat=22.45+r()*1.9;if(pip(lon,lat,land)&&lon<120.85)P.push([lon,lat])}
  P.forEach(([a,b])=>mk('circle',{cx:X(a),cy:Y(b),r:3,fill:'#FF6F4D',stroke:'#fff','stroke-width':1,class:'pt','vector-effect':'non-scaling-stroke'},L.pts));
  const Q=[];while(Q.length<14){const lon=120.05+r()*.45,lat=22.55+r()*1.6;if(pip(lon,lat,land))Q.push([lon,lat])}
  Q.forEach(([a,b])=>{const w=(.03+r()*.04),h=(.02+r()*.03);mk('rect',{x:X(a),y:Y(b),width:w*220,height:h*240,fill:'#0FBF95',opacity:.85,stroke:'#067A5D','stroke-width':1,'vector-effect':'non-scaling-stroke'},L.poly)});
  const line=[[120.2,23.9],[120.35,23.65],[120.5,23.5],[120.62,23.2],[120.55,22.9],[120.42,22.65]];
  mk('polyline',{points:line.map(([a,b])=>X(a)+','+Y(b)).join(' '),fill:'none',stroke:'#2D5BFF','stroke-width':2.2,'vector-effect':'non-scaling-stroke','stroke-dasharray':'6 3'},L.grid);
  [[120.35,23.65],[120.62,23.2],[120.42,22.65],[120.2,23.9]].forEach(([a,b])=>mk('rect',{x:X(a)-4,y:Y(b)-4,width:8,height:8,fill:'#2D5BFF',stroke:'#fff','stroke-width':1,'vector-effect':'non-scaling-stroke'},L.grid));
  const kmlPoly=[[120.30,23.92],[120.52,23.96],[120.58,23.74],[120.36,23.66]];
  mk('polygon',{points:kmlPoly.map(([a,b])=>X(a)+','+Y(b)).join(' '),fill:'rgba(45,91,255,.22)',stroke:'#2D5BFF','stroke-width':2.5,'vector-effect':'non-scaling-stroke','stroke-dasharray':'7 4'},L.kml);
  /* 縣市示意標籤 */
  const labels=[['台北',121.5,25.05],['台中',120.7,24.15],['台南',120.25,23.0],['高雄',120.4,22.62],['花蓮',121.55,23.95],['台東',121.15,22.8]];
  const T=labels.map(([t,a,b])=>mk('text',{x:X(a),y:Y(b),fill:'#7D7561','font-size':12,'text-anchor':'middle','font-family':'sans-serif'}));
  T.forEach((n,i)=>n.textContent=labels[i][0]);
  L.kml.style.display='none';L.grid.style.display='none';
  const st={s:1,tx:0,ty:0};const fitBox=(x0,y0,x1,y1,pad)=>{pad=pad||40;const s=Math.min((W-pad*2)/(x1-x0),(H-pad*2)/(y1-y0));st.s=s;st.tx=(W-(x1-x0)*s)/2-x0*s;st.ty=(H-(y1-y0)*s)/2-y0*s;apply()};
  function apply(){g.setAttribute('transform','translate('+st.tx+','+st.ty+') scale('+st.s+')');
    $$('.pt',g).forEach(c=>c.setAttribute('r',Math.max(2.5,Math.min(7,3*Math.sqrt(st.s/2.4)))));
    T.forEach(t=>t.setAttribute('font-size',12/st.s*Math.min(st.s,3)*1.0+0));
    const kmPerPx=(1/ (220*st.s))*100; const sc=$('.sc',el);const target=60*kmPerPx;const nice=[1,2,5,10,20,50,100,200].reduce((a,b)=>Math.abs(b-target)<Math.abs(a-target)?b:a);sc.textContent=nice+' km';$('.scale i',el).style.width=(nice/kmPerPx)+'px'}
  const zoomAt=(f,cx,cy)=>{const ns_=Math.max(.9,Math.min(60,st.s*f));f=ns_/st.s;st.tx=cx-(cx-st.tx)*f;st.ty=cy-(cy-st.ty)*f;st.s=ns_;apply()};
  let drag=null;
  el.addEventListener('pointerdown',e=>{if(e.target.closest('.zoom'))return;drag={x:e.clientX,y:e.clientY,tx:st.tx,ty:st.ty};el.setPointerCapture(e.pointerId)});
  const K=()=>{const w=el.getBoundingClientRect().width;return (w/(el.clientWidth||1))||1};el.addEventListener('pointermove',e=>{const b=el.getBoundingClientRect(),k=K();const lon=119.9+(((e.clientX-b.left)/k-st.tx)/st.s)/220,lat=25.5-(((e.clientY-b.top)/k-st.ty)/st.s)/240;$('.coord',el).textContent=lon.toFixed(2)+', '+lat.toFixed(2);if(!drag)return;st.tx=drag.tx+(e.clientX-drag.x)/k;st.ty=drag.ty+(e.clientY-drag.y)/k;apply()});
  el.addEventListener('pointerup',()=>drag=null);
  el.addEventListener('wheel',e=>{e.preventDefault();const b=el.getBoundingClientRect(),k=K();zoomAt(e.deltaY<0?1.25:.8,(e.clientX-b.left)/k,(e.clientY-b.top)/k)},{passive:false});
  $$('.zoom button',el).forEach(b=>b.onclick=()=>zoomAt(b.dataset.z==='1'?1.5:.67,W/2,H/2));
  const api={
    layer(k,on){L[k].style.display=on?'':'none'},
    fitAll(){fitBox(X(120.0),Y(25.4),X(122.0),Y(21.85),30)},
    fitKml(){const xs=kmlPoly.map(p=>X(p[0])),ys=kmlPoly.map(p=>Y(p[1]));fitBox(Math.min(...xs),Math.min(...ys),Math.max(...xs),Math.max(...ys),Math.min(W,H)*.22)},
    zoom:zoomAt,reset(){api.fitAll()}
  };
  api.fitAll();return api;
};
})();
