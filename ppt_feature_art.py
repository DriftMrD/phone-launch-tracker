# -*- coding: utf-8 -*-
"""每条功能画一张能看懂在干什么的手机示意界面。"""
import os
from PIL import Image, ImageDraw, ImageFont

ART = "/tmp/ppt-art"
FONT_B = "/System/Library/Fonts/STHeiti Medium.ttc"
FONT_R = "/System/Library/Fonts/Hiragino Sans GB.ttc"

INK = (26, 23, 20)
MUTED = (107, 101, 96)
FAINT = (154, 148, 142)
WHITE = (255, 255, 255)
CREAM = (246, 243, 238)
PAPER = (255, 252, 248)
LINE = (230, 224, 216)


def F(size, bold=False):
    path = FONT_B if bold else FONT_R
    try:
        return ImageFont.truetype(path, size)
    except Exception:
        return ImageFont.load_default()


def hexrgb(h):
    h = h.lstrip("#")
    return tuple(int(h[i:i + 2], 16) for i in (0, 2, 4))


def wrap(draw, text, font, width):
    lines, cur = [], ""
    for ch in text:
        t = cur + ch
        if draw.textlength(t, font=font) <= width:
            cur = t
        else:
            if cur:
                lines.append(cur)
            cur = ch
    if cur:
        lines.append(cur)
    return lines or [""]


def rr(d, xy, r, fill=None, outline=None, width=1):
    d.rounded_rectangle(xy, r, fill=fill, outline=outline, width=width)


def phone(color):
    W, H = 1000, 1280
    im = Image.new("RGB", (W, H), CREAM)
    d = ImageDraw.Draw(im)
    x0, y0, x1, y1 = 130, 16, 870, 1188
    rr(d, (x0, y0, x1, y1), 48, fill=(28, 28, 30))
    rr(d, (x0 + 12, y0 + 12, x1 - 12, y1 - 12), 38, fill=WHITE)
    rr(d, (430, 34, 570, 62), 14, fill=(28, 28, 30))
    d.text((500, 88), "9:41", font=F(20, True), fill=INK, anchor="mm")
    return im, d, (x0 + 28, y0 + 84, x1 - 28, y1 - 24)


def header(d, box, app, accent):
    x0, y0, x1, y1 = box
    d.text((x0, y0), app, font=F(22), fill=FAINT)
    d.line((x0, y0 + 40, x1, y0 + 40), fill=LINE, width=2)
    return y0 + 56


def caption(im, d, text, accent):
    d.text((500, 1238), "示意 · " + text, font=F(22, True), fill=accent, anchor="mm")


def card(d, xy, accent, title, body, badge=None):
    x0, y0, x1, y1 = xy
    rr(d, xy, 18, fill=(250, 247, 242), outline=LINE, width=2)
    d.rectangle((x0, y0, x0 + 8, y1), fill=accent)
    d.text((x0 + 24, y0 + 16), title, font=F(24, True), fill=INK)
    yy = y0 + 52
    for line in body:
        d.text((x0 + 24, yy), line, font=F(22), fill=MUTED)
        yy += 32
    if badge:
        bw = d.textlength(badge, font=F(18, True)) + 24
        rr(d, (x1 - bw - 16, y0 + 14, x1 - 16, y0 + 44), 12, fill=accent)
        d.text((x1 - 16 - bw / 2, y0 + 29), badge, font=F(18, True), fill=WHITE, anchor="mm")


def wave(d, box, accent):
    x0, y0, x1, y1 = box
    rr(d, box, 16, fill=(18, 18, 20))
    import math
    mid = (y0 + y1) / 2
    pts = []
    n = 48
    for i in range(n):
        x = x0 + 16 + i * (x1 - x0 - 32) / (n - 1)
        h = 8 + abs(math.sin(i * 0.45) * 0.7 + math.sin(i * 0.13) * 0.3) * (y1 - y0 - 28) / 2
        d.rectangle((x, mid - h, x + 6, mid + h), fill=accent)


def rows(d, x0, y, x1, items, accent):
    for k, v, *rest in items:
        mark = rest[0] if rest else None
        rr(d, (x0, y, x1, y + 70), 14, fill=(250, 247, 242))
        d.text((x0 + 18, y + 35), k, font=F(20, True), fill=accent, anchor="lm")
        d.text((x0 + 130, y + 35), v, font=F(22), fill=INK, anchor="lm")
        if mark:
            d.text((x1 - 18, y + 35), mark, font=F(20, True), fill=accent, anchor="rm")
        y += 82
    return y


def chips(d, x0, y, items, accent):
    x = x0
    for t in items:
        w = d.textlength(t, font=F(20, True)) + 28
        rr(d, (x, y, x + w, y + 40), 20, fill=accent)
        d.text((x + w / 2, y + 20), t, font=F(20, True), fill=WHITE, anchor="mm")
        x += w + 12
    return y + 52


def searchbar(d, x0, y, x1, q):
    rr(d, (x0, y, x1, y + 56), 28, fill=(243, 239, 233), outline=LINE, width=2)
    d.text((x0 + 24, y + 28), q, font=F(22), fill=INK, anchor="lm")
    return y + 72


# ---------- scenes keyed by exact feature name ----------

def scene_data(name):
    return {
        "会议场景识别 + 结构化大纲": ("录音机", "录完直接出可跳转大纲，还能问录音", "outline"),
        "长录音转写稳定性修复": ("录音机", "连续录近 2 小时不再失败、可断点续录", "longrec"),
        "AI 录音：实时转写 + 说话人 + 摘要模板": ("录音机", "边录边转写，按会议/访谈模板出摘要", "speakers"),
        "录音高亮关键段 + 说话人观点": ("录音机", "长录音不用通篇听，关键句被标出来", "highlight"),
        "端侧录音 → 会议纪要": ("录音机", "纪要在手机本地生成，数据不上云", "ondevice"),
        "备忘录自然语言建提醒 / 录音进笔记才能摘要": ("备忘录", "摘要要先丢进笔记；一句话能变成提醒", "to_notes"),
        "回收站 + 超级岛显示文档处理进度": ("文件管理", "删错可找回；处理进度顶到岛上", "trash"),
        "AI 意图搜索：模糊描述跨应用找文件": ("文件管理", "不记文件名，用一句话把文件搜出来", "search_file"),
        "AI 文件管家：按主题归类 + 输入法找文件": ("文件管理", "聊天时输入法直接推荐本机文档", "ime_file"),
        "Storage Space 2.0 无损压缩腾空间": ("文件管理", "不动用户文件，官方称最多腾约 60GB", "storage60"),
        "分布式文件管理 + 超空间存储": ("文件管理", "跨设备拖文件；256GB 大约多 22GB", "dist_file"),
        "存储压缩 2.0：256GB 机型最多释放约 20GB": ("文件管理", "长期不用的 App 被压缩，约多出 20GB", "storage20"),
        "锁屏岛全屏歌词（含酷狗概念版）": ("锁屏", "抬头就能看词，不必打开播放器", "lyrics"),
        "AirPods 自适应模式强度滑块 + 自定义 EQ": ("控制中心", "通透/降噪可微调，听感在系统层", "eq"),
        "4K Live 动态照片当媒体资产": ("相册 / 播放", "拍到的动态照片，打开还得动起来", "live"),
        "双路定向播音：外放与蓝牙同时出声": ("声音", "一人戴耳机，另一人听外放", "dual"),
        "Writing Tools：全系统校对 / 重写 / 四种摘要": ("记事本", "圈选文字即可校对、重写、四种摘要", "writing"),
        "AI 闪记 / Mind Space：三指上滑即归档": ("记事本", "看见什么就三指收进记忆", "swipe"),
        "笔记 AI 语义搜索 + 长视频变笔记": ("记事本", "一句话找到旧笔记；视频教程变成笔记", "note_search"),
        "HyperOS AI Note + 笔记应用改造": ("记事本", "系统海报里的 AI，要在笔记 App 里摸得到", "ai_note"),
        "原子笔记可授权给第三方 AI": ("记事本", "用户点头后，笔记才给第三方模型", "auth_ai"),
        "小 V 记忆卡：锁屏记录并关联上下文": ("锁屏", "锁屏就能记一笔，并串上以前的攻略", "memcard"),
        "截图一键 Add to Calendar": ("日历", "活动海报截图，一键抽时间地点建日程", "shot_cal"),
        "YOYO Schedule：短信/订单/通话自动变待办": ("日历", "取件码、票、预约自动进待办", "sms_cal"),
        "AI 日历按截止日与习惯排任务": ("日历", "不只记时间，按截止日期帮你排任务", "plan_cal"),
        "Siri 个人语境读日历": ("Siri", "结合邮件和消息，把安排落到日程", "siri_cal"),
        "日历从录音里自动提取待办": ("日历", "开完会不用再手抄，待办从录音长出来", "rec_cal"),
        "超级岛 / 灵动胶囊当「下一件事」表面": ("锁屏 / 岛", "倒计时、取餐、出行抢「下一件」位置", "island"),
        "智能到站提醒：震动 + 弹窗 + 蓝牙播报": ("时钟", "快到站时震动、弹窗、耳机播报", "station"),
        "闹钟音量与铃声音量解绑": ("设置", "调小铃声不再连带把闹钟调没", "vol"),
        "Math Notes：手写即算，iPad 可 3D 作图": ("计算器", "手写算式实时出结果", "math"),
        "小艺深度解题": ("小艺", "拍题在助手里出步骤，不在计算器里", "solve"),
        "桌面汇率换算卡片": ("桌面", "汇率小组件直接摆在桌面上", "fx"),
        "Wallet 扫 QR 生成数字通行证": ("钱包", "扫一张码，会员卡/票进钱包", "wallet"),
        "三折叠外屏直接扫码": ("外屏", "不用展开，折叠态就能扫码付款", "outer"),
        "闪记扫描点餐码 / 超级岛展示取餐码": ("岛 / 闪记", "点餐记下账单，取餐码自己冒到岛上", "meal"),
        "锁屏直接扫码，无需先解锁": ("锁屏", "支付、加好友少一步解锁", "lock_scan"),
        "液态玻璃 / 柔光玻璃成为系统皮肤": ("外观", "主题变成系统材质，不是主题商店套装", "glass"),
        "便签换字体皮肤；相册浅色编辑": ("便签 / 相册", "个性化下放到单个 App", "skin"),
        "应用五分身（含串号争议）": ("应用分身", "一个 App 开到 5 个，隔离仍有翻车", "five"),
        "原子工作台下放直板机 + 五应用任务组": ("多窗口", "直板机也能多窗 + 一套任务打包走", "desk"),
        "YOYO GUI Agent：看懂屏幕自己点": ("YOYO", "不用适配 API，看屏幕自己点 14 步出差", "agent"),
        "快捷指令用一句话生成": ("快捷指令", "用口语描述，系统把步骤拼出来", "shortcut"),
        "游戏防眩光模式（官方称视觉舒适度 +29%）": ("游戏", "进游戏自动带上防眩光，而不是藏在设置", "glare"),
        "Phone Clone：44GB / 57 分钟并省出空间": ("换机", "44GB 迁 57 分，迁完立刻多出约 10GB", "clone44"),
        "小米换机迁移更多设置与系统应用数据": ("换机", "搬的是闹钟笔记录音桌面，不只照片", "clone_set"),
        "超空间存储延长换机周期": ("存储", "软件多挤出 22GB，可能让人晚一年换机", "delay"),
        "跨品牌三系统互传文件": ("互传", "不再只在自家品牌里搬文件", "cross"),
        "小米换机 Mi Mover 4.6.1.7（9/16 月更）": ("换机", "还在补覆盖率：通讯录、微信、桌面、设置", "mover"),
        "跨苹果互联：通知同步、微信镜像回复、云相册同步": ("跨生态", "iPhone 通知和微信可以在小米上处理", "apple_link"),
        "Safari AI：标签按主题分组 + Notify Me": ("Safari", "标签自动归堆，网页更新会通知你", "safari"),
        "小布记忆同步系统浏览器与夸克收藏": ("小布记忆", "收藏进了助手，不只活在书签栏", "bookmarks"),
        "相册 5.0：加载重构 + AI 修图统一入口": ("相册", "先不卡；扩图消除换天收进同一栏", "gal5"),
        "Photos Clean Up / Extend / 空间重构": ("相册", "消除路人、扩图，失败可回到原图", "cleanup"),
        "AI Remix 抠图贴纸 / 笔记图片涂鸦": ("相册 / 笔记", "抠出来当贴纸，笔记里也能直接画", "sticker"),
        "相册语义检索（端侧）": ("相册", "「穿红衣服的那张」在本地搜，不上云", "gal_search"),
        "视频任意一帧直接存成照片": ("相册", "视频里挑最清晰的一帧，不用截图再裁", "frame"),
        "相册主动推荐重复与模糊照片供清理": ("相册", "重复、模糊的照片被挑出来建议删", "dup"),
        "相册 HDR 影像：17EV 动态范围 + 蔡司色彩": ("相册", "高光暗部都在，相册要能把 HDR 呈现出来", "hdr"),
        "Siri AI 独立 App + 屏幕感知 + 相机模式": ("Siri", "看见你屏幕和相机里的东西再回答", "siri_see"),
        "Siri 应用内办事 / 跨设备续聊": ("Siri", "在第三方 App 里做完，iPhone/Mac 接着聊", "siri_do"),
        "超级小爱 2.0 专家模式：跨应用跨设备执行": ("超级小爱", "一句话调支付宝和高德；专家模式要积分", "xiaoai"),
        "小布记忆：搜索 / 问答 / 推荐闭环": ("小布", "闪记过的内容可以问，临期团购会自己冒出来", "xiaobu"),
        "YOYO Next：MCP + GUI Agent 接管系统": ("YOYO", "系统级权限接管 App；低内存机会被砍功能", "yoyo"),
        "小艺中枢：2100+ 系统能力的 Agent": ("小艺", "能力数字很大，要看 20 个任务能不能跑通", "xiaoyi"),
        "蓝心小 V / 小 V Pro 系统级 Agent": ("小 V", "收藏攻略+截图+笔记，串成一份旅行路书", "xiaov"),
        "蓝心大模型 4.0 驱动的小 V：端云协同 + 长期记忆": ("小 V", "X500 首发更长记忆，记得住才用得上", "xiaov4"),
        "密码 App：泄露提醒 + 应用内直接改密码": ("密码", "告诉你哪个号被泄露，并直接帮你改", "leak"),
        "新增独立「密码」App 并打通苹果设备": ("密码", "密码从浏览器附属变成独立系统 App", "pwd_app"),
    }.get(name)


def paint(feat):
    os.makedirs(ART, exist_ok=True)
    name = feat["name"]
    accent = hexrgb(feat.get("productColor") or "#c4161c")
    meta = scene_data(name)
    app = meta[0] if meta else feat.get("productName", "")
    cap = meta[1] if meta else name
    kind = meta[2] if meta else "generic"
    im, d, box = phone(accent)
    x0, y0, x1, y1 = box
    y = header(d, box, app, accent)
    draw_kind(d, kind, x0, y, x1, y1, accent, name)
    caption(im, d, cap, accent)
    path = os.path.join(ART, "feat-%s.png" % abs(hash(name)))
    im.save(path, "PNG", optimize=True)
    return path


def draw_kind(d, kind, x0, y, x1, y1, a, name):
    fn = KINDS.get(kind, generic)
    fn(d, x0, y, x1, y1, a, name)


def generic(d, x0, y, x1, y1, a, name):
    card(d, (x0, y, x1, y + 160), a, name[:18], wrap(d, name, F(22), x1 - x0 - 50)[:3])


def outline(d, x0, y, x1, y1, a, name):
    wave(d, (x0, y, x1, y + 110), a)
    d.text((x0, y + 128), "会议  42:18  ·  已识别为会议场景", font=F(20), fill=MUTED)
    rows(d, x0, y + 170, x1, [
        ("00:12", "开场：本季预算与排期"),
        ("18:40", "争议：渠道费用谁出", "要点"),
        ("36:05", "决议：周五前出方案", "待办"),
    ], a)
    rr(d, (x0, y + 430, x1, y + 520), 16, fill=a)
    d.text((x0 + 24, y + 475), "问超级小爱：今天谁负责跟进？", font=F(22, True), fill=WHITE, anchor="lm")


def longrec(d, x0, y, x1, y1, a, name):
    wave(d, (x0, y, x1, y + 90), a)
    d.text((500, y + 130), "1:58:12", font=F(44, True), fill=INK, anchor="mm")
    d.text((500, y + 180), "连续录音进行中", font=F(22), fill=MUTED, anchor="mm")
    rows(d, x0, y + 220, x1, [
        ("修复前", "偶发失败、重复记录、整段丢失", "×"),
        ("修复后", "断点续录，录完是完整一条", "✓"),
        ("门槛", "连续 2 小时不丢，才谈 AI 摘要", ""),
    ], a)


def speakers(d, x0, y, x1, y1, a, name):
    chips(d, x0, y, ["会议", "访谈", "讲座"], a)
    y += 20
    for who, line in [("张三", "先把客户的三个诉求对齐。"), ("李四", "预算只有上周那一版。"), ("张三", "那纪要里单独列待办。")]:
        rr(d, (x0, y, x1, y + 88), 16, fill=(250, 247, 242))
        rr(d, (x0 + 16, y + 24, x0 + 88, y + 64), 14, fill=a)
        d.text((x0 + 52, y + 44), who[0], font=F(22, True), fill=WHITE, anchor="mm")
        d.text((x0 + 104, y + 30), who, font=F(20, True), fill=INK)
        d.text((x0 + 104, y + 58), line, font=F(20), fill=MUTED)
        y += 100
    d.text((x0, y + 8), "结束 → 自动标题 / 章节 / 可导出摘要", font=F(20), fill=a)


def highlight(d, x0, y, x1, y1, a, name):
    d.text((x0, y), "录音  1:12:04", font=F(20), fill=MUTED)
    y += 40
    lines = [
        (False, "大家先同步一下上周进度。"),
        (True, "结论：方案周五下班前必须给到。"),
        (False, "中间有一段闲聊可以跳过。"),
        (True, "李华认为预算不够，要砍渠道。"),
        (False, "……"),
    ]
    for hot, t in lines:
        if hot:
            rr(d, (x0, y - 6, x1, y + 40), 10, fill=(255, 236, 179))
            d.text((x0 + 12, y + 16), "▌ " + t, font=F(22, True), fill=INK, anchor="lm")
        else:
            d.text((x0 + 12, y + 16), t, font=F(22), fill=FAINT, anchor="lm")
        y += 56
    d.text((x0, y + 12), "黄底 = 关键段 / 说话人观点", font=F(20), fill=a)


def ondevice(d, x0, y, x1, y1, a, name):
    rr(d, (x0, y, x1, y + 90), 16, fill=(18, 18, 20))
    d.text((x0 + 24, y + 45), "🔒  端侧处理  ·  数据不出手机", font=F(22, True), fill=WHITE, anchor="lm")
    card(d, (x0, y + 120, x1, y + 340), a, "会议纪要（本地）", [
        "1. 对齐本季三项目标",
        "2. 渠道预算待砍",
        "3. 周五前出一页纸方案",
        "未上传云端",
    ], "不上云")


def to_notes(d, x0, y, x1, y1, a, name):
    card(d, (x0, y, x1, y + 150), a, "① 录音机", ["转写很干净", "但这里没有「生成摘要」"], "缺入口")
    d.text((500, y + 175), "↓  必须先分享到备忘录", font=F(22, True), fill=a, anchor="mm")
    card(d, (x0, y + 200, x1, y + 430), a, "② 备忘录", [
        "附件  会议.m4a",
        "「今晚 6 点接爸爸」",
        "→ 提醒  今天 18:00  接爸爸",
    ], "已创建")
    d.text((x0, y + 455), "录音机不是主入口，笔记才是。", font=F(20), fill=MUTED)


def trash(d, x0, y, x1, y1, a, name):
    rows(d, x0, y, x1, [
        ("回收站", "合同-最终.pdf   昨天删除", "还原"),
        ("回收站", "报价-v3.xlsx     3 天前", "还原"),
    ], a)
    rr(d, (x0, y + 200, x1, y + 310), 20, fill=(18, 18, 20))
    d.text((x0 + 24, y + 230), "超级岛", font=F(18), fill=(180, 180, 180))
    d.text((x0 + 24, y + 268), "超级文档  正在处理  62%", font=F(24, True), fill=WHITE)
    d.rectangle((x0 + 24, y + 288, x0 + 24 + 280, y + 296), fill=(60, 60, 60))
    d.rectangle((x0 + 24, y + 288, x0 + 24 + 170, y + 296), fill=a)


def search_file(d, x0, y, x1, y1, a, name):
    y = searchbar(d, x0, y, x1, "上周客户那份报价 PDF")
    rows(d, x0, y, x1, [
        ("PDF", "华兴-报价-0914.pdf", "文件管理"),
        ("截图", "微信  报价截图", "相册"),
        ("日程", "周五  客户评审", "日历"),
    ], a)
    d.text((x0, y + 280), "没记文件名也能跨应用定位", font=F(20), fill=a)


def ime_file(d, x0, y, x1, y1, a, name):
    rr(d, (x0, y, x1, y + 220), 18, fill=(243, 247, 255))
    d.text((x0 + 20, y + 20), "微信  ·  正在输入", font=F(18), fill=FAINT)
    rr(d, (x0 + 20, y + 56, x0 + 420, y + 110), 16, fill=WHITE)
    d.text((x0 + 36, y + 83), "把上周那份合同发我", font=F(22), fill=INK, anchor="lm")
    d.text((x0 + 20, y + 140), "输入法推荐本机文件", font=F(20, True), fill=a)
    rr(d, (x0 + 20, y + 168, x0 + 360, y + 204), 12, fill=a)
    d.text((x0 + 36, y + 186), "合同-华兴-终稿.pdf", font=F(20, True), fill=WHITE, anchor="lm")
    card(d, (x0, y + 250, x1, y + 400), a, "同时：按主题归类", ["出差", "合同", "发票  自动堆在一起"])


def storage60(d, x0, y, x1, y1, a, name):
    _storage(d, x0, y, x1, a, "256 GB", "已用 248", "压缩后 188", "最多约 +60GB", "无损压缩 + 清冗余，文件还在")


def storage20(d, x0, y, x1, y1, a, name):
    _storage(d, x0, y, x1, a, "256 GB", "已用 240", "压缩后 220", "约 +20GB", "压缩的是长期不用的 App")


def dist_file(d, x0, y, x1, y1, a, name):
    rr(d, (x0, y, x0 + 280, y + 200), 20, fill=(250, 247, 242), outline=LINE, width=2)
    d.text((x0 + 140, y + 70), "手机", font=F(22, True), fill=INK, anchor="mm")
    d.text((x0 + 140, y + 110), "合同.pdf", font=F(20), fill=a, anchor="mm")
    d.text((x0 + 330, y + 100), "拖到 →", font=F(22, True), fill=a, anchor="mm")
    rr(d, (x1 - 280, y, x1, y + 200), 20, fill=(250, 247, 242), outline=LINE, width=2)
    d.text((x1 - 140, y + 70), "平板", font=F(22, True), fill=INK, anchor="mm")
    d.text((x1 - 140, y + 110), "已放入文档", font=F(20), fill=MUTED, anchor="mm")
    card(d, (x0, y + 230, x1, y + 400), a, "超空间存储", ["256GB 机型大约多 22GB 可用", "用软件推迟下一次换机"])


def _storage(d, x0, y, x1, a, cap, b, af, gain, sub):
    d.text((x0, y), cap, font=F(20), fill=MUTED)
    rr(d, (x0, y + 40, x1, y + 70), 8, fill=(230, 224, 216))
    rr(d, (x0, y + 40, x0 + 520, y + 70), 8, fill=(190, 80, 80))
    d.text((x0, y + 88), b, font=F(20), fill=(180, 60, 60))
    rr(d, (x0, y + 140, x1, y + 170), 8, fill=(230, 224, 216))
    rr(d, (x0, y + 140, x0 + 360, y + 170), 8, fill=a)
    d.text((x0, y + 188), af, font=F(20), fill=a)
    card(d, (x0, y + 240, x1, y + 400), a, gain, [sub])


def lyrics(d, x0, y, x1, y1, a, name):
    rr(d, (x0, y, x1, y1 - 40), 28, fill=(18, 12, 28))
    d.text((500, y + 80), "9:41", font=F(56, True), fill=WHITE, anchor="mm")
    d.text((500, y + 200), "岛  ·  正在播放", font=F(20), fill=(180, 180, 200), anchor="mm")
    d.text((500, y + 280), "后来的我们", font=F(28, True), fill=WHITE, anchor="mm")
    d.text((500, y + 340), "再见面  该说些什么", font=F(36, True), fill=a, anchor="mm")
    d.text((500, y + 400), "也不是  没想过", font=F(24), fill=(140, 140, 160), anchor="mm")


def eq(d, x0, y, x1, y1, a, name):
    d.text((x0, y), "控制中心  ·  AirPods", font=F(20), fill=MUTED)
    y += 50
    for lab, pos in [("降噪 ←→ 通透", 0.62), ("低音", 0.4), ("人声", 0.7)]:
        d.text((x0, y), lab, font=F(22, True), fill=INK)
        rr(d, (x0, y + 40, x1, y + 52), 6, fill=LINE)
        w = int((x1 - x0) * pos)
        rr(d, (x0, y + 40, x0 + w, y + 52), 6, fill=a)
        y += 100
    d.text((x0, y), "听感在系统音频层，不在播放器 App 里", font=F(20), fill=a)


def live(d, x0, y, x1, y1, a, name):
    rr(d, (x0, y, x1, y + 280), 20, fill=(40, 44, 56))
    d.text((500, y + 140), "LIVE  4K", font=F(36, True), fill=WHITE, anchor="mm")
    chips(d, x0, y + 310, ["原样播放", "导出静帧"], a)
    d.text((x0, y + 380), "相机拍得到，播放器/相册必须接得住", font=F(20), fill=MUTED)


def dual(d, x0, y, x1, y1, a, name):
    card(d, (x0, y, x1, y + 150), a, "手机外放", ["客厅里另一人在听"], "开")
    card(d, (x0, y + 170, x1, y + 320), a, "蓝牙耳机", ["你自己戴着，两条路同时出声"], "开")
    d.text((x0, y + 350), "两条通路要对齐延迟，否则有回声", font=F(20), fill=MUTED)


def writing(d, x0, y, x1, y1, a, name):
    rr(d, (x0, y, x1, y + 160), 16, fill=(255, 252, 230))
    d.text((x0 + 20, y + 24), "选中的句子", font=F(18), fill=FAINT)
    d.text((x0 + 20, y + 70), "请尽快确认本周排期谢谢。", font=F(24, True), fill=INK)
    y = chips(d, x0, y + 190, ["校对", "重写", "摘要", "列表", "表格"], a)
    d.text((x0, y + 20), "任意输入框都能调起，不只笔记 App", font=F(20), fill=MUTED)


def swipe(d, x0, y, x1, y1, a, name):
    rr(d, (x0, y, x1, y + 240), 18, fill=(30, 30, 34))
    d.text((500, y + 80), "屏幕上的文字 / 图 / 录音", font=F(22), fill=WHITE, anchor="mm")
    d.text((500, y + 140), "三指上滑", font=F(40, True), fill=a, anchor="mm")
    d.text((500, y + 190), "或按 Snap Key", font=F(20), fill=(180, 180, 180), anchor="mm")
    card(d, (x0, y + 270, x1, y + 430), a, "小布记忆", ["已归档 · 自动分类", "长视频也可出章节"])


def note_search(d, x0, y, x1, y1, a, name):
    y = searchbar(d, x0, y, x1, "三个月前那条出差备忘")
    rows(d, x0, y, x1, [
        ("笔记", "9/2  上海客户沟通要点", "语义命中"),
        ("视频", "B 站教程 → 已生成笔记", "三指下滑"),
    ], a)


def ai_note(d, x0, y, x1, y1, a, name):
    card(d, (x0, y, x1, y + 280), a, "笔记", ["圈选即可摘要 / 改写", "失败要有明确提示，不能只活在助手里"], "AI")
    d.text((x0, y + 310), "能力必须在 App 里有按钮，不能只写在系统海报", font=F(20), fill=MUTED)


def auth_ai(d, x0, y, x1, y1, a, name):
    rows(d, x0, y, x1, [
        ("默认", "端侧整理、主题归档", "开"),
        ("第三方 AI", "需用户授权才能读笔记", "关"),
    ], a)
    d.text((x0, y + 200), "开放给第三方是开关，不是默认", font=F(20), fill=a)


def memcard(d, x0, y, x1, y1, a, name):
    rr(d, (x0, y, x1, y + 260), 24, fill=(18, 18, 22))
    d.text((500, y + 70), "9:41", font=F(40, True), fill=WHITE, anchor="mm")
    rr(d, (x0 + 40, y + 130, x1 - 40, y + 220), 18, fill=(40, 40, 48))
    d.text((x0 + 60, y + 155), "小 V 记忆卡", font=F(18), fill=a)
    d.text((x0 + 60, y + 188), "记下：周末去杭州，住湖景", font=F(22, True), fill=WHITE)
    card(d, (x0, y + 290, x1, y + 430), a, "已关联", ["收藏的攻略 + 相册截图 + 旧笔记", "可串成一份旅行路书"])


def shot_cal(d, x0, y, x1, y1, a, name):
    rr(d, (x0, y, x1, y + 220), 16, fill=(40, 36, 80))
    d.text((500, y + 70), "截图", font=F(18), fill=(180, 180, 200), anchor="mm")
    d.text((500, y + 120), "周五  20:00", font=F(28, True), fill=WHITE, anchor="mm")
    d.text((500, y + 165), "梅赛德斯奔驰文化中心", font=F(20), fill=WHITE, anchor="mm")
    rr(d, (x0 + 80, y + 250, x1 - 80, y + 320), 18, fill=a)
    d.text((500, y + 285), "添加到日历", font=F(24, True), fill=WHITE, anchor="mm")
    d.text((x0, y + 350), "时间 / 地点可预览再保存", font=F(20), fill=MUTED)


def sms_cal(d, x0, y, x1, y1, a, name):
    card(d, (x0, y, x1, y + 140), a, "短信", ["【丰巢】取件码  8-3-21", "今日 21:00 前"], "识别到")
    d.text((500, y + 165), "↓ 自动生成", font=F(22, True), fill=a, anchor="mm")
    card(d, (x0, y + 190, x1, y + 360), a, "日历待办", ["今天 21:00  取快递", "也可从一张图、一通电话抽取"], "可撤销")


def plan_cal(d, x0, y, x1, y1, a, name):
    rows(d, x0, y, x1, [
        ("今天", "写方案  2h   按习惯排在上午", ""),
        ("周五", "客户评审  截止日优先", "先做"),
        ("周日", "运动  1h   你通常这个点有空", ""),
    ], a)


def siri_cal(d, x0, y, x1, y1, a, name):
    rr(d, (x0, y, x1, y + 120), 16, fill=(243, 239, 233))
    d.text((x0 + 20, y + 60), "你  「明天下午有空吗」", font=F(22), fill=INK, anchor="lm")
    card(d, (x0, y + 150, x1, y + 360), a, "Siri 读了邮件 / 日历 / 消息", [
        "明天 15:00–16:00  已有评审",
        "16:30  之后空闲，要不要建日程？",
    ])


def rec_cal(d, x0, y, x1, y1, a, name):
    card(d, (x0, y, x1, y + 150), a, "录音", ["「周五前把方案给到」", "「下周三上门安装」"])
    d.text((500, y + 175), "↓ 抽成待办", font=F(22, True), fill=a, anchor="mm")
    rows(d, x0, y + 200, x1, [
        ("周五", "提交方案", "来自录音"),
        ("下周三", "上门安装", "来自录音"),
    ], a)


def island(d, x0, y, x1, y1, a, name):
    rr(d, (x0, y, x1, y + 420), 24, fill=(18, 18, 22))
    d.text((500, y + 80), "9:41", font=F(48, True), fill=WHITE, anchor="mm")
    rr(d, (x0 + 50, y + 150, x1 - 50, y + 240), 22, fill=(40, 40, 48))
    d.text((x0 + 80, y + 195), "下一件   12:30  上车去机场", font=F(24, True), fill=WHITE, anchor="lm")
    d.text((x0 + 50, y + 280), "倒计时 / 取餐 / 出行  都在抢这块", font=F(20), fill=(160, 160, 170))


def station(d, x0, y, x1, y1, a, name):
    card(d, (x0, y, x1, y + 200), a, "2 号线  ·  下一站  陆家嘴", ["临近到站", "震动 + 弹窗 + 蓝牙语音"], "提醒")
    d.text((x0, y + 230), "本质是带位置的闹钟，不是地图的边角", font=F(20), fill=MUTED)


def vol(d, x0, y, x1, y1, a, name):
    d.text((x0, y), "设置  ·  声音与触感", font=F(20), fill=MUTED)
    y += 50
    for lab, pos in [("铃声音量", 0.25), ("闹钟音量", 0.85)]:
        d.text((x0, y), lab, font=F(24, True), fill=INK)
        rr(d, (x0, y + 44, x1, y + 58), 7, fill=LINE)
        rr(d, (x0, y + 44, x0 + int((x1 - x0) * pos), y + 58), 7, fill=a)
        y += 110
    d.text((x0, y), "以前一个滑块，调小铃声会睡过头", font=F(20), fill=a)


def math(d, x0, y, x1, y1, a, name):
    rr(d, (x0, y, x1, y + 260), 18, fill=(255, 252, 230))
    d.text((x0 + 24, y + 40), "手写", font=F(18), fill=FAINT)
    d.text((x0 + 24, y + 100), "2x + 3 = 11", font=F(40, True), fill=INK)
    d.text((x0 + 24, y + 170), "x = 4", font=F(40, True), fill=a)
    d.text((x0, y + 290), "写下来就算，不是多几个科学键", font=F(20), fill=MUTED)


def solve(d, x0, y, x1, y1, a, name):
    rr(d, (x0, y, x1, y + 180), 16, fill=(40, 40, 48))
    d.text((500, y + 90), "拍题", font=F(28, True), fill=WHITE, anchor="mm")
    card(d, (x0, y + 210, x1, y + 400), a, "小艺  ·  深度解题", ["步骤在助手里", "计算器 App 里没有这个入口"])


def fx(d, x0, y, x1, y1, a, name):
    rr(d, (x0, y, x1, y + 220), 24, fill=WHITE, outline=LINE, width=2)
    d.text((x0 + 28, y + 30), "汇率", font=F(20), fill=FAINT)
    d.text((x0 + 28, y + 90), "1 USD  =  7.12 CNY", font=F(32, True), fill=INK)
    d.text((x0 + 28, y + 150), "桌面 2×2 / 4×2 卡片", font=F(20), fill=a)
    d.text((x0, y + 250), "海外刚需，不要藏在科学计算器第二页", font=F(20), fill=MUTED)


def wallet(d, x0, y, x1, y1, a, name):
    rr(d, (x0 + 80, y, x1 - 80, y + 200), 16, fill=(30, 30, 30))
    d.rectangle((x0 + 160, y + 40, x1 - 160, y + 160), outline=a, width=6)
    d.text((500, y + 230), "对准二维码", font=F(20), fill=MUTED, anchor="mm")
    card(d, (x0, y + 270, x1, y + 430), a, "已加入钱包", ["会员卡 / 活动票 / 积分卡", "扫一扫的落点是钱包，不是一个相机框"])


def outer(d, x0, y, x1, y1, a, name):
    # folded: small outer screen
    rr(d, (x0 + 180, y, x1 - 180, y + 420), 28, fill=(20, 20, 22))
    d.text((500, y + 70), "外屏  ·  未展开", font=F(18), fill=(160, 160, 160), anchor="mm")
    d.rectangle((500 - 70, y + 130, 500 + 70, y + 270), outline=a, width=5)
    d.text((500, y + 330), "扫码", font=F(28, True), fill=WHITE, anchor="mm")
    d.text((500, y + 370), "付款 / 入场  不用打开", font=F(18), fill=(160, 160, 160), anchor="mm")


def meal(d, x0, y, x1, y1, a, name):
    card(d, (x0, y, x1, y + 140), a, "闪记扫点餐码", ["已记下账单"])
    rr(d, (x0, y + 170, x1, y + 280), 20, fill=(18, 18, 22))
    d.text((x0 + 24, y + 200), "超级岛", font=F(18), fill=(160, 160, 160))
    d.text((x0 + 24, y + 240), "麦当劳  取餐码  304", font=F(26, True), fill=WHITE)
    d.text((x0, y + 310), "码自己冒出来，不用再打开相机", font=F(20), fill=MUTED)


def lock_scan(d, x0, y, x1, y1, a, name):
    rr(d, (x0, y, x1, y + 420), 24, fill=(18, 18, 22))
    d.text((500, y + 90), "9:41", font=F(48, True), fill=WHITE, anchor="mm")
    rr(d, (x0 + 90, y + 200, x1 - 90, y + 280), 22, fill=a)
    d.text((500, y + 240), "扫一扫", font=F(28, True), fill=WHITE, anchor="mm")
    d.text((500, y + 330), "未解锁  ·  只开相机，不露通知和付款码", font=F(18), fill=(160, 160, 160), anchor="mm")


def glass(d, x0, y, x1, y1, a, name):
    rr(d, (x0, y, x1, y + 200), 24, fill=(210, 220, 230))
    rr(d, (x0 + 40, y + 40, x1 - 40, y + 160), 20, fill=(255, 255, 255, ))
    d.text((500, y + 80), "液态玻璃 / 柔光玻璃", font=F(24, True), fill=INK, anchor="mm")
    d.text((500, y + 120), "系统视觉层", font=F(20), fill=MUTED, anchor="mm")
    d.text((x0, y + 230), "可调材质和锁屏，不是换一套第三方主题包", font=F(20), fill=a)


def skin(d, x0, y, x1, y1, a, name):
    chips(d, x0, y, ["宋体", "黑体", "手写"], a)
    card(d, (x0, y + 70, x1, y + 260), a, "便签皮肤", ["字体和皮肤可换", "相册编辑：深色 / 浅色 / 跟随系统"])


def five(d, x0, y, x1, y1, a, name):
    d.text((x0, y), "同一应用 × 5", font=F(20), fill=MUTED)
    y += 40
    for i in range(5):
        rr(d, (x0, y, x1, y + 64), 14, fill=(250, 247, 242))
        rr(d, (x0 + 16, y + 12, x0 + 52, y + 48), 10, fill=a)
        d.text((x0 + 70, y + 32), "应用分身  %d" % (i + 1), font=F(22), fill=INK, anchor="lm")
        y += 74
    d.text((x0, y + 8), "用户反馈会串号，隔离没做到位就是事故", font=F(20), fill=a)


def desk(d, x0, y, x1, y1, a, name):
    w = (x1 - x0 - 16) / 2
    h = 140
    labs = ["文档", "浏览器", "微信", "邮件"]
    for i, lab in enumerate(labs):
        xx = x0 + (i % 2) * (w + 16)
        yy = y + (i // 2) * (h + 16)
        rr(d, (xx, yy, xx + w, yy + h), 16, fill=(250, 247, 242), outline=LINE, width=2)
        d.text((xx + w / 2, yy + h / 2), lab, font=F(22, True), fill=INK, anchor="mm")
    d.text((x0, y + 320), "文件可在窗口间拖  ·  五应用打成一组带走", font=F(20), fill=a)


def agent(d, x0, y, x1, y1, a, name):
    d.text((x0, y), "看懂屏幕，自己点  ·  14 步出差", font=F(20), fill=MUTED)
    steps = ["日历", "12306 买票", "美团订酒店", "写回日程"]
    y += 40
    for i, s in enumerate(steps, 1):
        rr(d, (x0, y, x1, y + 70), 14, fill=(250, 247, 242))
        rr(d, (x0 + 16, y + 16, x0 + 54, y + 54), 12, fill=a)
        d.text((x0 + 35, y + 35), str(i), font=F(22, True), fill=WHITE, anchor="mm")
        d.text((x0 + 70, y + 35), s, font=F(22), fill=INK, anchor="lm")
        y += 82
    d.text((x0, y + 8), "支付和权限页必须拦截，不能静默连点", font=F(20), fill=a)


def shortcut(d, x0, y, x1, y1, a, name):
    y = searchbar(d, x0, y, x1, "离开公司时给家人发 ETA")
    d.text((x0, y), "系统自动拼出步骤，还可再改", font=F(20), fill=MUTED)
    y += 36
    rows(d, x0, y, x1, [
        ("1", "定位：已离开公司围栏", ""),
        ("2", "打开信息，发给家人", ""),
        ("3", "填入预计到达时间", "可编辑"),
    ], a)


def glare(d, x0, y, x1, y1, a, name):
    rr(d, (x0, y, x1, y + 240), 18, fill=(20, 24, 40))
    d.text((500, y + 90), "游戏中", font=F(22), fill=WHITE, anchor="mm")
    rr(d, (x0 + 80, y + 140, x1 - 80, y + 200), 16, fill=a)
    d.text((500, y + 170), "防眩光  开", font=F(24, True), fill=WHITE, anchor="mm")
    d.text((x0, y + 270), "官方称视觉舒适度 +29%  ·  应随游戏自动带入", font=F(20), fill=MUTED)


def clone44(d, x0, y, x1, y1, a, name):
    d.text((x0, y), "Phone Clone", font=F(20), fill=MUTED)
    rr(d, (x0, y + 40, x1, y + 70), 8, fill=LINE)
    rr(d, (x0, y + 40, x0 + 500, y + 70), 8, fill=a)
    d.text((x0, y + 90), "44 GB   ·   57 分 23 秒", font=F(28, True), fill=INK)
    rows(d, x0, y + 150, x1, [
        ("成功", "12 项", ""),
        ("失败", "1 项  可重试", ""),
        ("迁完", "立刻多出约 10–14GB", ""),
    ], a)


def clone_set(d, x0, y, x1, y1, a, name):
    rows(d, x0, y, x1, [
        ("相册 / 微信", "以前就会搬", "✓"),
        ("闹钟", "系统应用数据", "新"),
        ("笔记 / 录音", "系统应用数据", "新"),
        ("桌面布局 / 设置", "搬成一台熟手机", "新"),
    ], a)


def delay(d, x0, y, x1, y1, a, name):
    card(d, (x0, y, x1, y + 220), a, "256GB + 超空间", ["大约多 22GB 可用", "这不是换机工具，但会让人晚一年换"])


def cross(d, x0, y, x1, y1, a, name):
    chips(d, x0, y, ["苹果", "OPPO", "vivo", "小米"], a)
    card(d, (x0, y + 70, x1, y + 250), a, "跨三套系统传文件", ["换机不再只是品牌内闭环", "海外第一优先级仍是 iPhone → 我们"])


def mover(d, x0, y, x1, y1, a, name):
    d.text((x0, y), "Mi Mover  4.6.1.7", font=F(20), fill=MUTED)
    rows(d, x0, y + 40, x1, [
        ("通讯录", "覆盖中", ""),
        ("微信记录", "盯覆盖率", ""),
        ("桌面布局", "盯覆盖率", ""),
        ("系统设置", "盯覆盖率", ""),
    ], a)


def apple_link(d, x0, y, x1, y1, a, name):
    card(d, (x0, y, x1, y + 140), a, "iPhone", ["一条微信  「到了吗」"])
    d.text((500, y + 165), "↓ 同步到小米", font=F(22, True), fill=a, anchor="mm")
    card(d, (x0, y + 190, x1, y + 380), a, "小米手机", ["通知可回微信 / QQ", "文件照片互传 · 云相册 · Mac 开三个窗"])


def safari(d, x0, y, x1, y1, a, name):
    rows(d, x0, y, x1, [
        ("旅行", "机票  酒店  签证  三个标签", "自动分组"),
        ("工作", "文档  表格", "自动分组"),
        ("Notify Me", "价格页有更新就通知你", "开"),
    ], a)


def bookmarks(d, x0, y, x1, y1, a, name):
    rows(d, x0, y, x1, [
        ("系统浏览器", "收藏已同步进小布记忆", "✓"),
        ("夸克 / UC", "收藏已同步", "✓"),
        ("问小布", "「我存过的签证材料」", "可问"),
    ], a)


def gal5(d, x0, y, x1, y1, a, name):
    chips(d, x0, y, ["扩图", "消除", "换天", "人像"], a)
    card(d, (x0, y + 70, x1, y + 280), a, "统一修图栏", ["先保证不卡", "批量参数可粘贴，覆盖可恢复"])


def cleanup(d, x0, y, x1, y1, a, name):
    rr(d, (x0, y, (x0 + x1) / 2 - 8, y + 200), 16, fill=(80, 80, 90))
    d.text(((x0 + (x0 + x1) / 2 - 8) / 2, y + 100), "原图  路人", font=F(20), fill=WHITE, anchor="mm")
    rr(d, ((x0 + x1) / 2 + 8, y, x1, y + 200), 16, fill=(40, 70, 50))
    d.text(((x1 + (x0 + x1) / 2 + 8) / 2, y + 100), "Clean Up 后", font=F(20), fill=WHITE, anchor="mm")
    d.text((x0, y + 230), "Extend 扩图  ·  失败必须能回到原图", font=F(20), fill=a)


def sticker(d, x0, y, x1, y1, a, name):
    rr(d, (x0, y, x1, y + 200), 18, fill=(255, 236, 210))
    d.ellipse((x0 + 80, y + 40, x0 + 220, y + 180), fill=a)
    d.text((x0 + 260, y + 100), "抠出主体 → 贴纸 / 拼贴", font=F(22, True), fill=INK, anchor="lm")
    d.text((x0, y + 230), "笔记里的图也可以直接涂鸦，相册和笔记共用一套抠图", font=F(20), fill=MUTED)


def gal_search(d, x0, y, x1, y1, a, name):
    y = searchbar(d, x0, y, x1, "穿红衣服的那张")
    rr(d, (x0, y, x0 + 200, y + 200), 14, fill=(180, 60, 60))
    rr(d, (x0 + 220, y, x0 + 420, y + 200), 14, fill=(160, 50, 50))
    d.text((x0, y + 220), "端侧检索  ·  数据不上云", font=F(20), fill=a)


def frame(d, x0, y, x1, y1, a, name):
    rr(d, (x0, y, x1, y + 220), 16, fill=(30, 30, 36))
    d.text((500, y + 90), "视频  00:07 / 00:21", font=F(20), fill=WHITE, anchor="mm")
    rr(d, (x0 + 40, y + 140, x1 - 40, y + 150), 4, fill=(80, 80, 90))
    rr(d, (x0 + 40, y + 140, x0 + 220, y + 150), 4, fill=a)
    rr(d, (x0 + 80, y + 250, x1 - 80, y + 320), 18, fill=a)
    d.text((500, y + 285), "将这一帧存为照片", font=F(22, True), fill=WHITE, anchor="mm")


def dup(d, x0, y, x1, y1, a, name):
    d.text((x0, y), "相册主动建议清理", font=F(20), fill=MUTED)
    rows(d, x0, y + 40, x1, [
        ("重复", "同一张连拍  12 张", "建议留 1"),
        ("模糊", "手抖  3 张", "建议删"),
    ], a)
    d.text((x0, y + 230), "默认可预览、可撤销，不能自动删", font=F(20), fill=a)


def hdr(d, x0, y, x1, y1, a, name):
    rr(d, (x0, y, x1, y + 240), 18, fill=(255, 214, 160))
    d.rectangle((x0, y + 120, x1, y + 240), fill=(40, 50, 80))
    d.text((500, y + 80), "高光  17EV", font=F(24, True), fill=INK, anchor="mm")
    d.text((500, y + 180), "暗部细节还在", font=F(24, True), fill=WHITE, anchor="mm")
    d.text((x0, y + 270), "蔡司色彩  ·  相册要能把 HDR 呈现出来，不只相机能拍", font=F(20), fill=a)


def siri_see(d, x0, y, x1, y1, a, name):
    rr(d, (x0, y, x1, y + 200), 16, fill=(240, 240, 242))
    d.text((x0 + 20, y + 40), "当前屏幕：一张菜单", font=F(20), fill=MUTED)
    d.text((x0 + 20, y + 90), "「这个辣的是哪一道」", font=F(24, True), fill=INK)
    card(d, (x0, y + 220, x1, y + 380), a, "Siri 看见了你的屏幕", ["也可在相机快门后问你看见的东西", "大陆与欧盟暂不上线"])


def siri_do(d, x0, y, x1, y1, a, name):
    rows(d, x0, y, x1, [
        ("在 App 内", "直接把票加进已装的出行 App", ""),
        ("跨设备", "iPhone 说一半，Mac 接着办", "iCloud"),
    ], a)


def xiaoai(d, x0, y, x1, y1, a, name):
    y = searchbar(d, x0, y, x1, "下周一出差，订机票和酒店")
    rows(d, x0, y, x1, [
        ("1", "打开高德 / 航班", ""),
        ("2", "打开支付宝  付", ""),
        ("3", "任务态进超级岛", "进行中"),
    ], a)
    d.text((x0, y + 270), "专家模式耗积分，额度用完要订阅", font=F(20), fill=a)


def xiaobu(d, x0, y, x1, y1, a, name):
    y = searchbar(d, x0, y, x1, "我那张快过期的团购券")
    card(d, (x0, y, x1, y + 220), a, "小布记忆", ["闪记过的内容可问、可合集", "临期会在建议 / 流体云出现"])


def yoyo(d, x0, y, x1, y1, a, name):
    card(d, (x0, y, x1, y + 200), a, "YOYO  系统级 MCP", ["可接管系统与三方 App", "12GB 以下机型会砍跨软件 AI"])
    d.text((x0, y + 230), "权限过大 = 新的无障碍漏洞，操作要有日志", font=F(20), fill=MUTED)


def xiaoyi(d, x0, y, x1, y1, a, name):
    rows(d, x0, y, x1, [
        ("官方数字", "2100+ 系统能力  ·  500+ Skill", ""),
        ("真正验收", "订票、转文件、建日程  先跑通 20 个", "看这"),
    ], a)


def xiaov(d, x0, y, x1, y1, a, name):
    rows(d, x0, y, x1, [
        ("收藏", "小红书攻略  3 篇", ""),
        ("相册", "酒店截图  2 张", ""),
        ("笔记", "上次杭州的吃的", ""),
    ], a)
    card(d, (x0, y + 270, x1, y + 400), a, "小 V Pro → 旅行路书", ["交通 / 住宿 / 景点 / 美食", "航班变了还能改"])


def xiaov4(d, x0, y, x1, y1, a, name):
    card(d, (x0, y, x1, y + 280), a, "蓝心 4.0  ·  X500 首发", ["更长上下文", "端云协同", "记忆卡可复用成路书", "记得住、用得上，才是护城河"])


def leak(d, x0, y, x1, y1, a, name):
    card(d, (x0, y, x1, y + 160), (180, 50, 50), "2 个账号已出现在泄露库", ["mail@…  2019 某次拖库"], "风险")
    rr(d, (x0, y + 190, x1, y + 270), 16, fill=a)
    d.text((500, y + 230), "在 App 内直接改密码", font=F(24, True), fill=WHITE, anchor="mm")
    d.text((x0, y + 300), "不用自己去网站找入口", font=F(20), fill=MUTED)


def pwd_app(d, x0, y, x1, y1, a, name):
    rows(d, x0, y, x1, [
        ("以前", "密码活在浏览器里", ""),
        ("现在", "独立「密码」App", "新"),
        ("小米", "号称打通苹果设备", ""),
    ], a)


KINDS = {
    "outline": outline, "longrec": longrec, "speakers": speakers, "highlight": highlight,
    "ondevice": ondevice, "to_notes": to_notes, "trash": trash, "search_file": search_file,
    "ime_file": ime_file, "storage60": storage60, "storage20": storage20, "dist_file": dist_file,
    "lyrics": lyrics, "eq": eq, "live": live, "dual": dual, "writing": writing, "swipe": swipe,
    "note_search": note_search, "ai_note": ai_note, "auth_ai": auth_ai, "memcard": memcard,
    "shot_cal": shot_cal, "sms_cal": sms_cal, "plan_cal": plan_cal, "siri_cal": siri_cal,
    "rec_cal": rec_cal, "island": island, "station": station, "vol": vol, "math": math,
    "solve": solve, "fx": fx, "wallet": wallet, "outer": outer, "meal": meal, "lock_scan": lock_scan,
    "glass": glass, "skin": skin, "five": five, "desk": desk, "agent": agent, "shortcut": shortcut,
    "glare": glare, "clone44": clone44, "clone_set": clone_set, "delay": delay, "cross": cross,
    "mover": mover, "apple_link": apple_link, "safari": safari, "bookmarks": bookmarks,
    "gal5": gal5, "cleanup": cleanup, "sticker": sticker, "gal_search": gal_search, "frame": frame,
    "dup": dup, "hdr": hdr, "siri_see": siri_see, "siri_do": siri_do, "xiaoai": xiaoai,
    "xiaobu": xiaobu, "yoyo": yoyo, "xiaoyi": xiaoyi, "xiaov": xiaov, "xiaov4": xiaov4,
    "leak": leak, "pwd_app": pwd_app,
}
