// 用 Mapbox 地圖截圖：簡報用的雛型畫面（7 張）＋簡報 PDF 用的頁面截圖（約 24 張）
// token 只從環境變數 MBTOKEN 讀取，不會寫進任何檔案。
//
// 用法（PowerShell，在 02_雛型 資料夾內）：
//   $env:MBTOKEN = 'pk.你的token'
//   node _tools\render_mapbox.mjs
//
// 中途卡住或中斷時：按 Ctrl+C 結束，再加 $env:RESUME = '1' 重跑，會跳過已完成的截圖。
//
// 輸出：02_雛型\_render_out\clean4.png ~ clean10.png（雛型畫面）、pdf\p{頁}_{序}.png（簡報頁面）
// 需要：Node.js 22 以上、Google Chrome。可用環境變數 CHROME 指定 Chrome 路徑、OUT 指定輸出資料夾。
import { spawn } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { pathToFileURL } from 'node:url';

const TOKEN = process.env.MBTOKEN || '';
if (!TOKEN && !process.env.ALLOW_NO_TOKEN) {
  console.error('找不到 token。請先執行：$env:MBTOKEN = \'pk.你的token\'');
  process.exit(1);
}
const RESUME = !!process.env.RESUME;
const ROOT = process.cwd();
const PROTO = path.join(ROOT, '雛型_v6_Mapbox版.html');
const DECK = path.join(ROOT, '20261126_NCDR養豬場平台_需求訪談.html');
if (!fs.existsSync(PROTO) || !fs.existsSync(DECK)) {
  console.error('請在 02_雛型 資料夾內執行（找不到雛型或簡報 HTML）。');
  process.exit(1);
}
const OUT = process.env.OUT || path.join(ROOT, '_render_out');
fs.mkdirSync(path.join(OUT, 'pdf'), { recursive: true });
const CHROME = process.env.CHROME || [
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
  path.join(process.env.LOCALAPPDATA || '', 'Google/Chrome/Application/chrome.exe')
].find(p => fs.existsSync(p));
if (!CHROME) { console.error('找不到 Chrome，請用環境變數 CHROME 指定路徑。'); process.exit(1); }

const sleep = ms => new Promise(r => setTimeout(r, ms));
const tokenQ = TOKEN ? '&token=' + encodeURIComponent(TOKEN) : '';
const protoUrl = q => pathToFileURL(PROTO).href + q;

// ---- Chrome 連線（逾時就重開，避免卡死）----
let chrome = null, ws = null, id = 0, pend = new Map(), curMetrics = null;
async function launch() {
  await shutdown();
  const PORT = 9400 + Math.floor(Math.random() * 500);
  const prof = path.join(os.tmpdir(), 'mb_render_prof_' + PORT);
  chrome = spawn(CHROME, [
    '--headless=new', `--remote-debugging-port=${PORT}`, '--enable-unsafe-swiftshader', '--use-angle=swiftshader',
    '--ignore-gpu-blocklist', '--hide-scrollbars', '--user-data-dir=' + prof, 'about:blank'
  ], { stdio: 'ignore' });
  let wsUrl;
  for (let i = 0; i < 60 && !wsUrl; i++) {
    try { const l = await (await fetch(`http://127.0.0.1:${PORT}/json`)).json(); const p = l.find(x => x.type === 'page'); if (p) wsUrl = p.webSocketDebuggerUrl; } catch (e) {}
    if (!wsUrl) await sleep(500);
  }
  if (!wsUrl) throw new Error('Chrome 啟動失敗');
  ws = new WebSocket(wsUrl);
  await new Promise(r => ws.onopen = r);
  id = 0; pend = new Map();
  ws.onmessage = ev => { const m = JSON.parse(ev.data); if (m.id && pend.has(m.id)) { pend.get(m.id)(m); pend.delete(m.id); } };
  await send('Page.enable');
}
async function shutdown() {
  try { if (ws) ws.close(); } catch (e) {}
  try { if (chrome) chrome.kill(); } catch (e) {}
  ws = null; chrome = null;
}
const send = (method, params = {}, timeout = 60000) => new Promise((res, rej) => {
  const i = ++id;
  const t = setTimeout(() => { pend.delete(i); rej(new Error('逾時 ' + method)); }, timeout);
  pend.set(i, m => { clearTimeout(t); res(m); });
  ws.send(JSON.stringify({ id: i, method, params }));
});
const ev = async expr => { const r = await send('Runtime.evaluate', { expression: expr, returnByValue: true }); return r.result && r.result.result ? r.result.result.value : undefined; };
async function setSize(w, h, scale) {
  curMetrics = [w, h, scale];
  await send('Emulation.setDeviceMetricsOverride', { width: w, height: h, deviceScaleFactor: scale, mobile: false });
}
// 失敗就重開 Chrome 再試，最多 3 次
async function retry(label, fn) {
  for (let a = 1; a <= 3; a++) {
    try { return await fn(); }
    catch (e) {
      console.log(`  ${label} 失敗（${e.message}），重新啟動 Chrome 再試（${a}/3）`);
      await launch(); if (curMetrics) await setSize(...curMetrics);
    }
  }
  throw new Error(label + ' 連續失敗');
}

await launch();

// ---- A. 雛型畫面（簡報 PPTX 用，1500×860）----
const VIEWS = {
  4: '?view=overview', 5: '?view=farms&farm=B10231&open=base', 6: '?view=farms&farm=B10231',
  7: '?view=slh', 8: '?view=slh', 9: '?view=rend', 10: '?view=epi'
};
await setSize(1500, 860, 1);
const ready = `(function(){try{return !!(window.MREADY&&MAP.loaded()&&!MAP.isMoving())}catch(e){return false}})()`;
for (const [n, q] of Object.entries(VIEWS)) {
  const f = path.join(OUT, `clean${n}.png`);
  if (RESUME && fs.existsSync(f)) { console.log(`雛型畫面 clean${n}.png 已存在，跳過`); continue; }
  await retry(`clean${n}`, async () => {
    await send('Page.navigate', { url: protoUrl(q + '&deck=1' + tokenQ) });
    await sleep(3000);
    if (n === '8') { await ev(`document.querySelector('.c.wide').scrollIntoView();true`); await sleep(1500); }
    let ok = false;
    for (let i = 0; i < 90; i++) { if (await ev(ready) === true) { ok = true; break; } await sleep(500); }
    await sleep(2500);
    const r = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(f, Buffer.from(r.result.data, 'base64'));
    console.log(`雛型畫面 clean${n}.png ${ok ? '完成' : '（地圖可能未載入完）'}`);
  });
}

// ---- B. 簡報頁面（PDF 用，1600×900，解析度 1.25 倍）----
const inj = `<style>#nav{display:none!important}</style><script>
setTimeout(function(){try{var q=new URLSearchParams(location.search).get('q'),sl=slides[cur],st=sl._qp;document.body.dataset.qn=st?st.pages.length:1;if(q&&st)showQPage(sl,+q)}catch(e){document.body.dataset.qn=1}},2500);
</script></body>`;
const tmpDeck = path.join(ROOT, '_render_tmp.html');
fs.writeFileSync(tmpDeck, fs.readFileSync(DECK, 'utf8').replace('</body>', inj));
const deckUrl = (n, k) => pathToFileURL(tmpDeck).href + `?q=${k}&n=${n}&k=${k}${tokenQ}#p${n}`;
const protoPages = new Set([4, 5, 6, 7, 8, 9, 10]);
const qnFile = path.join(OUT, 'pdf', 'qn.json');
const QN = RESUME && fs.existsSync(qnFile) ? JSON.parse(fs.readFileSync(qnFile, 'utf8')) : {};
const files = [];
await setSize(1600, 900, 1.25);
try {
  for (let n = 1; n <= 14; n++) {
    let qn = QN[n];
    const have = k => path.join(OUT, 'pdf', `p${n}_${k}.png`);
    if (!qn) {
      qn = await retry(`第 ${n} 頁`, async () => {
        await send('Page.navigate', { url: deckUrl(n, 0) });
        await sleep(3500);
        return parseInt(await ev('document.body.dataset.qn') || '1') || 1;
      });
      QN[n] = qn; fs.writeFileSync(qnFile, JSON.stringify(QN));
    }
    for (let k = 0; k < qn; k++) {
      const f = have(k);
      files.push(f);
      if (RESUME && fs.existsSync(f)) continue;
      await retry(`第 ${n} 頁第 ${k + 1} 張`, async () => {
        await send('Page.navigate', { url: deckUrl(n, k) });
        await sleep(3500);
        if (protoPages.has(n)) await sleep(12000);
        const r = await send('Page.captureScreenshot', { format: 'png' });
        fs.writeFileSync(f, Buffer.from(r.result.data, 'base64'));
      });
    }
    console.log(`簡報第 ${n} 頁 ${qn} 張`);
  }
} finally {
  try { fs.unlinkSync(tmpDeck); } catch (e) {}
}
fs.writeFileSync(path.join(OUT, 'pdf', 'files.json'), JSON.stringify(files));
await shutdown();
console.log('全部完成，輸出在：' + OUT);
process.exit(0);
