/* SyncSpec 雛型示範資料：各專案內容不同。韋能二階取自專案記憶，其餘為虛構示範。 */
(function(){
const STG=['尚未開始','初步構想','功能細節規劃','規劃調整','產出規格','規格調整'];
const CAT={dev:'功能開發',pm:'專案管理',doc:'文件產出',buy:'採購',gis:'圖資處理',other:'其他'};
const P={};
/* ---------- 韋能二階 ---------- */
P.wn={id:'wn',ivDate:'2026-11-20',upd:'今天 10:42',closed:'',name:'韋能二階',client:'台灣韋能能源',sub:'土地評估圖台增補',cat:'能源與圖資',tag:'能源圖台',tagc:'brand',mine:true,theme:'wn',
 contractFile:'合約_瑞竣圖台建置增補協議.docx',parsed:'2026-11-16 09:12',
 members:[['EvieLiu','evieliu','專案管理部','PM','E','',1],['AllenYeh','allenyeh','系統開發部','PG','A','b',0],['IanPeng','ianpeng','系統開發部','PG','I','c',0]],
 contract:[
  ['1','專案管理（時程協調、客服、驗收協助）','pm',96,'項次 1',1,'時程協調、客服、驗收協助；依每月月會記錄執行。','名稱含「管理」「協調」，屬於管理類工作，非系統功能。'],
  ['2.1','進階圖層介接與套疊','gis',91,'項次 2.1',1,'第二階段圖層上架。','工作內容是圖層上架與套疊，偏圖資處理。'],
  ['2.2','共用升壓站資料整理與上架','gis',93,'項次 2.2',1,'資料整理與圖台上架。','以資料整理與上架為主，屬圖資處理。'],
  ['2.3','2015 全台地籍圖圖磚處理與上架','gis',94,'項次 2.3',1,'圖磚處理與圖台上架。','圖磚處理屬圖資處理。'],
  ['2.4','競合分析','dev',97,'項次 2.4',1,'資料表、圖台展繪＋點擊查詢、點資料共編（記錄編輯歷程）、點資料匯出表格。','包含資料編輯與查詢介面，需要功能開發。其中資料表數化可另拆為圖資處理。'],
  ['2.5','進階匯出成果','dev',89,'項次 2.5',1,'套疊圖面成果、統計成果細節。','匯出功能，需要開發。'],
  ['2.6','kml 上傳／下載','dev',98,'項次 2.6',1,'上傳 kml 面範圍查詢；查詢面範圍下載為 kml。','新增上傳與下載功能，需要開發。'],
  ['3.1','後台登入紀錄','dev',95,'項次 3.1',1,'登入紀錄（帳號、時間、IP）。','後台新增紀錄查詢畫面。'],
  ['3.2','後台資料下載紀錄','dev',95,'項次 3.2',1,'資料下載紀錄（帳號、下載時間、下載 PDF）。','後台新增紀錄查詢畫面。'],
  ['4.1','資安弱點掃描','other',74,'項次 4.1',0,'基本弱掃與報告，不提供修正措施。','屬檢測服務，不是功能開發也不是文件產出；信心偏低，請確認。'],
  ['—','保固服務（驗收後一年）','other',61,'保固條款',0,'原服務與擴充服務自擴充服務驗收完成後起算一年保固。','這句是保固條款，可能不是工作項目；建議確認後刪除或歸為其他。'],
  ['—','差旅餐費須事前書面同意','other',52,'費用條款',0,'差旅餐費等未經甲方事前書面同意不得另請款。','這是費用條款，不太像工項；建議刪除。']],
 items:[
  {no:'2.4',name:'競合分析',pm:'AllenYeh',docFile:'文件/競合分析_圖文對照需求說明_v4.html',specFile:'文件/競合分析_需求規格文件_v4.html',acFile:'文件/競合分析_驗收條件文件_v4.html',stage:5,auto:1,tbd:[['Q-09','鎖定狀態如何即時同步','技術'],['Q-19','點位圖徵與顏色為暫定，待客戶看過','客戶']],docs:['ok','old','ok'],upd:'今天 10:42',screens:['cmp_layers','cmp_list','cmp_filter','cmp_hot','cmp_dots','cmp_popup','cmp_edit','cmp_pick','cmp_idle','cmp_trace','cmp_export','cmp_manage']},
  {no:'2.5',name:'進階匯出成果',stage:0,auto:1,tbd:[],docs:['no','no','no'],upd:'—',screens:[]},
  {no:'2.6',name:'kml 上傳／下載',pm:'EvieLiu',iv:{on:1},stage:2,auto:1,tbd:[['Q-09','檔案大小與頂點數上限','PM／技術'],['Q-10','繪製畫面的「下載 KML」之後是否補回','客戶'],['Q-11','匯出資料多選要與 2.5 進階匯出對齊','PM']],docs:['ok','old','no'],upd:'12 分鐘前',screens:['kml']},
  {no:'3.1',name:'後台登入紀錄',stage:4,auto:1,tbd:[],docs:['ok','ok','ok'],upd:'昨天',screens:['loginlog']},
  {no:'3.2',name:'後台資料下載紀錄',pm:'AllenYeh',iv:{on:1},stage:1,auto:1,tbd:[['Q-14','下載 PDF 的紀錄是否含檔名','PM'],['Q-15','紀錄保留期限','客戶']],docs:['no','no','no'],upd:'昨天',screens:['dllog']}],
 materials:[
  {n:'合約_瑞竣圖台建置增補協議.docx',e:'docx',t:'合約',m:'已解析 · 12 項工項 · 2026-11-16 上傳 · EvieLiu',tags:['合約','AI 抽出 12 項工項'],kind:'paper'},
  {n:'現有系統_空間分析.png',e:'png',t:'現有系統',m:'1.2 MB · 2026-11-11 · AllenYeh',tags:['現有系統','AI 已讀取畫面文字'],kind:'shot',lab:'空間分析面板：繪製查詢／地籍查詢／行政區查詢，分析結果依群組列出命中數。'},
  {n:'現有系統_圖層套疊.png',e:'png',t:'現有系統',m:'1.4 MB · 2026-11-11 · AllenYeh',tags:['現有系統','AI 已讀取畫面文字'],kind:'shot',lab:'圖層套疊：群組可折疊、圖層勾選加透明度滑桿、圖例浮窗。'},
  {n:'競合分析資料表_光電市場競合表.xlsx',e:'xlsx',t:'需求',m:'295 KB · 520 筆 · 2026-10-13 · IanPeng',tags:['需求','資料來源'],kind:'xl'},
  {n:'0923_月會會議記錄.pdf',e:'pdf',t:'未分類',m:'450 KB · 剛剛上傳 · AI 分類中…',tags:['未分類'],kind:'none'}],
 activity:[['A','b','Allen 標註了 <b>2.6 kml</b> 雛型：上傳區文字','12 分鐘前'],['E','','Evie 產生了 <b>2.4 競合分析</b> 規格文件 v4','今天 10:42'],['I','c','Ian 將 <b>3.2 資料下載紀錄</b> 階段改為「初步構想」','昨天']],
 ref:['cards','energy','decide']};
/* ---------- NCDR健康豬（虛構示範） ---------- */
P.nh={id:'nh',ivDate:'2026-11-25',upd:'今天 09:15',closed:'',name:'NCDR健康豬',client:'NCDR',sub:'系統開發',cat:'防災資訊',tag:'防災資訊',tagc:'violet',mine:true,theme:'nh',
 contractFile:'NCDR健康豬_系統開發合約.docx',parsed:'2026-11-13 14:30',
 members:[['EvieLiu','evieliu','專案管理部','PM','E','',1],['YvonneChen','yvonne','系統開發部','PG','Y','d',0]],
 contract:[
  ['1','專案管理與月會','pm',95,'第 1 項',1,'依月會執行時程協調與進度回報。','管理類工作。'],
  ['2','需求訪談與系統分析報告','doc',90,'第 2 項',1,'完成需求訪談並提交系統分析報告。','交付物是文件。'],
  ['3','豬場疫情通報填報','dev',96,'第 3.1 項',1,'提供豬場通報填報與審核流程。','新增填報與審核功能。'],
  ['4','疫情預警地圖','dev',94,'第 3.2 項',1,'於地圖展示通報分布與預警。','地圖展示與查詢功能。'],
  ['5','統計報表與匯出','dev',92,'第 3.3 項',1,'依期間與地區產出統計報表並匯出。','報表與匯出功能。'],
  ['6','後台權限管理','dev',93,'第 3.4 項',1,'帳號、角色與資料範圍管理。','後台管理功能。'],
  ['7','外部資料介接','other',68,'第 4 項',0,'與外部單位資料介接。','不確定算功能開發還是資料處理，請確認。'],
  ['8','教育訓練','other',85,'第 5 項',0,'辦理使用者教育訓練 2 場。','屬訓練服務。'],
  ['9','驗收文件與保固','doc',88,'第 6 項',1,'提交驗收文件，保固一年。','文件與服務。']],
 items:[
  {no:'3',name:'豬場疫情通報填報',stage:3,auto:1,tbd:[['Q-01','通報是否需要主管審核','客戶'],['Q-02','附件大小上限','PM']],docs:['ok','old','no'],upd:'今天 09:15',screens:['nhform']},
  {no:'4',name:'疫情預警地圖',pm:'YvonneChen',iv:{on:1},stage:2,auto:1,tbd:[['Q-03','預警顏色分級門檻','客戶']],docs:['ok','no','no'],upd:'昨天',screens:['nhmap']},
  {no:'5',name:'統計報表與匯出',stage:1,auto:1,tbd:[],docs:['no','no','no'],upd:'3 天前',screens:['nhrep']},
  {no:'6',name:'後台權限管理',stage:0,auto:1,tbd:[],docs:['no','no','no'],upd:'—',screens:[]}],
 materials:[
  {n:'NCDR健康豬_系統開發合約.docx',e:'docx',t:'合約',m:'已解析 · 9 項工項 · 2026-11-13 上傳 · EvieLiu',tags:['合約','AI 抽出 9 項工項'],kind:'paper'},
  {n:'月會紀錄_1110.pdf',e:'pdf',t:'需求',m:'380 KB · 2026-11-10 · EvieLiu',tags:['需求','會議記錄'],kind:'none'}],
 activity:[['E','','Evie 補充了 <b>3 豬場疫情通報填報</b> 的待定事項','今天 09:15'],['Y','d','Yvonne 標註了 <b>4 疫情預警地圖</b> 雛型：圖例位置','昨天']],
 ref:['cards','decide']};
/* ---------- 新北景觀（虛構示範） ---------- */
P.nb={id:'nb',upd:'3 週前',closed:'',name:'新北景觀',client:'新北市政府',sub:'觀賞樹木管理',cat:'景觀工程',tag:'景觀工程',tagc:'mint',mine:false,theme:'nb',
 contractFile:'新北景觀_觀賞樹木管理系統合約.docx',parsed:'2026-08-20 10:05',
 members:[['AllenYeh','allenyeh','系統開發部','PG','A','b',1],['EvieLiu','evieliu','專案管理部','PM','E','',0],['MinaLo','minalo','專案管理部','PM','M','e',0]],
 contract:[
  ['1','專案管理','pm',96,'第 1 項',1,'時程協調與月會。','管理類。'],
  ['2','觀賞樹木資料盤點','dev',95,'第 2 項',1,'建立樹木基本資料與盤點作業。','需要資料管理功能。'],
  ['3','巡檢紀錄登錄','dev',94,'第 3 項',1,'巡檢結果登錄與查詢。','需要登錄與查詢功能。'],
  ['4','養護排程與提醒','dev',90,'第 4 項',1,'養護排程與到期提醒。','需要排程與通知功能。'],
  ['5','樹籍圖資數化','gis',92,'第 5 項',1,'既有樹籍圖資數化上架。','圖資處理。'],
  ['6','巡檢平板採購','buy',82,'第 6 項',1,'採購巡檢用平板 10 台。','採購項目。'],
  ['7','成果報告書','doc',91,'第 7 項',1,'提交期中與期末報告。','文件產出。'],
  ['8','教育訓練','other',85,'第 8 項',1,'辦理教育訓練。','訓練服務。'],
  ['9','驗收協助','pm',80,'第 9 項',1,'協助機關驗收。','管理類。'],
  ['10','保固維運','other',77,'第 10 項',1,'保固期間維運。','維運服務。']],
 items:[
  {no:'2',name:'觀賞樹木資料盤點',stage:5,auto:1,tbd:[],docs:['ok','ok','ok'],upd:'7 月',screens:['nbtree','nbdetail']},
  {no:'3',name:'巡檢紀錄登錄',stage:4,auto:1,tbd:[],docs:['ok','ok','ok'],upd:'7 月',screens:['nbpatrol']},
  {no:'4',name:'養護排程與提醒',stage:2,auto:1,tbd:[],docs:['ok','no','no'],upd:'8 月',screens:[]}],
 materials:[
  {n:'新北景觀_觀賞樹木管理系統合約.docx',e:'docx',t:'合約',m:'已解析 · 10 項工項 · 2026-08-20 上傳',tags:['合約'],kind:'paper'},
  {n:'成果報告書_期中.pdf',e:'pdf',t:'需求',m:'1.1 MB · 2026-06',tags:['需求'],kind:'none'}],
 activity:[['M','e','Mina 將 <b>2 觀賞樹木資料盤點</b> 規格定稿','7 月']],
 ref:['cards','landscape']};
/* ---------- 韋能一階（已結案，虛構示範） ---------- */
P.wn1={id:'wn1',upd:'2026-06-30',closed:'2026-06-30',name:'韋能一階',client:'台灣韋能能源',sub:'土地評估圖台建置',cat:'能源與圖資',tag:'能源圖台',tagc:'brand',mine:true,theme:'wn',
 contractFile:'合約_瑞竣圖台建置_BD-0000-2512-221.docx',parsed:'2025-12-22 09:00',
 members:[['EvieLiu','evieliu','專案管理部','PM','E','',1],['AllenYeh','allenyeh','系統開發部','PG','A','b',0]],
 contract:[['1','專案管理','pm',95,'項次 1',1,'時程協調與月會。','管理類。'],['2.1','土地評估圖台建置','dev',97,'項次 2.1',1,'建置土地評估圖台與基本圖層套疊。','需要功能開發。'],['2.2','空間分析','dev',96,'項次 2.2',1,'提供繪製與行政區空間分析。','需要功能開發。'],['3','教育訓練','other',85,'項次 3',1,'辦理教育訓練。','訓練服務。']],
 items:[{no:'2.1',name:'土地評估圖台建置',stage:5,auto:1,tbd:[],docs:['ok','ok','ok'],upd:'2026-05',screens:['layers']},{no:'2.2',name:'空間分析',stage:5,auto:1,tbd:[],docs:['ok','ok','ok'],upd:'2026-05',screens:['complist']}],
 materials:[{n:'合約_瑞竣圖台建置_BD-0000-2512-221.docx',e:'docx',t:'合約',m:'已解析 · 4 項工項 · 2025-12-22 上傳',tags:['合約'],kind:'paper'}],
 activity:[['E','','Evie 將專案結案','2026-06-30']],ref:['cards','energy']};
/* ---------- NCDR合作案（虛構示範） ---------- */
P.nh2={id:'nh2',upd:'11/11',closed:'',name:'NCDR合作案',client:'NCDR',sub:'合作案',cat:'防災資訊',tag:'防災資訊',tagc:'violet',mine:false,theme:'nh',
 contractFile:'NCDR合作案_合約.docx',parsed:'2026-11-05 11:00',
 members:[['IanPeng','ianpeng','系統開發部','PL','I','c',1],['EvieLiu','evieliu','專案管理部','PM','E','',0]],
 contract:[['1','專案管理','pm',95,'第 1 項',1,'月會與進度回報。','管理類。'],['2','需求訪談','doc',90,'第 2 項',1,'完成需求訪談紀錄。','文件。'],['3','資料分析報表','dev',92,'第 3 項',1,'提供資料分析報表。','報表功能。']],
 items:[{no:'3',name:'資料分析報表',stage:1,auto:1,tbd:[['Q-01','報表欄位範圍','客戶']],docs:['no','no','no'],upd:'11/11',screens:['nhrep']}],
 materials:[{n:'NCDR合作案_合約.docx',e:'docx',t:'合約',m:'已解析 · 3 項工項',tags:['合約'],kind:'paper'}],
 activity:[['I','c','Ian 建立專案','11/05']],ref:['cards']};
/* ---------- 農水署（已結案，虛構示範） ---------- */
P.ns={id:'ns',upd:'2025-12-31',closed:'2025-12-31',name:'農水署發電回饋金',client:'農業部農水署',sub:'發電回饋金系統',cat:'能源與圖資',tag:'能源圖台',tagc:'brand',mine:false,theme:'wn',
 contractFile:'農水署_發電回饋金系統合約.docx',parsed:'2025-03-10 10:00',
 members:[['AllenYeh','allenyeh','系統開發部','PG','A','b',1]],
 contract:[['1','專案管理','pm',95,'項次 1',1,'月會與進度回報。','管理類。'],['2','歷年發電量清冊下載','dev',96,'項次 2',1,'提供指定期間的清冊查詢與下載。','需要功能開發。']],
 items:[{no:'2',name:'歷年發電量清冊下載',stage:5,auto:1,tbd:[],docs:['ok','ok','ok'],upd:'2025-11',screens:['dllog']}],
 materials:[{n:'農水署_發電回饋金系統合約.docx',e:'docx',t:'合約',m:'已解析 · 2 項工項',tags:['合約'],kind:'paper'}],
 activity:[['A','b','Allen 將專案結案','2025-12-31']],ref:['cards']};/* ---------- 警大（空專案） ---------- */
P.pd={id:'pd',upd:'今天',closed:'',name:'警大',client:'警大',sub:'尚未上傳合約',cat:'未分類',tag:'未分類',tagc:'',mine:true,theme:'wn',contractFile:null,members:[['EvieLiu','evieliu','專案管理部','PM','E','',1]],contract:[],items:[],materials:[],activity:[],ref:['cards']};

/* ---------- 公司素材庫（跨專案，另外控管） ---------- */
const LIB=[
 {id:'cards',name:'功能卡（過往專案經驗）',desc:'單位做過的功能：解決什麼、核心流程、踩過的雷',n:'4 張',owner:'專案管理部',scope:'全公司',access:'所有成員可讀；PM 可提議新增，管理員審核',tone:'brand'},
 {id:'decide',name:'決策與踩雷',desc:'客戶拍板的決定與事後發現的問題',n:'3 則',owner:'專案管理部',scope:'全公司',access:'所有成員可讀；僅管理員可編輯',tone:'sun'},
 {id:'prod',name:'公司產品資料',desc:'公司圖台、平台類產品的功能清單與操作手冊（示範）',n:'6 份',owner:'產品部',scope:'全公司',access:'所有成員可讀；產品部維護',tone:'mint'},
 {id:'energy',name:'領域知識：能源與電業',desc:'光電開發流程、相關法規與名詞（示範）',n:'12 份',owner:'顧問團隊',scope:'限部門：能源專案組',access:'能源專案組成員可讀；其他專案需申請',tone:'violet'},
 {id:'landscape',name:'領域知識：景觀與樹木',desc:'樹種、巡檢與養護規範（示範）',n:'8 份',owner:'顧問團隊',scope:'限部門：景觀專案組',access:'景觀專案組成員可讀；其他專案需申請',tone:'violet'},
 {id:'secret',name:'客戶機敏資料（受限）',desc:'含客戶名稱、金額、聯絡人，需去識別後才能被專案引用',n:'5 份',owner:'主管',scope:'僅指定專案',access:'僅被授權的專案可引用；每次引用留稽核紀錄',tone:'coral'}
];
/* ---------- 工具 ---------- */
const q=new URLSearchParams(location.search);
function curId(){let id=q.get('p');try{if(id)localStorage.setItem('ss_proj',id);else id=localStorage.getItem('ss_proj')}catch(e){}return P[id]?id:'wn'}
window.DB={pmOf(p,key){let o=null;try{o=JSON.parse(localStorage.getItem('ss_pm_'+p.id))}catch(e){}if(o&&o[key])return o[key];const it=p.items.find(i=>i.no===key);if(it&&it.pm)return it.pm;return (p.members.find(m=>m[6])||p.members[0]||[])[0]||''},setPm(p,key,v){let o={};try{o=JSON.parse(localStorage.getItem('ss_pm_'+p.id))||{}}catch(e){}o[key]=v;try{localStorage.setItem('ss_pm_'+p.id,JSON.stringify(o))}catch(e){}},isClosed(p){let v=null;try{v=localStorage.getItem('ss_closed_'+p.id)}catch(e){}return v==='1'?(p.closed||'今天'):v==='0'?'':p.closed},setClosed(p,on){try{localStorage.setItem('ss_closed_'+p.id,on?'1':'0')}catch(e){}},P,STG,CAT,LIB,cur(){return P[curId()]},id:curId,set(id){try{localStorage.setItem('ss_proj',id)}catch(e){}},
 refOf(p){let r=null;try{r=JSON.parse(localStorage.getItem('ss_ref_'+p.id))}catch(e){}return r||p.ref},
 setRef(p,arr){try{localStorage.setItem('ss_ref_'+p.id,JSON.stringify(arr))}catch(e){}},
 stat(p){const dev=p.items.length,tbd=p.items.reduce((a,i)=>a+i.tbd.length,0),spec=p.items.filter(i=>i.docs[2]==='ok').length;return {all:p.contract.length,dev,tbd,spec}},
 href(page){return page+(page.includes('?')?'&':'?')+'p='+curId()}};
/* 在 v3 流程中新建立的專案（存在本分頁 sessionStorage）：所有頁面都要認得 */
try{(JSON.parse(sessionStorage.getItem('ss_newp'))||[]).forEach(x=>{if(!P[x.p.id])P[x.p.id]=x.p})}catch(e){}
})();
