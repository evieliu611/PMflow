/* 共用前置：找功能資料夾、最新版雛型、對應規格 md、功能名
 * 用法（各腳本）：node xxx.js [--root <功能資料夾>]；省略時從目前目錄往上找含 02_雛型 的資料夾 */
const fs = require('fs'), path = require('path');
let ROOT = null;
const ri = process.argv.indexOf('--root');
if (ri > 0) ROOT = path.resolve(process.argv[ri + 1]);
if (!ROOT) { let d = process.cwd(); for (let i = 0; i < 6; i++) { if (fs.existsSync(path.join(d, '02_雛型'))) { ROOT = d; break; } d = path.dirname(d); } }
if (!ROOT) { console.error('找不到功能資料夾（含 02_雛型），請用 --root 指定'); process.exit(1); }
ROOT = ROOT.split(String.fromCharCode(92)).join('/');
const protos = fs.readdirSync(ROOT + '/02_雛型').filter(f => /^雛型_v\d+_.+\.html$/.test(f)).sort((a, b) => +b.match(/_v(\d+)_/)[1] - +a.match(/_v(\d+)_/)[1]);
if (!protos.length) { console.error('02_雛型 內沒有 雛型_v{n}_*.html'); process.exit(1); }
const PROTO_FILE = protos[0], VER = PROTO_FILE.match(/_v(\d+)_/)[1];
const SPEC_FILE = fs.readdirSync(ROOT + '/03_規格文件').find(f => /^01_需求規格_.+_v\d+\.md$/.test(f) && f.endsWith('_v' + VER + '.md'));
if (!SPEC_FILE) { console.error('03_規格文件 內找不到 01_需求規格_*_v' + VER + '.md，請先跑 /spec-gen'); process.exit(1); }
const FEAT = SPEC_FILE.match(/^01_需求規格_(.+)_v\d+\.md$/)[1];
module.exports = { fs, path, ROOT, PROTO_FILE, VER, SPEC_FILE, FEAT };
