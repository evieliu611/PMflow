---
name: API介接規格摘要
description: 防檢署三套 API（牧場資訊管理、疫情通報、屠宰衛生檢查）的端點、驗證、查詢限制、回傳欄位與已知落差；改介接欄位、判斷資料能不能取得時先讀這份
metadata:
  type: reference
---

來源：[[素材清冊]] 第二批（介接說明書 4 份）。主辦單位＝農業部動植物防疫檢疫署，使用單位帳號為 NCDR。三份全文在 `_共用素材/需求摘要/介接說明書_*`。

## 共通
- **我方不直接呼叫 API**（PM 2026-11-18）：NCDR 把這些 API 寫進資料庫，我方只讀資料庫；下列限制是 NCDR 取數時的限制，用來理解資料如何進來。
- 驗證：先以帳密（防檢署核發）取得 token，再帶入查詢；牧場／疫情 token 30 分鐘（expires_in 1800）、屠宰衛生 token 3600 秒；過期重取（疫情／牧場：DA1008；屠宰衛生：E401）。
- 正式與測試網域不同（牧場、疫情：ahis3.aphia.gov.tw 與 ahisx.aphia.gov.tw:8090；屠宰衛生：meatoa.aphia.gov.tw 與 ertos.aphia.gov.tw）。
- 防疫統編是各系統共通鍵，格式 `^[ABCD][0-9]{5}$`（屠宰衛生規格明定）。

## 牧場資訊管理系統（FarmAPI2，現行版 1151110）
- POST `/FarmAPI2/User`、POST `/FarmAPI2/FarmData`；參數 FType（All、牛場、羊場、其他類型、非牧場自建點、家禽場、屠宰場或肉品市場、鳥園、鹿場、豬場）與 LastModifyDate（空白＝全部，否則該日含以後的異動）。
- 回傳欄位：M_FarmTongBian 防疫統編、animalKind 牧場種類、animalAmount 飼養頭數、ranchName、ranchAddress 場址、owner、lat、lon、clientDataTime、DocNumber_1 牧場防疫編號、FAddress 聯絡地址、FOwner、FContact、status（正常／列管／停養）、statusModify（新增 1、修改 -1）。
- 與 1151109 差異：端點 getAllData → FarmData；新增 animalAmount；移除 geom。
- 無縣市、鄉鎮、村里、登記證、設施欄位；縣市鄉鎮要從場址解析或對登記系統。

## 疫情通報系統（Disease API）
- POST `/Disease/API/User`、POST `/Disease/API/DiseaseLog`；參數 SDate、EDate（異動日期區間，**單次不可超過一年**）；測試機資料 2019-01-08～2024-10-14。
- 回傳欄位：EventDate 通報日、EventName 通報人、DeaDate 發病日、M_FarmTongBian 防疫統編（**可 null**）、FarmName、CountryName 縣市、TownName 鄉鎮、lat、lon（可 null）、AnilData[Anil, Num] 送檢動物（1～6 筆）、DiseaseData[DiseaseName] 初步診斷（1～3）、DiseaseConfirmData[DiseaseNameConfirm] 確診名稱（1～3）、Determine 判定日期。
- 範例另有 CaseID 案號，但欄位表沒列；沒有判定結果欄與發病頭數。

## 屠宰衛生檢查資訊系統（規格書 v0.1，2026-10-28，陳淑媛）
- 兩支 GET，皆 `?queryDate=yyyyMMdd`，**只接受前一天（D-1）**，依 createTime 或 updateTime 的日期篩選；被刪除的資料在刪除當日仍回傳（dataStatus = D）。
- 家畜健康證明書：`https://meatoa.aphia.gov.tw/baphiqOA/api/LivestockAnnouncement`；欄位 serialNo 流水號（唯一）、slaughterCity、slaughterhouseName、slaughterhouseCode（4 碼）、entryTime、epidemicPreventionNo、farmName、livestock{pig, cattle, goat}、createTime、updateTime、dataStatus。
- 化製原料來源單：`https://ertos.aphia.gov.tw/api/SourOfRawMaterials`；欄位 sourceFormNo 唯一、formDate、epidemicPreventionNo、sourceFarmName、abortedStillborn、piglet、growerPig、finisherPig、cattle、goat、createTime、updateTime、dataStatus。
- 錯誤碼：0000 成功、E001 缺 queryDate、E002 格式錯、E003 僅提供前一天、E401 token、E402 帳密、E999 系統異常。

## 資料品質（來自全量匯出樣本）
- 化製 3,469 筆統編欄 EpidemicPreventionNo 非 ABCD 格式，其中 3,468 筆是 S 開頭（42 個，皆為屠宰場／肉品市場本身，非畜牧場），串畜牧場時要排除；表單日期有 1900、2027 異常；單號格式混雜、5 個重複。
- 健康證明書匯出：屠宰場代碼不足 4 碼、6 筆統編空白。
- 登記系統：登記飼養種類為自由文字，2,856 場空白；統編欄為公式。
