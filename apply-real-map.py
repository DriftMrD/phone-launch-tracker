#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""为每条功能选定真实图：优先出处配图/界面，否则用来源页截图。"""
import json, os, hashlib, subprocess
from PIL import Image

ROOT = "/Users/shswchengming/WorkBuddy/2026-05-26-10-32-16/deliverables/phone-launch-tracker"
SRC = "/tmp/ppt-real"
OUT = "/tmp/ppt-real/final"
os.makedirs(OUT, exist_ok=True)
CREAM = (0xF6, 0xF3, 0xEE)

DUMP = r"""
const {FEATURES}=require('./app-features-data');
const calBrands=new Set(['xiaomi','huawei','apple','vivo','oppo','honor']);
const calIds=new Set(['xiaomi18fold','huaweimatext2','iphone18','vivox500','oppofindx10','mi18pro','honormagic9','huaweimate90']);
const rows=FEATURES.filter(f => f.phones ? f.phones.some(id=>calIds.has(id)) : (f.brands||[]).some(b=>calBrands.has(b)))
  .map(f => ({name:f.name, url:(f.source&&f.source.url)||''}));
console.log(JSON.stringify(rows));
"""
rows = json.loads(subprocess.check_output(["node", "-e", DUMP], cwd=ROOT))


def hid(s):
    return hashlib.md5(s.encode()).hexdigest()[:10]


def p(name):
    return os.path.join(SRC, name)


# 已核对、和图上功能对得上的出处配图 / 官网功能段。
# value: filename 或 (filename, (l, t, r, b) 相对裁切)
UI = {
    "截图一键 Add to Calendar": "img-9248966e63-1.jpg",
    "Math Notes：手写即算，iPad 可 3D 作图": "img-2caa4354cf-8.jpg",
    "Safari AI：标签按主题分组 + Notify Me": "img-5003f6e489-3.jpg",
    "Siri AI 独立 App + 屏幕感知 + 相机模式": "img-7e2ffaaf81-0.jpg",
    "Siri 应用内办事 / 跨设备续聊": "img-7e2ffaaf81-9.jpg",
    "Siri 个人语境读日历": "img-7e2ffaaf81-9.jpg",
    "Writing Tools：全系统校对 / 重写 / 四种摘要": "extra-writing-tools-0.jpg",
    "闹钟音量与铃声音量解绑": "extra-alarm-vol-1.jpg",
    "视频任意一帧直接存成照片": ("section-ios-alarm-section.jpg", (0.04, 0.12, 0.96, 0.52), "letterbox"),
    "Photos Clean Up / Extend / 空间重构": "img-765a575ff4-8.jpg",
    "液态玻璃 / 柔光玻璃成为系统皮肤": "img-e77d473d5a-1.jpg",
    "YOYO Schedule：短信/订单/通话自动变待办": "img-5d4b96f023-1.jpg",
    "YOYO Next：MCP + GUI Agent 接管系统": "img-5d4b96f023-1.jpg",
    "跨品牌三系统互传文件": "img-5d4b96f023-2.jpg",
    "Phone Clone：44GB / 57 分钟并省出空间": "img-5d4b96f023-3.jpg",
    "Storage Space 2.0 无损压缩腾空间": "img-5d4b96f023-3.jpg",
    "端侧录音 → 会议纪要": "img-5d4b96f023-1.jpg",
    "蓝心小 V / 小 V Pro 系统级 Agent": "extra-ithome-x500-0.jpg",
    "小 V 记忆卡：锁屏记录并关联上下文": "img-5b8bf126dc-2.jpg",
    "AI 日历按截止日与习惯排任务": "img-5b8bf126dc-2.jpg",
    "日历从录音里自动提取待办": "img-5b8bf126dc-2.jpg",
    "相册主动推荐重复与模糊照片供清理": "img-5b8bf126dc-2.jpg",
    "锁屏直接扫码，无需先解锁": "img-5b8bf126dc-2.jpg",
    "原子工作台下放直板机 + 五应用任务组": "img-5b8bf126dc-4.jpg",
    "存储压缩 2.0：256GB 机型最多释放约 20GB": "img-5b8bf126dc-4.jpg",
    "双路定向播音：外放与蓝牙同时出声": "img-5b8bf126dc-3.jpg",
    "游戏防眩光模式（官方称视觉舒适度 +29%）": "img-5b8bf126dc-3.jpg",
    "会议场景识别 + 结构化大纲": "section-hyperos-recorder.jpg",
    "超级岛 / 灵动胶囊当「下一件事」表面": "section-hyperos-recorder.jpg",
    "HyperOS AI Note + 笔记应用改造": "section-hyperos-recorder.jpg",
    "超级小爱 2.0 专家模式：跨应用跨设备执行": "extra-shot-hyperos4-cl.jpg",
    "回收站 + 超级岛显示文档处理进度": "img-e22fd1945a-8.jpg",
    "AI 录音：实时转写 + 说话人 + 摘要模板": "extra-coloros-rec-1.jpg",
    "AI 闪记 / Mind Space：三指上滑即归档": "section-coloros-flash.jpg",
    "闪记扫描点餐码 / 超级岛展示取餐码": ("section-coloros-flash.jpg", (0.12, 0.74, 0.72, 0.98), "cover"),
    "小布记忆：搜索 / 问答 / 推荐闭环": "extra-shot-coloros-mind.jpg",
    "小布记忆同步系统浏览器与夸克收藏": "extra-shot-coloros-mind.jpg",
    "蓝心大模型 4.0 驱动的小 V：端云协同 + 长期记忆": "extra-shot-ithome-os7.jpg",
    "跨苹果互联：通知同步、微信镜像回复、云相册同步": "img-9a1fce515c-0.jpg",
    "小艺中枢：2100+ 系统能力的 Agent": "extra-harmonyos7-4.jpg",
    "小艺深度解题": "extra-xiaoyi-bar-1.jpg",
    "分布式文件管理 + 超空间存储": "extra-huawei-space-1.jpg",
    "超空间存储延长换机周期": "extra-huawei-space-1.jpg",
    "三折叠外屏直接扫码": "extra-shot-matext2-off.jpg",
    "锁屏岛全屏歌词（含酷狗概念版）": "extra-coloros-lyric-1.jpg",
    "哈苏全焦段 8K 电影机：双 2 亿像素主摄": "extra-shot-findx10.jpg",
    "端侧 AndesGPT：Agent 化小布助手": "extra-shot-findx10.jpg",
    "ARRI LogC3 电影曲线 + 87 款 Look 直出": ("extra-shot-magic9.jpg", (0.12, 0.40, 0.88, 0.78), "cover"),
    "行业首发电影级枪麦：片场级收音": ("extra-shot-magic9.jpg", (0.12, 0.40, 0.88, 0.78), "cover"),
    "逻辑折叠 τ 芯片：架构换性能": ("shot-b366dd7001.jpg", (0.08, 0.28, 0.72, 0.58), "cover"),
    "HarmonyOS 7 软硬芯云垂直整合 + 超线程": "shot-045e24183c.jpg",
}

# 无独立配图时，用来源页（或同系统报道页）截图
SHOT_FOR_URL = {}
for r in rows:
    if r["url"]:
        SHOT_FOR_URL[r["name"]] = "shot-" + hid(r["url"]) + ".jpg"

# 额外抓到的来源页（覆盖官网页里只有装饰大图的情况）
SHOT_OVERRIDE = {
    "密码 App：泄露提醒 + 应用内直接改密码": "section-ios-alarm-section.jpg",
    "AI 意图搜索：模糊描述跨应用找文件": "extra-shot-coloros-file.jpg",
    "智能到站提醒：震动 + 弹窗 + 蓝牙播报": "shot-7800837fb6.jpg",
    "锁屏岛全屏歌词（含酷狗概念版）": "extra-coloros-lyric-1.jpg",
    "桌面汇率换算卡片": "shot-7800837fb6.jpg",
    "便签换字体皮肤；相册浅色编辑": "extra-shot-coloros-mind.jpg",
    "小米换机迁移更多设置与系统应用数据": "extra-shot-hyperos4-cl.jpg",
    "快捷指令用一句话生成": "shot-5003f6e489.jpg",
    "备忘录自然语言建提醒 / 录音进笔记才能摘要": "shot-8982599365.jpg",
    "Wallet 扫 QR 生成数字通行证": "shot-8982599365.jpg",
    "相册 HDR 影像：17EV 动态范围 + 蔡司色彩": "extra-shot-ithome-x500.jpg",
    "录音高亮关键段 + 说话人观点": "extra-shot-ithome-os7.jpg",
    "AI 文件管家：按主题归类 + 输入法找文件": "shot-5b8bf126dc.jpg",
    "原子笔记可授权给第三方 AI": "shot-5b8bf126dc.jpg",
    "YOYO GUI Agent：看懂屏幕自己点": "shot-5d4b96f023.jpg",
    "iOS 27.0.1：修复 Face ID 重启与相机伪影": "shot-fdac7d1f38.jpg",
    "双 2 亿徕卡三摄：全焦段高解析裁切": "shot-0dcf1eb108.jpg",
    "AI 智窗背屏 + 硬件级智能隐私显示": "shot-0dcf1eb108.jpg",
    "YOYO 智能体：一键妙记 + AI 通话助理": "shot-cc2686424b.jpg",
    "首发四卡三待：一部手机应对多场景": "shot-b366dd7001.jpg",
}

# 没有 url 的条目，挂到同系统已截过的出处页
FALLBACK_SHOT = {
    "长录音转写稳定性修复": "extra-shot-hyperos4-cl.jpg",
    "端侧录音 → 会议纪要": "shot-5d4b96f023.jpg",
    "分布式文件管理 + 超空间存储": "extra-shot-huawei-space.jpg",
    "4K Live 动态照片当媒体资产": "shot-5b8bf126dc.jpg",
    "笔记 AI 语义搜索 + 长视频变笔记": "shot-5d4b96f023.jpg",
    "小艺深度解题": "extra-shot-xiaoyi-enet.jpg",
    "三折叠外屏直接扫码": "extra-shot-matext2-off.jpg",
    "应用五分身（含串号争议）": "shot-fff28691ca.jpg",
    "超空间存储延长换机周期": "extra-shot-huawei-space.jpg",
    "AI Remix 抠图贴纸 / 笔记图片涂鸦": "shot-fff28691ca.jpg",
    "相册语义检索（端侧）": "shot-5d4b96f023.jpg",
    "小艺中枢：2100+ 系统能力的 Agent": "extra-shot-xiaoyi-enet.jpg",
    "小米换机 Mi Mover 4.6.1.7（9/16 月更）": "extra-shot-hyperos4-cl.jpg",
    "新增独立「密码」App 并打通苹果设备": "extra-shot-hyperos4-cl.jpg",
    "相册 HDR 影像：17EV 动态范围 + 蔡司色彩": "extra-shot-ithome-x500.jpg",
}

# 额外抓取未到时，只回退同品牌来源页；禁止跨品牌凑图
FALLBACK_SHOT_2 = {
    "小艺深度解题": "extra-shot-harmonyos7.jpg",
    "三折叠外屏直接扫码": "extra-shot-harmonyos7.jpg",
    "超空间存储延长换机周期": "extra-shot-harmonyos7.jpg",
    "小艺中枢：2100+ 系统能力的 Agent": "extra-shot-harmonyos7.jpg",
    "分布式文件管理 + 超空间存储": "extra-shot-huawei-space.jpg",
}


def parse_spec(spec):
    if isinstance(spec, tuple):
        if len(spec) == 3:
            return spec[0], spec[1], spec[2]
        return spec[0], spec[1], "cover"
    return spec, None, None


def fit_frame(src, dest, tw=900, th=1140, crop=None, mode=None):
    im = Image.open(src).convert("RGB")
    if crop:
        w, h = im.size
        l, t, r, b = crop
        im = im.crop((int(w * l), int(h * t), int(w * r), int(h * b)))
    w, h = im.size
    if mode is None:
        mode = "cover" if (crop or h / max(w, 1) >= 1.12) else "letterbox"
    if mode == "cover":
        scale = max(tw / w, th / h)
        nw, nh = int(w * scale), int(h * scale)
        im = im.resize((nw, nh), Image.Resampling.LANCZOS)
        x = max(0, (nw - tw) // 2)
        y = max(0, min((nh - th) // (8 if not crop else 2), nh - th))
        im = im.crop((x, y, x + tw, y + th))
    else:
        scale = min(tw / w, th / h)
        nw, nh = max(1, int(w * scale)), max(1, int(h * scale))
        im = im.resize((nw, nh), Image.Resampling.LANCZOS)
        canvas = Image.new("RGB", (tw, th), CREAM)
        canvas.paste(im, ((tw - nw) // 2, (th - nh) // 2))
        im = canvas
    im.save(dest, "JPEG", quality=88)


def first_existing(names):
    for n in names:
        if n:
            cand = p(n)
            if os.path.isfile(cand):
                return cand, n
    return None, None


mapping = {}
for r in rows:
    name = r["name"]
    src = None
    via = None
    crop = None
    mode = None
    used = None
    if name in UI:
        fname, crop, mode = parse_spec(UI[name])
        cand = p(fname)
        if os.path.isfile(cand):
            src, via, used = cand, "source-ui", fname
    if not src:
        cand, used = first_existing([
            SHOT_OVERRIDE.get(name, ""),
            SHOT_FOR_URL.get(name, ""),
        ])
        if cand:
            src, via = cand, "source-page"
    if not src:
        cand, used = first_existing([
            FALLBACK_SHOT.get(name, ""),
            FALLBACK_SHOT_2.get(name, ""),
        ])
        if cand:
            src, via = cand, "related-source-page"
    if not src:
        print("MISSING", name)
        continue
    dest = os.path.join(OUT, hid(name) + ".jpg")
    fit_frame(src, dest, crop=crop, mode=mode)
    mapping[name] = {"path": dest, "via": via, "src": used or os.path.basename(src)}
    print(via, name[:30], mapping[name]["src"])

open(os.path.join(OUT, "map.json"), "w", encoding="utf-8").write(
    json.dumps(mapping, ensure_ascii=False, indent=2)
)
print("mapped", len(mapping), "/", len(rows))
