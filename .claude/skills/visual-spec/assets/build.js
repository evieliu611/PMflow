#!/usr/bin/env node
/* 圖文對照需求文件 產生器
 * 用法：node build.js <content.js 路徑> [--root <功能資料夾>]
 *   content.js 為內容設定（格式見 content.template.js；完整實例見 ../references/競合分析_content_範例.js）
 *   --root 省略時，取 content.js 往上找到含 02_雛型 的資料夾
 * 產出：單檔自包含 HTML（截圖以 base64 內嵌、離線可開）
 */
const fs = require('fs'), path = require('path');
const cfgPath = path.resolve(process.argv[2] || '');
if (!process.argv[2] || !fs.existsSync(cfgPath)) { console.error('用法：node build.js <content.js> [--root <功能資料夾>]'); process.exit(1); }
global.MI = require('./mi.json');
const C = require(cfgPath);
let ROOT = null;
const ri = process.argv.indexOf('--root'); if (ri > 0) ROOT = path.resolve(process.argv[ri + 1]);
if (!ROOT) { let d = path.dirname(cfgPath); for (let i = 0; i < 6; i++) { if (fs.existsSync(path.join(d, '02_雛型'))) { ROOT = d; break; } d = path.dirname(d); } }
if (!ROOT) { console.error('找不到功能資料夾（含 02_雛型），請用 --root 指定'); process.exit(1); }
const A = f => fs.readFileSync(path.join(__dirname, f), 'utf8');
const SHOTS = path.join(ROOT, C.shotsDir || '02_雛型/畫面截圖');
const dim = f => { const b = fs.readFileSync(path.join(SHOTS, f)); return [b.readUInt32BE(16), b.readUInt32BE(20)]; };
const img = f => 'data:image/png;base64,' + fs.readFileSync(path.join(SHOTS, f)).toString('base64');
const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;');
const S = C.sections, short = C.shortNames || [];
const gf = n => `https://fonts.google.com/icons?icon.set=Material+Icons&selected=Material+Icons+Outlined:${n}:&icon.size=24&icon.color=%23FFFFFF&icon.query=${n}`;

/* 檢查：每節圖上編號必須對得到右側說明列（圖號＝rows 序號） */
for (const s of S) for (const m of s.imgs) for (const [n] of m.hs) if (n < 1 || n > s.rows.length) console.warn(`⚠ ${s.id} 圖號 ${n} 超出說明列數 ${s.rows.length}`);

const SIDE = ['<a href="#qs" data-t="qs">❓ 待確認事項</a>', '<a href="#ov" data-t="ov">0 總覽</a>', '<div class="gp">1 畫面逐一對照</div>',
  ...S.map((s, i) => `<a href="#${s.id}" data-t="${s.id}">1.${i + 1} ${s.t}</a>`),
  '<a href="#fields" data-t="fields">2 編輯案場欄位表</a>', '<a href="#rules" data-t="rules">3 其他規則</a>', ...((C.icons||[]).length?['<a href="#icons" data-t="icons">4 圖示對照</a>']:[])].join('');

const secHtml = (s, i) => {
  const figs = s.imgs.map(m => { const [w, h] = dim(m.f); return `<figure><div class="imgw"><img src="${img(m.f)}" alt="${m.c}" loading="lazy">${m.hs.map(([n, x, y]) => `<button class="hs" data-n="${n}" style="left:${(x / w * 100).toFixed(2)}%;top:${(y / h * 100).toFixed(2)}%" aria-label="編號 ${n}">${n}</button>`).join('')}</div><figcaption>${m.c}</figcaption></figure>`; }).join('');
  const rows = s.rows.map((r, k) => `<tr data-n="${k + 1}"><td class="n"><button class="rn" data-n="${k + 1}">${k + 1}</button></td><th>${r[0]}</th><td>${r[1]}</td></tr>`).join('');
  return `<section id="${s.id}" class="sec" data-sel=""><div class="sh"><span class="num">1.${i + 1}</span><h3>${s.t}</h3><span class="fid">${s.f}</span></div>
<div class="bar">${s.open.map(([t, u]) => `<a class="btn" href="${u}" target="_blank" rel="noopener">${/xlsx$/.test(u) ? '📊' : '▶'} ${t}</a>`).join('')}<span class="hint">點圖上編號只看該項說明，再點一次顯示全部</span><button class="all">顯示全部</button></div>
<div class="cols"><div class="figs">${figs}</div><div class="spec"><table>${rows}</table></div></div></section>`;
};
const iconRow = r => `<tr><td>${r[0]}</td><td>${r[1]}</td><td><code>${r[2]}</code></td><td>${r[3] ? `<svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor"><path d="${r[3]}"/></svg>` : '—'}</td><td>${/^[a-z_]+$/.test(r[2]) ? `<a href="${gf(r[2])}" target="_blank" rel="noopener">Google Fonts</a>` : /expand/.test(r[2]) ? `<a href="${gf('expand_more')}" target="_blank" rel="noopener">expand_more</a>／<a href="${gf('expand_less')}" target="_blank" rel="noopener">expand_less</a>` : '—'}</td></tr>`;
const secLink = id => { const i = S.findIndex(s => s.id === id); return `<a href="#${id}">1.${i + 1}</a>`; };

const qsRows = (C.qs || []).map(q => `<tr><td>${q[0]}</td><td>${q[1]}</td><td>${q[2]}</td></tr>`).join('');
const qsBlock = qsRows ? `<details class="qs" id="qs" open><summary>❓ 待確認事項（點此收合／展開）</summary><div class="in"><table><tr><th>項目</th><th>內容</th><th>決策者</th></tr>${qsRows}</table></div></details>` : '<span id="qs"></span>';
const arch = C.archSvg ? `<div class="card"><b>系統架構（邏輯示意）</b><p style="margin:.3em 0 .8em;color:var(--mut);font-size:13.5px">${C.archNote || ''}</p><svg class="arch"${C.archSvg}</svg></div>` : '';
const smap = S.map((s, i) => `<a class="sm" href="#${s.id}"><img class="thumb" data-from="${s.id}" alt=""><div><b>1.${i + 1}</b>${short[i] || s.t}</div></a>`).join('');
const funcs = (C.funcs || []).map(f => `<tr><td>${f[0]}</td><td>${f[1]}</td><td>${f[2]}</td><td>${f[3].map(secLink).join('、')}</td></tr>`).join('');
const btns = (C.buttons || []).map(([t, u]) => `<a class="btn" href="${u}" target="_blank" rel="noopener">${t}</a>`).join('');

const iconsBlock = (C.icons || []).length ? `<h2 id="icons">4　${C.iconTitle || '圖示對照'}</h2>
<div class="card scroll"><p style="margin:0 0 8px;color:var(--mut);font-size:13.5px">${C.iconNote || ''}</p>
<table><tr><th>位置</th><th>用途</th><th>圖示名稱</th><th>預覽</th><th>連結</th></tr>${(C.icons || []).map(iconRow).join('')}</table></div>
` : '';
const html = `<!doctype html><html lang="zh-Hant"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${C.title}</title>
<style>
${A('style.css')}
${C.extraCss || ''}
</style></head><body><div class="wrap"><div class="layout"><button id="burger" aria-label="開啟／收合大綱" aria-expanded="false"><svg viewBox="0 0 24 24"><path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/></svg>大綱 <span class="cur">待確認事項</span></button><aside class="side" id="side"><div class="gt">快速跳到</div>${SIDE}</aside><div class="main">
<header class="top"><h1>${C.title}</h1>
<p>${C.subtitle}</p>
<p>每節左側為畫面、右側為規格；點畫面上的圖號可只看該項說明，再點一次回到完整說明。每節都有按鈕可直接開啟雛型實際操作。</p>
<div class="tl">${btns}</div></header>

${qsBlock}

<nav class="toc"><b>目錄</b><a href="#ov">0 總覽</a>${S.map((s, i) => `<a href="#${s.id}">1.${i + 1} ${s.t}</a>`).join('')}<a href="#fields">2 欄位表</a>${(C.icons||[]).length?'<a href="#icons">4 圖示對照</a>':''}</nav>

<h2 id="ov">0　總覽</h2>
<div class="card"><b>背景與目標</b><p style="margin:.4em 0 0">${C.background}</p></div>
${arch}
<div class="card"><b>畫面總覽</b><p class="flow">${C.flow || ''}</p><div class="smap">${smap}</div></div>
<div class="card scroll"><table><tr><th>編號</th><th>功能</th><th>一句話說明</th><th>章節</th></tr>${funcs}</table></div>
${(C.extraCards || []).join('\n')}

<h2>1　畫面逐一對照</h2>
${S.map(secHtml).join('')}

<h2 id="fields">2　編輯案場欄位表</h2>
<div class="card fields scroll"><table><tr><th>分類</th><th>欄位</th><th>型態</th><th>必填</th><th>選項／規則</th></tr>${C.fields.map(r => `<tr>${r.map(c => `<td>${esc(c)}</td>`).join('')}</tr>`).join('')}</table></div>

<h2 id="rules">3　其他規則</h2>
<div class="card"><ul style="margin:0 0 0 1.2em;padding:0">${(C.rules || []).map(r => `<li>${r}</li>`).join('')}</ul></div>

${iconsBlock}
<footer>${C.footer || ''}</footer>
</div></div></div>
<script>
${A('behavior.js')}
</script></body></html>`;
const out = path.join(ROOT, C.out);
fs.mkdirSync(path.dirname(out), { recursive: true });
fs.writeFileSync(out, html);
console.log('ok', out, Math.round(html.length / 1024) + 'KB');
