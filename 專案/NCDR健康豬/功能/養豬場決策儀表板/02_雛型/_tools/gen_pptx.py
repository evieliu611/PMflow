import json, re, math, sys
from pathlib import Path
from pptx import Presentation
from pptx.util import Inches, Pt, Emu
from pptx.dml.color import RGBColor
from pptx.enum.shapes import MSO_SHAPE
from pptx.enum.text import PP_ALIGN, MSO_ANCHOR
from pptx.oxml.ns import qn
from lxml import etree
from PIL import Image

PP = Path(sys.argv[1])               # scratchpad/pp
ASSETS = Path(sys.argv[2])           # 02_雛型/assets
OUT = Path(sys.argv[3])
D = json.load(open(PP / 'raw.json', encoding='utf-8'))
RAW = D['RAW']
FONT = 'Microsoft JhengHei'


# ---- 與 HTML 簡報相同的色票 ----
def C(h): return RGBColor.from_string(h)


TEAL = C('44D2C4'); TEAL_DEEP = C('17978E'); MAG = C('A64D79'); MAG_SOFT = C('F4E6EE'); MAG_LINE = C('E3BFD1')
INK = C('3B3B3B'); INK2 = C('6A6A6A'); INK3 = C('9A9A9A'); LINE = C('E3EBEB'); SOFT = C('F2FAFA'); CARD_LINE = C('CFE9E6')
TITLE = C('444444'); WHITE = C('FFFFFF'); QB_TXT = C('4B2438'); PILL_LINE = C('BFE8E4')
SEC = {2: '需求釐清', 3: '目前規劃', 4: '需要確認'}

prs = Presentation()
prs.slide_width = Inches(13.333); prs.slide_height = Inches(7.5)
BLANK = prs.slide_layouts[6]


def strip(h): return re.sub(r'<[^>]+>', '', h.replace('<br>', '\n'))


def nofx(s):
    for e in s._element.iter(qn('a:effectRef')): e.set('idx', '0')
    return s


def set_run(r, size, bold=False, color=INK, italic=False, font=FONT):
    r.font.size = Pt(size); r.font.bold = bold; r.font.italic = italic; r.font.color.rgb = color; r.font.name = font


def tb(sl, x, y, w, h, text='', size=14, bold=False, color=INK, align=PP_ALIGN.LEFT, anchor=MSO_ANCHOR.TOP, name=None, italic=False, font=FONT, spc=None):
    s = sl.shapes.add_textbox(Inches(x), Inches(y), Inches(w), Inches(h))
    tf = s.text_frame; tf.word_wrap = True
    tf.margin_left = tf.margin_right = Inches(0.04); tf.margin_top = tf.margin_bottom = Inches(0.02)
    tf.vertical_anchor = anchor
    p = tf.paragraphs[0]; p.alignment = align
    r = p.add_run(); r.text = text; set_run(r, size, bold, color, italic, font)
    if spc: r._r.get_or_add_rPr().set('spc', str(spc))
    if name: s.name = name
    return s


def add_par(tf, text, size=14, bold=False, color=INK, space=4, first=False, bullet=False, align=PP_ALIGN.LEFT):
    p = tf.paragraphs[0] if first else tf.add_paragraph()
    p.space_after = Pt(space); p.alignment = align
    r = p.add_run(); r.text = text; set_run(r, size, bold, color)
    if bullet:
        pPr = p._p.get_or_add_pPr(); pPr.set('marL', str(int(Inches(0.2)))); pPr.set('indent', str(-int(Inches(0.2))))
        bc = etree.SubElement(pPr, qn('a:buChar')); bc.set('char', '•')
    return p


def rrect(sl, x, y, w, h, fill=WHITE, line=None, radius=0.06, name=None, lw=1.0):
    s = sl.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(x), Inches(y), Inches(w), Inches(h))
    s.adjustments[0] = radius
    if fill is None: s.fill.background()
    else: s.fill.solid(); s.fill.fore_color.rgb = fill
    if line is None: s.line.fill.background()
    else: s.line.color.rgb = line; s.line.width = Pt(lw)
    s.shadow.inherit = False; nofx(s)
    if name: s.name = name
    return s


def pill(sl, x, y, w, h, text, fill, color, size=11, line=None, name='標籤'):
    s = rrect(sl, x, y, w, h, fill, line=line, radius=0.5, name=name)
    tf = s.text_frame; tf.margin_top = tf.margin_bottom = 0; tf.margin_left = tf.margin_right = Inches(0.02)
    tf.vertical_anchor = MSO_ANCHOR.MIDDLE; tf.word_wrap = False
    p = tf.paragraphs[0]; p.alignment = PP_ALIGN.CENTER
    r = p.add_run(); r.text = text; set_run(r, size, True, color)
    return s


def base(n, title, sub='', sec=None, bg='bg-content.jpg'):
    sl = prs.slides.add_slide(BLANK)
    sl.shapes.add_picture(str(ASSETS / bg), 0, 0, prs.slide_width, prs.slide_height).name = '背景'
    rrect(sl, 0.53, 0.42, 12.27, 6.4, WHITE, radius=0.045, name='內容卡片')
    tb(sl, 0.9, 0.55, 8.0, 0.7, title, 30, True, TITLE, anchor=MSO_ANCHOR.MIDDLE, name='標題')
    if sub:
        sx = 0.9 + len(title) * 0.43 + 0.15
        tb(sl, sx, 0.66, 9.5, 0.5, sub, 18, False, INK2, anchor=MSO_ANCHOR.MIDDLE, name='副標')
    if sec:
        ask = sec == 4
        pill(sl, 11.3, 0.7, 1.25, 0.34, SEC[sec], MAG_SOFT if ask else SOFT, MAG if ask else TEAL_DEEP, 12, line=MAG_LINE if ask else PILL_LINE, name='段落標籤')
    tb(sl, 0.6, 6.93, 6.5, 0.3, 'WE GO BEYOND IMAGINATION', 11, False, WHITE, name='頁尾標語', font='Times New Roman', spc=300)
    sl.shapes.add_picture(str(ASSETS / 'logo-dark.png'), Inches(11.05), Inches(6.93), height=Inches(0.27)).name = 'Logo'
    ln = sl.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(12.3), Inches(6.95), Emu(9525), Inches(0.24))
    ln.fill.solid(); ln.fill.fore_color.rgb = C('7A8A8A'); ln.line.fill.background(); ln.name = '分隔線'; nofx(ln)
    tb(sl, 12.34, 6.9, 0.7, 0.32, f'P.{n}', 13, False, C('2F3B3B'), name='頁碼', italic=True)
    return sl


def fit_image(sl, path, x, y, w, h, name='圖片'):
    im = Image.open(path); iw, ih = im.size
    k = min(w / iw, h / ih); pw, ph = iw * k, ih * k
    pic = sl.shapes.add_picture(str(path), Inches(x + (w - pw) / 2), Inches(y), Inches(pw), Inches(ph))
    pic.line.color.rgb = C('CFD8DC'); pic.name = name
    return pic


def est_lines(text, width_in, size):
    per = max(1, int(width_in / (size / 72 * 0.93)))
    return sum(max(1, math.ceil(len(seg) / per)) for seg in text.split('\n'))


def question_box(sl, x, y, w, lines, title='待確認問題'):
    tb(sl, x, y, w, 0.35, title, 14, True, TEAL_DEEP, name='問題標題', spc=100)
    h = 0.3
    for l in lines: h += est_lines(l, w - 0.7, 15) * 0.29 + 0.1
    box = rrect(sl, x, y + 0.4, w, h, MAG_SOFT, line=MAG_LINE, radius=0.06, name='待確認問題', lw=1.5)
    tf = box.text_frame; tf.word_wrap = True; tf.vertical_anchor = MSO_ANCHOR.MIDDLE
    tf.margin_left = Inches(0.2); tf.margin_right = Inches(0.15)
    for i, l in enumerate(lines): add_par(tf, l, 15, True, QB_TXT, 6, first=(i == 0), bullet=True)
    return y + 0.4 + h


def cell_border(cell, bottom, width):
    tcPr = cell._tc.get_or_add_tcPr()
    fills = [e for e in tcPr if e.tag in (qn('a:solidFill'), qn('a:noFill'))]
    for e in list(tcPr): tcPr.remove(e)
    for tag in ('a:lnL', 'a:lnR', 'a:lnT'):
        e = etree.SubElement(tcPr, qn(tag)); e.set('w', '0'); etree.SubElement(e, qn('a:noFill'))
    e = etree.SubElement(tcPr, qn('a:lnB')); e.set('w', str(int(Pt(width))))
    sf = etree.SubElement(e, qn('a:solidFill')); c = etree.SubElement(sf, qn('a:srgbClr')); c.set('val', str(bottom))
    for f in fills: tcPr.append(f)
    if not fills: etree.SubElement(tcPr, qn('a:noFill'))


def style_table(gt):
    tblPr = gt._element.graphic.graphicData.tbl.tblPr
    for a in ('bandRow', 'firstRow'): tblPr.set(a, '0')
    sid = tblPr.find(qn('a:tableStyleId'))
    if sid is not None: sid.text = '{2D5ABB26-0587-4C30-8999-92F81FD0307C}'   # 無樣式、無格線


def fill_cell(c, text, size, bold, color, header=False):
    c.text = ''; p = c.text_frame.paragraphs[0]; r = p.add_run(); r.text = text; set_run(r, size, bold, color)
    c.fill.background(); c.vertical_anchor = MSO_ANCHOR.MIDDLE
    c.margin_left = Inches(0.1); c.margin_right = Inches(0.06); c.margin_top = c.margin_bottom = Inches(0.03)
    cell_border(c, TEAL if header else LINE, 2 if header else 1)


# ---------- 各頁 ----------
def cover(n, s):
    sl = prs.slides.add_slide(BLANK)
    sl.shapes.add_picture(str(ASSETS / 'bg-cover.jpg'), 0, 0, prs.slide_width, prs.slide_height).name = '背景'
    sl.shapes.add_picture(str(ASSETS / 'logo-white.png'), Inches(0.4), Inches(0.35), height=Inches(0.5)).name = 'Logo'
    tb(sl, 1.4, 2.15, 9.5, 2.2, s['title'].replace('\\n', '\n'), 46, True, WHITE, name='標題')
    tb(sl, 1.4, 4.4, 8, 0.6, s.get('lede', ''), 26, False, WHITE, name='副標')
    tb(sl, 1.4, 5.25, 8, 0.5, s.get('date', ''), 18, False, WHITE, name='署名')
    return sl


def table_slide(n, s):
    sl = base(n, s['title'], s.get('sub', ''), s['sec'])
    cols = s['cols']; rows = s['rows']
    gt = sl.shapes.add_table(len(rows) + 1, len(cols), Inches(0.9), Inches(1.55), Inches(11.5), Inches(0.5 * (len(rows) + 1)))
    gt.name = '資料來源表'; style_table(gt); tbl = gt.table
    for i, w in enumerate([3.3, 1.5, 5.1, 1.6][:len(cols)]): tbl.columns[i].width = Inches(w)
    for j, h in enumerate(cols): fill_cell(tbl.cell(0, j), h, 12, False, TEAL_DEEP, header=True)
    tbl.rows[0].height = Inches(0.42)
    for i, r in enumerate(rows, 1):
        tbl.rows[i].height = Inches(0.5)
        for j, v in enumerate(r):
            txt = strip(v)
            if j == 3: fill_cell(tbl.cell(i, j), txt, 12, True, TEAL_DEEP if '有資料' in txt else INK3)
            else: fill_cell(tbl.cell(i, j), txt, 14, False, INK)
    return sl


def cols5(n, s):
    sl = base(n, s['title'], s.get('sub', ''), s['sec'])
    cols = s['cols']; k = len(cols); gap = 0.15; w = (11.4 - gap * (k - 1)) / k
    for i, c in enumerate(cols):
        x = 0.9 + i * (w + gap)
        rrect(sl, x, 1.55, w, 5.0, WHITE, line=LINE, radius=0.04, name=f'資料來源{i+1}')
        tb(sl, x + 0.06, 1.62, w - 0.12, 0.6, c['h'], 14, True, MAG, name='來源名稱')
        box = tb(sl, x + 0.06, 2.3, w - 0.12, 4.15, '', 11, name='欄位清單')
        tf = box.text_frame
        for j, it in enumerate(c['items']): add_par(tf, it, 11, False, INK, 3, first=(j == 0), bullet=True)
    return sl


def card_h(q, w):
    tl = est_lines(q['text'], w - 0.35, 14)
    return 0.12 + 0.28 + 0.02 + tl * 0.28 + est_lines(q['now'], w - 0.35, 12) * 0.23 + 0.14


def paginate_cards(qs, cap_h, w):
    pages = [[]]; cur = 0
    for q in qs:
        h = card_h(q, w)
        if cur + h > cap_h and pages[-1]: pages.append([]); cur = 0
        pages[-1].append(q); cur += h + 0.1
    return pages


def proto(n, s):
    W = 4.0
    pages = paginate_cards(s['qs'], 4.55, W)
    for pi, pg in enumerate(pages):
        sl = base(n, s['title'], s.get('sub', ''), s['sec'])
        PX, PY, PW = 0.9, 1.6, 7.5
        pic = sl.shapes.add_picture(str(PP / f'clean{n}.png'), Inches(PX), Inches(PY), width=Inches(PW)); pic.name = '雛型畫面'
        pic.line.color.rgb = C('BCD8D8'); pic.line.width = Pt(1)
        k = PW / 1500
        for q in s['qs']:
            d = 0.3
            m = sl.shapes.add_shape(MSO_SHAPE.OVAL, Inches(PX + q['at'][0] * k - d / 2), Inches(PY + q['at'][1] * k - d / 2), Inches(d), Inches(d))
            m.name = '標號' + q['no']; m.fill.solid(); m.fill.fore_color.rgb = MAG
            m.line.color.rgb = WHITE; m.line.width = Pt(1.5); m.shadow.inherit = False; nofx(m)
            tf = m.text_frame; tf.margin_left = tf.margin_right = tf.margin_top = tf.margin_bottom = 0
            tf.vertical_anchor = MSO_ANCHOR.MIDDLE; tf.word_wrap = False
            pp = tf.paragraphs[0]; pp.alignment = PP_ALIGN.CENTER; rr = pp.add_run(); rr.text = q['no']; set_run(rr, 11, True, WHITE)
        x0 = 8.6
        head = '規劃說明' + (f'　{pi+1} / {len(pages)}' if len(pages) > 1 else '')
        tb(sl, x0, 1.5, W, 0.35, head, 14, True, TEAL_DEEP, name='規劃說明標題', spc=100)
        y = 1.95
        for q in pg:
            h = card_h(q, W)
            rrect(sl, x0, y, W, h, WHITE, line=CARD_LINE, radius=0.07, name=f'說明卡{q["no"]}', lw=1.5)
            pill(sl, x0 + 0.14, y + 0.1, 0.4, 0.26, q['no'], MAG, WHITE, 11, name='編號')
            tl = est_lines(q['text'], W - 0.35, 14)
            tb(sl, x0 + 0.1, y + 0.4, W - 0.2, tl * 0.29 + 0.05, q['text'], 14, True, INK, name='說明標題')
            tb(sl, x0 + 0.1, y + 0.42 + tl * 0.29, W - 0.2, h - 0.5 - tl * 0.29, q['now'], 12, False, INK2, name='說明內容')
            y += h + 0.1
    return sl


def cmp_slide(n, s):
    sl = base(n, s['title'], s.get('sub', ''), s['sec'])
    cols, rows = s['cols'], s['rows']
    gt = sl.shapes.add_table(len(rows) + 1, len(cols), Inches(0.9), Inches(1.55), Inches(7.4), Inches(0.34 * (len(rows) + 1)))
    gt.name = '欄位比較表'; style_table(gt); tbl = gt.table
    for i, w in enumerate([2.0, 2.85, 2.55]): tbl.columns[i].width = Inches(w)
    for j, h in enumerate(cols): fill_cell(tbl.cell(0, j), h, 11, False, TEAL_DEEP, header=True)
    tbl.rows[0].height = Inches(0.34)
    for i, r in enumerate(rows, 1):
        tbl.rows[i].height = Inches(0.34)
        for j, v in enumerate(r):
            na = v == '—'
            fill_cell(tbl.cell(i, j), strip(v), 12, j == 0, INK3 if na else (TITLE if j == 0 else INK))
    qb = s['qbox']
    yb = question_box(sl, 8.6, 1.55, 4.0, qb['lines'])
    if qb.get('img'):
        fit_image(sl, ASSETS / Path(qb['img']['src']).name, 8.6, yb + 0.12, 4.0, 6.5 - (yb + 0.12), '登記系統畫面')
    return sl


def fq(n, s):
    sl = base(n, s['title'], s.get('sub', ''), s['sec'])
    has_q = s.get('qbox') and s['qbox'].get('lines')
    W = 7.9 if has_q else 11.4
    y = 1.55
    for g in s['groups']:
        cw = [len(f) * 0.17 + 0.32 for f in g['fields']]
        xx = 0; r = 1
        for w in cw:
            if xx + w > W - 0.4: r += 1; xx = 0
            xx += w + 0.1
        h = 0.6 + r * 0.46 + 0.12
        rrect(sl, 0.9, y, W, h, WHITE, line=LINE, radius=0.05, name=g['h'], lw=1.0)
        tb(sl, 1.05, y + 0.1, W - 0.3, 0.4, g['h'], 16, True, TITLE, name='來源名稱')
        xx = 1.05; yy = y + 0.6
        for f, w in zip(g['fields'], cw):
            if xx + w > 0.9 + W - 0.15: xx = 1.05; yy += 0.46
            c = rrect(sl, xx, yy, w, 0.36, SOFT, line=CARD_LINE, radius=0.18, name='欄位')
            tf = c.text_frame; tf.margin_left = tf.margin_right = Inches(0.04); tf.margin_top = tf.margin_bottom = 0
            tf.word_wrap = False; tf.vertical_anchor = MSO_ANCHOR.MIDDLE
            p = tf.paragraphs[0]; p.alignment = PP_ALIGN.CENTER; rr = p.add_run(); rr.text = f; set_run(rr, 12, False, INK)
            xx += w + 0.1
        y += h + 0.2
    if has_q: question_box(sl, 9.05, 1.55, 3.6, s['qbox']['lines'])
    return sl


def qlist(n, s):
    sl = base(n, s['title'], s.get('sub', ''), s['sec'])
    tb(sl, 0.9, 1.5, 4, 0.35, '待確認問題', 14, True, TEAL_DEEP, name='問題標題', spc=100)
    y = 1.95
    for q in s['qs']:
        h = est_lines(q['text'], 10.8, 16) * 0.31 + 0.3
        rrect(sl, 0.9, y, 11.4, h, WHITE, line=CARD_LINE, radius=0.12, name='問題卡', lw=1.5)
        tb(sl, 1.1, y + 0.05, 11.0, h - 0.1, q['text'], 16, True, INK, anchor=MSO_ANCHOR.MIDDLE, name='問題')
        y += h + 0.16
    return sl


for i, s in enumerate(RAW, 1):
    k = s['kind']; before = len(prs.slides)
    {'cover': cover, 'table': table_slide, 'cols5': cols5, 'proto': proto, 'cmp': cmp_slide, 'fq': fq, 'qlist': qlist}[k](i, s)
    if s.get('note'):
        for sl in list(prs.slides)[before:]:
            sl.notes_slide.notes_text_frame.text = s['note']
prs.core_properties.title = '20261119_NCDR養豬場平台_需求訪談'
prs.core_properties.author = '瑞竣科技'
prs.save(str(OUT))
print('saved', OUT, len(prs.slides))
