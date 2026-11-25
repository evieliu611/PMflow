#!/usr/bin/env node
/* 用法：node inject_spec.js [--root <功能資料夾>]  （省略時從目前目錄往上找含 02_雛型 的資料夾） */
const {fs,path,ROOT,PROTO_FILE,VER,SPEC_FILE,FEAT}=require('./_ctx.js');
const md=fs.readFileSync(ROOT+'/03_規格文件/'+SPEC_FILE,'utf8').split(/\r?\n/);
const esc=s=>s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
const inl=s=>esc(s).replace(/\*\*([^*]+)\*\*/g,'<b>$1</b>').replace(/`([^`]+)`/g,'<code>$1</code>').replace(/!\[([^\]]*)\]\(([^)]+)\)/g,'');
let out=[],i=0,toc=[];
const slug=t=>'sp-'+t.replace(/[^\w\u4e00-\u9fa5]+/g,'-');
while(i<md.length){
 const L=md[i];
 if(!L.trim()){i++;continue;}
 let m;
 if((m=L.match(/^(#{1,4}) (.*)$/))){const n=m[1].length,t=m[2];const id=slug(t);if(n<=3)toc.push([n,t,id]);out.push(`<h${n+1} id="${id}">${inl(t)}</h${n+1}>`);i++;continue;}
 if(/^---+$/.test(L.trim())){out.push('<hr>');i++;continue;}
 if(L.startsWith('>')){let q=[];while(i<md.length&&md[i].startsWith('>')){q.push(inl(md[i].replace(/^>\s?/,'')));i++;}out.push('<blockquote>'+q.join('<br>')+'</blockquote>');continue;}
 if((m=L.match(/^!\[([^\]]*)\]\(([^)]+)\)\s*$/))){out.push(`<figure class="spimg"><img src="../03_規格文件/${m[2]}" alt="${esc(m[1])}"></figure>`);i++;continue;}
 if(L.startsWith('|')){const rows=[];while(i<md.length&&md[i].startsWith('|')){rows.push(md[i]);i++;}
  const cells=r=>r.replace(/^\||\|$/g,'').split('|').map(c=>c.trim());
  const head=cells(rows[0]);const body=rows.slice(2).map(cells);
  out.push('<div class="spscroll"><table><tr>'+head.map(c=>'<th>'+inl(c)+'</th>').join('')+'</tr>'+body.map(r=>'<tr>'+r.map(c=>'<td>'+inl(c)+'</td>').join('')+'</tr>').join('')+'</table></div>');continue;}
 if(/^- /.test(L)){const it=[];while(i<md.length&&/^- /.test(md[i])){it.push('<li>'+inl(md[i].slice(2))+'</li>');i++;}out.push('<ul>'+it.join('')+'</ul>');continue;}
 // 段落（連續行）
 const p=[];while(i<md.length&&md[i].trim()&&!/^(#|\||>|- |!\[|---)/.test(md[i])){p.push(inl(md[i]));i++;}
 out.push('<p>'+p.join('<br>')+'</p>');
}
const tocHtml='<nav class="sptoc"><b>快速跳到</b> '+toc.filter(t=>t[0]===2||(t[0]===3)).map(t=>`<a href="#${t[2]}">${esc(t[1].replace(/^\d+\.\d+ /,m=>m))}</a>`).join('')+'</nav>';
let html=out.join('\n');
// 標題後插入目錄（第一個 h2 之前）
html=html.replace('<h2 id=','__T__<h2 id=').replace('__T__',tocHtml);
// 第一個標題（h2=文件名）
const f=ROOT+'/02_雛型/'+PROTO_FILE;let h=fs.readFileSync(f,'utf8');
const a=h.indexOf("document.getElementById('spec').innerHTML="),b=h.indexOf('\n/* ===== 啟動');
if(a<0||b<0)throw new Error('markers');
const js="document.getElementById('spec').innerHTML="+JSON.stringify(html).replace(/<\//g,'<\/')+";";
h=h.slice(0,a)+js+h.slice(b);
fs.writeFileSync(f,h);
let css=fs.readFileSync(ROOT+'/02_雛型/_shared.css','utf8');
if(!css.includes('/* 規格檢視（正式規格文件）')){css+=`
/* 規格檢視（正式規格文件）：?spec=1 的內容即 03_規格文件/01_需求規格_*.md */
#spec{max-width:1280px;margin:0 auto}
#spec .spscroll{overflow-x:auto}#spec table{font-size:12.5px}#spec td,#spec th{min-width:64px}
#spec figure.spimg{margin:8px 0}#spec figure.spimg img{max-width:760px;width:100%;border:1px solid var(--line);border-radius:6px}
#spec h3{margin-top:30px;color:var(--navy)}#spec h4{margin-top:22px}#spec blockquote{margin:8px 0;padding:6px 12px;border-left:4px solid var(--teal);background:#f4f8fb;color:#445}
#spec .sptoc{position:sticky;top:0;background:#fff;border-bottom:1px solid var(--line);padding:8px 0;margin-bottom:10px;font-size:13px;z-index:5}#spec .sptoc a{margin-right:12px;white-space:nowrap}
`;fs.writeFileSync(ROOT+'/02_雛型/_shared.css',css);}
console.log('injected',Math.round(html.length/1024)+'KB');
