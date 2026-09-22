/**
 * 系统应用功能清单生成器
 * 数据：app-features-data.js（按「产品 × 机型」手填，发布会/系统更新只是来源）
 * 机型配图：从 reports/*.html 抽首图
 * 用法：node gen-features.js  → 产出 app-features.html
 */
const fs = require('fs');
const path = require('path');
const { PHONES, BRAND, PRODUCTS, FEATURES } = require('./app-features-data');

const ROOT = __dirname;
const strip = s => String(s || '').replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').replace(/&amp;/g, '&').trim();
const pick = (c, re) => { const m = c.match(re); return m ? strip(m[1]) : ''; };

const reportImg = {};
PHONES.forEach(p => {
  const f = path.join(ROOT, 'reports', p.id + '.html');
  if (!fs.existsSync(f)) return;
  const html = fs.readFileSync(f, 'utf8');
  const imgM = html.match(/<img[^>]+src="(?:\.\.\/)?(images\/[^"]+)"/);
  if (imgM) reportImg[p.id] = imgM[1];
});

const productOf = id => PRODUCTS.find(p => p.id === id) || { id, name: id, color: '#64748b' };

const ROWS = FEATURES.map((f, i) => {
  const phones = f.phones
    ? PHONES.filter(p => f.phones.includes(p.id))
    : PHONES.filter(p => (f.brands || []).includes(p.brand));
  const brandId = (f.brands && f.brands[0]) || (phones[0] && phones[0].brand) || 'apple';
  const prod = productOf(f.product);
  return {
    id: 'f' + i,
    name: f.name,
    product: f.product,
    productName: prod.name,
    productColor: prod.color,
    desc: f.desc,
    note: f.note,
    source: f.source || { kind: 'update', label: '', href: '' },
    ext: (f.source && f.source.url) || '',
    brand: brandId,
    brands: [...new Set(phones.map(p => p.brand))],
    phoneIds: phones.map(p => p.id),
    img: 'images/apps/' + (f.product === 'assistant' ? 'assistant' : f.product) + '.svg'
  };
});

const brandOrder = ['apple', 'huawei', 'xiaomi', 'redmi', 'honor', 'oppo', 'vivo', 'iqoo', 'samsung', 'google']
  .filter(id => PHONES.some(p => p.brand === id));

const DATA = JSON.stringify({
  phones: PHONES.map(p => ({ ...p, img: reportImg[p.id] || '' })),
  brand: BRAND,
  brandOrder,
  products: PRODUCTS,
  rows: ROWS
});

const html = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>系统应用功能清单 · 按机型 × 产品筛选</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@600;700&display=swap" rel="stylesheet">
<style>
  :root{
    --bg:#f6f3ee; --paper:#fffcf8; --line:rgba(20,16,12,.08); --line2:rgba(20,16,12,.14);
    --ink:#1a1714; --muted:#6b6560; --faint:#9a948e; --head:#161412;
    --chip:#fff; --accent:#1a1714;
  }
  *{margin:0;padding:0;box-sizing:border-box}
  body{background:var(--bg);color:var(--ink);font-family:-apple-system,BlinkMacSystemFont,"PingFang SC","Noto Sans SC","Segoe UI",sans-serif;line-height:1.55;-webkit-font-smoothing:antialiased}
  a{color:inherit}
  .wrap{max-width:1280px;margin:0 auto;padding:0 28px}
  .topnav{display:none}
  .section-switch{display:flex;justify-content:center;gap:6px;padding:14px 16px 0}
  .section-switch a{display:inline-flex;align-items:center;gap:7px;padding:8px 20px;border-radius:100px;font-size:13px;font-weight:600;text-decoration:none;color:var(--muted);border:1px solid var(--line);background:#fff}
  .section-switch a:hover{color:var(--ink);border-color:var(--line2)}
  .section-switch a.active{background:var(--ink);color:#fff;border-color:var(--ink)}
  .rule{height:1px;background:linear-gradient(90deg,#e11d48,#f59e0b 40%,transparent);margin-top:14px}
  header{padding:28px 0 8px}
  h1{font-family:"Noto Serif SC","Songti SC",Georgia,serif;font-size:clamp(26px,3.4vw,40px);font-weight:700;letter-spacing:.04em}
  .sub{margin-top:10px;color:var(--muted);font-size:14.5px;max-width:820px}
  .panel{position:sticky;top:0;z-index:40;background:rgba(246,243,238,.94);backdrop-filter:blur(12px);padding:12px 0 14px;border-bottom:1px solid var(--line)}
  .bar{display:flex;gap:10px;align-items:center;flex-wrap:wrap}
  .chips{display:flex;gap:6px;flex-wrap:wrap}
  .chip{cursor:pointer;user-select:none;background:#fff;border:1px solid var(--line);border-radius:999px;padding:6px 13px;font-size:13px;color:var(--muted);display:inline-flex;align-items:center;gap:6px}
  .chip:hover{border-color:var(--line2);color:var(--ink)}
  .chip .dot{width:7px;height:7px;border-radius:50%;background:currentColor;opacity:.35}
  .chip.on{color:var(--ink);border-color:var(--ink);background:#fff;font-weight:600}
  .chip.on .dot{opacity:1}
  .filters{display:flex;gap:8px;align-items:center;flex-wrap:wrap;margin-left:auto}
  .dd{position:relative}
  .dd-btn{cursor:pointer;background:#fff;border:1px solid var(--line);border-radius:10px;padding:7px 12px;min-width:188px;max-width:260px;font-size:13px;color:var(--ink);font-family:inherit;display:flex;align-items:center;gap:8px;text-align:left}
  .dd-btn:hover,.dd.open .dd-btn{border-color:var(--ink)}
  .dd-btn .k{font-size:11px;color:var(--faint);letter-spacing:.08em;flex:none}
  .dd-btn .v{flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-weight:600}
  .dd-btn .c{color:var(--faint);font-size:12px;flex:none}
  .dd-btn .chev{margin-left:2px;width:8px;height:8px;border-right:1.5px solid currentColor;border-bottom:1.5px solid currentColor;transform:rotate(45deg);opacity:.45;flex:none;margin-top:-3px}
  .dd.open .chev{transform:rotate(-135deg);margin-top:3px}
  .dd-panel{display:none;position:absolute;top:calc(100% + 6px);left:0;width:280px;max-height:360px;overflow:auto;background:#fff;border:1px solid var(--line2);border-radius:12px;box-shadow:0 16px 40px rgba(26,23,20,.12);padding:8px;z-index:50}
  .dd.open .dd-panel{display:block}
  .dd-head{display:flex;justify-content:space-between;align-items:center;padding:4px 6px 8px;border-bottom:1px solid var(--line);margin-bottom:6px}
  .dd-head button{cursor:pointer;background:none;border:0;font:inherit;font-size:12px;color:#6d5bd0}
  .dd-head button:hover{text-decoration:underline}
  .dd-group{font-size:11px;color:var(--faint);letter-spacing:.12em;padding:8px 8px 4px}
  .dd-item{display:flex;align-items:center;gap:8px;padding:7px 8px;border-radius:8px;cursor:pointer;font-size:13px}
  .dd-item:hover{background:#f6f3ee}
  .dd-item input{accent-color:#1a1714;width:14px;height:14px}
  .dd-item .dot{width:7px;height:7px;border-radius:50%;flex:none}
  input[type=search]{background:#fff;border:1px solid var(--line);border-radius:10px;padding:7px 13px;font-size:13px;width:220px;outline:none;font-family:inherit}
  input[type=search]:focus{border-color:var(--ink)}
  .count{font-size:13px;color:var(--muted);white-space:nowrap}
  .count b{color:var(--ink);font-size:15px}
  .tw{margin:18px 0 40px;background:var(--paper);border:1px solid var(--line);border-radius:16px;overflow:auto}
  table{border-collapse:separate;border-spacing:0;width:100%;min-width:1180px;font-size:13.5px}
  th,td{padding:16px 14px;text-align:left;vertical-align:top;border-bottom:1px solid var(--line)}
  thead th{position:sticky;top:0;z-index:4;background:var(--head);color:#f3efe9;font-size:12px;font-weight:600;letter-spacing:.06em;white-space:nowrap}
  tbody tr:hover{background:#faf6f0}
  tbody tr:last-child td{border-bottom:none}
  td.c-img{width:108px}
  td.c-img img{width:92px;height:60px;object-fit:cover;border-radius:10px;border:1px solid var(--line);background:#eee;display:block}
  td.c-no{width:44px;color:var(--faint);font-variant-numeric:tabular-nums;padding-top:22px}
  td.c-brand{width:120px}
  .bname{font-weight:700;display:flex;align-items:center;gap:6px}
  .bname + .bname{margin-top:4px}
  .bname i{width:7px;height:7px;border-radius:50%}
  .phones{display:block;margin-top:4px;font-size:11.5px;color:var(--faint);line-height:1.45}
  .phones a{color:inherit;text-decoration:none;border-bottom:1px dashed var(--line2)}
  .phones a:hover{color:var(--ink)}
  td.c-name{width:220px}
  td.c-name b{display:block;font-size:14.5px;line-height:1.4;font-weight:700}
  .src-row{display:flex;flex-wrap:wrap;gap:8px;margin-top:8px}
  .src{display:inline-flex;font-size:11.5px;color:#6d5bd0;text-decoration:none;border-bottom:1px dashed rgba(109,91,208,.45)}
  .src:hover{color:#4c38b0}
  .src.launch{color:#b45309;border-bottom-color:rgba(180,83,9,.4)}
  .src.ext{color:#15803d;border-bottom-color:rgba(21,128,61,.4)}
  .src.ext:hover{color:#166534}
  td.c-mod{width:108px}
  .mtag{display:inline-block;padding:3px 10px;border-radius:6px;font-size:12px;font-weight:600;white-space:nowrap}
  td.c-desc{color:#4a453f;min-width:280px}
  td.c-note{min-width:260px;color:#4a453f}
  .empty{padding:48px;text-align:center;color:var(--faint)}
  footer{padding:8px 0 48px;color:var(--faint);font-size:12.5px;line-height:1.8}
  @media (max-width:900px){
    .wrap{padding:0 14px}
    .filters{width:100%;margin-left:0}
    input[type=search],.dd-btn{width:100%;max-width:none;min-width:0}
    .dd{flex:1;min-width:0}
    .dd-panel{width:100%}
  }
</style>
</head>
<body>
<nav class="section-switch">
  <a href="index.html">📱 发布会追踪</a>
  <a href="system-updates.html">🔍 系统更新日志</a>
  <a class="active" href="app-features.html">📋 功能清单</a>
</nav>
<div class="rule"></div>

  <header>
    <div class="wrap">
      <h1>系统应用功能清单</h1>
      <p class="sub">同一部手机上的系统应用对照。发布会报告和系统更新日志都是来源，点机型进发布会，点来源进对应深挖页；<b style="color:#15803d">绿色「域名 ↗」为外网原文来源</b>（社区/媒体/官方页）。</p>
    </div>
  </header>

  <div class="panel">
    <div class="wrap">
      <div class="bar">
        <div class="chips" id="chips-src"></div>
        <div class="chips" id="chips-brand"></div>
        <div class="filters">
          <div class="dd" id="dd-phone">
            <button type="button" class="dd-btn" id="btn-phone"><span class="k">机型</span><span class="v" id="lab-phone">全部机型</span><span class="c" id="n-phone"></span><span class="chev"></span></button>
            <div class="dd-panel" id="panel-phone"></div>
          </div>
          <div class="dd" id="dd-prod">
            <button type="button" class="dd-btn" id="btn-prod"><span class="k">产品</span><span class="v" id="lab-prod">全部产品</span><span class="c" id="n-prod"></span><span class="chev"></span></button>
            <div class="dd-panel" id="panel-prod"></div>
          </div>
          <input type="search" id="q" placeholder="搜索功能名、描述或解析…">
          <span class="count" id="countline"></span>
        </div>
      </div>
    </div>
  </div>

  <div class="wrap">
    <div class="tw">
      <table>
        <thead>
          <tr>
            <th>配图</th><th>#</th><th>品牌</th><th>功能 / 特性</th>
            <th>分类模块</th><th>功能描述</th><th>我们的解析</th>
          </tr>
        </thead>
        <tbody id="tbody"></tbody>
      </table>
    </div>
    <footer>
      机型来自本仓库发布会报告；功能点按系统应用重新挖掘，来源包括 <code>reports/</code> 发布会与 <code>updates/</code> 系统更新深度页。<br>
      改 <code>app-features-data.js</code> 后运行 <code>node gen-features.js</code>。生成日期 ${new Date().toISOString().slice(0,10)}。
    </footer>
  </div>

<script>
const DATA = ${DATA};
const { phones: PHONES, brand: BRAND, brandOrder, products: PRODUCTS, rows: ROWS } = DATA;

let brandFilter = 'all';
let selPhone = new Set(PHONES.map(p => p.id));
let selProd = new Set(PRODUCTS.map(p => p.id));
let srcFilter = 'all';
let kw = '';
const phonesOfBrand = b => b === 'all' ? PHONES : PHONES.filter(p => p.brand === b);

(function applyQuery() {
  const qs = new URLSearchParams(location.search);
  const brand = qs.get('brand');
  const phones = (qs.get('phone') || '').split(',').filter(Boolean);
  const prods = (qs.get('product') || '').split(',').filter(Boolean);
  const src = qs.get('src');
  if (brand && (brand === 'all' || BRAND[brand])) {
    brandFilter = brand;
    selPhone = new Set(phonesOfBrand(brand).map(p => p.id));
  }
  if (phones.length) {
    const ok = phones.filter(id => PHONES.some(p => p.id === id));
    if (ok.length) {
      selPhone = new Set(ok);
      const brands = [...new Set(ok.map(id => PHONES.find(p => p.id === id).brand))];
      brandFilter = brands.length === 1 ? brands[0] : 'all';
    }
  }
  if (prods.length) {
    const ok = prods.filter(id => PRODUCTS.some(p => p.id === id));
    if (ok.length) selProd = new Set(ok);
  }
  if (src === 'launch' || src === 'update') srcFilter = src;
})();

function matched() {
  const k = kw.toLowerCase();
  return ROWS.filter(r => {
    if (!r.phoneIds.some(id => selPhone.has(id))) return false;
    if (!selProd.has(r.product)) return false;
    if (srcFilter !== 'all' && r.source.kind !== srcFilter) return false;
    if (!k) return true;
    const hay = (r.name + ' ' + r.desc + ' ' + r.note + ' ' + r.productName + ' ' + r.phoneIds.map(id => (PHONES.find(p=>p.id===id)||{}).name).join(' ')).toLowerCase();
    return hay.includes(k);
  });
}

function syncUrl() {
  const qs = new URLSearchParams();
  if (srcFilter !== 'all') qs.set('src', srcFilter);
  if (brandFilter !== 'all') qs.set('brand', brandFilter);
  const vis = phonesOfBrand(brandFilter);
  if (selPhone.size && selPhone.size < vis.length) qs.set('phone', [...selPhone].join(','));
  if (selProd.size && selProd.size < PRODUCTS.length) qs.set('product', [...selProd].join(','));
  const next = qs.toString();
  history.replaceState(null, '', next ? (location.pathname + '?' + next) : location.pathname);
}

function summarize(selected, all, one, many, allLabel) {
  const n = selected.length, tot = all.length;
  if (!n) return { v: '未选择', c: '' };
  if (n === tot) return { v: allLabel, c: tot + ' 项' };
  if (n === 1) return { v: selected[0], c: '' };
  if (n === 2) return { v: selected[0] + '、' + selected[1], c: '' };
  return { v: selected[0] + ' 等 ' + n + many, c: n + '/' + tot };
}

function setLab(idV, idC, info) {
  document.getElementById(idV).textContent = info.v;
  document.getElementById(idC).textContent = info.c;
}

function renderFilters() {
  const vis = phonesOfBrand(brandFilter);
  const visIds = new Set(vis.map(p => p.id));
  [...selPhone].forEach(id => { if (!visIds.has(id)) selPhone.delete(id); });

  document.getElementById('chips-src').innerHTML =
    [['all','全部来源'],['launch','发布会'],['update','系统更新']].map(([id, lab]) =>
      \`<div class="chip \${srcFilter===id?'on':''}" data-src="\${id}"><span class="nm">\${lab}</span></div>\`
    ).join('');
  document.querySelectorAll('[data-src]').forEach(el => el.onclick = () => { srcFilter = el.dataset.src; render(); });

  document.getElementById('chips-brand').innerHTML =
    \`<div class="chip \${brandFilter==='all'?'on':''}" data-brand="all"><span class="nm">全部</span></div>\` +
    brandOrder.map(id => {
      const b = BRAND[id];
      return \`<div class="chip \${brandFilter===id?'on':''}" data-brand="\${id}" style="color:\${b.color}"><span class="dot"></span><span class="nm">\${b.label}</span></div>\`;
    }).join('');
  document.querySelectorAll('[data-brand]').forEach(el => el.onclick = () => {
    brandFilter = el.dataset.brand;
    selPhone = new Set(phonesOfBrand(brandFilter).map(p => p.id));
    render();
  });

  const phoneItems = brandOrder.map(bid => {
    const group = vis.filter(p => p.brand === bid);
    if (!group.length) return '';
    const b = BRAND[bid];
    return \`<div class="dd-group">\${b.label}</div>\` + group.map(p =>
      \`<label class="dd-item"><input type="checkbox" data-phone="\${p.id}" \${selPhone.has(p.id)?'checked':''}><span class="dot" style="background:\${b.color}"></span>\${p.name}</label>\`
    ).join('');
  }).join('');
  document.getElementById('panel-phone').innerHTML =
    \`<div class="dd-head"><span>选择机型</span><span><button type="button" id="ph-all">全选</button> · <button type="button" id="ph-none">清空</button></span></div>\` + phoneItems;

  document.getElementById('panel-prod').innerHTML =
    \`<div class="dd-head"><span>选择产品</span><span><button type="button" id="pr-all">全选</button> · <button type="button" id="pr-none">清空</button></span></div>\` +
    PRODUCTS.map(p =>
      \`<label class="dd-item"><input type="checkbox" data-prod="\${p.id}" \${selProd.has(p.id)?'checked':''}><span class="dot" style="background:\${p.color}"></span>\${p.name}</label>\`
    ).join('');

  document.querySelectorAll('[data-phone]').forEach(el => el.onchange = () => {
    el.checked ? selPhone.add(el.dataset.phone) : selPhone.delete(el.dataset.phone);
    render(true);
  });
  document.querySelectorAll('[data-prod]').forEach(el => el.onchange = () => {
    el.checked ? selProd.add(el.dataset.prod) : selProd.delete(el.dataset.prod);
    render(true);
  });
  document.getElementById('ph-all').onclick = () => { selPhone = new Set(vis.map(p => p.id)); render(true); };
  document.getElementById('ph-none').onclick = () => { selPhone = new Set(); render(true); };
  document.getElementById('pr-all').onclick = () => { selProd = new Set(PRODUCTS.map(p => p.id)); render(true); };
  document.getElementById('pr-none').onclick = () => { selProd = new Set(); render(true); };

  const pickedPhones = vis.filter(p => selPhone.has(p.id));
  const pickedProds = PRODUCTS.filter(p => selProd.has(p.id));
  setLab('lab-phone', 'n-phone', summarize(pickedPhones.map(p => p.name), vis, '', ' 台', brandFilter==='all' ? '全部机型' : (BRAND[brandFilter]||{}).label + '全部'));
  setLab('lab-prod', 'n-prod', summarize(pickedProds.map(p => p.name), PRODUCTS, '', ' 个', '全部产品'));
}

function toggleDd(id, ev) {
  ev.stopPropagation();
  document.querySelectorAll('.dd').forEach(d => { if (d.id !== id) d.classList.remove('open'); });
  document.getElementById(id).classList.toggle('open');
}

function render(keepOpen) {
  const openPhone = keepOpen && document.getElementById('dd-phone').classList.contains('open');
  const openProd = keepOpen && document.getElementById('dd-prod').classList.contains('open');
  renderFilters();
  if (openPhone) document.getElementById('dd-phone').classList.add('open');
  if (openProd) document.getElementById('dd-prod').classList.add('open');
  syncUrl();

  const rows = matched();
  document.getElementById('countline').innerHTML = \`共 <b>\${rows.length}</b> 项\`;
  const tbody = document.getElementById('tbody');
  if (!rows.length) {
    tbody.innerHTML = '<tr><td class="empty" colspan="7">没有匹配项。请至少选一台手机、一个产品，或清空搜索。</td></tr>';
    return;
  }
  tbody.innerHTML = rows.map((r, i) => {
    const shownPhones = r.phoneIds
      .filter(id => selPhone.has(id))
      .map(id => PHONES.find(p => p.id === id))
      .filter(Boolean);
    const brandIds = [...new Set(shownPhones.map(p => p.brand))];
    const brandHtml = brandIds.map(id => {
      const b = BRAND[id] || { label: id, color: '#888' };
      return \`<span class="bname"><i style="background:\${b.color}"></i>\${b.label}</span>\`;
    }).join('');
    const srcKind = r.source.kind === 'launch' ? '发布会' : '系统更新';
    const srcCls = r.source.kind === 'launch' ? 'src launch' : 'src';
    const extAttr = r.source.href && r.source.href.indexOf('http') === 0 ? ' target="_blank" rel="noopener"' : '';
    const src = r.source.href
      ? \`<a class="\${srcCls}" href="\${r.source.href}"\${extAttr}>\${srcKind} · \${r.source.label.replace(/^发布会 · |^系统更新 · |^媒体转述 · /, '')} →</a>\`
      : '';
    const phoneLinks = shownPhones.map(p => \`<a href="reports/\${p.id}.html">\${p.name}</a>\`).join(' · ');
    let extHtml = '';
    if (r.ext && r.ext !== r.source.href) {
      try {
        const extDomain = new URL(r.ext).hostname.replace(/^www\\./, '');
        extHtml = \`<a class="src ext" href="\${r.ext}" target="_blank" rel="noopener" title="外网来源原文">\${extDomain} ↗</a>\`;
      } catch (e) {}
    }
    return \`<tr>
      <td class="c-img"><img src="\${r.img}" alt="\${r.productName}"></td>
      <td class="c-no">\${i+1}</td>
      <td class="c-brand">
        \${brandHtml}
        <span class="phones">\${phoneLinks}</span>
      </td>
      <td class="c-name"><b>\${r.name}</b><span class="src-row">\${src}\${extHtml}</span></td>
      <td class="c-mod"><span class="mtag" style="color:\${r.productColor};background:\${r.productColor}18">\${r.productName}</span></td>
      <td class="c-desc">\${r.desc}</td>
      <td class="c-note">\${r.note}</td>
    </tr>\`;
  }).join('');
}

document.getElementById('btn-phone').onclick = e => toggleDd('dd-phone', e);
document.getElementById('btn-prod').onclick = e => toggleDd('dd-prod', e);
document.getElementById('panel-phone').onclick = e => e.stopPropagation();
document.getElementById('panel-prod').onclick = e => e.stopPropagation();
document.addEventListener('click', () => document.querySelectorAll('.dd').forEach(d => d.classList.remove('open')));
document.getElementById('q').oninput = e => { kw = e.target.value.trim(); render(true); };
render();
</script>
</body>
</html>
`;

fs.writeFileSync(path.join(ROOT, 'app-features.html'), html, 'utf8');

const byProd = {};
ROWS.forEach(r => { byProd[r.productName] = (byProd[r.productName] || 0) + 1; });
console.log(`✓ app-features.html  · ${ROWS.length} 条功能 · ${PHONES.length} 台手机`);
console.log('  产品分布：', Object.entries(byProd).map(([k, v]) => `${k} ${v}`).join(' · '));
const missing = ROWS.filter(r => !r.phoneIds.length);
if (missing.length) console.warn('  ⚠ 未挂上任何机型：', missing.map(r => r.name).join('、'));
