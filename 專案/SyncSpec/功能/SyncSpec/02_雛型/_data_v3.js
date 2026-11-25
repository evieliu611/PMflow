/* v3 示範資料（疊在 _data.js、_data_v2.js 之上，不改動 v1、v2）。全部是示範，不是真實內容。 */
(function(){
const V3={};
/* 單位：知識以單位為鍵，一個單位一份主檔 */
V3.units=[
 {name:'台灣韋能能源',domain:['能源與綠能'],projects:['韋能一階（結案）','韋能二階（執行中）'],owner:'EvieLiu',updated:'2026-11-16',
  sections:[['單位概況','光電與風電場址評估；承辦重視資料來源與可追溯。'],['系統現況','「土地評估圖台系統」：深藍側欄、青藍色系；圖層套疊、環域、匯出為主要功能。'],['慣用用語','「案場」指光電場址；用「圖層套疊」，不說「疊圖」。'],['承辦偏好','點位圖徵的顏色需先經客戶確認；偏好沿用既有「空間分析」版型。'],['歷史淵源','一階建置圖台；二階增補範圍查詢（上傳 KML）與後台紀錄。'],['限制','資安：登入紀錄需保留；採購：增補以契約變更辦理。']],
  log:[['2026-11-16','點位圖徵顏色需先經客戶確認','二階・會議紀錄_1116'],['2026-11-12','偏好沿用既有版型','二階・客戶訪談']]},
 {name:'NCDR',domain:['防救災與韌性','兵推演練'],projects:['NCDR健康豬（執行中）','NCDR合作案（開案前提案）'],owner:'IanPeng',updated:'2026-11-10',
  sections:[['單位概況','國家災害防救科技中心；主題圖與災情資訊服務。'],['系統現況','主題圖發布流程與地圖圖台並行維運。'],['慣用用語','（尚待整理）'],['承辦偏好','（尚待整理）'],['歷史淵源','健康豬為近期專案；合作案延續其資料流程。'],['限制','（尚待整理）']],
  log:[['2026-11-10','主題圖發布流程','健康豬・訪談回填']]},
 {name:'新北市政府',domain:['景觀與樹木'],projects:['新北景觀（執行中）'],owner:'EvieLiu',updated:'2026-09-03',
  sections:[['單位概況','觀賞樹木管理業務。'],['系統現況','（尚待整理）'],['慣用用語','（尚待整理）'],['承辦偏好','（尚待整理）'],['歷史淵源','（尚待整理）'],['限制','（尚待整理）']],log:[]},
 {name:'農業部農水署',domain:['能源與綠能'],projects:['農水署發電回饋金（結案）'],owner:'EvieLiu',updated:'2025-12-31',
  sections:[['單位概況','發電回饋金系統。'],['系統現況','已結案，成果報告書與系統架構留在既有成果。'],['慣用用語','（尚待整理）'],['承辦偏好','（尚待整理）'],['歷史淵源','專案已結案。'],['限制','（尚待整理）']],log:[]},
 {name:'警大',domain:['兵推演練'],projects:['警大（開案前提案）'],owner:'EvieLiu',updated:'—',sections:[],log:[]},
 {name:'示範單位',domain:['防救災與韌性'],projects:['示範提案案（開案前提案）'],owner:'EvieLiu',updated:'—',sections:[],log:[]}
];
V3.unit=n=>V3.units.find(u=>u.name===n);
V3.unitKb=u=>u?u.sections.filter(s=>s[1].indexOf('尚待整理')<0).length+u.log.length:0;
V3.domains=['防救災與韌性','兵推演練','能源與綠能','水利','景觀與樹木','國土與地理資訊','金融與不動產','交通運輸','未分類'];
V3.typeGroups=[['使用對象',['公開系統','內部系統']],['系統形態',['GIS 圖台','儀表板','後台管理','網站與首頁','LINE／行動通路','API／資料服務']],['技術能力',['AI 功能']]];
V3.types=[].concat(...V3.typeGroups.map(g=>g[1]));
V3.typeHtml=()=>V3.typeGroups.map(g=>'<div style="width:100%"><div class="xs muted" style="margin:4px 0">'+g[0]+'</div><div class="row wrap" style="gap:6px">'+g[1].map(t=>'<button type="button" class="sbtn" data-t="'+t+'">'+t+'</button>').join('')+'</div></div>').join('');
V3.domainDesc={'防救災與韌性':'偏即時資料：監測、通報、預警','兵推演練':'偏歷史資料與假設情境：推演、評估','能源與綠能':'光電、風電、再生能源與電業','水利':'水利設施、農田水利、水情','景觀與樹木':'樹木、公園、行道樹的調查與養護','國土與地理資訊':'地理資訊、測繪、海洋與國土規劃','金融與不動產':'銀行、估價與客戶情資','交通運輸':'鐵公路與交通設施','未分類':''};
V3.domainKb=[
 {d:'能源與綠能',title:'光電場址評估常用圖層與法規',n:2,state:'已升級',src:'韋能一階、韋能二階'},
 {d:'能源與綠能',title:'發電量與回饋金的計算慣例',n:1,state:'候選',src:'農水署發電回饋金'},
 {d:'防救災與韌性',title:'災情通報與預警分級的作業慣例',n:2,state:'已升級',src:'NCDR健康豬、NCDR合作案'},
 {d:'防救災與韌性',title:'主題圖發布與分享流程',n:1,state:'候選',src:'NCDR健康豬'},
 {d:'景觀與樹木',title:'樹木調查與養護的基本流程',n:1,state:'候選',src:'新北景觀'}
];
V3.funcs=[
 {title:'KML 範圍查詢',desc:'上傳 KML 做範圍分析，查詢範圍可下載為 KML',src:'韋能一階',status:'已實作'},
 {title:'圖層套疊與管理',desc:'多圖層開關、透明度、圖例',src:'過往專案',status:'已驗證'},
 {title:'動態熱區圖',desc:'時間範圍與色階',src:'過往專案',status:'已實作'},
 {title:'環域查詢',desc:'單點、多點、線、面',src:'過往專案',status:'已驗證'},
 {title:'競合分析管理',desc:'案場清單、篩選、點位資訊',src:'韋能二階（規格定稿）',status:'草稿'}
];
V3.products=[
 {name:'GeoCloudAI',desc:'產品說明待產品負責人補充（示意）',updated:'待產品負責人確認',report:1},
 {name:'電子地圖/POI',desc:'產品說明待產品負責人補充（示意）',updated:'待產品負責人確認',report:0},
 {name:'門牌定位模組',desc:'產品說明待產品負責人補充（示意）',updated:'待產品負責人確認',report:0},
 {name:'knoWhere',desc:'產品說明待產品負責人補充（示意）',updated:'待產品負責人確認',report:0},
 {name:'社區',desc:'產品說明待產品負責人補充（示意）',updated:'待產品負責人確認',report:0},
 {name:'學區',desc:'產品說明待產品負責人補充（示意）',updated:'待產品負責人確認',report:0},
 {name:'實價登錄',desc:'產品說明待產品負責人補充（示意）',updated:'待產品負責人確認',report:0},
 {name:'VT',desc:'產品說明待產品負責人補充（示意）',updated:'待產品負責人確認',report:0}
];
V3.prodPick=p=>{try{const a=JSON.parse(sessionStorage.getItem('ss_prod_'+p.id));if(a)return a}catch(e){}return p.id==='wn'?['電子地圖/POI']:[]};
V3.setProdPick=(p,a)=>{try{sessionStorage.setItem('ss_prod_'+p.id,JSON.stringify(a))}catch(e){}};
/* 審核人：依知識類型區分，各類型是誰尚未決定 */
V3.reviewKinds=['單位','領域','功能','產品'];
V3.reviewer={單位:{sug:'免事前審核；該單位專案的主 PM 維護，每月抽查',state:'已定'},領域:{sug:'資深 PM 或主管',state:'待確認'},功能:{sug:'負責 PM＋PG',state:'待確認'},產品:{sug:'產品負責人',state:'待確認'}};
V3.reviewerOf=label=>{const k=({'單位知識':'單位','功能卡':'功能','領域知識':'領域','產品知識':'產品'})[label]||label;const r=V3.reviewer[k];return r?r.sug+(r.state==='已定'?'（已定）':'（待確認）'):'待確認'};
V3.cand=[
 {id:'K1',kind:'單位',title:'台灣韋能能源：點位圖徵的顏色需先經客戶確認',src:'韋能二階・會議紀錄_1116',origin:'即時標記',deid:'單位知識不需去識別',state:'待審核'},
 {id:'K2',kind:'功能',title:'KML 範圍查詢（欄位、驗證規則、錯誤訊息）',src:'韋能二階・規格定稿 2.6',origin:'規格定稿',deid:'待去識別（含客戶名 1 處）',state:'待審核',note:'規格定稿只算「草稿」卡；上線確認後才升為「已實作」'},
 {id:'K3',kind:'領域',title:'光電場址評估常用圖層與法規',src:'韋能一階、韋能二階',origin:'歸納（2 個專案）',deid:'—',state:'待審核',note:'符合升級門檻（2 個專案以上）；門檻需跟團隊確認'},
 {id:'K4',kind:'單位',title:'NCDR：主題圖發布流程',src:'NCDR健康豬・訪談回填',origin:'訪談回填後',deid:'單位知識不需去識別',state:'待審核'},
 {id:'K5',kind:'產品',title:'回報：GeoCloudAI 對地標的解析與說明不符',src:'NCDR AI 繪圖工具（示意）',origin:'專案回報',deid:'—',state:'待審核',note:'產品知識不由專案直接修改，只回報給產品負責人'},
 {id:'K6',kind:'功能',title:'提案雛型 6 張（未得標）',src:'（示範）某未得標提案',origin:'結案兜底',deid:'—',state:'不提取',note:'未得標的雛型沒有實作過，不做功能卡'}
];
/* 需跟團隊確認 */
V3.askTeam=[
 ['各類知識的審核人','單位、領域、功能、產品各由誰審核（目前只有建議）'],
 ['提取時機','每輪訪談回填後、規格定稿、結案兜底，是否合適'],
 ['「已上線」狀態','工項是否新增「已上線」，作為功能卡升為「已實作」的依據'],
 ['領域知識升級門檻','2 個專案以上或 PM 標「領域通則」是否合適'],
 ['單位清單維護','由誰維護、名稱怎麼統一（避免「韋能」「台灣韋能能源」分成兩組）']
];
/* 更新機制（概觀頁） */
V3.mech=[
 ['單位','該單位歷次專案的確認事項、決議、會議紀錄、既有系統畫面、承辦偏好','每輪訪談回填後、規格定稿、結案兜底','免事前審核；該單位專案的主 PM 維護，每月抽查（已定）','一單位一份主檔，新資訊累加；衝突以最新決議為準，舊的標日期保留'],
 ['功能','規格定稿且有實作過的工項','規格定稿時 AI 擬卡片；上線後補踩雷與實際差異','負責 PM＋PG','同功能再做時新增版本，不另開新卡；狀態：草稿、已實作、已驗證'],
 ['領域','多個專案共通的內容','不由單一專案直接寫入；2 個專案以上或 PM 標「領域通則」才升級','資深 PM 或主管','變動少，每季或半年整理一次'],
 ['產品','公司產品本身','跟產品發布','產品負責人','人工維護；專案只能回報「與實際不符」']
];
/* 延續案冷啟動（第一批知識） */
V3.cold={
 sources:[['舊專案的專案記憶','韋能一階：確認事項 38 條、決議 12 條、AI 整理說明、規格與驗收',true],['上傳舊文件','需求文件、規格、成果報告書、操作手冊（舊專案不在系統內時用）',false],['既有系統畫面','舊專案雛型 15 張，或上傳截圖、貼系統網址抓圖',true]],
 unit:[['單位概況','光電與風電場址評估；承辦重視資料來源與可追溯。',95],['系統現況','「土地評估圖台系統」：深藍側欄、青藍色系。',92],['承辦偏好','點位圖徵的顏色需先經客戶確認。',81]],
 funcs:[['空間分析（圖層套疊＋面板）','與本次「範圍查詢」直接相關，沿用其版型',94,'關聯功能'],['匯出（勾選多選）','本次下載 KML 需與它對齊',88,'關聯功能'],['圖層管理','既有圖層編輯樣式，本次查詢範圍圖層會用到',85,'關聯功能'],['競合分析管理','與本次擴充無關，先不收',60,'範圍外']],
 cards:[['空間分析面板擴充','韋能一階上線，沿用圖層套疊與匯出勾選方式',90,'已實作']],
 asks:['這個功能一開始為什麼要做？','上一次改版改了什麼、為什麼改？','已知有哪些限制或做不到的事？','承辦人員平常怎麼使用這個功能？','哪些畫面或用語客戶不接受修改？','有沒有曾經被客戶退件的設計？']
};
/* 系統資料（schema、API、模組、權限）：示範資料，不是真實內容。狀態：既有（匯入）／規劃（由雛型 SPEC 抽取）／已實作（PG 匯入實際 DDL 後對上）／有差異 */
V3.sysStatus={'既有':['','來自既有系統匯入'],'規劃':['sun','由雛型 SPEC 抽取的預計 schema'],'已實作':['mint','PG 匯入實際 DDL 且對上'],'有差異':['coral','規劃與實際不一致，需 PG 確認']};
V3.sys={wn:{
 source:'既有系統 schema 由 PG 於 2026-11-10 匯出 DDL（只含結構，不含資料與連線資訊）；規劃中的資料表由雛型 SPEC 抽取。',
 tables:[
  {name:'land_parcel',cn:'土地地段',st:'既有',item:'',desc:'既有系統的地段主檔，圖台查詢與空間分析都會用到。',fields:[['parcel_id','varchar(20)','地段代碼，主鍵'],['county','varchar(10)','縣市'],['geom','geometry','地段多邊形'],['area_m2','decimal(12,2)','面積（平方公尺）']]},
  {name:'analysis_layer',cn:'分析圖層',st:'既有',item:'2.5',desc:'空間分析面板可套疊的圖層。',fields:[['layer_id','int','主鍵'],['layer_name','nvarchar(50)','圖層名稱'],['style_json','nvarchar(max)','樣式設定'],['is_public','bit','是否公開']]},
  {name:'export_log',cn:'匯出紀錄',st:'有差異',item:'2.5',desc:'進階匯出的操作紀錄。',fields:[['log_id','bigint','主鍵'],['user_id','varchar(30)','操作者'],['export_type','varchar(20)','匯出類型（實際 DDL 為 varchar(50)）'],['created_at','datetime','建立時間']],diff:'規格寫 export_type 為 varchar(20)，實際 DDL 為 varchar(50)。需 PG 確認以哪個為準，並回寫功能卡。'},
  {name:'kml_query_task',cn:'KML 範圍查詢任務',st:'規劃',item:'2.6',desc:'使用者上傳 KML 範圍檔後建立的查詢任務。',fields:[['task_id','bigint','主鍵'],['user_id','varchar(30)','建立者'],['file_name','nvarchar(100)','上傳檔名'],['vertex_count','int','頂點數（上限待確認）'],['status','varchar(10)','處理中／完成／失敗'],['created_at','datetime','建立時間']]},
  {name:'kml_query_result',cn:'KML 查詢結果',st:'規劃',item:'2.6',desc:'範圍內的案件與地段清單。',fields:[['result_id','bigint','主鍵'],['task_id','bigint','對應查詢任務'],['parcel_id','varchar(20)','對應 land_parcel'],['hit_area_m2','decimal(12,2)','範圍內面積']]}
 ],
 apis:[['GET','/api/analysis/layers','取得可套疊圖層','既有','2.5'],['POST','/api/export/kml','匯出勾選項目為 KML','規劃','2.6'],['POST','/api/analysis/kml-query','上傳 KML 建立查詢任務','規劃','2.6'],['GET','/api/analysis/kml-query/{id}','取得查詢結果','規劃','2.6']],
 modules:[['空間分析面板','既有','2.5','圖層套疊、環域、匯出勾選；本次擴充會在此新增「範圍查詢」'],['進階匯出','既有','2.5','匯出多選；KML 下載需與它對齊'],['範圍查詢（上傳 KML）','規劃','2.6','本次新增']],
 perms:[['所有登入者','可使用範圍查詢與下載 KML','規劃','2.6'],['管理員','可查看所有人的匯出紀錄','既有','2.5']]
}};
/* AI 判斷專案領域的示範對應（領域清單由公司維護，AI 只能從清單選） */
V3.aiDomain=function(P){const m={'能源與圖資':['能源與綠能'],'防災資訊':['防救災與韌性'],'景觀工程':['景觀與樹木']};let r=(m[P.cat]||[]).slice();if(P.client==='NCDR'&&!r.includes('兵推演練'))r.push('兵推演練');if(P.client==='警大')r=['兵推演練'];return r};

/* 兵推演練（獨立領域：看歷史資料與假設情境，不同於防救災的即時資料） */
V3.domainKb.push({d:'兵推演練',title:'兵推演練的情境假設與評核方式',n:3,state:'已升級',src:'NCDR健康豬、NCDR合作案、警大',desc:'演練以歷史資料加上假設情境推演；情境假設要留紀錄，評核看處置流程與資源調度。（示意）'});
V3.domainKb.push({d:'兵推演練',title:'推演結果的呈現與回放慣例',n:1,state:'候選',src:'警大'});
V3.funcs.push({title:'兵推／模擬演練',desc:'情境編輯、推演流程、紀錄回放',src:'NCDR合作案（規格定稿）',status:'草稿'});
/* ---- 權限、維護人、最後確認／異動（示範） ---- */
V3.users=()=>{const s=[];Object.values(DB.P).forEach(p=>p.members.forEach(m=>{if(!s.includes(m[0]))s.push(m[0])}));return s};
V3.user=()=>{try{return sessionStorage.getItem('ss_kbuser')||'EvieLiu'}catch(e){return 'EvieLiu'}};
V3.setUser=u=>{try{sessionStorage.setItem('ss_kbuser',u)}catch(e){}};
V3.projsOfUnit=u=>Object.values(DB.P).filter(p=>p.client===u.name);
V3.mainPmOf=p=>{const pm=p.members.filter(m=>m[3]==='PM'),c=pm.find(m=>m[6]);return(c||pm[0]||p.members[0]||[])[0]};
V3.canSeeUnit=(user,u)=>V3.projsOfUnit(u).some(p=>p.members.some(m=>m[0]===user));
V3.canEditUnit=(user,u)=>V3.projsOfUnit(u).some(p=>V3.mainPmOf(p)===user);
V3.mainPmsOfUnit=u=>[...new Set(V3.projsOfUnit(u).map(V3.mainPmOf).filter(Boolean))];
V3.editorsDef={領域:['IanPeng'],功能:['IanPeng','AllenYeh'],產品:['AllenYeh'],規範:['IanPeng']};
V3.getEditors=()=>{try{const o=JSON.parse(localStorage.getItem('ss_kbeditors'));if(o)return Object.assign({},V3.editorsDef,o)}catch(e){}return JSON.parse(JSON.stringify(V3.editorsDef))};
V3.setEditors=o=>{try{localStorage.setItem('ss_kbeditors',JSON.stringify(o))}catch(e){}};
V3.kindKey={unit:'單位',domain:'領域',func:'功能',product:'產品',rule:'規範'};
V3.canEdit=(user,kind)=>kind==='unit'?false:(V3.getEditors()[V3.kindKey[kind]]||[]).includes(user);
V3.nowStr=()=>{const d=new Date(),p=n=>String(n).padStart(2,'0');return d.getFullYear()+'-'+p(d.getMonth()+1)+'-'+p(d.getDate())+' '+p(d.getHours())+':'+p(d.getMinutes())};
V3.keyOf=(kind,x)=>kind+':'+(kind==='unit'?x.name:kind==='product'?x.name:kind==='rule'?x.id:x.title);
V3.defStamp=(kind,x)=>{if(kind==='unit')return{conf:x.updated&&x.updated!=='—'?{at:x.updated+' 10:42',by:x.owner}:null,mod:x.updated&&x.updated!=='—'?{at:x.updated+' 10:42',by:x.owner}:null};
 if(kind==='domain')return x.state==='已升級'?{conf:{at:'2026-11-10 15:20',by:'IanPeng'},mod:{at:'2026-11-10 15:20',by:'IanPeng'}}:{conf:null,mod:{at:'2026-11-12 09:40',by:'EvieLiu'}};
 if(kind==='func')return x.status==='草稿'?{conf:null,mod:{at:'2026-11-20 16:05',by:'EvieLiu'}}:{conf:{at:'2026-11-12 11:30',by:'AllenYeh'},mod:{at:'2026-11-12 11:30',by:'AllenYeh'}};
 if(kind==='product')return{conf:null,mod:{at:'2026-10-30 14:00',by:'AllenYeh'}};
 return{conf:{at:'2026-10-20 09:30',by:x.owner||'IanPeng'},mod:{at:'2026-10-20 09:30',by:x.owner||'IanPeng'}}};
V3.readOv=()=>{try{return JSON.parse(sessionStorage.getItem('ss_kbstamp'))||{}}catch(e){return{}}};
V3.stampOf=(kind,x)=>{const b=V3.defStamp(kind,x),o=V3.readOv()[V3.keyOf(kind,x)]||{};return{conf:o.conf||b.conf,mod:o.mod||b.mod,text:o.text||null,log:o.log||[]}};
V3.setStamp=(kind,x,type,text)=>{const all=V3.readOv(),k=V3.keyOf(kind,x),o=all[k]||{log:[]},st={at:V3.nowStr(),by:V3.user()};if(type==='conf')o.conf=st;else{o.mod=st;o.conf=st;if(text!==undefined)o.text=text}o.log=(o.log||[]).concat([[st.at,st.by,type==='conf'?'確認無誤':'修改內容']]);all[k]=o;try{sessionStorage.setItem('ss_kbstamp',JSON.stringify(all))}catch(e){}return st};
V3.stampTxt=s=>s?s.at+'・'+s.by:'尚未確認';
V3.unitOfCand=c=>V3.units.find(u=>{const pn=u.projects.map(p=>p.replace(/（.*）/,''));return((c.src||'')+(c.title||'')).indexOf(u.name)>-1||pn.some(n=>((c.src||'')+(c.title||'')).indexOf(n)>-1)});
V3.candVisible=(user,c)=>{if(c.kind==='單位'){const u=V3.unitOfCand(c);return u?V3.canSeeUnit(user,u):false}return(V3.getEditors()[c.kind]||[]).includes(user)};
V3.funcStatus=f=>{try{return(JSON.parse(sessionStorage.getItem('ss_kbstatus'))||{})[f.title]||f.status}catch(e){return f.status}};
V3.setFuncStatus=(f,s)=>{try{const o=JSON.parse(sessionStorage.getItem('ss_kbstatus'))||{};o[f.title]=s;sessionStorage.setItem('ss_kbstatus',JSON.stringify(o))}catch(e){}};
/* 案件性質（示範值：AI 編的，不是真實狀態） */
V3.natures=[['建置','全新做一套系統'],['擴充','在既有系統上新增功能'],['維運','既有系統的維護、小改與支援'],['規劃評估','規劃、評估或研究案，不一定產出系統']];
V3.nature={wn:'擴充',wn1:'建置',nh:'建置',nh2:'擴充',nb:'維運',ns:'建置',pd:'建置',ex:'建置'};
V3.natureOf=p=>{try{const s=JSON.parse(sessionStorage.getItem('ss_sys_'+p.id));if(s&&s.main&&s.main.nat)return s.main.nat}catch(e){}return V3.nature[p.id]||'建置'};

/* ---- 系統（選填）與既有系統基準（示範值，不是真實狀態） ---- */
V3.audience=['公開系統','內部系統'];
V3.baseScreens={wn:['空間分析面板','圖層管理','匯出（勾選多選）','專案列表'],nh2:['主題圖發布','災情通報','地圖瀏覽'],def:['首頁','列表頁','詳細頁']};
V3.sysAI={wn:[['土地評估圖台','內部系統','擴充'],['資料維護後台','內部系統','建置']]};
V3.fromOf=p=>{const og=V2.originOf(p)||'';const m=og.match(/延續自\s*(.+)/);if(m)return m[1];const o=Object.values(DB.P).find(x=>x.id!==p.id);return o?o.name:''};
V3.mkUnit=(p,name,aud,nat)=>({name,aud:aud.slice(),nat,base:{useProj:nat==='擴充'||nat==='維運',from:V3.fromOf(p),lock:true,url:'',mod:{},state:'取自上線畫面（2026-10-30）'}});
V3.getSys=p=>{let s=null;try{s=JSON.parse(sessionStorage.getItem('ss_sys_'+p.id))}catch(e){}
 if(!s)s={split:false,aiDismissed:false,list:[],main:V3.mkUnit(p,p.name,p.cat==='能源與圖資'?['內部系統']:['公開系統'],V3.nature[p.id]||'建置')};
 if(!s.main.name)s.main.name=p.name;return s};
V3.setSys=(p,s)=>{try{sessionStorage.setItem('ss_sys_'+p.id,JSON.stringify(s))}catch(e){}};
V3.sysNames=p=>{const s=V3.getSys(p);return s.split&&s.list.length?s.list.map(x=>x.name):[]};
/* ---- 雛型版本、方案、交付快照（示範） ---- */
V3.verInfo=it=>{const s=it.stage;if(s<1)return{n:0,frozen:false};if(s<=2)return{n:1,frozen:false};if(s===3)return{n:2,frozen:false};if(s===4)return{n:2,frozen:true};return{n:3,frozen:false}};
V3.verKey=(p,it)=>'ss_ver_'+p.id+'_'+it.no;
V3.verOf=(p,it)=>{let o=null;try{o=JSON.parse(sessionStorage.getItem(V3.verKey(p,it)))}catch(e){}const b=V3.verInfo(it);return Object.assign({n:b.n,frozen:b.frozen,plans:['A'],plan:'A',archived:[]},o||{})};
V3.setVer=(p,it,o)=>{try{sessionStorage.setItem(V3.verKey(p,it),JSON.stringify(o))}catch(e){}};
V3.verTxt=v=>v.n?'v'+v.n+(v.frozen?' 已凍結':' 編輯中'):'尚無雛型';
V3.snapsDef={wn:[{name:'第一批交付',date:'2026-11-20',items:{'2.4':1,'2.6':1}}]};
V3.snaps=p=>{let a=[];try{a=JSON.parse(sessionStorage.getItem('ss_snap_'+p.id))||[]}catch(e){}return(V3.snapsDef[p.id]||[]).concat(a)};
V3.addSnap=(p,sn)=>{let a=[];try{a=JSON.parse(sessionStorage.getItem('ss_snap_'+p.id))||[]}catch(e){}a.push(sn);try{sessionStorage.setItem('ss_snap_'+p.id,JSON.stringify(a))}catch(e){}};
V3.sinceSnap=p=>{const L=V3.snaps(p),last=L[L.length-1];if(!last)return null;const ch=p.items.filter(it=>last.items[it.no]!==undefined&&V3.verOf(p,it).n>last.items[it.no]);return{snap:last,changed:ch}};
V3.sysOfTable={export_log:'資料維護後台',land_parcel:'土地評估圖台',analysis_layer:'土地評估圖台',kml_query_task:'土地評估圖台',kml_query_result:'土地評估圖台'};
V3.itemSysOf=(p,it)=>{const names=V3.sysNames(p);if(!names.length)return '';let m=null;try{m=JSON.parse(sessionStorage.getItem('ss_isys_'+p.id))}catch(e){}if(m&&m[it.no]&&names.includes(m[it.no]))return m[it.no];return /後台|資料|紀錄|管理/.test(it.name)&&names.length>1?names[1]:names[0]};
V3.setItemSys=(p,it,n)=>{let m={};try{m=JSON.parse(sessionStorage.getItem('ss_isys_'+p.id))||{}}catch(e){}m[it.no]=n;try{sessionStorage.setItem('ss_isys_'+p.id,JSON.stringify(m))}catch(e){}};

/* ---- AI 幫手共用：素材自動分類、雛型歸到工項、新專案引導 ---- */
V3.matClassify=name=>{const n=String(name||''),ext=(n.match(/\.([a-z0-9]+)$/i)||[,'file'])[1].toLowerCase();let cat='其他',conf=48;
 if(/合約|契約|協議|需求書|招標|預告|變更文件|rfp/i.test(n)){cat='合約與需求書';conf=95}
 else if(/會議|紀錄|記錄|訪談|逐字稿|minutes/i.test(n)){cat='會議與訪談';conf=92}
 else if(/成果報告|報告書|結案|歷年|教育訓練/.test(n)){cat='歷史交付文件';conf=82}
 else if(/\.(sql|ddl)$/i.test(n)||/schema|資料表|api文件|架構/i.test(n)){cat='系統技術資料';conf=95}
 else if(ext==='eml'||/信件|mail|line/i.test(n)){cat='往來信件';conf=90}
 else if(/\.(png|jpe?g|gif)$/i.test(n)||/截圖|畫面|現有系統|操作手冊/.test(n)){cat='現有系統畫面';conf=89}
 else if(/需求|規劃|建議書|簡報/.test(n)||/\.(pptx?|xlsx?)$/i.test(n)){cat='需求與規劃文件';conf=84}
 else if(/法規|標準|參考|競品/.test(n)){cat='參考資料';conf=80}
 return{cat,conf,ext,sens:/合約|報告書|客戶|契約/.test(n)}};
V3.addMaterial=(p,o)=>{const k='ss_mat_'+p.id;let s={ov:{},added:[],rm:[]};try{s=JSON.parse(sessionStorage.getItem(k))||s}catch(e){}
 const it=Object.assign({id:'u'+Date.now()+Math.floor(Math.random()*1000),state:'已整理'},o);s.added=(s.added||[]).concat(it);try{sessionStorage.setItem(k,JSON.stringify(s))}catch(e){}return it};
V3.protoKey=(p,it)=>'ss_proto_'+p.id+'_'+it.no;
V3.protoOf=(p,it)=>{try{return JSON.parse(sessionStorage.getItem(V3.protoKey(p,it)))||[]}catch(e){return[]}};
V3.addProto=(p,it,name)=>{const a=V3.protoOf(p,it);if(!a.includes(name))a.push(name);try{sessionStorage.setItem(V3.protoKey(p,it),JSON.stringify(a))}catch(e){}};
V3.hasProto=(p,it)=>(it.screens&&it.screens.length>0)||V3.protoOf(p,it).length>0;
V3.setupKey=p=>'ss_setup_'+p.id;
V3.setupDone=p=>{try{return sessionStorage.getItem(V3.setupKey(p))==='1'}catch(e){return false}};
V3.markSetup=p=>{try{sessionStorage.setItem(V3.setupKey(p),'1')}catch(e){}};
window.V3STEPS=p=>{const hasC=p.contract.length>0,un=p.contract.filter(c=>!c[5]).length,its=p.items;
 return[
  {t:'基本設定',d:'確認專案名稱、單位、領域，指定成員與主 PM',done:hasC||V3.setupDone(p),href:PAGES.manage+'#settings',cta:'去設定'},
  {t:'上傳合約',d:'AI 會先簡單拆出工項；工項裡先只有合約資訊與待確認事項',done:hasC,href:PAGES.contract2,cta:'上傳合約'},
  {t:'確認工項',d:'AI 拆得不準的地方改一下，並指派每個工項的負責 PM',done:hasC&&un===0,href:PAGES.contract2,cta:'去確認'},
  {t:'跟 AI 幫手討論整體方向',d:'談整體方向、丟會議紀錄與雛型，AI 會自己歸到對應的工項',done:its.some(i=>i.stage>=1),href:'#ai',cta:'開啟 AI 幫手'},
  {t:'逐個工項整理',d:'User Story、需求摘要、雛型逐步長出來；待確認談到段落後，請 AI 幫手產出規格說明',done:its.length>0&&its.every(i=>i.stage>=4),href:PAGES.items,cta:'看工項'}]};
V3.matsStore=p=>{try{return JSON.parse(sessionStorage.getItem('ss_mat_'+p.id))||{ov:{},added:[],rm:[]}}catch(e){return{ov:{},added:[],rm:[]}}};
V3.contractFiles=p=>{const s=V3.matsStore(p),out=[];(p.materials||[]).forEach((m,i)=>{const id='b'+i;if((s.rm||[]).includes(id))return;const ov=(s.ov||{})[id]||{};const cat=ov.cat||(m.t==='合約'?'合約與需求書':'');if(cat==='合約與需求書')out.push({id,name:m.n,ext:m.e,meta:m.m})});
 (s.added||[]).forEach(a=>{if((s.rm||[]).includes(a.id))return;const ov=(s.ov||{})[a.id]||{};const cat=ov.cat||a.cat;if(cat==='合約與需求書')out.push({id:a.id,name:a.name,ext:a.ext,meta:a.meta||''})});return out};
/* v3 導覽：從 v3 進入後，連尚未做 v3 的頁面導覽也一路是 v3 */
V3.boot=function(){try{sessionStorage.setItem('ss_ver','3')}catch(e){}if(window.applyV3)applyV3()};
/* ---------- 新增專案（可完整跑一次流程；資料存在本分頁的 sessionStorage，關掉分頁就清空，內容皆為示意） ---------- */
V3.NP='ss_newp';
V3.mkProj=function(o){const id='n'+Date.now().toString(36);
 return {id,upd:'剛剛',closed:'',name:o.name,client:o.client||'（未指定單位）',sub:'新建立的專案',cat:'未分類',tag:'新專案',tagc:'mint',mine:true,theme:'nh',isNew:1,
  contractFile:'',parsed:'',members:[['EvieLiu','evieliu','專案管理部','PM','E','',1]],contract:[],items:[],materials:[],
  activity:[['E','','Evie 建立專案','剛剛']],ref:[]}};
V3.regProj=function(p,extra){extra=extra||{};DB.P[p.id]=p;V2.stage[p.id]=extra.stage||'執行中';V2.origin[p.id]=extra.origin||'新案';
 V2.vers[p.id]=extra.vers||V2.vers[p.id]||[];V2.drafts[p.id]=extra.drafts||V2.drafts[p.id]||[];V2.archive[p.id]=extra.archive||V2.archive[p.id]||[];if(V2.changes&&!V2.changes[p.id])V2.changes[p.id]=[]};
V3.createProj=function(o){const p=V3.mkProj(o);V3.regProj(p,{stage:o.stage});V3.saveNew();return p};
V3.saveNew=function(){try{const a=Object.values(DB.P).filter(p=>p.isNew).map(p=>({p,stage:V2.stage[p.id],vers:V2.vers[p.id],drafts:V2.drafts[p.id]}));sessionStorage.setItem(V3.NP,JSON.stringify(a))}catch(e){}};
V3.restoreNew=function(){try{(JSON.parse(sessionStorage.getItem(V3.NP))||[]).forEach(x=>{const p=DB.P[x.p.id]||x.p;V3.regProj(p,{stage:x.stage,vers:x.vers,drafts:x.drafts})})}catch(e){}};
V3.restoreNew();
setInterval(V3.saveNew,700);addEventListener('pagehide',V3.saveNew);
/* AI 預填（示意）：依合約檔名猜單位以外的欄位；真正的版本由 AI 讀合約內容判斷 */
V3.prefill=function(p,fileName){const n=fileName||'';
 const cat=/防災|NCDR|疫情|水情|淹水/.test(n)?'防災資訊':/能源|電|綠能|圖台|土地/.test(n)?'能源與圖資':/景觀|樹木/.test(n)?'景觀工程':'其他';
 const aud=/民眾|公開|網站/.test(n)?['公開系統']:['內部系統'];const nat=/維運|增補|擴充/.test(n)?'擴充':'建置';
 p.cat=cat;p.tag=cat==='其他'?'新專案':cat;p.contractFile=n;p.parsed='剛剛';p.prefilled=['領域','使用對象','案件性質'];
 const S=V3.getSys(p);S.main.aud=aud;S.main.nat=nat;V3.setSys(p,S);V3.saveNew();return{cat,aud,nat,doms:V3.aiDomain(p)}};
/* 拆工項（示意）：依固定樣板拆出工項，名稱與條文為示意資料 */
V3.SPLIT=[['專案管理與月會','pm',95,'第 1 項','依月會執行時程協調與進度回報。','管理類工作。'],['需求訪談與系統分析報告','doc',90,'第 2 項','完成需求訪談並提交系統分析報告。','交付物是文件。'],
 ['資料填報與審核','dev',96,'第 3.1 項','提供資料填報與審核流程。','新增填報與審核功能。'],['地圖展示與查詢','dev',94,'第 3.2 項','於地圖展示資料分布並可查詢。','地圖展示與查詢功能。'],
 ['統計報表與匯出','dev',92,'第 3.3 項','依期間與地區產出統計報表並匯出。','報表與匯出功能。'],['後台權限管理','dev',93,'第 3.4 項','帳號、角色與資料範圍管理。','後台管理功能。'],
 ['教育訓練','other',85,'第 4 項','辦理使用者教育訓練 2 場。','屬訓練服務。'],['驗收文件與保固','doc',88,'第 5 項','提交驗收文件，保固一年。','文件與服務。']];
V3.splitItems=function(p,fileName,verLabel){if(p.contract.length)return 0;
 p.contract=V3.SPLIT.map((r,i)=>[String(i+1),r[0],r[1],r[2],r[3],1,r[4],r[5]]);
 p.items=p.contract.filter(c=>c[2]==='dev').map(c=>({no:c[0],name:c[1],stage:0,auto:1,tbd:[],docs:['no','no','no'],upd:'—',screens:[]}));
 V2.vers[p.id]=[{v:verLabel||'契約',date:new Date().toISOString().slice(0,10),file:fileName||'合約.docx',state:'目前採用',note:'AI 依條文拆出 '+p.contract.length+' 項（示意）'}];
 p.upd='剛剛';V3.saveNew();return p.contract.length};
window.V3=V3;
})();
