# 簡報與雛型重產工具

這個資料夾放「改完雛型或簡報後，重新產出 PDF／PPTX」需要的腳本。對話紀錄刪掉之後，照這份說明操作即可，不需要任何先前的對話內容。

## 檔案說明

| 檔案 | 用途 |
|---|---|
| `render_mapbox.mjs` | 用 Mapbox 地圖截圖：雛型畫面 7 張（PPTX 用）＋簡報頁面約 24 張（PDF 用）。token 從環境變數讀取，不寫進檔案 |
| `make_outputs.py` | 用上面的截圖組出 PDF 與 PPTX，覆蓋 `02_雛型` 內的同名檔 |
| `gen_pptx.py` | 產 PPTX 的主程式（由 `make_outputs.py` 呼叫） |
| `build_mapbox.py` | 把 `雛型_v6_總覽.html`（簡易 SVG 地圖版）轉成 `雛型_v6_Mapbox版.html`（實際地圖版） |

## 重產 PDF／PPTX 的步驟

在 PowerShell，先切到 `02_雛型` 資料夾：

1. 設定 token（只在這個視窗有效，關掉就消失）：`$env:MBTOKEN = 'pk.你的token'`
2. 截圖（約 8 到 10 分鐘，跑完會印「全部完成」）：`node _tools\render_mapbox.mjs`
3. 組檔：`py -X utf8 _tools\make_outputs.py`

需要：Node.js 22 以上、Google Chrome、Python 3（含 python-pptx、Pillow、lxml）。

## 注意事項

- **token 永遠不要寫進 HTML**。簡報與雛型都是開啟時在網址加 `?token=pk.xxx`。
- **Artifact 無法顯示 Mapbox 地圖**（平台限制外部圖磚），簡報 Artifact 的地圖區會是空的；要看地圖請用本機 HTML、PDF 或 PPTX。
- 雛型有兩份：`雛型_v6_總覽.html`（簡易 SVG 地圖）與 `雛型_v6_Mapbox版.html`（實際地圖）。目前簡報用的是 Mapbox 版。之後修改畫面時請改 Mapbox 版；如果改了 SVG 版，要重跑 `build_mapbox.py` 才會同步（會覆蓋 Mapbox 版）。
- 簡報內的標註編號位置，是照雛型 1500×860 的畫面對位的。雛型版面改動後，要檢查簡報 HTML 裡各頁 `at:[x,y]` 的座標。
- PPTX 每個雛型頁只有一張投影片組，不另外產「附圖」頁。
- 截圖若出現「地圖可能未載入完」，通常只是等待時間判斷，圖本身多半正常；若地圖真的空白，確認網路與 token。
