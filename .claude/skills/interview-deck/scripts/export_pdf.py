"""把訪談簡報 HTML 匯出成 PDF（每個畫面一頁，說明框分頁的每一頁各出一頁）。
用法：python export_pdf.py <簡報.html> <輸出.pdf> <暫存資料夾> [總頁數]
需要：Chrome（headless）、Pillow。簡報須有 slides／cur／showQPage 全域變數（見 SKILL.md）。
"""
import subprocess, urllib.parse, re, sys
from pathlib import Path
from PIL import Image

src, pdf, tmpdir = Path(sys.argv[1]).resolve(), Path(sys.argv[2]).resolve(), Path(sys.argv[3]).resolve()
total = int(sys.argv[4]) if len(sys.argv) > 4 else 40
CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe'
INJ = r'''<style>#nav{display:none!important}</style><script>
setTimeout(function(){try{var q=new URLSearchParams(location.search).get('q'),sl=slides[cur],st=sl._qp;
document.body.dataset.qn=st?st.pages.length:1;if(q&&st)showQPage(sl,+q)}catch(e){document.body.dataset.qn=1}},2500);
</script></body>'''
tmpdir.mkdir(parents=True, exist_ok=True)
tmp = src.parent / '_pdf_tmp.html'          # 暫存檔放在同資料夾，雛型與圖片的相對路徑才找得到
tmp.write_text(src.read_text(encoding='utf-8').replace('</body>', INJ, 1), encoding='utf-8')
base = 'file:///' + urllib.parse.quote(tmp.as_posix())   # 中文路徑必須 URL-encode，參數才不會被當檔名

def run(extra, url):
    return subprocess.run([CHROME, '--headless', '--disable-gpu', '--hide-scrollbars', '--virtual-time-budget=9000']
                          + extra + ['--window-size=1600,900', url], capture_output=True)

imgs = []
prev = []
try:
    for n in range(1, total + 1):
        r = run(['--dump-dom'], base + f'#p{n}')
        m = re.search(r'data-qn="(\d+)"', r.stdout.decode('utf-8', 'ignore'))
        qn = int(m.group(1)) if m else 1
        shots = []
        for k in range(qn):
            f = tmpdir / f'p{n}_{k}.png'
            run([f'--screenshot={f}', '--force-device-scale-factor=1.25'], base + f'?q={k}#p{n}')
            shots.append(Image.open(f).convert('RGB'))
        # 超出總頁數時，go() 會停在最後一頁，內容與前一頁相同 → 視為結束
        if prev and any(shots[0].tobytes() == q.tobytes() for q in prev):
            break
        prev = shots
        imgs += shots
        print('page', n, 'x', qn)
finally:
    tmp.unlink(missing_ok=True)
imgs[0].save(pdf, save_all=True, append_images=imgs[1:], resolution=150)
print('輸出', len(imgs), '頁', pdf)
