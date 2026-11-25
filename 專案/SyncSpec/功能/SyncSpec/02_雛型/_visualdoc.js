/* 圖文對照需求說明：左圖右規格；畫面是嵌入的活雛型（可操作）；圖號點選只看該項；大綱；下載同一份文件 */
(function(){
const $=(s,r)=>(r||document).querySelector(s),$$=(s,r)=>[...(r||document).querySelectorAll(s)];
const KML={
 sub:'台灣韋能能源「土地評估圖台系統」｜合約項次 2.6｜對應雛型 v1（編輯中）',
 bg:'在既有「空間分析」加上「上傳 KML 範圍查詢」，並可把查詢範圍下載成 KML。所有登入者皆可使用，不做權限判斷，主要使用者是開發評估人員。',
 fs:[['F-01','查詢方式','單點、範圍（繪製）、範圍（上傳 KML）三選一','1.1'],['F-02','上傳 KML／KMZ','單檔單面、可拖曳上傳、規則提示','1.2'],['F-03','範圍顯示','上傳後地圖自動縮放到範圍；按「查詢」才分析','1.3'],['F-04','結果與匯出','分析清單、報告、範圍 KML 複選匯出','1.4']],
 secs:[
  {id:'s1',num:'1.1',title:'入口與查詢方式',fid:'F-01',screen:'kml',state:'init',hots:[[2.6,20.8,1],[19,28.8,2]],rows:[[1,'左側「空間分析」入口','沿用既有系統的深藍側欄＋白色面板模式，不新增入口。'],[2,'查詢方式下拉','單點查詢、範圍查詢（繪製）、範圍查詢（上傳KML）；選上傳後才出現上傳區。']]},
  {id:'s2',num:'1.2',title:'上傳區與規則',fid:'F-02',screen:'kml',state:'init',hots:[[11,45.6,3],[27,51.5,4],[19,63,5]],rows:[[3,'上傳區','虛線框；除按鈕外也支援拖曳檔案，一次一檔。'],[4,'規則文字','支援 .kml、.kmz；範圍須為多邊形，不支援點、線；一個檔案只能有一個面（多面不支援）。'],[5,'查詢按鈕','未上傳時反灰；上傳後才可按。'],['—','待定','檔案大小與頂點數上限 <span class="vb q">Q-09 待定</span>']]},
  {id:'s3',num:'1.3',title:'上傳後的範圍顯示',fid:'F-03',screen:'kml',state:'up',hots:[[19,36,6],[63,54,7],[97,14.4,8]],rows:[[6,'已選檔案列','顯示檔名與面數，可移除並重新選擇。'],[7,'範圍多邊形','上傳後地圖自動縮放到範圍；按「查詢」才開始分析。'],[8,'地圖控制','可拖曳、滾輪或按鈕縮放（雛型地圖為真實可操作）。']]},
  {id:'s4',num:'1.4',title:'查詢結果與匯出',fid:'F-04',screen:'kml',state:'res',hots:[[19,52,9],[19,69,10]],rows:[[9,'結果分類計數','依群組列出命中數／總數，可展開子項。'],[10,'匯出資料','複選：分析清單（Excel）、分析報告（PDF）、查詢範圍（KML）；勾 2 項以上打包 zip，只勾 1 項直接下載；勾 PDF 記入資料下載紀錄。']]}]};

function build(p,it){
  if(p.id==='wn'&&it.no==='2.6')return {title:it.name+' 需求說明（圖文對照版）',...KML};
  const q=(p.contract.find(c=>c[0]===it.no)||[])[6]||'';
  const secs=it.screens.map((s,i)=>({id:'s'+(i+1),num:'1.'+(i+1),title:(PROTO.screens[s]||{}).title||s,fid:'F-0'+(i+1),screen:s,state:'init',hots:[],rows:[['—','畫面說明','與 AI 對話補充後，AI 會依雛型整理欄位與規則並標上圖號。']]}));
  return {title:it.name+' 需求說明（圖文對照版）',sub:p.client+'｜'+p.name+'｜工項 '+it.no,bg:q||'尚未整理，請在右側與 AI 對話。',fs:secs.map(s=>[s.fid,s.title,'見圖文對照',s.num]),secs};
}
const API={};
API.loadFrame=function(host,path,title){const f=document.createElement('iframe');f.className='vframe';f.title=title;host.innerHTML='';host.appendChild(f);
 fetch(path).then(r=>{if(!r.ok)throw 0;return r.text()}).then(t=>{const dir=path.replace(/[^/]*$/,'');f.srcdoc=t.replace(/<head>/i,'<head><base href="'+dir+'">')}).catch(()=>{f.src=path})};
API.render=function(el,p,it){
  /* 已有完整圖文對照文件（如競合分析 v4）：直接嵌入同一份文件 */
  if(it.docFile){API.loadFrame(el,it.docFile,it.name+' 圖文對照需求說明');el.classList.add('vfull-host');return}
  el.classList.remove('vfull-host');
  const d=build(p,it);
  el.innerHTML=`<div class="vdoc" data-t="${p.theme}"><header class="vtop"><h1>${d.title}</h1><p>${d.sub}</p><p class="vs">每節左側是嵌入的雛型畫面（可直接操作），右側為規格；點畫面上的圖號可只看該項說明，再點一次回到完整說明。</p>
   <div class="vtl"><a class="vbtn" data-act="outline">☰ 大綱</a></div></header>
   <aside class="vside" hidden><div class="gt">快速跳到</div>${d.secs.map(s=>`<a data-go="${s.id}">${s.num} ${s.title}</a>`).join('')}</aside>
   ${d.fs.length?'':'<div class="vcard">尚無雛型畫面。與 AI 對話後，系統會自動產生畫面並整理在這裡。</div>'}
   <h2>1　畫面逐一對照</h2>
   ${d.secs.map(s=>`<section class="vsec" id="${s.id}" data-sel=""><div class="vsh"><span class="vnum">${s.num}</span><h3>${s.title}</h3><span class="vfid">${s.fid}</span></div>
    <div class="vbar"><button class="vreset" data-s="${s.id}">↺ 重設畫面</button><span class="vhint">畫面可直接操作；點圖上編號只看該項說明，再點一次顯示全部</span><button class="vall">顯示全部</button></div>
    <div class="vcols"><div class="vfigs"><div class="vfig"><div class="vfin" data-screen="${s.screen}" data-state="${s.state}"></div>${s.hots.map(h=>`<button class="vhs" data-n="${h[2]}" style="left:${h[0]}%;top:${h[1]}%">${h[2]}</button>`).join('')}</div></div>
    <div class="vspec"><table>${s.rows.map(r=>`<tr data-n="${r[0]}"><td class="n">${typeof r[0]==='number'?`<button class="vrn" data-n="${r[0]}">${r[0]}</button>`:r[0]}</td><th>${r[1]}</th><td>${r[2]}</td></tr>`).join('')}</table></div></div></section>`).join('')}
   <footer class="vf">由 SyncSpec 依雛型整理；欄位型別與驗證規則見「規格文件」。</footer></div>`;
  $$('.vfin',el).forEach(f=>PROTO.render(f.dataset.screen,f,{state:f.dataset.state}));
  API.fit(el);
  el.addEventListener('click',e=>{
    const hs=e.target.closest('.vhs,.vrn');
    if(hs){const sec=hs.closest('.vsec'),n=hs.dataset.n,on=sec.dataset.sel===n;sec.dataset.sel=on?'':n;
      $$('.vhs',sec).forEach(b=>b.classList.toggle('on',!on&&b.dataset.n===n));
      $$('.vspec tr',sec).forEach(r=>r.classList.toggle('dim',!on&&r.dataset.n!==n&&r.dataset.n!=='—'));return}
    if(e.target.classList.contains('vall')){const sec=e.target.closest('.vsec');sec.dataset.sel='';$$('.vhs',sec).forEach(b=>b.classList.remove('on'));$$('.vspec tr',sec).forEach(r=>r.classList.remove('dim'))}
    if(e.target.classList.contains('vreset')){const f=e.target.closest('.vsec').querySelector('.vfin');PROTO.render(f.dataset.screen,f,{state:f.dataset.state});toast('已重設這個畫面')}
    const a=e.target.closest('[data-act]');
    if(a&&a.dataset.act==='outline')$('.vside',el).hidden=!$('.vside',el).hidden;
    const g=e.target.closest('[data-go]');if(g){const t=$('#'+g.dataset.go,el);if(t)t.scrollIntoView({behavior:'smooth',block:'start'});$('.vside',el).hidden=true}
  });
};
API.fit=function(el){$$('.vfig',el).forEach(f=>{const w=f.clientWidth;if(!w)return;const s=w/1100;f.style.height=(640*s)+'px';const i=$('.vfin',f);i.style.transform='scale('+s+')'})};
API.standalone=function(el,name){
  let css='';try{for(const sh of document.styleSheets){for(const r of sh.cssRules)css+=r.cssText+'\n'}}catch(e){css=null}
  const clone=el.cloneNode(true);$$('.vside,[data-act="outline"],.vreset',clone).forEach(x=>x.remove());$$('.vall',clone).forEach(x=>x.remove());
  const html='<!doctype html><html lang="zh-TW"><head><meta charset="utf-8"><title>'+name+'</title>'+(css?'<style>'+css+'</style>':'<link rel="stylesheet" href="_shared.css">')+'<style>body{padding:24px}</style></head><body>'+clone.innerHTML+'</body></html>';
  const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([html],{type:'text/html'}));a.download=name+'.html';document.body.appendChild(a);a.click();a.remove();return !!css;
};
API.downloadFile=function(path,name){const a=document.createElement('a');a.href=path;a.download=name+'.html';document.body.appendChild(a);a.click();a.remove()};
/* ---------- 規格文件與驗收條件文件（系統內直接呈現；驗收不提供下載） ---------- */
const SPEC26={bg:'在既有「空間分析」加上「上傳 KML 範圍查詢」，並可把查詢範圍下載成 KML。',us:['身為開發評估人員，我想上傳 KML 範圍來查詢，以便不必手動繪製。','身為開發評估人員，我想把分析結果與查詢範圍匯出，以便放進報告。'],
 fields:[['查詢方式','mode','下拉','是','單點查詢／範圍查詢（繪製）／範圍查詢（上傳KML），預設單點查詢'],['上傳檔案','file','檔案','是（上傳模式）','僅 .kml、.kmz；範圍須為多邊形；一個檔案只能有一個面；支援拖曳，一次一檔'],['查詢','—','按鈕','—','未上傳時反灰；按下才開始分析'],['匯出資料','export[]','複選','—','分析清單（Excel）、分析報告（PDF）、查詢範圍（KML）；2 項以上打包 zip']],
 rules:['所有登入者皆可使用，不做權限判斷。','上傳後地圖自動縮放到範圍；按「查詢」才分析。','只勾 1 項匯出直接下載原檔，勾 2 項以上打包 zip（空間分析匯出_YYYYMMDDHHMM.zip）。','勾選分析報告（PDF）時，記入「資料下載紀錄」。'],
 errs:[['多個面','一個檔案只能有一個面'],['點或線','範圍須為多邊形，不支援點、線'],['副檔名不符','僅支援 .kml、.kmz 格式']],
 ac:[['AC-01','主流程','選擇「範圍查詢（上傳KML）」後，出現上傳區與規則文字'],['AC-02','主流程','上傳單一多邊形 .kml 後顯示檔名與「1 個面」，地圖自動縮放到範圍，查詢鈕可按'],['AC-03','主流程','按「查詢」後才顯示各分類命中數／總數'],['AC-04','主流程','匯出可複選三種內容；2 項以上打包 zip，只勾 1 項直接下載'],['AC-05','例外','上傳含多個面的檔案時顯示「一個檔案只能有一個面」且不載入'],['AC-06','例外','上傳點或線時顯示不支援，僅限多邊形'],['AC-07','驗證','只接受 .kml／.kmz，其他副檔名拒絕'],['AC-08','驗證','未上傳檔案時查詢鈕反灰不可按'],['AC-09','權限','所有登入者皆可使用，不需額外權限'],['AC-10','主流程','匯出勾選 PDF 時，資料下載紀錄新增一筆'],['AC-11','非功能','檔案大小與頂點數上限：待定（Q-09），暫不驗收']]};
function specOf(p,it){if(p.id==='wn'&&it.no==='2.6')return SPEC26;
 const q=(p.contract.find(c=>c[0]===it.no)||[])[6]||'';
 return {bg:q||'尚未整理',us:['（與 AI 對話後，AI 會依已確認的需求整理 User Story）'],fields:[['（依雛型整理）','—','—','—','與 AI 對話補充後產生欄位表']],rules:['（待整理）'],errs:[['（待整理）','（待整理）']],ac:it.screens.map((s,i)=>['AC-0'+(i+1),'主流程','「'+((PROTO.screens[s]||{}).title||s)+'」依雛型操作結果一致']).concat([['AC-0'+(it.screens.length+1),'權限','依規格權限矩陣驗證（待整理）']])}}
API.spec=function(el,p,it){
 if(it.specFile){API.loadFrame(el,it.specFile,it.name+' 需求規格文件');el.classList.add('vfull-host');return}
 el.classList.remove('vfull-host');const S=specOf(p,it);
 el.innerHTML=`<div class="vdoc" data-t="${p.theme}"><header class="vtop"><h1>${it.name} 需求規格（草稿）</h1><p>${p.client}｜${p.name}｜工項 ${it.no}｜由雛型抽取，不另外手寫</p></header>
  <h2>一、功能概述</h2><div class="vcard"><p>${S.bg}</p><ul>${S.us.map(u=>'<li>'+u+'</li>').join('')}</ul></div>
  <h2>二、畫面清單</h2><div class="vcard"><table><tr><th>#</th><th>畫面</th></tr>${it.screens.map((s,i)=>`<tr><td>${i+1}</td><td>${(PROTO.screens[s]||{}).title||s}</td></tr>`).join('')||'<tr><td colspan=2>尚無畫面</td></tr>'}</table></div>
  <h2>三、欄位表</h2><div class="vcard"><table><tr><th>元素</th><th>欄位</th><th>型別</th><th>必填</th><th>規則</th></tr>${S.fields.map(r=>'<tr>'+r.map(c=>'<td>'+c+'</td>').join('')+'</tr>').join('')}</table></div>
  <h2>四、業務規則</h2><div class="vcard"><ul>${S.rules.map(r=>'<li>'+r+'</li>').join('')}</ul></div>
  <h2>五、例外與錯誤訊息</h2><div class="vcard"><table><tr><th>情境</th><th>訊息文案</th></tr>${S.errs.map(r=>`<tr><td>${r[0]}</td><td>${r[1]}</td></tr>`).join('')}</table></div>
  <h2>六、驗收條件</h2><div class="vcard">共 ${S.ac.length} 條，請至「驗收條件文件」頁勾選。</div>
  <h2>七、待定</h2><div class="vcard">${it.tbd.length?`<table><tr><th>編號</th><th>項目</th><th>決策者</th></tr>${it.tbd.map(t=>`<tr><td>${t[0]}</td><td>${t[1]}</td><td>${t[2]}</td></tr>`).join('')}</table>`:'目前沒有待定事項。'}</div></div>`};
API.ac=function(el,p,it){
 if(it.acFile){API.loadFrame(el,it.acFile,it.name+' 驗收條件文件');el.classList.add('vfull-host');return}
 el.classList.remove('vfull-host');const S=specOf(p,it),key='ss_ac_'+p.id+'_'+it.no;let st={};try{st=JSON.parse(localStorage.getItem(key))||{}}catch(e){}
 const cats=[...new Set(S.ac.map(a=>a[1]))];let flt='';
 function draw(){const n=S.ac.length,g=S.ac.filter(a=>st[a[0]+'g']).length,m=S.ac.filter(a=>st[a[0]+'m']).length;
  el.innerHTML=`<div class="vdoc" data-t="${p.theme}"><header class="vtop"><h1>${it.name} 驗收條件</h1><p>${p.client}｜${p.name}｜工項 ${it.no}｜來自規格第六章；PG 自測、PM 驗收各自勾選</p></header>
   <div class="vcard row" style="margin-top:14px;display:flex;gap:18px;align-items:center;flex-wrap:wrap"><b>PG 自測 ${g}/${n}</b><div class="bar" style="width:140px"><i style="width:${g/n*100}%"></i></div><b>PM 驗收 ${m}/${n}</b><div class="bar" style="width:140px"><i style="width:${m/n*100}%"></i></div><span style="flex:1"></span><button class="vreset" id="acClr">清除所有勾選</button></div>
   <div style="display:flex;gap:6px;margin:10px 0;flex-wrap:wrap"><button class="vreset ${flt===''?'on':''}" data-c="">全部</button>${cats.map(c=>`<button class="vreset" data-c="${c}">${c}</button>`).join('')}</div>
   <div class="vcard"><table><tr><th style="width:70px">編號</th><th style="width:80px">類別</th><th>驗收條件</th><th style="width:90px">PG 自測</th><th style="width:90px">PM 驗收</th></tr>${S.ac.filter(a=>!flt||a[1]===flt).map(a=>`<tr><td>${a[0]}</td><td>${a[1]}</td><td>${a[2]}</td><td><input type="checkbox" class="check" data-k="${a[0]}g" ${st[a[0]+'g']?'checked':''}></td><td><input type="checkbox" class="check" data-k="${a[0]}m" ${st[a[0]+'m']?'checked':''}></td></tr>`).join('')}</table></div></div>`;
  el.querySelectorAll('[data-k]').forEach(c=>c.onchange=()=>{st[c.dataset.k]=c.checked;try{localStorage.setItem(key,JSON.stringify(st))}catch(e){}draw()});
  el.querySelectorAll('[data-c]').forEach(b=>b.onclick=()=>{flt=b.dataset.c;draw()});
  el.querySelector('#acClr').onclick=()=>{st={};try{localStorage.removeItem(key)}catch(e){}draw()}}
 draw()};
window.VDOC=API;
})();
