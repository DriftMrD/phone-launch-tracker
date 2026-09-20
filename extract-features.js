// 从 reports/*.html 抽取「新机发布功能清单」种子数据（兼容新旧两套报告模板）
// 新模板：<section> → kicker .cat + p.lede → .feat(h3 + p)
// 旧模板：<div class="chapter"> → .chapter-tag + .chapter-intro → .feat(.feat-tag + h3 + p)
// 产出 /tmp/launch-features.json
const fs = require('fs');
const path = require('path');

const DIR = path.join(__dirname, 'reports');
const files = fs.readdirSync(DIR).filter(f => f.endsWith('.html'));

const BRAND_OF = (id) => {
  if (/^(iphone|wwdc)/.test(id)) return 'apple';
  if (/^(xiaomi|mi\d)/.test(id)) return 'xiaomi';
  if (/^redmi/.test(id)) return 'redmi';
  if (/^(honor|magic)/.test(id)) return 'honor';
  if (/^(huawei|hdc)/.test(id)) return 'huawei';
  if (/^oppo/.test(id)) return 'oppo';
  if (/^viv/.test(id)) return 'vivo';
  if (/^samsung/.test(id)) return 'samsung';
  if (/^iqoo/.test(id)) return 'iqoo';
  if (/^google/.test(id)) return 'google';
  if (/^dimensity/.test(id)) return 'mediatek';
  return 'other';
};

const strip = s => s.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
const pick = (c, re) => { const m = c.match(re); return m ? strip(m[1]) : ''; };

const out = [];
files.forEach(f => {
  const id = f.replace(/\.html$/, '');
  const html = fs.readFileSync(path.join(DIR, f), 'utf8');
  const model = (pick(html, /<h1[^>]*>([\s\S]*?)<\/h1>/) ||
                 pick(html, /<title>([\s\S]*?)<\/title>/).split(/[|·]/)[0].trim() || id)
                 .replace(/&amp;/g, '&').slice(0, 40);
  const brand = BRAND_OF(id);

  // 统一切成「章节块」：新模板 <section>，旧模板 <div class="chapter">
  const blocks = html.split(/<section[\s>]|<div class="chapter"[\s>]/).slice(1);
  blocks.forEach(sec => {
    const secCat  = pick(sec, /class="cat"[^>]*>([\s\S]*?)<\/span>/) ||
                    pick(sec, /class="chapter-tag"[^>]*>([\s\S]*?)<\/span>/);
    const secNote = pick(sec, /<p class="lede"[^>]*>([\s\S]*?)<\/p>/) ||
                    pick(sec, /<p class="chapter-intro"[^>]*>([\s\S]*?)<\/p>/);

    sec.split('<div class="feat">').slice(1).forEach(feat => {
      const rawH3 = pick(feat, /<h3[^>]*>([\s\S]*?)<\/h3>/);
      const name = rawH3.replace(/\s?[A-Z][A-Z &·\-]{2,}$/, '').trim();
      const desc = pick(feat, /<p[^>]*>([\s\S]*?)<\/p>/);
      if (!name) return;
      const perTag = pick(feat, /class="feat-tag"[^>]*>([\s\S]*?)<\/span>/);
      out.push({ mid: id, model, brand, mod: perTag || secCat || '其他', name, desc, note: secNote });
    });
  });
});

const byModel = {};
out.forEach(r => { byModel[r.mid] = byModel[r.mid] || { model: r.model, brand: r.brand, n: 0 }; byModel[r.mid].n++; });
console.log('抽取功能条目:', out.length, '| 机型/场次:', Object.keys(byModel).length);
Object.entries(byModel).sort((a,b)=>b[1].n-a[1].n).forEach(([k,v]) => console.log('  ', k.padEnd(18), v.brand.padEnd(9), String(v.n).padStart(3), '|', v.model));
const mods = {}; out.forEach(r => mods[r.mod] = (mods[r.mod]||0)+1);
console.log('\n分类模块 TOP15:');
Object.entries(mods).sort((a,b)=>b[1]-a[1]).slice(0,15).forEach(([k,v])=>console.log('  ', String(v).padStart(3), k));
console.log('\n无描述:', out.filter(r=>!r.desc).length, '| 无解析:', out.filter(r=>!r.note).length);
fs.writeFileSync('/tmp/launch-features.json', JSON.stringify(out, null, 1), 'utf8');
console.log('→ /tmp/launch-features.json');
