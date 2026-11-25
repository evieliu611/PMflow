#!/usr/bin/env node
/* 用法：node build_ac.js [--root <功能資料夾>]  （省略時從目前目錄往上找含 02_雛型 的資料夾） */
const {fs,path,ROOT,PROTO_FILE,VER,SPEC_FILE,FEAT}=require('./_ctx.js');
const md=fs.readFileSync(ROOT+'/03_規格文件/'+SPEC_FILE,'utf8').split(/\r?\n/);
const rows=[];let inAC=false;
for(const L of md){
 if(L.startsWith('## 六、')){inAC=true;continue;}
 if(inAC&&L.startsWith('## ')&&!L.startsWith('## 六')){break;}
 if(inAC&&/^\| AC-/.test(L)){const c=L.replace(/^\||\|$/g,'').split('|').map(s=>s.trim());rows.push({id:c[0],cat:c[1],f:c[2],given:c[3],when:c[4],then:c[5],note:c[8]||''});}
}
const esc=s=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/\*\*([^*]+)\*\*/g,'<b>$1</b>');
const cats=[...new Set(rows.map(r=>r.cat))],fs_=[...new Set(rows.map(r=>r.f))];
const html=`<!doctype html><html lang="zh-Hant"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${FEAT} 驗收條件</title>
<style>
:root{--bg:#f4f6fa;--card:#fff;--ink:#1d2433;--mut:#667085;--line:#e2e6ee;--navy:#0f2a5a;--teal:#0f9aa8;--ok:#0a7a4b;--okbg:#e5f6ee}
@media (prefers-color-scheme:dark){:root{--bg:#0e1420;--card:#161e2e;--ink:#e6eaf2;--mut:#9aa6bb;--line:#263149;--navy:#9db8ff;--teal:#4cc9d6;--ok:#6fdca8;--okbg:#12362a}}
*{box-sizing:border-box}body{margin:0;background:var(--bg);color:var(--ink);font:14.5px/1.6 "Noto Sans TC","Microsoft JhengHei",system-ui,sans-serif}
.wrap{max-width:1500px;margin:0 auto;padding:20px 16px 60px}a{color:var(--teal)}
header{background:linear-gradient(135deg,#0f2a5a,#0f9aa8);color:#fff;border-radius:14px;padding:22px 26px}header h1{margin:0 0 6px;font-size:24px}header p{margin:2px 0;opacity:.92}
.btns{display:flex;gap:8px;flex-wrap:wrap;margin-top:12px}.btn{display:inline-block;background:#fff;color:#0f2a5a !important;border-radius:8px;padding:5px 12px;font-weight:700;font-size:13.5px;text-decoration:none;border:0;cursor:pointer}
.sum{display:flex;gap:12px;flex-wrap:wrap;margin:16px 0}.sum div{background:var(--card);border:1px solid var(--line);border-radius:10px;padding:8px 16px;min-width:130px}.sum b{display:block;font-size:22px}
.flt{display:flex;gap:8px;flex-wrap:wrap;align-items:center;margin-bottom:10px;position:sticky;top:0;background:var(--bg);padding:8px 0;z-index:5}
.flt button,.flt select,.flt input{border:1px solid var(--line);background:var(--card);color:var(--ink);border-radius:8px;padding:5px 10px;font:inherit;cursor:pointer}.flt button.on{background:var(--navy);color:var(--card);border-color:var(--navy)}
.flt input[type=search]{min-width:200px;cursor:text}
table{width:100%;border-collapse:collapse;background:var(--card);border:1px solid var(--line)}th,td{border-bottom:1px solid var(--line);padding:8px 10px;text-align:left;vertical-align:top;font-size:13.5px}
th{background:color-mix(in srgb,var(--card) 80%,var(--line));position:sticky;top:50px;white-space:nowrap}
td.c{text-align:center;width:1%;white-space:nowrap}td.id{font-weight:700;white-space:nowrap}
.cat{white-space:nowrap;display:inline-block;padding:0 8px;border-radius:99px;font-size:12px;font-weight:700;background:color-mix(in srgb,var(--card) 80%,var(--teal) 20%);color:var(--teal)}
input[type=checkbox]{width:20px;height:20px;accent-color:var(--teal);cursor:pointer}
tr.done td{background:var(--okbg)}tr.hide{display:none}
.note{width:100%;min-width:120px;border:1px solid var(--line);background:var(--bg);color:var(--ink);border-radius:6px;padding:3px 6px;font:inherit}
.hint{color:var(--mut);font-size:13px;margin:6px 0}
@media print{body{background:#fff}.flt,.btns{display:none}th{position:static}}
</style></head><body><div class="wrap">
<header><h1>${FEAT} 驗收條件（v${VER}）</h1>
<p>依 <a style="color:#fff" href="${SPEC_FILE}">需求規格 v${VER}</a> 第六章整理，PG 自測與 PM 驗收共用；勾選結果存在這個瀏覽器（localStorage），可匯出 CSV 留存。</p>
<p>流程：PG 交付前逐項自測勾「PG自測」，全勾才交 PM；PM 驗收勾「PM驗收」。不通過的在備註寫現象：是 bug → PG 修復後複測；是需求認知差異或客戶改需求 → 回 /req-intake 從雛型改起。</p>
<div class="btns"><a class="btn" href="${FEAT}_需求說明_圖文對照版_v${VER}.html">← 圖文對照版</a><a class="btn" href="${SPEC_FILE}" target="_blank" rel="noopener">📄 需求規格文件</a><a class="btn" href="../02_雛型/${PROTO_FILE}" target="_blank" rel="noopener">▶ 開啟雛型 v${VER}</a><button class="btn" id="csv">⬇ 匯出結果 CSV</button><button class="btn" id="clr">清除所有勾選</button></div></header>
<div class="sum"><div>總測項<b id="n-all">${rows.length}</b></div><div>PG 自測完成<b id="n-pg">0</b></div><div>PM 驗收通過<b id="n-pm">0</b></div><div>尚未完成<b id="n-left">${rows.length}</b></div></div>
<div class="flt"><span>類別：</span><button data-c="" class="on">全部</button>${cats.map(c=>`<button data-c="${esc(c)}">${esc(c)}</button>`).join('')}
<select id="fsel"><option value="">全部 F-編號</option>${fs_.map(x=>`<option>${esc(x)}</option>`).join('')}</select><input type="search" id="q" placeholder="搜尋內容…"><label>PG自測：<select id="fpg"><option value="">全部</option><option value="done">已完成</option><option value="todo">未完成</option></select></label><label>PM驗收：<select id="fpm"><option value="">全部</option><option value="done">已通過</option><option value="todo">未通過／未驗</option></select></label></div>
<table><thead><tr><th>AC</th><th>類別</th><th>對應 F</th><th>Given（前置）</th><th>When（操作）</th><th>Then（預期結果）</th><th>PG自測</th><th>PM驗收</th><th>備註</th></tr></thead><tbody>
${rows.map(r=>`<tr data-id="${esc(r.id)}" data-c="${esc(r.cat)}" data-f="${esc(r.f)}"><td class="id">${esc(r.id)}</td><td><span class="cat">${esc(r.cat)}</span></td><td>${esc(r.f)}</td><td>${esc(r.given)}</td><td>${esc(r.when)}</td><td>${esc(r.then)}</td><td class="c"><input type="checkbox" data-k="pg"></td><td class="c"><input type="checkbox" data-k="pm"></td><td><input class="note" data-k="note" value=""></td></tr>`).join('\n')}
</tbody></table>
<p class="hint">驗收彙總：總測項 ${rows.length}｜通過 __｜不通過 __（可於 05_驗收/ 留存匯出的 CSV 與不通過項目的處理紀錄）</p>
</div>
<script>
const KEY='${FEAT}驗收v${VER}';let st={};try{st=JSON.parse(localStorage.getItem(KEY)||'{}')}catch(e){}
const save=()=>{try{localStorage.setItem(KEY,JSON.stringify(st))}catch(e){}};
const trs=[...document.querySelectorAll('tbody tr')];
let cat='',fv='',q='',fpg='',fpm='';
function paint(){let pg=0,pm=0;trs.forEach(tr=>{const s=st[tr.dataset.id]||{};tr.querySelectorAll('input').forEach(i=>{if(i.type==='checkbox')i.checked=!!s[i.dataset.k];else if(i.dataset.k==='note')i.value=s.note||'';});
 if(s.pg)pg++;if(s.pm)pm++;tr.classList.toggle('done',!!(s.pg&&s.pm));
 const t=tr.textContent.toLowerCase();const show=(!cat||tr.dataset.c===cat)&&(!fv||tr.dataset.f===fv)&&(!q||t.includes(q))&&(!fpg||(fpg==='done')===!!s.pg)&&(!fpm||(fpm==='done')===!!s.pm);tr.classList.toggle('hide',!show);});
 document.getElementById('n-pg').textContent=pg;document.getElementById('n-pm').textContent=pm;document.getElementById('n-left').textContent=trs.length-trs.filter(t=>{const s=st[t.dataset.id]||{};return s.pg&&s.pm}).length;}
trs.forEach(tr=>tr.querySelectorAll('input').forEach(i=>{const h=()=>{const id=tr.dataset.id;st[id]=st[id]||{};st[id][i.dataset.k]=i.type==='checkbox'?i.checked:i.value;save();paint();};i.addEventListener(i.type==='checkbox'?'change':'input',h);}));
document.querySelectorAll('.flt [data-c]').forEach(b=>b.addEventListener('click',()=>{cat=b.dataset.c;document.querySelectorAll('.flt [data-c]').forEach(x=>x.classList.toggle('on',x===b));paint();}));
document.getElementById('fsel').addEventListener('change',e=>{fv=e.target.value;paint();});
document.getElementById('q').addEventListener('input',e=>{q=e.target.value.trim().toLowerCase();paint();});
document.getElementById('fpg').addEventListener('change',e=>{fpg=e.target.value;paint();});document.getElementById('fpm').addEventListener('change',e=>{fpm=e.target.value;paint();});
document.getElementById('clr').addEventListener('click',()=>{if(confirm('清除所有勾選與備註？')){st={};save();paint();}});
document.getElementById('csv').addEventListener('click',()=>{const q=s=>'"'+String(s||'').replace(/"/g,'""')+'"';const L=['AC,類別,對應F,PG自測,PM驗收,備註'];trs.forEach(tr=>{const s=st[tr.dataset.id]||{};L.push([tr.dataset.id,tr.dataset.c,tr.dataset.f,s.pg?'✔':'',s.pm?'✔':'',s.note||''].map(q).join(','));});
 const b=new Blob(['\\ufeff'+L.join('\\n')],{type:'text/csv'});const a=document.createElement('a');a.href=URL.createObjectURL(b);a.download='${FEAT}驗收結果.csv';a.click();});
paint();
</script></body></html>`;
fs.writeFileSync(ROOT+'/03_規格文件/'+FEAT+'_驗收條件_v'+VER+'.html',html);console.log('ac ok',rows.length);
