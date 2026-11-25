/* 雛型畫面庫：工項工作區、完整雛型、圖文對照共用（同一畫面只有一份來源） */
(function(){
const $=(s,r)=>(r||document).querySelector(s),$$=(s,r)=>[...(r||document).querySelectorAll(s)];
const TH={wn:{logo:'VENA',sys:'土地評估圖台系統',user:'evieliu'},nh:{logo:'NCDR',sys:'健康豬管理系統',user:'evieliu'},nb:{logo:'新北',sys:'觀賞樹木管理系統',user:'allenyeh'}};
const RAIL={wn:[['layers','圖層套疊'],['target','空間分析'],['pin','定位工具'],['table','競合管理']],nh:[['home','首頁'],['pin','疫情地圖'],['table','報表'],['users','管理']],nb:[['home','首頁'],['list','樹木清單'],['edit','巡檢'],['clock','排程']]};
const S={
 kml:{title:'空間分析（上傳 KML）',theme:'wn',type:'kml',rail:1},
 layers:{title:'圖層套疊：光電能源案場',theme:'wn',type:'layers',rail:0},
 complist:{title:'競合分析管理（清單）',theme:'wn',type:'complist',rail:3},
 loginlog:{title:'後台｜登入紀錄',theme:'wn',type:'table',rail:-1,h:'登入紀錄',filters:['帳號','登入日期（起）','登入日期（迄）'],cols:['帳號','登入時間','IP','結果'],rows:[['evieliu','2026-11-16 09:02','10.20.3.15','成功'],['allenyeh','2026-11-16 08:47','10.20.3.22','成功'],['guest01','2026-11-15 17:31','203.74.12.8','失敗'],['ianpeng','2026-11-15 14:10','10.20.3.31','成功'],['evieliu','2026-11-14 09:00','10.20.3.15','成功']]},
 dllog:{title:'後台｜資料下載紀錄',theme:'wn',type:'table',rail:-1,h:'資料下載紀錄',filters:['帳號','下載日期（起）','下載日期（迄）'],cols:['帳號','下載時間','下載檔案（PDF）'],rows:[['evieliu','2026-11-16 10:15','空間分析報告_202611161015.pdf'],['allenyeh','2026-11-16 09:40','空間分析報告_202611160940.pdf'],['ianpeng','2026-11-15 15:22','空間分析報告_202611151522.pdf']]},
 nhform:{title:'豬場疫情通報填報',theme:'nh',type:'form',rail:0,h:'通報填報',fields:[['豬場名稱','text','例如：大安養豬場'],['縣市','select','彰化縣'],['通報日期','text','2026-11-16'],['疑似症狀','chips','發燒|食慾不振|咳嗽|皮膚紅疹'],['飼養頭數','text','1,200'],['附件','file','拖曳照片或檢驗報告（單檔 10MB 內）'],['備註','area','']],btn:'送出通報'},
 nhmap:{title:'疫情預警地圖',theme:'nh',type:'nhmap',rail:1},
 nhrep:{title:'統計報表',theme:'nh',type:'table',rail:2,h:'統計報表',filters:['期間（起）','期間（迄）','縣市'],cols:['縣市','通報件數','預警件數','處理中'],rows:[['彰化縣','18','4','2'],['雲林縣','25','6','3'],['屏東縣','31','9','5'],['台南市','12','1','0']],bars:1},
 nbtree:{title:'觀賞樹木清單',theme:'nb',type:'table',rail:1,h:'觀賞樹木清單',filters:['樹種','行政區','健康狀態'],cols:['樹木編號','樹種','行政區','樹高 (m)','健康狀態','最近巡檢'],rows:[['T-00127','榕樹','板橋區','12.5','良好','2026-10-30'],['T-00128','樟樹','板橋區','9.8','需觀察','2026-10-30'],['T-00341','茄苳','三重區','15.2','良好','2026-10-12'],['T-00402','黑板樹','新莊區','11.0','需處理','2026-09-28']]},
 nbdetail:{title:'樹木資料編輯',theme:'nb',type:'form',rail:1,h:'樹木資料',fields:[['樹木編號','text','T-00127'],['樹種','select','榕樹'],['胸徑 (cm)','text','86'],['樹高 (m)','text','12.5'],['健康狀態','chips','良好|需觀察|需處理'],['位置座標','text','25.0124, 121.4631'],['照片','file','拖曳照片（最多 5 張）']],btn:'儲存'},
 nbpatrol:{title:'巡檢紀錄登錄',theme:'nb',type:'form',rail:2,h:'巡檢登錄',fields:[['樹木編號','text','T-00128'],['巡檢日期','text','2026-11-16'],['巡檢結果','chips','正常|病蟲害|傾倒風險|需修剪'],['說明','area',''],['現場照片','file','拖曳或拍照上傳']],btn:'登錄巡檢'}
};
const EMB=[['cmp_layers','圖層套疊：光電能源案場',''],['cmp_list','競合分析管理：案場清單','?state=list'],['cmp_filter','篩選條件','?state=list&fopen=1'],['cmp_hot','地圖：熱區（小比例尺）','?state=list&z=8.4&lat=23.6&lng=120.95'],['cmp_dots','地圖：點位（大比例尺）','?state=list&z=12&lat=23.3&lng=120.2'],['cmp_popup','點位資訊視窗','?state=popup&z=12&lat=23.3&lng=120.2'],['cmp_edit','編輯案場','?state=edit'],['cmp_pick','新增案場：設定位置','?state=pick'],['cmp_idle','共編鎖定：閒置提醒','?state=idle'],['cmp_trace','編輯軌跡','?state=trace'],['cmp_export','匯出','?state=export'],['cmp_manage','管理中的圖層套疊','?state=managelayers&z=9.5&lat=23.3&lng=120.3']];
EMB.forEach(e=>{S[e[0]]={title:e[1],theme:'wn',type:'embed',q:e[2]}});
const GROUPS=[['基本圖資',3],['日照與風力條件',4],['光電特定區位',5],['公有及台糖土地',2],['電路基礎設施',3],['環境敏感地區一級',17]];
function top(t){const T=TH[t];return `<div class="pt-top"><span class="pt-logo">${T.logo}</span><b style="color:#1b2a52">${T.sys}</b><span class="sp"></span><span>${t==='wn'?'後台管理':'說明'}</span><span>${T.user}</span><span>登出</span></div>`}
function rail(t,a){return `<div class="pt-rail">${RAIL[t].map((r,i)=>`<div class="pt-ri ${i===a?'on':''}" data-a="${r[1]}入口">${ic(r[0])}${r[1]}</div>`).join('')}</div>`}
function cases(n){const N=['示範案場 A','示範案場 B','示範案場 C','示範案場 D','示範案場 E','示範案場 F'],C=['彰化縣','雲林縣','台南市','嘉義縣','高雄市','屏東縣'],St=['開發中','籌設中','容許/變更中','施工中','已併網'];return Array.from({length:n},(_,i)=>`<div class="pt-row" data-a="案場列"><div><b>${N[i%6]}</b><div class="xs" style="color:#6b7794">${C[i%6]}</div></div><span class="pt-chip">${St[i%5]}</span></div>`).join('')}
function tableMain(d){const f=d.filters.map(x=>`<div class="pt-fi"><label>${x}</label><input class="pt-in" data-a="篩選：${x}"></div>`).join('');
 const bars=d.bars?`<div class="pt-bars" data-a="統計圖表">${d.rows.map(r=>`<div class="pt-bar"><span>${r[0]}</span><i style="width:${+r[1]*2.4}px"></i><b>${r[1]}</b></div>`).join('')}</div>`:'';
 return `<div class="pt-main"><div class="pt-h" data-a="頁面標題">${d.h}</div><div class="pt-filters">${f}<button class="pt-btn" style="width:auto;margin:0 0 0 8px" data-a="查詢按鈕">查詢</button></div>${bars}
 <table class="pt-tbl"><thead><tr>${d.cols.map(c=>`<th>${c}</th>`).join('')}</tr></thead><tbody>${d.rows.map(r=>`<tr data-a="資料列">${r.map(c=>`<td>${c}</td>`).join('')}</tr>`).join('')}</tbody></table>
 <div class="pt-pg">共 ${d.rows.length} 筆　‹ 1 ›</div></div>`}
function formMain(d){return `<div class="pt-main"><div class="pt-h" data-a="頁面標題">${d.h}</div><div class="pt-form">${d.fields.map(f=>{let c='';if(f[1]==='select')c=`<select class="pt-sel" data-a="欄位：${f[0]}"><option>${f[2]}</option></select>`;else if(f[1]==='chips')c=`<div class="pt-chips" data-a="欄位：${f[0]}">${f[2].split('|').map((x,i)=>`<span class="pt-cp ${i===0?'on':''}">${x}</span>`).join('')}</div>`;else if(f[1]==='file')c=`<div class="pt-up" style="margin:0;padding:10px" data-a="欄位：${f[0]}">${f[2]}</div>`;else if(f[1]==='area')c=`<textarea class="pt-in" rows="3" data-a="欄位：${f[0]}"></textarea>`;else c=`<input class="pt-in" value="${f[2]}" data-a="欄位：${f[0]}">`;return `<div class="pt-fr"><label>${f[0]}</label>${c}</div>`}).join('')}</div><button class="pt-btn" style="width:160px" data-a="主要按鈕">${d.btn}</button></div>`}
function layerChips(){return `<div class="pt-lyr" data-a="圖層快速開關"><b style="font-size:12px">圖層</b><label><input type="checkbox" data-l="poly" checked>光電案場（已併網／施工）</label><label><input type="checkbox" data-l="pts" checked>光電案場（開發／許可中）</label><label><input type="checkbox" data-l="grid">電路基礎設施</label></div>`}
const API={screens:S};
API.EMBED_SRC='文件/proto/compete-proto-v4.html';
API.loadEmbed=function(f,q){const src=API.EMBED_SRC;fetch(src).then(r=>{if(!r.ok)throw 0;return r.text()}).then(h=>{h=h.replace('new URLSearchParams(location.search','new URLSearchParams(window.__QS||location.search');f.srcdoc=h.replace(/<head>/i,'<head><script>window.__QS='+JSON.stringify(q)+'</script>')}).catch(()=>{f.src=src+q})};
API.render=function(id,el,o){
  o=o||{};const d=S[id];if(!d){el.innerHTML='<div class="empty">尚無畫面</div>';return}
  if(d.type==='embed'){el.innerHTML='<div class="embedwrap" data-a="畫面位置" style="position:relative;width:100%;height:100%"><iframe class="embedf" title="'+d.title+'" style="width:100%;height:100%;border:0;display:block;background:#fff"></iframe></div>';API.loadEmbed(el.querySelector('iframe'),d.q||'');return {embed:true}}
  const t=d.theme;let panel='',main='',mapw=false;
  if(d.type==='kml'){mapw=true;panel=`<div class="pt-panel" data-a="空間分析面板"><div class="pt-ph"><span>空間分析</span><span style="color:#8791AE">✕</span></div><div class="pt-tabs"><span>繪製查詢</span></div><div class="pt-f"><label>查詢方式</label><select class="pt-sel" data-a="查詢方式下拉"><option>單點查詢</option><option>範圍查詢（繪製）</option><option selected>範圍查詢（上傳KML）</option></select>
   <div class="pt-up k-up" data-a="上傳區"><div style="font-size:22px;line-height:1">⬆</div><div><b>拖曳 KML／KMZ 檔案至此，或點擊選擇檔案</b></div><div class="pt-rules" data-a="上傳規則文字">• 支援 .kml、.kmz 格式<br>• 範圍須為多邊形，不支援點、線<br>• 一個檔案只能有一個面</div></div>
   <div class="k-file" data-a="已選檔案列"></div><button class="pt-btn k-q" disabled data-a="查詢按鈕">查詢</button><div class="pt-res k-res" style="margin-top:14px"></div></div></div>`}
  else if(d.type==='layers'){mapw=true;panel=`<div class="pt-panel" data-a="圖層套疊面板"><div class="pt-ph"><span>圖層套疊</span><span style="color:#8791AE">✕</span></div><div class="pt-f"><input class="pt-in" placeholder="搜尋圖層名稱">${GROUPS.map(g=>`<div class="pt-grp"><span>▸ ${g[0]}</span><span style="color:#8791AE">${g[1]}</span></div>`).join('')}
   <div class="pt-grp on" data-a="光電能源案場分類夾"><span>▾ 光電能源案場</span><span style="color:var(--pt)">2</span></div><div class="pt-lay" data-a="面圖層"><input type="checkbox" checked> 施工／已併網案件（面）<input type="range" style="width:60px"></div><div class="pt-lay" data-a="點圖層"><input type="checkbox" checked> 開發／許可中案件（點）<input type="range" style="width:60px"></div></div></div>`}
  else if(d.type==='complist'){mapw=true;panel=`<div class="pt-panel" data-a="競合分析管理面板"><div class="pt-ph"><span>競合分析管理</span><span style="color:#8791AE">✕</span></div><div class="pt-f"><div class="row" style="gap:6px"><select class="pt-sel" data-a="縣市篩選"><option>全部縣市</option></select><select class="pt-sel" data-a="階段篩選"><option>全部階段</option></select></div><div style="margin:10px 0;display:flex;gap:6px"><button class="pt-btn" style="margin:0" data-a="新增案場按鈕">＋ 新增案場</button><button class="pt-btn o" style="margin:0" data-a="匯出按鈕">匯出</button></div>${cases(6)}</div></div>`}
  else if(d.type==='nhmap'){mapw=true;panel=`<div class="pt-panel" data-a="預警面板"><div class="pt-ph"><span>疫情預警</span></div><div class="pt-f"><label>預警等級</label><div class="pt-lay" data-a="圖例"><i class="pt-dot" style="background:#C0392B"></i> 高度預警（3）</div><div class="pt-lay"><i class="pt-dot" style="background:#E08A00"></i> 中度預警（7）</div><div class="pt-lay"><i class="pt-dot" style="background:#2E9A5F"></i> 一般通報（21）</div><label style="margin-top:12px">期間</label><select class="pt-sel" data-a="期間篩選"><option>近 14 天</option></select></div></div>`}
  else if(d.type==='table')main=tableMain(d);else if(d.type==='form')main=formMain(d);
  el.innerHTML=`<div class="pt th-${t}">${top(t)}<div class="pt-body">${d.rail>=0?rail(t,d.rail):''}${panel}${mapw?`<div class="pt-mapw"><div class="mapEl"></div>${d.type==='nhmap'?'':layerChips()}</div>`:main}</div></div>`;
  let map=null;
  if(mapw){map=SyncMap($('.mapEl',el));
    $$('[data-l]',el).forEach(c=>c.onchange=()=>map.layer(c.dataset.l,c.checked));
    if(d.type==='layers'||d.type==='complist'){map.layer('pts',true);map.layer('poly',true)}
    if(d.type==='nhmap'){map.layer('poly',false);map.layer('pts',true)}}
  if(d.type==='kml'){
    const up=$('.k-up',el),box=$('.k-file',el),q=$('.k-q',el),res=$('.k-res',el);
    const doUp=()=>{if(el.classList.contains('annoOn'))return;box.innerHTML='<div class="pt-file">📄 <b>彰化雲林沿海範圍.kml</b><span class="grow"></span><span style="color:#5a6684">1 個面</span> <a class="k-rm" style="cursor:pointer;color:#c0392b">✕</a></div>';map.layer('kml',true);map.fitKml();q.disabled=false;up.style.display='none';
      $('.k-rm',el).onclick=()=>{box.innerHTML='';map.layer('kml',false);map.fitAll();q.disabled=true;up.style.display='';res.innerHTML=''}};
    const doQ=()=>{if(el.classList.contains('annoOn'))return;res.innerHTML='<div class="g"><span>電路基礎設施</span><b>3/3</b></div><div class="g"><span>環境敏感地區一級</span><b>1/17</b></div><div class="g"><span>光電能源案場</span><b>5/60</b></div><button class="pt-btn o" data-a="匯出資料按鈕">匯出資料</button>'};
    up.addEventListener('click',doUp);q.addEventListener('click',doQ);
    up.addEventListener('dragover',e=>{e.preventDefault();up.classList.add('over')});up.addEventListener('dragleave',()=>up.classList.remove('over'));up.addEventListener('drop',e=>{e.preventDefault();up.classList.remove('over');doUp()});
    if(o.state==='up'||o.state==='res')doUp();if(o.state==='res')doQ();}
  return {map,theme:t};
};
window.PROTO=API;
})();
