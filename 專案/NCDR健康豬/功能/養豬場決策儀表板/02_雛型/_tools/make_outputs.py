"""由 render_mapbox.mjs 的截圖，組出簡報 PDF 與 PPTX。不需要 token。

用法（在 02_雛型 資料夾內）：
    py -X utf8 _tools\\make_outputs.py

前置：先跑過 node _tools\\render_mapbox.mjs，產生 _render_out\\clean4~10.png 與 _render_out\\pdf\\*.png
需要：Python 3、python-pptx、Pillow、lxml、Chrome（抽簡報資料用）、LibreOffice（只在要預覽時）
輸出：20261126_NCDR養豬場平台_需求訪談.pdf／.pptx（直接覆蓋 02_雛型 內同名檔）
"""
import json, re, html, shutil, subprocess, sys, urllib.parse
from pathlib import Path
from PIL import Image

ROOT = Path.cwd()
TOOLS = ROOT / '_tools'
OUT = ROOT / '_render_out'
WORK = TOOLS / '_work'
NAME = '20261126_NCDR養豬場平台_需求訪談'
DECK = ROOT / (NAME + '.html')
CHROME = next((p for p in ['C:/Program Files/Google/Chrome/Application/chrome.exe',
                           'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe'] if Path(p).exists()), None)
if not (OUT / 'clean4.png').exists() or not (OUT / 'pdf' / 'files.json').exists():
    sys.exit('找不到 _render_out 的截圖，請先執行 node _tools\\render_mapbox.mjs')
WORK.mkdir(exist_ok=True)

# 1. 從簡報 HTML 取出 RAW 資料（標題、說明、標註位置、問題）
tmp = ROOT / '_tmp_raw.html'
src = DECK.read_text(encoding='utf-8')
tmp.write_text(src.replace('</body>', '<script>setTimeout(function(){var p=document.createElement("pre");p.id="rawout";p.textContent=JSON.stringify({RAW:RAW,SECNAME:(typeof SECNAME!=="undefined"?SECNAME:null)});document.body.appendChild(p)},800)</script></body>', 1), encoding='utf-8')
try:
    r = subprocess.run([CHROME, '--headless=new', '--virtual-time-budget=6000', '--dump-dom', 'file:///' + urllib.parse.quote(tmp.resolve().as_posix())], capture_output=True)
finally:
    tmp.unlink(missing_ok=True)
m = re.search(r'<pre id="rawout">(.*?)</pre>', r.stdout.decode('utf-8', 'ignore'), re.S)
d = json.loads(html.unescape(m.group(1)))
rawj = WORK / 'raw.json'
if d['SECNAME'] is None and rawj.exists():
    d['SECNAME'] = json.load(open(rawj, encoding='utf-8'))['SECNAME']
if d['SECNAME'] is None:
    d['SECNAME'] = {'1': '', '2': '需求釐清', '3': '目前規劃', '4': '需要確認'}
json.dump(d, open(rawj, 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
print('簡報頁數', len(d['RAW']))

# 2. PPTX
for n in range(4, 11):
    shutil.copy(OUT / f'clean{n}.png', WORK / f'clean{n}.png')
subprocess.run([sys.executable, '-X', 'utf8', str(TOOLS / 'gen_pptx.py'), str(WORK), str(ROOT / 'assets'), str(WORK / 'final.pptx')], check=True)
shutil.copy(WORK / 'final.pptx', ROOT / (NAME + '.pptx'))

# 3. PDF
files = json.load(open(OUT / 'pdf' / 'files.json'))
imgs = [Image.open(f).convert('RGB') for f in files]
pdf = ROOT / (NAME + '.pdf')
imgs[0].save(pdf, save_all=True, append_images=imgs[1:], resolution=150)
print('PDF', len(imgs), '頁', pdf.stat().st_size, 'bytes')
print('完成')
