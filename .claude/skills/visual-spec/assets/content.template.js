/* 圖文對照需求文件 內容設定樣板
 * 複製到 功能/{功能名}/03_規格文件/_圖文對照_content.js，把「（…）」換成實際內容後執行：
 *   node <skill>/assets/build.js 03_規格文件/_圖文對照_content.js --root <功能資料夾>
 * 完整實例：references/競合分析_content_範例.js
 *
 * 寫作規則（務必遵守，見 SKILL.md）：
 *  - 只寫「做什麼、長怎樣、規則是什麼」，不寫「已確認／PM 確認日期／原本是…」這類決策歷程
 *  - 唯一要標的是待確認：用 Q 標籤 ❓；暫定項目先依雛型實作
 *  - 資訊視窗等已有公版的畫面，不過度規定細節，註明「以現有系統公版為準」
 */
const MI = global.MI;   /* build.js 會預載 Material Icons 路徑（article/add/download/history/edit/del/lock），例：MI.article */
const PROTO = '../02_雛型/雛型_v{n}_{功能名}.html';   /* 相對於 03_規格文件 */
const PN = '?state=';                       /* 雛型用 ?state=xxx 直接開到指定畫面 */
const Q = '<span class="b q">❓ 待確認</span>';

/* 畫面節：rows 的序號＝圖上編號；imgs[].hs＝[編號, x, y]（x,y 為截圖像素座標，build 會換算成百分比定位） */
const S = [
  {
    id: 's1', t: '（畫面名稱）', f: 'F-01',
    open: [['開啟雛型：（畫面名稱）', PROTO + PN + '（state 值）']],   /* 每節一到多顆「開啟雛型」按鈕；xlsx 連結會自動用 📊 */
    imgs: [{ f: 'v{n}_（截圖檔名）.png', c: '（圖說）', hs: [[1, 100, 100], [2, 100, 200]] }],
    rows: [
      ['（項目 1）', '（說明；可用 <b>、<code>，待確認處加 ' + Q + '）'],
      ['（項目 2）', '（說明）']
    ]
  }
];

module.exports = {
  shotsDir: '02_雛型/畫面截圖',
  out: '03_規格文件/{功能名}_需求說明_圖文對照版_v{n}.html',
  title: '{功能名} 需求說明（圖文對照版）',
  subtitle: '{客戶}「{系統名}」｜合約項次 {x.x}｜對應雛型 v{n}｜{日期}（提供技術開發參考）',
  /* 標題列按鈕：順序固定為 雛型 → 其他附件（Excel 範本等）→ 需求規格文件 → 驗收條件文件（最後一個） */
  buttons: [
    ['▶ 開啟雛型 v{n}（操作畫面）', PROTO],
    ['📄 需求規格文件', '01_需求規格_{功能名}_v{n}.md'],
    ['✅ 驗收條件文件', '{功能名}_驗收條件_v{n}.html']
  ],
  qs: [['Q-01', '（尚待確認的問題）', '技術／客戶／PM']],     /* 只放待確認；沒有就給 [] */
  background: '（背景與目標，1～3 句）',
  archNote: '（架構圖說明；實作方式由技術團隊決定）',
  archSvg: null,   /* 系統架構圖：貼 inline SVG 內容（從 'class="arch" viewBox=…>' 開始，到 </svg> 之前）；不需要就 null */
  flow: '（畫面動線一句話）',
  shortNames: ['（畫面總覽縮圖標籤，與 sections 同序）'],
  funcs: [['F-01', '（功能名稱）', '（一句話說明）', ['s1']]],
  extraCards: [],  /* 其他總覽卡片（例：狀態／階段色票），HTML 字串 */
  sections: S,
  fields: [['（分類）', '（欄位）', '（型態）', '必填／選填', '（選項／規則，選項直接列出）']],
  rules: ['（不屬於單一畫面的其他規則）'],
  icons: [],   /* 專案規定圖示庫時才填：[['位置','用途','material_icon_name', svg path d 或 null]]；留空則省略第 4 章 */
  iconTitle: '圖示對照',
  iconNote: '',
  footer: '本文件由雛型 v{n} 彙整；雛型為討論用示意。'
};
