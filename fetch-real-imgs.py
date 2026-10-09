#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""从功能出处页抓真实配图；没有配图就截来源页。"""
import hashlib
import json
import os
import re
import subprocess
from urllib.parse import urljoin, urlparse

from PIL import Image

ROOT = "/Users/shswchengming/WorkBuddy/2026-05-26-10-32-16/deliverables/phone-launch-tracker"
OUT = "/tmp/ppt-real"
os.makedirs(OUT, exist_ok=True)

DUMP = r"""
const { PHONES, FEATURES } = require('./app-features-data');
const calBrands=new Set(['xiaomi','huawei','apple','vivo','oppo','honor']);
const calIds=new Set(['xiaomi18fold','huaweimatext2','iphone18','vivox500']);
const rows=FEATURES.filter(f => f.phones ? f.phones.some(id=>calIds.has(id)) : (f.brands||[]).some(b=>calBrands.has(b)))
  .map(f => ({name:f.name, url:(f.source&&f.source.url)||'', label:(f.source&&f.source.label)||''}));
console.log(JSON.stringify(rows));
"""


def load_rows():
    raw = subprocess.check_output(["node", "-e", DUMP], cwd=ROOT)
    return json.loads(raw)


def hid(s):
    return hashlib.md5(s.encode()).hexdigest()[:10]


SKIP_RE = re.compile(
    r"logo|sprite|icon|avatar|emoji|pixel|1x1|blank|spacer|advert|adservice|doubleclick|"
    r"facebook|twitter|pinterest|gravatar|tracking|badge|button",
    re.I,
)


def looks_useful(path, w, h):
    if w < 280 or h < 180:
        return False
    if w * h < 80000:
        return False
    if SKIP_RE.search(path or ""):
        return False
    ratio = w / max(h, 1)
    if ratio > 4.5 or ratio < 0.22:
        return False
    return True


def save_img(buf, dest):
    open(dest + ".raw", "wb").write(buf)
    try:
        im = Image.open(dest + ".raw")
        im = im.convert("RGB")
        w, h = im.size
        if not looks_useful(dest, w, h):
            os.remove(dest + ".raw")
            return None
        im.save(dest, "JPEG", quality=86)
        os.remove(dest + ".raw")
        return dest
    except Exception:
        if os.path.exists(dest + ".raw"):
            os.remove(dest + ".raw")
        return None


def collect():
    rows = load_rows()
    urls = []
    seen = set()
    for r in rows:
        u = r["url"].strip()
        if u and u not in seen:
            seen.add(u)
            urls.append(u)

    from playwright.sync_api import sync_playwright

    page_imgs = {u: [] for u in urls}
    page_shot = {}

    with sync_playwright() as p:
        browser = p.chromium.launch(channel="chrome", headless=True)
        ctx = browser.new_context(
            viewport={"width": 1280, "height": 1600},
            user_agent="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36",
            locale="zh-CN",
        )
        page = ctx.new_page()
        page.set_default_timeout(25000)
        for url in urls:
            print("VISIT", url, flush=True)
            try:
                page.goto(url, wait_until="domcontentloaded", timeout=25000)
                page.wait_for_timeout(2200)
            except Exception as e:
                print("  goto fail", e, flush=True)
                continue
            try:
                page.evaluate(
                    """() => {
                      for (const s of ['#onetrust-banner-sdk','.qc-cmp2-container','#didomi-host','.cookie-banner']) {
                        const n=document.querySelector(s); if(n) n.remove();
                      }
                    }"""
                )
            except Exception:
                pass
            try:
                info = page.evaluate(
                    """() => {
                      const abs = (u) => { try { return new URL(u, location.href).href } catch(e){ return '' } };
                      const og = document.querySelector('meta[property="og:image"]');
                      const imgs = [...document.querySelectorAll('article img, .post img, .entry-content img, .article img, figure img, .content img, main img, p img')];
                      const all = imgs.length ? imgs : [...document.querySelectorAll('img')];
                      const out = [];
                      if (og && og.content) out.push({src: abs(og.content), alt: 'og', w: 1200, h: 630, cap: ''});
                      for (const im of all) {
                        const src = im.currentSrc || im.src || im.getAttribute('data-src') || '';
                        const a = im.closest('figure, .wp-caption, p, div');
                        const cap = a ? (a.querySelector('figcaption, .wp-caption-text')||{}).innerText || '' : '';
                        out.push({src: abs(src), alt: im.alt||'', w: im.naturalWidth||im.width||0, h: im.naturalHeight||im.height||0, cap: cap});
                      }
                      return {title: document.title, out};
                    }"""
                )
            except Exception as e:
                print("  eval fail", e, flush=True)
                info = {"out": []}
            kept = []
            seen_src = set()
            for it in info.get("out") or []:
                src = it.get("src") or ""
                if not src.startswith("http"):
                    continue
                if SKIP_RE.search(src):
                    continue
                if src in seen_src:
                    continue
                seen_src.add(src)
                kept.append(it)
            page_imgs[url] = kept[:10]
            shot = os.path.join(OUT, "shot-" + hid(url) + ".jpg")
            try:
                page.screenshot(path=shot.replace(".jpg", ".png"), full_page=False, type="png")
                im = Image.open(shot.replace(".jpg", ".png")).convert("RGB")
                # crop chrome-ish: keep main viewport
                im.save(shot, "JPEG", quality=82)
                os.remove(shot.replace(".jpg", ".png"))
                page_shot[url] = shot
                print("  imgs", len(kept), "shot ok", flush=True)
            except Exception as e:
                print("  shot fail", e, flush=True)

        # download images
        downloaded = {u: [] for u in urls}
        for url, items in page_imgs.items():
            for i, it in enumerate(items):
                src = it["src"]
                dest = os.path.join(OUT, f"img-{hid(url)}-{i}.jpg")
                if os.path.exists(dest) and os.path.getsize(dest) > 8000:
                    downloaded[url].append({**it, "path": dest})
                    continue
                try:
                    r = ctx.request.get(src, timeout=20000)
                    if r.status != 200:
                        continue
                    body = r.body()
                    if len(body) < 8000:
                        continue
                    ok = save_img(body, dest)
                    if ok:
                        downloaded[url].append({**it, "path": ok})
                        print("  saved", os.path.basename(ok), it.get("alt", "")[:40], flush=True)
                except Exception as e:
                    print("  dl fail", src[:80], e, flush=True)
        browser.close()

    # map feature -> best image
    mapping = {}
    used_files = set()
    for r in rows:
        name, url = r["name"], r["url"].strip()
        keys = re.findall(r"[\u4e00-\u9fffA-Za-z0-9]+", name)
        keys = [k for k in keys if len(k) >= 2][:8]
        picked = None
        cands = downloaded.get(url) or []
        scored = []
        for c in cands:
            blob = (c.get("alt", "") + " " + c.get("cap", "") + " " + c.get("src", "")).lower()
            score = 0
            for k in keys:
                if k.lower() in blob:
                    score += 3
            extra = ["screenshot", "screen", "ui", "app", "ios", "recorder", "note", "calendar",
                     "siri", "gallery", "file", "scan", "yoyo", "录音", "笔记", "日历", "相册",
                     "文件", "锁屏", "助手", "扫"]
            for k in extra:
                if k in blob:
                    score += 1
            scored.append((score, c))
        scored.sort(key=lambda x: -x[0])
        for sc, c in scored:
            if c["path"] not in used_files or sc >= 3:
                picked = c["path"]
                used_files.add(c["path"])
                break
        if not picked and url in page_shot:
            picked = page_shot[url]
        mapping[name] = {
            "path": picked,
            "url": url,
            "via": "article-img" if picked and not os.path.basename(picked).startswith("shot-") else "page-shot" if picked else None,
        }
        print("MAP", name[:24], mapping[name]["via"], picked and os.path.basename(picked), flush=True)

    open(os.path.join(OUT, "map.json"), "w", encoding="utf-8").write(json.dumps(mapping, ensure_ascii=False, indent=2))
    have = sum(1 for v in mapping.values() if v["path"])
    print("done", have, "/", len(mapping))


if __name__ == "__main__":
    collect()
