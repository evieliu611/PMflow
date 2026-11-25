import re, json
from pathlib import Path
D = Path('C:/Users/YIHSIN/OneDrive - 瑞竣科技股份有限公司/PMflow/專案/NCDR健康豬/功能/養豬場決策儀表板/02_雛型')
t = (D / '雛型_v6_總覽.html').read_text(encoding='utf-8')

# ---- 由簡易 SVG 路徑反推經緯度，建立縣市 GeoJSON ----
m = re.search(r'const CTY=', t); a = m.end()
dec = json.JSONDecoder()
CTY, _ = dec.raw_decode(t[a:])
m2 = re.search(r'const ISL=', t); ISL, _ = dec.raw_decode(t[m2.end():])


def rings(d, tf):
    out = []
    for sub in re.split(r'(?=M)', d):
        pts = re.findall(r'(-?\d+\.?\d*),(-?\d+\.?\d*)', sub)
        if len(pts) < 3: continue
        ring = []
        for x, y in pts:
            x = float(x); y = float(y)
            if tf: x = (x - tf[1]) / tf[0]; y = (y - tf[2]) / tf[0]
            ring.append([round(119.9 + x / 105, 4), round(25.45 - y / 115, 4)])
        if ring[0] != ring[-1]: ring.append(ring[0])
        out.append(ring)
    return out


polys = {}
for n, o in CTY.items():
    polys.setdefault(n, []).extend(rings(o['d'], o.get('tf')))
for o in ISL:
    polys.setdefault(o['c'], []).extend(rings(o['d'], (CTY.get(o['c']) or {}).get('tf')))


def area(r):
    xs = [p[0] for p in r]; ys = [p[1] for p in r]
    return (max(xs) - min(xs)) * (max(ys) - min(ys))


feats = []; CEN = {}
for n, rs in polys.items():
    feats.append({'type': 'Feature', 'properties': {'n': n}, 'geometry': {'type': 'MultiPolygon', 'coordinates': [[r] for r in rs]}})
    big = max(rs, key=area)
    xs = [p[0] for p in big]; ys = [p[1] for p in big]
    CEN[n] = [round((max(xs) + min(xs)) / 2, 4), round((max(ys) + min(ys)) / 2, 4)]
GEO = {'type': 'FeatureCollection', 'features': feats}

NEW = r'''/* ===== 地圖（實際地圖版：MapLibre／Mapbox GL，同一套 API）===== */
const GEO=__GEO__;
const CEN=__CEN__;
let GL=window.mapboxgl||window.maplibregl,USEMB=!!window.mapboxgl;
const TOKEN=new URLSearchParams(location.search).get('token')||'';
const FLYTO={'全臺':{b:[[117.9,21.7],[122.2,26.5]]},'本島':{b:[[119.95,21.75],[122.1,25.45]]},'澎湖':{c:[119.58,23.55],z:9.4},'金門':{c:[118.37,24.45],z:10.2},'馬祖':{c:[119.97,26.17],z:9.6}};
let MAP=null,MHOST=null,MREADY=false,MARK=[],POP=null,LAST=null;
const mixc=(c,p)=>{const n=parseInt(c.slice(1),16),r=(n>>16)&255,g=(n>>8)&255,b=n&255,k=p/100;return `rgb(${Math.round(r*k+255*(1-k))},${Math.round(g*k+255*(1-k))},${Math.round(b*k+255*(1-k))})`};
function mapSvg(metric){
  const one=(state.view==='farms'&&state.fmap==='one'&&state.farm)?FARMS.find(x=>x.id===state.farm):null;
  if(one)metric='slh';
  const fv=state.view==='farms',cnt={},flow={};
  if(one){one.slh.filter(s=>inWin(ago(s.d))).forEach(s=>{const o=flow[s.cty]||(flow[s.cty]={n:0,c:0,ds:[]});o.n+=s.n;o.c++;o.ds.push(s.d);cnt[s.cty]=o.n})}
  const AT=['epc','esl','att'].includes(metric)?attnMap():null;
  if(AT){const src=metric==='epc'?AT.epc:metric==='esl'?AT.esl:null;if(src)Object.assign(cnt,src);else{Object.keys(AT.epc).forEach(k=>cnt[k]=1);Object.keys(AT.esl).forEach(k=>cnt[k]=1)}}
  else if(!one)ev(metric).filter(inRange).forEach(x=>cnt[x.f.county]=(cnt[x.f.county]||0)+x.v);
  const col=metric==='att'?'#D9485A':metric==='epc'?SER.epi.c:metric==='esl'?SER.slh.c:SER[metric].c,UN=metric==='epc'?'件疫情通報':metric==='esl'?'頭':metric==='att'?'':SER[metric].u;
  const fillOf=n=>{if(!(cnt[n]||0))return '#EEF3E8';
    if(metric==='att'){const a=AT.epc[n],b=AT.esl[n];return mixc(a&&b?'#D9485A':a?SER.epi.c:SER.slh.c,a&&b?42:28)}
    return mixc(col,22)};
  const all=FARMS.filter(inScope);
  const pins=(one?all.filter(f=>f.id!==one.id).concat(one):all).map(f=>{
    const s0=farmStat(f),me=one&&f.id===one.id;
    const rk=({epc:'epi',esl:'slh'})[metric]||metric,isA=AT&&AT.ids.has(f.id);
    const s=(fv&&!one&&rk!=='att')?{epi:0,rend:0,slh:0,[rk]:s0[rk]}:s0;
    return {f,s,me,fade:(one&&!me)||(AT&&!isA)}});
  PENDING.push(()=>mountMap({one,flow,cnt,UN,fillOf,pins}));
  return `<div class="mph"></div>`;
}
function ensureMap(host){
  if(MAP)return;
  if(!GL){
    if(!window._fb){window._fb=1;host.innerHTML='<p style="padding:20px;color:#6b7a70">地圖載入中…</p>';
      const l=document.createElement('link');l.rel='stylesheet';l.href='https://cdn.jsdelivr.net/npm/maplibre-gl@4.7.1/dist/maplibre-gl.css';document.head.appendChild(l);
      const s=document.createElement('script');s.src='https://cdn.jsdelivr.net/npm/maplibre-gl@4.7.1/dist/maplibre-gl.js';s.onload=()=>{GL=window.maplibregl;USEMB=false;render()};s.onerror=()=>{host.innerHTML='<p style="padding:20px">地圖元件載入失敗，請確認網路。</p>'};document.head.appendChild(s)}
    return}
  MHOST=document.createElement('div');MHOST.className='mhost';host.appendChild(MHOST);
  let style;
  if(TOKEN&&USEMB){GL.accessToken=TOKEN;style='mapbox://styles/mapbox/light-v11'}
  else style={version:8,sources:{b:{type:'raster',tiles:['https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}'],tileSize:256,maxzoom:16,attribution:'Esri World Light Gray（示範底圖，正式版改用 Mapbox Light 或 Esri）'}},layers:[{id:'b',type:'raster',source:'b'}]};
  MAP=new GL.Map({container:MHOST,style,bounds:FLYTO['本島'].b,fitBoundsOptions:{padding:30},minZoom:5,maxZoom:14,attributionControl:true});
  MAP.addControl(new GL.NavigationControl({showCompass:false}),'bottom-right');
  const initLayers=()=>{
    if(USEMB)MAP.getStyle().layers.forEach(l=>{if(l.type==='symbol'&&l.layout&&l.layout['text-field']){try{MAP.setLayoutProperty(l.id,'text-field',['coalesce',['get','name_zh-Hant'],['get','name_zh'],['get','name']])}catch(e){}}});
    MAP.addSource('cty',{type:'geojson',data:GEO});
    MAP.addLayer({id:'cty-fill',type:'fill',source:'cty',paint:{'fill-color':['coalesce',['get','fc'],'#EEF3E8'],'fill-opacity':.72}});
    MAP.addLayer({id:'cty-line',type:'line',source:'cty',paint:{'line-color':['coalesce',['get','sc'],'#9FB293'],'line-width':['coalesce',['get','sw'],1]}});
    MAP.addSource('flow',{type:'geojson',data:{type:'FeatureCollection',features:[]}});
    MAP.addLayer({id:'flow-line',type:'line',source:'flow',paint:{'line-color':SER.slh.c,'line-width':2,'line-dasharray':[2,1.5]}});
    MAP.addLayer({id:'flow-dot',type:'circle',source:'flow',filter:['==',['geometry-type'],'Point'],paint:{'circle-radius':4,'circle-color':SER.slh.c,'circle-stroke-color':'#fff','circle-stroke-width':1.5}});
    MAP.on('click','cty-fill',e=>{if(LAST&&LAST.one)return;const c=e.features[0].properties.n;state.county=state.county===c?'':c;render()});
    MAP.on('mousemove','cty-fill',e=>{const f=e.features[0];if(!LAST)return;MAP.getCanvas().style.cursor=LAST.one?'':'pointer';const n=f.properties.n;if(!POP)POP=new GL.Popup({closeButton:false,closeOnClick:false,offset:8});POP.setLngLat(e.lngLat).setHTML(`<b>${n}</b>　${fmt(LAST.cnt[n]||0)} ${LAST.UN}`).addTo(MAP)});
    MAP.on('mouseleave','cty-fill',()=>{MAP.getCanvas().style.cursor='';if(POP)POP.remove()});
    MREADY=true;if(LAST)updateMap(LAST);
  };
  if(MAP.isStyleLoaded())initLayers();else MAP.once('style.load',initLayers);
  if(!USEMB)Object.keys(CEN).forEach(n=>{const el=document.createElement('div');el.className='mcn';el.textContent=n;new GL.Marker({element:el}).setLngLat(CEN[n]).addTo(MAP)});
  const nav=document.createElement('div');nav.className='mnav';
  nav.innerHTML=Object.keys(FLYTO).map(k=>`<button type="button" data-fly="${k}">${k}</button>`).join('');
  nav.onclick=e=>{const k=e.target.dataset.fly;if(!k)return;const o=FLYTO[k];if(o.b)MAP.fitBounds(o.b,{padding:30});else MAP.flyTo({center:o.c,zoom:o.z})};
  MHOST.appendChild(nav);
}
function mountMap(D){
  const host=document.querySelector('.mph');if(!host)return;
  ensureMap(host);if(!MHOST)return;
  if(MHOST.parentNode!==host)host.appendChild(MHOST);
  LAST=D;
  if(MAP){MAP.resize();if(MREADY)updateMap(D)}
}
const ringSvg=(s,me)=>`<svg viewBox="0 0 28 28" width="${me?34:28}" height="${me?34:28}"><circle cx="14" cy="14" r="${me?13:12}" fill="#fff" stroke="${me?'#26332A':'#fff'}" stroke-width="${me?2:1}"/>${miniRing(14,14,me?8.2:7,me?3.6:3.2,s)}</svg>`;
function updateMap(D){
  const {one,flow,pins,cnt,fillOf}=D,sel=state.county;
  const g=JSON.parse(JSON.stringify(GEO));
  g.features.forEach(f=>{const n=f.properties.n;f.properties.fc=fillOf(n);f.properties.sc=n===sel?'#26332A':'#9FB293';f.properties.sw=n===sel?2.4:1});
  MAP.getSource('cty').setData(g);
  MARK.forEach(m=>m.remove());MARK=[];
  const fl={type:'FeatureCollection',features:[]};
  pins.forEach(p=>{const el=document.createElement('div');el.className='mpin'+(p.fade?' fade':'')+(p.me?' me':'');el.dataset.farm=p.f.id;el.title=`${p.f.name}（${p.f.county}${p.f.town}）`;el.innerHTML=ringSvg(p.s,p.me);
    MARK.push(new GL.Marker({element:el}).setLngLat([p.f.lon,p.f.lat]).addTo(MAP))});
  if(one){
    const fo=[one.lon,one.lat],pts=[fo];
    Object.entries(flow).forEach(([n,o])=>{
      if(n===one.county||!CEN[n])return;
      fl.features.push({type:'Feature',properties:{},geometry:{type:'LineString',coordinates:[fo,CEN[n]]}});
      fl.features.push({type:'Feature',properties:{},geometry:{type:'Point',coordinates:CEN[n]}});
      pts.push(CEN[n]);
      const el=document.createElement('div');el.className='mlbl';el.innerHTML=`<b>${n} ${fmt(o.n)} 頭</b><span>屠宰 ${dlist(o.ds)}</span>`;
      MARK.push(new GL.Marker({element:el,anchor:'bottom',offset:[0,-6]}).setLngLat(CEN[n]).addTo(MAP))});
    const e=one.epi.filter(x=>inWin(ago(x.nd))),r=one.rend.filter(x=>inWin(ago(x.wd))),L=[];
    if(e.length)L.push([SER.epi.c,`疫情通報 ${dlist(e.map(x=>x.nd))}`]);
    if(r.length)L.push([SER.rend.c,`化製 ${dlist(r.map(x=>x.wd))}（${fmt(r.reduce((a,x)=>a+x.n,0))} 頭）`]);
    if(flow[one.county])L.push([SER.slh.c,`同縣市屠宰 ${dlist(flow[one.county].ds)}（${fmt(flow[one.county].n)} 頭）`]);
    if(L.length){const el=document.createElement('div');el.className='mcall';el.innerHTML=L.map(l=>`<div><i style="background:${l[0]}"></i>${l[1]}</div>`).join('');
      MARK.push(new GL.Marker({element:el,anchor:'bottom-left',offset:[18,-14]}).setLngLat(fo).addTo(MAP))}
    if(pts.length>1){const xs=pts.map(p=>p[0]),ys=pts.map(p=>p[1]);MAP.fitBounds([[Math.min(...xs),Math.min(...ys)],[Math.max(...xs),Math.max(...ys)]],{padding:{top:70,bottom:150,left:60,right:60},maxZoom:9,duration:600})}
    else MAP.flyTo({center:fo,zoom:9,duration:600});
    D.fitted='one';
  }else if(MAP._wasOne){MAP.fitBounds(FLYTO['本島'].b,{padding:30,duration:600})}
  MAP._wasOne=!!one;
  MAP.getSource('flow').setData(fl);
}
const md=s=>s.slice(4),dlist=(ds,k)=>{const u=[...new Set(ds)].sort().map(md);return u.length>(k||3)?u.slice(0,k||3).join('、')+' 等'+u.length+'天':u.join('、')};

'''
NEW = NEW.replace('__GEO__', json.dumps(GEO, ensure_ascii=False, separators=(',', ':'))).replace('__CEN__', json.dumps(CEN, ensure_ascii=False, separators=(',', ':')))

s = t.index('/* ===== 地圖 ===== */'); e = t.index('/* ===== 總覽 ===== */')
t = t[:s] + NEW + t[e:]
HEAD = '''<script>(function(){var T=new URLSearchParams(location.search).get('token');
if(T){document.write('<link href="https://api.mapbox.com/mapbox-gl-js/v3.7.0/mapbox-gl.css" rel="stylesheet"><script src="https://api.mapbox.com/mapbox-gl-js/v3.7.0/mapbox-gl.js"><\\/script>')}
else{document.write('<link href="https://cdn.jsdelivr.net/npm/maplibre-gl@4.7.1/dist/maplibre-gl.css" rel="stylesheet"><script src="https://cdn.jsdelivr.net/npm/maplibre-gl@4.7.1/dist/maplibre-gl.js"><\\/script>')}})();</script>
<style>
.v4 .mph{position:absolute;inset:0}
.v4 .mhost{position:absolute;inset:0}
.v4 .mapbox{position:relative}
.v4 .mpin{cursor:pointer;line-height:0}.v4 .mpin.fade{opacity:.35}.v4 .mpin.me{z-index:3}
.v4 .mlbl{display:flex;flex-direction:column;align-items:center;pointer-events:none;font-size:12px;line-height:1.25;text-shadow:0 0 3px #fff,0 0 3px #fff,0 0 3px #fff,0 0 3px #fff}
.v4 .mlbl b{color:#26332A}.v4 .mlbl span{color:#1F6FA8;font-size:11px}
.v4 .mcall{pointer-events:none;font-size:11.5px;font-weight:600;color:#26332A;line-height:1.5;background:rgba(255,255,255,.88);border-radius:6px;padding:2px 7px;box-shadow:0 1px 4px rgba(0,0,0,.15)}
.v4 .mcall i{display:inline-block;width:8px;height:8px;border-radius:50%;margin-right:5px}
.v4 .mcn{pointer-events:none;font-size:11px;color:#6B7A70;text-shadow:0 0 3px #fff,0 0 3px #fff,0 0 3px #fff}
.v4 .mnav{position:absolute;left:8px;top:8px;display:flex;gap:4px;z-index:2}
.v4 .mnav button{border:1px solid var(--line);background:rgba(255,255,255,.95);border-radius:6px;padding:2px 9px;font-size:12px;cursor:pointer}
.v4 .mnote,.v4 .mleg{z-index:5}
.maplibregl-popup-content,.mapboxgl-popup-content{font:12px/1.4 inherit;padding:6px 9px}
</style>
'''
t = t.replace('</head>', HEAD + '</head>', 1)
out = D / '雛型_v6_Mapbox版.html'
out.write_text(t, encoding='utf-8')
print(out.stat().st_size, len(GEO['features']), sorted(CEN)[:3])
