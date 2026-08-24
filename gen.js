/* Generator: list page (system-updates.html) + 15 detail pages (updates/<id>.html)
   Shared CSS: assets/style.css
   Run: node gen.js
*/
const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const OUT_DIR = path.join(ROOT, 'updates');
if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

const svgExt = '<svg viewBox="0 0 24 24"><path d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>';
const svgDoc = '<svg viewBox="0 0 24 24"><path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>';

const brandMeta = {
  samsung: { name: '三星', logo: 'images/logos/samsung.png', accent: 'var(--samsung)', order: 1 },
  apple:   { name: '苹果', logo: 'images/logos/apple.png', accent: '#6366f1', order: 2 },
  google:  { name: 'Google', logo: 'images/logos/google.png', accent: 'var(--google)', order: 3 },
  xiaomi:  { name: '小米', logo: 'images/logos/xiaomi.png', accent: 'var(--xiaomi)', order: 4 },
  oppo:    { name: 'OPPO', logo: 'images/logos/oppo.png', accent: 'var(--oppo)', order: 5 },
  honor:   { name: '荣耀', logo: 'images/logos/honor.png', accent: 'var(--honor)', order: 6 },
  vivo:    { name: 'vivo', logo: 'images/logos/vivo.png', accent: 'var(--vivo)', order: 7 },
};

// verdict label -> tag class + banner class
const vTag = { good: 'tag-good', mixed: 'tag-mixed', bad: 'tag-bad' };
const vBanner = { good: 'verdict-good', mixed: 'verdict-mixed', bad: 'verdict-bad' };
const vIcon = { good: '👍', mixed: '⚠️', bad: '😤' };

const entries = [
  {
    id: 'samsung-voice-recorder', status: 'released', brand: 'samsung', status: 'released',
    title: 'Voice Recorder · Galaxy AI 转录与摘要',
    appType: '录音机 · AI 转录/摘要', aiNote: 'AI 转录 / AI 摘要',
    date: 'One UI 7→8.5 持续迭代',
    verdict: 'bad', label: '差评集中',
    gist: '说话人区分做得好，但转录/摘要质量差、29% 卡死崩溃',
    tags: [{t:'录音机',c:'tag-app'},{t:'AI 转录',c:'tag-ai'},{t:'AI 摘要',c:'tag-ai'},{t:'29% 崩溃',c:'tag-bug'},{t:'月更追踪',c:'tag-month'}],
    pros: [
      '说话人区分精准：清晰标注 Speaker 1/2/3，社区公认强项',
      '金额识别具体：通话转录用 "$" 标注金额（Tom’s Guide）',
      '多人错误易修正：说话人串音比竞品更易手动纠正'
    ],
    cons: [
      '转录准确性极差：多口音（US/UK/印度/非洲）全线失效',
      '29% 卡死 Bug：S24 Ultra 转录卡在 29% 不动',
      '文本无法复制：不能选中/复制转录结果',
      '摘要过简：仅 3 条要点，漏关键信息',
      '设备端崩溃：开"仅设备内"时摘要崩溃（已修复）'
    ],
    quotes: [
      { kind:'good', top:'说话人区分强', text:'"Speaker differentiation is something it does really well. Clearly calls out Speaker 1, 2, 3."', src:'https://r2.community.samsung.com/t5/Galaxy-S/Transcribe-in-Voice-Recorder-is-awful/td-p/16964739', name:'Samsung EU Community' },
      { kind:'bad', top:'转录一文不值', text:'"Not a single line is usable, and thus, the summary is of no use either. Better to use Google Live Transcribe."', src:'https://r2.community.samsung.com/t5/Galaxy-S/Transcribe-in-Voice-Recorder-is-awful/td-p/16964739', name:'Samsung EU Community' }
    ],
    monthly: [
      { ver:'v21.5.72.18', date:'2025-05', note:'内部优化，无显著新功能' },
      { ver:'v21.5.86.26', date:'2026-06', note:'🛠️ 修复设备端摘要崩溃 Bug' },
      { ver:'v21.5.86.26 确认', date:'2026-07', note:'✅ Samsung 官方支持页确认修复；One UI 8.5 第二轮灰度推送覆盖 A34 5G 等更多机型' }
    ],
    links: [
      { label:'Tom’s Guide 对比', url:'https://www.tomsguide.com/phones/i-tested-the-ai-transcription-tools-for-iphone-vs-samsung-galaxy-vs-google-pixel-heres-the-winner' },
      { label:'One UI 8.5 Bug 报告', url:'https://techcabal.com/2026/05/15/samsung-one-ui-8-5-problems-and-fixes/' },
      { label:'29% Bug 论坛', url:'https://us.community.samsung.com/t5/Galaxy-S24/Voice-transcript-not-working-on-S24-Ultra/m-p/2811465' }
    ]
  },
  {
    id: 'samsung-my-files', status: 'released', brand: 'samsung',
    title: 'My Files · AI 文件摘要 & One UI 8.5 功能缺口',
    appType: '文件管理 · 短摘要', aiNote: 'AI 文件摘要',
    date: 'One UI 8.5 (2026-05)',
    verdict: 'bad', label: '差评集中',
    gist: 'UI 重构有诚意，但 S25 缺 9 个 S26 同代功能（含 AI 摘要本身）',
    tags: [{t:'文件管理',c:'tag-app'},{t:'AI 摘要',c:'tag-ai'},{t:'9 功能缺失',c:'tag-bug'},{t:'月更追踪',c:'tag-month'}],
    pros: [
      'UI 重构有诚意：搜索栏移底部，单手操作友好',
      'Storage Share：跨设备查看平板/PC 文件',
      'Finder 快捷搜索：主屏系统级搜索入口'
    ],
    cons: [
      'S25 缺 AI 摘要：同代 One UI 8.5，S25 无 My Files 摘要开关',
      '共缺 9 个 S26 功能：Now Nudge / Browser Ask AI / 24MP 相机 / Horizon Lock 等',
      '分层不公：Z Fold 7 同款缺口，硬件差异说不通'
    ],
    quotes: [
      { kind:'good', top:'重构方向对', text:'"Bottom search bar is easier to reach with one hand. Samsung stays true to the original One UI vision."', src:'https://sammyguru.com/exclusive-samsung-my-files-app-one-ui-8-5/', name:'SammyGuru' },
      { kind:'bad', top:'同代缺功能', text:'"At least 9 S26 features are missing on S25 despite running the same OS. Z Fold 7 users report the same gap."', src:'https://techcabal.com/2026/05/15/samsung-one-ui-8-5-problems-and-fixes/', name:'TechCabal' }
    ],
    monthly: [
      { ver:'v15.0.07.5', date:'2025-02', note:'功能优化 & 问题修复' },
      { ver:'v15.4.00.92', date:'2025-07', note:'One UI 8 支持' },
      { ver:'One UI 8.5', date:'2026-05', note:'重构 UI + AI 摘要（仅 S26）' }
    ],
    links: [
      { label:'重构详情', url:'https://sammyguru.com/exclusive-samsung-my-files-app-one-ui-8-5/' },
      { label:'9 功能缺失报告', url:'https://techcabal.com/2026/05/15/samsung-one-ui-8-5-problems-and-fixes/' },
      { label:'One UI 8.5 指南', url:'https://techwiser.com/samsung-one-ui-8-5-guide/' }
    ]
  },
  {
    id: 'samsung-oneui-bugs', status: 'released', brand: 'samsung',
    title: 'One UI 8.5 · 系统级 Bug 集中报告',
    appType: '系统级 · 电池/WiFi', aiNote: '',
    date: '2026-05-06 稳定版推送',
    verdict: 'bad', label: '差评集中',
    gist: '严重耗电、Enhance-X 丢失、WiFi 7→6 降级',
    tags: [{t:'系统级',c:'tag-app'},{t:'Battery Drain',c:'tag-bug'},{t:'Enhance-X 丢失',c:'tag-bug'},{t:'WiFi 7→6',c:'tag-bug'}],
    pros: [
      '视觉与交互打磨：UI 总体精致，动画流畅',
      '部分 AI 功能实用：Now Brief / 通知摘要获部分好评'
    ],
    cons: [
      '电池严重耗电：一天 85%，仅 3h46m 亮屏',
      'Enhance-X 丢失：滤镜/辉光工具消失且无法重装',
      '通知按钮缩放 Bug：Beta 到稳定版一直未修',
      'Dual Recording 消失：移至 Good Lock 且未通知用户',
      'WiFi 7→6 降级：旗舰机反复回退'
    ],
    quotes: [],
    monthly: [
      { ver:'One UI 8.5 R2', date:'2026-07', note:'📱 第二轮灰度推送覆盖全系主流在售机型（A34 5G 7月获更新）；S22及更早机型终止8.x适配' }
    ],
    links: [
      { label:'Bug 报告全文', url:'https://techcabal.com/2026/05/15/samsung-one-ui-8-5-problems-and-fixes/' },
      { label:'Community 讨论', url:'https://r2.community.samsung.com/t5/Tech-Talk/What-s-Wrong-with-One-UI-7/td-p/18948287' },
      { label:'Samsung 官方更新时间表', url:'https://www.samsung.com/hk/support/newsalert/129597/' }
    ]
  },
  {
    id: 'samsung-galaxy-themes', status: 'released', brand: 'samsung',
    title: 'Galaxy Themes · 主题商城与 Galaxy Store',
    appType: '主题商城 · Galaxy Store', aiNote: '',
    date: '长期存在 · 2025-10 遭媒体抨击',
    verdict: 'bad', label: '差评集中',
    gist: '弹窗广告、更新失效、AI 低质主题，被吁并入 Play 商店',
    tags: [{t:'主题商城',c:'tag-app'},{t:'弹窗广告',c:'tag-bug'},{t:'更新失效',c:'tag-bug'}],
    pros: [
      '深度个性化：曾是与壁纸配色的系统级换肤方案',
      'Good Lock 生态：图标包/自定义能力强，深受玩家喜爱'
    ],
    cons: [
      '弹窗广告猖獗：打开即弹 gacha 游戏广告，只能关一天',
      '更新失效：自动更新比 Play 商店还不可靠，常堆十几条待更',
      '主题成"坟场"：新主题零评分、AI 生成质感',
      '已被取代：Material You + Good Lock 让 Galaxy Themes 冗余'
    ],
    quotes: [
      { kind:'bad', top:'弹窗+更新全坏', text:'"Whenever I open it, I’m greeted by a pop-up for some gacha app. And automatic updates are somehow less reliable than even the Play Store."', src:'https://www.androidauthority.com/p-3607055/', name:'Android Authority' },
      { kind:'bad', top:'主题像坟场', text:'"New themes are still uploaded, but they all sit with zero ratings and have an AI-generated vibe to them."', src:'https://www.androidauthority.com/p-3607055/', name:'Android Authority' }
    ],
    monthly: [],
    links: [
      { label:'原文：该砍掉 Galaxy Store', url:'https://www.androidauthority.com/p-3607055/' },
      { label:'Galaxy Themes 官方', url:'https://www.samsung.com/us/support/owners/app/galaxy-store-galaxy-themes' }
    ]
  },
  {
    id: 'apple-writing-tools', status: 'released', brand: 'apple',
    title: 'Writing Tools · AI 校对 / 重写 / 摘要 / Compose',
    appType: '笔记/写作 · 校对重写', aiNote: 'Proofread / Rewrite / Summarize',
    date: 'iOS 18→26 持续迭代',
    verdict: 'mixed', label: '争议明显',
    gist: 'Apple AI 目前最好用的功能，但触屏操作笨拙',
    tags: [{t:'笔记/写作',c:'tag-app'},{t:'Proofread',c:'tag-ai'},{t:'Rewrite',c:'tag-ai'},{t:'Summarize',c:'tag-ai'}],
    pros: [
      '全系统可用：任意输入框可触发，覆盖面极广',
      '摘要格式丰富：标准 / 要点 / 列表 / 表格 四种',
      '如预期运作：PCMag 称"works as advertised"'
    ],
    cons: [
      '触屏操作笨拙：iPhone/iPad 上多次点击才完成',
      '整体不够惊艳：PCMag 评"not overly impressive"',
      'Compose 依赖外援：生成内容需连 ChatGPT 账号'
    ],
    quotes: [
      { kind:'good', top:'Apple AI 最佳', text:'"Currently the best feature within the Apple Intelligence suite. Works as advertised."', src:'https://www.pcmag.com/explainers/how-smart-is-apple-intelligence-i-tried-every-feature-heres-the-verdict', name:'PCMag' },
      { kind:'bad', top:'触屏太笨拙', text:'"I find it somewhat clunky to use on a touch screen because of how many taps it requires."', src:'https://www.pcmag.com/explainers/how-smart-is-apple-intelligence-i-tried-every-feature-heres-the-verdict', name:'PCMag' }
    ],
    monthly: [],
    links: [
      { label:'PCMag 评测', url:'https://www.pcmag.com/explainers/how-smart-is-apple-intelligence-i-tried-every-feature-heres-the-verdict' },
      { label:'MacRumors 论坛', url:'https://forums.macrumors.com/threads/apple-intelligence-what-to-know-about-summaries-and-smart-replies.2439845/' }
    ]
  },
  {
    id: 'apple-mail-ai', status: 'released', brand: 'apple',
    title: 'Mail AI · 优先级 / 摘要 / Smart Replies',
    appType: '邮件 · 摘要/回复', aiNote: 'Priority / Smart Replies',
    date: 'iOS 18→26 持续迭代',
    verdict: 'bad', label: '差评集中',
    gist: '智能回复不自然、邮件摘要不可信，用户求关闭',
    tags: [{t:'邮件',c:'tag-app'},{t:'Priority',c:'tag-ai'},{t:'Smart Replies',c:'tag-ai'},{t:'摘要不可信',c:'tag-bug'}],
    pros: [
      '锁屏摘要略有用：快速浏览多个通知要点'
    ],
    cons: [
      '回复不像人写：滥用"haha"和感叹号、复述对方话',
      '用了像混蛋：用户称用智能回复会被当成人渣',
      '邮件摘要仅供娱乐："definitely not to be believed"',
      '惊人翻车：AI 直白告知用户"被甩了"；飓风位置错移',
      '用户求关闭："最重要的就是关闭按钮在哪"'
    ],
    quotes: [
      { kind:'bad', top:'用了像混蛋', text:'"If I actually used the iMessage replies people would think I was being an *ss. They also use a questionable amount of commas."', src:'https://forums.macrumors.com/threads/apple-intelligence-what-to-know-about-summaries-and-smart-replies.2439845/', name:'moyjoy @ MacRumors' },
      { kind:'bad', top:'摘要仅供娱乐', text:'"Overall the summaries are really only good for amusement. They are definitely not to be believed."', src:'https://forums.macrumors.com/threads/apple-intelligence-what-to-know-about-summaries-and-smart-replies.2439845/', name:'moyjoy @ MacRumors' }
    ],
    monthly: [],
    links: [
      { label:'MacRumors 原帖', url:'https://forums.macrumors.com/threads/apple-intelligence-what-to-know-about-summaries-and-smart-replies.2439845/' },
      { label:'官方文档', url:'https://support.apple.com/guide/iphone/use-apple-intelligence-in-mail-iph9ae667055/ios' }
    ]
  },
  {
    id: 'apple-math-notes', status: 'released', brand: 'apple',
    title: 'Calculator · Math Notes & 3D 制图',
    appType: '计算器/笔记 · 数学', aiNote: 'Math Notes / 3D Graphing',
    date: 'iPadOS 26 / iOS 26',
    verdict: 'good', label: '好评主导',
    gist: '手写数学实时求解、iPadOS 26 新增 3D 图表',
    tags: [{t:'计算器/笔记',c:'tag-app'},{t:'Math Notes',c:'tag-ai'},{t:'3D Graphing',c:'tag-ai'}],
    pros: [
      '实时求解：手写表达式即时出结果',
      '3D 制图 (iPadOS 26)：方程可视化、可旋转交互',
      '学习/预算皆宜：变量、函数、日常计算通用'
    ],
    cons: [
      '基础计算器仍弱：复杂运算不如专业工具',
      '仅 Apple 生态：跨平台/协作受限'
    ],
    quotes: [],
    monthly: [],
    links: [
      { label:'MacObserver 3D 制图', url:'https://www.macobserver.com/news/math-notes-get-a-new-dimension-with-3d-graph-support-on-ipados-26/' },
      { label:'Math Notes 教程', url:'https://www.igeeksblog.com/how-to-use-math-notes-on-ipad-iphone/' }
    ]
  },
  {
    id: 'apple-calendar', status: 'released', brand: 'apple',
    title: 'Calendar · 截图一键建日程 (Add to Calendar)',
    appType: '日历 · Add to Calendar', aiNote: 'Visual Intelligence',
    date: 'iOS 26 (2026-03 报道)',
    verdict: 'good', label: '好评主导',
    gist: '截图含活动→AI 一键生成日程，准确好用',
    tags: [{t:'日历',c:'tag-app'},{t:'Visual Intelligence',c:'tag-ai'}],
    pros: [
      '截图即建日程：截到活动信息→"Add to Calendar"一键生成',
      'AI 提取准确：时间/地点自动识别，可预览编辑',
      '差异化亮点：9to5Mac 称其成默认日历的加分项'
    ],
    cons: [
      '仅全屏截图 UI：切回缩略图模式就看不到按钮',
      '多账户同步冲突：第三方日历账号可能冲突'
    ],
    quotes: [
      { kind:'good', top:'截图建日程很香', text:'"Once you get used to adding calendar events in this way, it becomes a nice differentiator for Apple’s default Calendar app."', src:'https://9to5mac.com/2026/03/05/ios-26-gives-apples-calendar-app-a-convenient-new-advantage/', name:'9to5Mac' },
      { kind:'bad', top:'仅全屏截图可用', text:'"This button only appears inside the default fullscreen UI. If you’ve switched back to the thumbnail view, you’ll need to first tap the thumbnail."', src:'https://9to5mac.com/2026/03/05/ios-26-gives-apples-calendar-app-a-convenient-new-advantage/', name:'9to5Mac' }
    ],
    monthly: [],
    links: [
      { label:'9to5Mac 原文', url:'https://9to5mac.com/2026/03/05/ios-26-gives-apples-calendar-app-a-convenient-new-advantage/' },
      { label:'iOS 26 更新说明', url:'https://support.apple.com/en-us/123075' }
    ]
  },
  {
    id: 'apple-ios266', status: 'released', brand: 'apple',
    title: 'iOS 26.6 · 正式版安全修复 / 为 iOS 27 铺路',
    appType: '系统级维护更新', aiNote: '',
    date: '2026-07-28 正式版推送',
    verdict: 'mixed', label: '维护更新',
    gist: '错误修复、安全补丁、Spotlight 索引优化，为 iOS 27 做准备',
    tags: [{t:'系统级',c:'tag-app'},{t:'安全补丁',c:'tag-month'},{t:'Spotlight',c:'tag-app'}],
    pros: [
      '正式版已推送：iOS/iPadOS/macOS/watchOS/tvOS/visionOS 26.6 同步发布',
      '安全修复：包含未公开漏洞补丁',
      'Spotlight 索引优化：为 iOS 27 增强搜索与 Siri AI 体验做准备',
      '新增“已屏蔽联系人数量上限”提示（Beta 阶段发现）'
    ],
    cons: [
      '无面向用户的大功能更新',
      '部分 Beta 中发现的反抢夺安全功能未在正式版启用',
      '主要为过渡版本，体验感知不强'
    ],
    quotes: [],
    monthly: [
      { ver:'iOS 26.6 (23G71)', date:'2026-07-28', note:'正式版全量推送；错误修复、安全性更新、Spotlight索引优化，为iOS 27铺路' }
    ],
    links: [
      { label:'iClarified 发布说明', url:'https://www.iclarified.com/101598/apple-officially-releases-ios-266-and-ipados-266-download' },
      { label:'Heise 报道', url:'https://www.heise.de/en/news/iOS-26-6-macOS-26-6-and-more-apple-releases-new-operating-systems-11379591.html' },
      { label:'Mashable 解读', url:'https://in.mashable.com/tech/112299/what-is-ios-266-apple-releases-new-iphone-update-with-security-patches-for-iphone-11-and-later-model' }
    ]
  },
  {
    id: 'google-recorder', status: 'released', brand: 'google',
    title: 'Recorder + Gemini · AI 转录/摘要综合冠军',
    appType: '录音机 · 转录/摘要', aiNote: 'AI 转录 / AI 摘要',
    date: 'Tom’s Guide 2025-07 对比',
    verdict: 'good', label: '好评主导',
    gist: '6 项对比赢 4 项，综合冠军（偶有幻影说话人）',
    tags: [{t:'录音机',c:'tag-app'},{t:'AI 转录',c:'tag-ai'},{t:'AI 摘要',c:'tag-ai'}],
    pros: [
      '综合冠军：6 项对比赢 4 项（通话/邮件/网页/笔记摘要）',
      '摘要易访问：点 Gemini 按钮即得，比 iPhone 方便',
      '格式清晰个性化：通话摘要用第二人称、关键信息齐全'
    ],
    cons: [
      '幻影说话人：单人朗读时误识别多个说话人',
      '说话人归错：多人录音偶尔整句归错人'
    ],
    quotes: [],
    monthly: [],
    table: {
      head: ['测试项', '🥇 胜出', '关键发现'],
      rows: [
        [{t:'电话通话转录',cls:''},{t:'Pixel 9',cls:'win'},{t:'格式清晰、摘要个性化、信息全',cls:''}],
        [{t:'语音录音转录',cls:''},{t:'iPhone',cls:''},{t:'iPhone 最整洁，但需分享到 Notes 才能摘要',cls:''}],
        [{t:'多人录音',cls:''},{t:'Galaxy',cls:''},{t:'Galaxy 错误更易修正；iPhone 不分人',cls:''}],
        [{t:'邮件/网页/笔记摘要',cls:''},{t:'Pixel 9',cls:'win'},{t:'Gemini 摘要最详尽易用',cls:''}]
      ]
    },
    links: [
      { label:'对比全文', url:'https://www.tomsguide.com/phones/i-tested-the-ai-transcription-tools-for-iphone-vs-samsung-galaxy-vs-google-pixel-heres-the-winner' },
      { label:'月度系统更新', url:'https://9to5google.com/2026/06/29/june-2026-google-system-updates/' }
    ]
  },
  {
    id: 'google-play-system', status: 'released', brand: 'google',
    title: 'Google Play System · 月度更新公开',
    appType: '系统级 · 月度公开', aiNote: '',
    date: '每月发布 · 8月更新 (8/10)',
    verdict: 'good', label: '好评主导',
    gist: '唯一每月公开系统级 Release Notes 的厂商；8月 Wear OS 运动路线精度提升',
    tags: [{t:'系统级',c:'tag-app'},{t:'月度公开',c:'tag-month'}],
    pros: [
      '唯一月度公开：三条线 Release Notes 全公开',
      '透明可追踪：9to5Google 每月整理发布',
      '覆盖广：Wi-Fi / Wear OS / Android TV 均含',
      '【8月更新】Wear OS 运动路线精度提升：服务端处理原始定位数据，跑步/骑行轨迹更准（无蜂窝手表连回 Wi-Fi/手机后同步）'
    ],
    cons: [
      '非独立 App 更新：属系统底层，用户感知弱',
      '碎片化：实际落地因机型/OEM 而异',
      '大屏专属功能：Top Charts 直接打开详情页仅平板/折叠屏可用'
    ],
    quotes: [],
    monthly: [
      { ver:'Play Services v26.31', date:'2026-08-10', note:'🎉 Wear OS 运动路线精度提升（服务端处理原始定位数据）+ 账号管理开发者新功能（手机/Wear）+ 开发者服务/系统管理Bug修复；Play Store v52.7：大屏(平板/折叠)可从 Top Charts 直接打开应用详情页；Android AICore 音频流/效率/诊断优化' },
      { ver:'Play Services v26.30 + Store v52.6', date:'2026-08-03', note:'Wallet 卡券体验优化；Play Store 影音搜索发现增强 + HOPA 品牌更新；体育赛事联赛轮播（ICC 女子 T20 世界杯首发案例）' }
    ],
    links: [
      { label:'August 2026 Notes (AA)', url:'https://www.androidauthority.com/wear-os-workout-routes-google-play-services-update-3696760/' },
      { label:'June 2026 Notes', url:'https://9to5google.com/2026/06/29/june-2026-google-system-updates/' },
      { label:'Gemini 追踪', url:'https://9to5google.com/guides/gemini-app/' }
    ]
  },
  {
    id: 'xiaomi-hyperos3', status: 'released', brand: 'xiaomi',
    title: 'HyperOS 3→4 · Rust 重写核心 / 零遗留 / 液态玻璃设计 / AI 浮岛',
    appType: '系统级 · AI 搜索/笔记', aiNote: 'AI Search / AI Note / Rust 重构',
    date: '2025-09-24 全球发布 → 2026-08-01 月度更新 → HyperOS 4 官宣8月推送',
    verdict: 'mixed', label: '争议/待验证',
    gist: 'HyperOS 4 官方海报发布！核心Rust语言重写实现"零遗留"，流畅度+40%、内存管理+30%；液态玻璃设计+AI浮岛；首批推送小米17系列+Redmi K90',
    tags: [{t:'系统级',c:'tag-app'},{t:'AI Search',c:'tag-ai'},{t:'AI Note',c:'tag-ai'},{t:'Hyper Island',c:'tag-ai'},{t:'月更追踪',c:'tag-month'},{t:'Rust 重写',c:'tag-ai'},{t:'HyperOS 4',c:'tag-month'}],
    pros: [
      '5 大 AI 功能齐全：搜索/笔记/描述/翻译/降噪',
      '跨设备互联：手机-平板-车机协同',
      '性能提升 30%：官方宣称流畅度优化',
      '【8月更新】超级岛支持麦当劳取餐码：外卖/取餐场景灵动岛一键展示取餐码',
      '【8月更新】屏幕共享隐私模式：共享时可隐藏敏感通知与来电弹窗',
      '【8月更新】录音机修复：长录音转写稳定性提升，断点续录更可靠',
      '【HyperOS 4】Rust 语言重写核心：系统核心服务/窗口管理/进程调度/内存分配全部用Rust重构，从根源消除70%内存安全Bug',
      '【HyperOS 4】"零遗留"设计：MIUI时代遗留代码一行不留，自研代码占比75%→90%，仅保留基础安卓兼容层',
      '【HyperOS 4】流畅度提升40%：空闲内存占用降28%、后台保活提升35%、连续365天流畅衰减仅5%',
      '【HyperOS 4】内存管理提升30%：重构内存调度机制，长期使用不卡顿',
      '【HyperOS 4】液态玻璃设计语言：玻璃质感界面元素+实时光场渲染+2.5D图标+控制中心/通知面板半透明效果',
      '【HyperOS 4】AI浮岛+AI配色+前摄主动AI感知：智能场景识别与主动服务',
      '【HyperOS 4】可自定义大文件夹+堆叠桌面小部件+锁屏通知更简洁布局'
    ],
    cons: [
      '海外深度反馈少：不如三星/苹果社区活跃',
      '推送分 3 阶段：全球版 Oct 2025→Mar 2026，早期东南亚为主',
      'AI Search 缺吐槽样本：官方主打但少功能级评测',
      'HyperOS 4 已官宣8月推送：小米官方7月31日发布宣传海报，"Smooth, Smart, Connected"三大方向，但具体推送日期和首批机型尚未正式确认'
    ],
    quotes: [],
    monthly: [
      { ver:'HyperOS 3 八月更新', date:'2026-08-01', note:'超级岛支持麦当劳取餐码、备忘录优化、家人守护、屏幕共享隐私模式、录音机修复；HyperOS 4 预计8月内测' },
      { ver:'🎉 HyperOS 4 官宣', date:'2026-08-01', note:'小米官方7月31日发布HyperOS 4.0宣传海报！8月上旬启动首批稳定版灰度推送。核心底层Rust语言重写（自研代码占比75%→90%），"零遗留"清理MIUI时代冗余代码；空闲内存占用降28%、后台保活提升35%、连续365天流畅衰减仅5%、整体流畅度提升40%、内存管理提升30%；液态玻璃设计语言+2.5D图标+AI浮岛+AI配色+前摄主动AI感知；首批推送小米17系列+Redmi K90，小米18系列出厂预装；分三批推送（旗舰完整版/中端标准版/老机型轻量化版）' },
      { ver:'澎湃OS 4.0 正式版预告', date:'2026-08-22', note:'📱 官方披露下半年排期：雷军年度演讲(8月中下旬)将同步推送澎湃OS 4.0正式版，并发布小米MIX Fold5阔折叠旗舰(玄戒O3/徕卡影像/6000mAh)与Redmi K100标准版；HyperOS 4(澎湃OS 4.0)以Rust重写核心/零遗留/液态玻璃/AI浮岛成为小米年度系统大版本，首批机型小米17系列+Redmi K90' }
    ],
    links: [
      { label:'NokiaMob 清单', url:'https://nokiamob.net/2025/09/24/hyperos-3-global-released-new-ui-ai-tools-and-cross-device-features/' },
      { label:'官方 HyperOS 3', url:'https://www.mi.com/global/hyperos/' },
      { label:'HyperOS 4 官宣海报', url:'https://www.toutiao.com/a7668699772672328215' },
      { label:'Rust 重写核心详解', url:'https://gadgets360.com/mobiles/news/xiaomi-hyperos-4-beta-timeline-leak-features-expected-11872760' }
    ]
  },
  {
    id: 'oppo-coloros16', status: 'released', brand: 'oppo',
    title: 'ColorOS 16 Global · EU 推送缓慢 & AI 闪记',
    appType: '系统级 · AI 闪记', aiNote: 'AI Flash Note',
    date: '2026 Q1-Q2 EU 分批',
    verdict: 'mixed', label: '争议明显',
    gist: '系统自定义好，但 EU 推送延迟数月、来电不浮窗',
    tags: [{t:'系统级',c:'tag-app'},{t:'AI Flash Note',c:'tag-ai'},{t:'EU 推送延迟',c:'tag-bug'}],
    pros: [
      '系统自定义强：XDA 用户赞"fast and effective"',
      'AI 闪记实用：一键捕捉屏幕信息成笔记',
      '【8月更新】桌面角标一键清理：桌面双指张开即可清空全部应用消息角标',
      '【8月更新】生活卡片新增：2x2/4x2 汇率换算卡片 + 台风路径卡片',
      '【8月更新】小布记忆跨应用收藏：同步手机浏览器 + UC/夸克/今日头条极速版收藏内容',
      '【8月更新】团购券防过期提醒：小布建议/流体云显示支付宝临期团购券',
      '【8月更新】便签个性化：可换字体和皮肤样式',
      '【8月更新】应用五分身：从双开升级到5个分身，覆盖游戏/小微商户场景',
      '【8月更新】病毒风险主动防御：风险应用自动设权限为"不允许"+隐私替身替换敏感数据',
      '【8月更新】无障碍服务管控：拦截无障碍服务和所有文件访问权限的流氓软件',
      '【8月更新】极光引擎内存调度重构：原生流畅度+12%，高负载场景不易锁帧',
      '【8月体验升级】双指外扩清空桌面全部应用角标：满屏小红点一键秒清',
      '【8月体验升级】锁屏岛全屏歌词新增酷狗概念版支持，抬眼即见',
      '【8月体验升级】交通优行卡覆盖全国330城市公交地铁，一张卡出行',
      '【8月体验升级】智能到站提醒新增广州/深圳/福州，临近到站震动+弹窗+蓝牙语音播报',
      '【8月体验升级】跨屏解锁：手机投屏平板后可在平板镜像界面直接解锁手机',
      '【8月体验升级】天气新增桌面台风路径卡片，实时查看路径/风力/强度'
    ],
    cons: [
      'EU 推送延迟数月：印尼 2026-01 首发，EU 到 2026-04 仍等',
      '来电不浮窗：解锁状态下来电被应用遮挡，需下拉看',
      '电池优化误伤：需手动关两项优化才正常',
      '【8月更新】关10个设置才流畅：内存拓展/自启动/用户体验计划/负一屏自动刷新等需手动关闭，流畅度+20%',
      '【8月更新】五分身串号问题：小红书分身存在账号串号（登录一个分身其他分身自动同步），"数据完全隔离"未达预期'
    ],
    quotes: [
      { kind:'bad', top:'还在等更新', text:'"I’m still waiting for update in Europe." — 直到 2026-04 仍无官方 OTA，需借 Oxygen Updater/VPN', src:'https://xdaforums.com/t/coloros-16-general-discussion-updates.4764786/', name:'XDA Forums' },
      { kind:'good', top:'自定义好用', text:'"I like the actual customization through system setting, it’s fast and effective."', src:'https://xdaforums.com/t/coloros-16-general-discussion-updates.4764786/', name:'XDA Forums' }
    ],
    monthly: [
      { ver:'ColorOS 16.0.10.500', date:'2026-08-05', note:'🎉 1.08GB大版本更新！桌面角标一键清理(双指张开)+生活卡片(汇率/台风)+小布记忆跨应用收藏+团购券防过期+便签个性化+应用五分身+病毒主动防御+无障碍管控+极光引擎内存重构(流畅度+12%)+相机横屏Bug修复；适配Find X9 Pro/一加15T等旗舰' },
      { ver:'八月体验升级', date:'2026-08-17', note:'🎉 OPPO官方8月17日发布ColorOS 16八月体验升级（8月7日起分批、8月31日前完成推送）：双指外扩清空桌面全部角标、锁屏岛酷狗概念版歌词、交通优行卡覆盖330城、智能到站提醒新增广深福、相册横屏图标/文字/菜单竖屏异常修复、小布记忆同步多浏览器收藏+记账洞见+旅行合集地图、跨屏解锁、天气台风路径卡片、隐私替身(风险应用自动禁用重要权限+隐私替身)、存储清理分区展示；覆盖Find X9/X8/X7全系、Find N6/N5、Reno16/Reno15、K15 Pro及一加15/13/Ace6/Ace5等大批机型' }
    ],
    links: [
      { label:'XDA 讨论', url:'https://xdaforums.com/t/coloros-16-general-discussion-updates.4764786/' },
      { label:'OPPO Global', url:'https://community.oppo.com/circle/1155364131311190017' },
      { label:'ColorOS 官网', url:'https://www.coloros.com/' }
    ]
  },
  {
    id: 'honor-yoyo', status: 'released', brand: 'honor',
    title: 'YOYO AI · MagicOS 11 内测 / YOYO Next / 长视频解析 / Agentic OS / 液态玻璃UI',
    appType: '系统级 · 主动 AI 智能体', aiNote: 'YOYO Next / Agentic OS / MCP架构 / GUI Agent / 长视频解析',
    date: 'MagicOS 10 June 2026 → MagicOS 11 内测 7月 → MagicOS 10 八月版 8月5日推送',
    verdict: 'good', label: '好评主导',
    gist: 'MagicOS 10 八月版七大AI升级：YOYO记忆首次支持长视频解析（三指下滑→自动摘要）；笔记AI语义搜索；AI翻译自动识别语种；AI侧边栏固定；覆盖旗舰到千元机全系列',
    tags: [{t:'系统级',c:'tag-app'},{t:'YOYO Next',c:'tag-ai'},{t:'Agentic OS',c:'tag-ai'},{t:'MCP架构',c:'tag-ai'},{t:'MagicOS 11 内测',c:'tag-month'},{t:'液态玻璃UI',c:'tag-ai'},{t:'DeepSeek-V4',c:'tag-ai'}],
    pros: [
      '海外本地化亮眼：YOYO + Walmart 物流追踪',
      'AI 创作模板多：漫画/Plog/像素风/微缩模型',
      'AI 防窥：识别旁人窥屏自动遮罩',
      '隐私保护：可疑 App 读通讯录只给空白数据',
      '【MagicOS 11】YOYO Next 架构：系统级 MCP 架构获得底层权限，可直接接管系统+第三方App操作',
      '【MagicOS 11】GUI Agent 纯视觉方案：像人类一样"看懂"屏幕按钮/输入框/菜单，模拟点击滑动，无需App适配API',
      '【MagicOS 11】跨应用自动化：实测14步出差安排（日历核对→12306订票→美团订酒店→同步日程）全程无需手动',
      '【MagicOS 11】自进化记忆：90天可执行场景从200+扩展到3000+，记住偏好咖啡店/常用联系人/工作节奏',
      '【MagicOS 11】Cloud-Slim 混合推理：简单指令本地端侧处理（隐私+速度），复杂任务云端大模型拆解',
      '【MagicOS 11】接入 DeepSeek-V4 第三方大模型：更强推理性能和更长上下文',
      '【MagicOS 11】YOYO Claw 能效技术：综合词元消耗省50%，后台待机几乎不耗电',
      '【MagicOS 11】液态玻璃UI：安卓首创动态液态玻璃方案，锁屏到桌面到图标均呈真实玻璃质感',
      '【MagicOS 11】YOYO 主动智能体：连贯多步操作（"下班发消息+导航+歌单"一次完成）',
      '【MagicOS 11】端侧 AI 全升级：录音→会议纪要、相册语义检索、长文档摘要，数据不上云',
      '【MagicOS 11】AI 通话反诈：精准识别诈骗话术/变声来电',
      '【Agentic OS】MWC 上海首秀：意图驱动、自然交互、主动智能、天生跨端四大特征',
      '【MagicOS 10 八月更新】YOYO 记忆长视频解析：三指下滑触发，覆盖抖音/B站/小红书/快手/本地视频，自动生成摘要+分段总结，视频教程变笔记',
      '【MagicOS 10 八月更新】荣耀笔记 AI 语义搜索：突破关键词匹配，自然语言描述含义即可精准找到相关笔记',
      '【MagicOS 10 八月更新】AI 翻译自动识别语种：无需手动选择源语言，自动判断原文语言并翻译',
      '【MagicOS 10 八月更新】AI 侧边栏常用服务固定：高频AI工具置顶常驻，零层级触达',
      '【MagicOS 10 八月更新】文件管理重构：我的文件与浏览合并为统一视图，结构更精简',
      '【MagicOS 10 八月更新】远程协助扩展：支持更多设备型号，一键远程帮亲友排查问题',
      '【MagicOS 10 八月更新】推送覆盖广：从旗舰Magic V6/Magic8到千元机100系列均获同等AI体验，不分机型阉割'
    ],
    cons: [
      '深度评测缺：海外社区讨论集中在官方论坛/国内媒体',
      'MagicOS 11 仅 Magic8 系列首批内测：Magic7/6/数字系列需等10月第二批',
      '12GB 以下内存机型阉割跨软件 AI 功能：仅保留基础识图/语音控制',
      'GUI Agent 纯视觉方案的实际准确率和稳定性待长期实测验证',
      'Cloud-Slim 混合推理模式在弱网环境下的体验有待验证',
      'Agentic OS 框架7月发布，实际落地体验待验证'
    ],
    quotes: [],
    monthly: [
      { ver:'MagicOS 10 Jun Update', date:'2026-06', note:'+Walmart 追踪、AI 创作模板、AI 防窥' },
      { ver:'MagicOS 11 内测', date:'2026-07-01', note:'Magic8 系列首批推送；YOYO 主动智能体、端侧 AI 全升级、AI 通话反诈' },
      { ver:'Agentic OS 框架', date:'2026-06-24', note:'MWC 上海首发定义：意图驱动/自然交互/主动智能/天生跨端' },
      { ver:'MagicOS 10 Jul (10.0.0.170)', date:'2026-07-16', note:'第二批10款机型推送；丝滑动效（并行响应+一镜到底）、灵动胶囊（滑动交互+YOYO帮记）、3D照片锁屏、一语微信发消息/打视频、漫画生成、Live盲盒、120Hz高刷投屏、远程协助' },
      { ver:'MagicOS 11 / YOYO Next', date:'2026-07-22', note:'🎉 MagicOS 11 内测持续推送；YOYO Next架构详解：MCP系统级架构+GUI Agent纯视觉方案+Cloud-Slim混合推理+DeepSeek-V4接入；3000+场景自主执行（90天从200+扩展）；YOYO Claw省50%词元；安卓首创液态玻璃UI；跨应用14步自动化实测；自进化长期全局记忆；Agentic OS完整技术框架7月发布' },
      { ver:'MagicOS 10 Aug (10.0.170)', date:'2026-08-05', note:'🎉 八月版本七大AI功能升级！YOYO记忆首次支持长视频解析（抖音/B站/小红书/快手/本地视频三指下滑触发→自动生成摘要+分段总结）；荣耀笔记AI语义搜索（自然语言模糊匹配，不再依赖关键词）；AI翻译自动识别语种（无需手动选）；AI侧边栏常用服务固定（高频AI工具置顶零层级触达）；文件管理"我的文件"与"浏览"合并重构；远程协助扩展更多设备；夏日主题（悠悠碧波/沁凉一夏）；三批推送：8/6首批(Magic V6/Magic8/600系列)→8/7二批(Magic V5/Magic7/WIN/500系列)→8/14三批(Magic V3-V Flip2/Magic6/5系列/400-100系列)' }
    ],
    links: [
      { label:'June 2026 全文', url:'https://www.huaweicentral.com/honor-magicos-10-june-2026-update-brings-new-yoyo-ai-features/' },
      { label:'YOYO 升级详情', url:'https://www.huaweicentral.com/honor-upgrades-yoyo-ai-assistant-features-for-magicos-10-devices/' },
      { label:'Agentic OS 定义 (深圳新闻网)', url:'https://www.sznews.com/news/content/2026-06/25/content_32102192.htm' },
      { label:'MagicOS 11 内测详解', url:'https://www.toutiao.com/article/7657387678073127458/' },
      { label:'YOYO Next 深度测评', url:'https://www.toutiao.com/article/7663362861230375474/' },
      { label:'YOYO 智能体全方位评测', url:'https://k.sina.com.cn/article_7879848900_1d5acf3c40680394io.html' },
      { label:'MagicOS 11 YOYO AI 爆料', url:'https://www.toutiao.com/article/7663149226608378394' },
      { label:'Honor MagicOS', url:'https://www.honor.com/global/magic-os/' },
      { label:'MagicOS 10 八月版详解', url:'https://digital.it168.com/a2026/0805/6945/000006945035.shtml' },
      { label:'八月更新七项功能', url:'https://ai.zol.com.cn/1226/12269044.html' }
    ]
  },
  {
    id: 'vivo-originos', status: 'released', brand: 'vivo',
    title: 'Funtouch OS / OriginOS 6 · 全球版推送',
    appType: '系统级 · 全球版', aiNote: '',
    date: 'OriginOS 6 全球版 2025-10-15',
    verdict: 'mixed', label: '争议/待验证',
    gist: '海外社区 AI 讨论稀缺，月更日志不公开',
    tags: [{t:'系统级',c:'tag-app'},{t:'全球版追踪',c:'tag-month'}],
    pros: [
      '升级包可查：vivo.com/en 升级主页列各机型版本',
      'OriginOS 6 流畅：国内口碑"6 到飞起"',
      '【16.0.29.5】蓝心小V/圈搜/小V记忆AI细节优化：识别准确率提升、语音交互更跟手'
    ],
    cons: [
      '海外反馈稀缺：Reddit/XDA 缺功能级深度讨论',
      '月更不公开：Funtouch OS 无公开 Release Notes'
    ],
    quotes: [],
    monthly: [
      { ver:'OriginOS 6.0 16.0.29.5', date:'2026-08-07', note:'vivo/iQOO推送OriginOS 6.0维护更新(16.0.29.5)：延续蓝河流畅引擎，优化后台应用留存(常用APP保活改善、切回不复载)、闲置应用后台管控(夜间待机掉电改善)、游戏/视频温控策略打磨；修复网络断流/通知延迟/锁屏异常/第三方闪退/相机小瑕疵；蓝心小V/圈搜/小V记忆AI细节优化(识别准确率与响应提升)；分批推送X100/X Fold/S系列、iQOO 12/Neo9/Z9/Z10等已升级OriginOS 6机型' },
      { ver:'iQOO Neo11 至尊版 出厂', date:'2026-08-18', note:'iQOO Neo11 至尊版(8/18发布)出厂预装OriginOS 6.0，5年持久流畅认证；蓝心小V/原子通知(《王者荣耀》接入原子通知)/寰宇电竞Wi-Fi三芯片；同批iQOO Z11S出厂OriginOS 6.0(10000mAh硅碳/天玑7500)' }
    ],
    links: [
      { label:'vivo 升级包', url:'https://www.vivo.com/en/support/upgradePackageHome' },
      { label:'OriginOS 6 Tracker', url:'https://techpp.com/2025/10/16/origin-os-6-update-tracker/' }
    ]
  },
  // ====== 即将发布 (UPCOMING) ======
  {
    id: 'samsung-oneui9-beta', brand: 'samsung', status: 'released',
    title: 'One UI 9 稳定版 · Gemini Intelligence 代理式AI / Notes 胶带笔 / Now Nudge / Warranty Hub',
    appType: '系统级 Major Update · Android 17 基底', aiNote: 'Gemini Intelligence / Now Nudge / Photo Assist / AI 安全',
    date: 'Beta 1 (2026-05-12) → Beta 4 (2026-07-14) → 稳定版 7月22日预载 Z Fold 8 系列 → S26 持续 Beta（Beta 5 8/12）',
    verdict: 'good', label: '好评主导',
    gist: '基于 Android 17，Gemini Intelligence 代理式AI正式落地（40+App链式任务）；Notes/Contacts/Quick Panel/无障碍全面升级；7月22日稳定版首发预载 Z Fold 8 系列',
    tags: [{t:'稳定版已发布',c:'tag-month'},{t:'Samsung Notes',c:'tag-app'},{t:'Contacts',c:'tag-app'},{t:'无障碍',c:'tag-app'},{t:'Gemini Intelligence',c:'tag-ai'},{t:'Now Nudge',c:'tag-ai'},{t:'安全增强',c:'tag-ai'}],
    pros: [
      'Notes 胶带装饰 + 新笔触风格：可在分享截图前遮蔽敏感信息',
      'Contacts 直通 Creative Studio：无需切 App 制作个性化AI名片',
      'Quick Panel 重构：亮度/声音/媒体独立调节，尺寸可自定义，分离声音模式开关',
      '锁屏媒体播放器升级：圆形按钮+实时波形动画+动态色温适配专辑封面',
      '无障碍大升级：Text Spotlight 浮窗放大、Select to Speak 增强、Mouse Key 速度可调',
      '安全自动拦截：检测到高危 App 自动警告+阻止安装',
      'Gemini Intelligence 代理式AI：从单条指令链式执行多步任务（查票→比价→订票），支持40+App',
      'Gemini Notebook 原生集成：上传PDF/录音/截图生成摘要、AI视频、演示文稿、播客、测验',
      'Now Nudge 主动建议：聊天中建议添加日历日程并打开多窗口Calendar',
      'My FanCam AI追焦：Gallery中选择视频中人物自动追焦重构画面',
      'Photo Assist 文字修图：自然语言描述修改需求，AI自动处理图片',
      'Game Booster 内嵌叠加层：不退出游戏即可调整分辨率和性能模式',
      'Samsung DeX 虚拟桌面快速切换',
      'Quick Share 新增 NFC Tap to Share + 与 AirDrop 双向兼容',
      'AI Assistant Activity 仪表盘：集中查看所有AI自动化操作',
      '蓝色状态栏指示器：位置/相机/麦克风活跃时透明提示',
      'Foreign Material Detection（折叠屏专属）：检测铰链区域灰尘碎屑',
      'Warranty & Care Hub：统一保修/诊断/维修入口',
      'S25 获 AI 通知功能补齐：Prioritise（AI优先排序）+ Summarise（长聊天摘要）',
      '稳定版预载 Z Fold 8/Flip 8（7月22日首发）→ S26 系列8月推送'
    ],
    cons: [
      'Gemini Intelligence 需旗舰芯片+12GB RAM+Gemini Nano v3：仅 Z Fold 8/Ultra 首发',
      'S22 系列/S21 FE/Z Fold 4 确认排除 One UI 9 升级名单',
      '区域限制：Gemini Intelligence 等AI功能可能仅限部分市场',
      'Beta 阶段到稳定版仍有一些小Bug待修复（通知按钮缩放等）'
    ],
    quotes: [
      { kind:'good', top:'证明了我错了', text:'"I thought the Galaxy Z Fold 8 was a gimmick. After using it, Samsung proved me wrong."', src:'https://www.androidauthority.com/samsung-galaxy-z-fold-8-hands-on-3689281', name:'Android Authority' },
      { kind:'good', top:'最喜欢的折叠', text:'"Of the three folding phones Samsung is releasing this year, this is by far my favorite."', src:'https://www.androidauthority.com/samsung-galaxy-z-fold-8-hands-on-3689281', name:'Android Authority' }
    ],
    monthly: [
      { ver:'Beta 1', date:'2026-05-12', note:'S26 系列首发 Beta；Notes/Contacts/Quick Panel/无障碍/安全全面更新' },
      { ver:'Beta 2', date:'2026-05-26', note:'扩大至印度/波兰等地区' },
      { ver:'Beta 3', date:'2026-06', note:'网络速度指示器、更多 AI 功能打磨' },
      { ver:'Beta 4 (S948BXXU4ZZG4)', date:'2026-07-14', note:'~1.25GB 修复包；含7月5日安全补丁；修复锁屏横竖屏时钟异常、隐私显示快捷开关失效、游戏导航栏消失、快捷面板性能、实时通知计时器截断、车载蓝牙音量Routine等6项问题' },
      { ver:'稳定版 (One UI 9.0)', date:'2026-07-22', note:'🎉 Galaxy Unpacked 2026伦敦正式发布！预载 Z Fold 8/Ultra/Flip 8 首发；Gemini Intelligence/Gemini Notebook/Now Nudge/My FanCam/Photo Assist 正式上线；Quick Share兼容AirDrop；Warranty&Care Hub；Foreign Material Detection；AI Assistant Activity仪表盘；蓝色状态栏隐私指示器' },
      { ver:'Beta 5 (S948BXXU4ZZH6)', date:'2026-08-12', note:'📦 S26系列第五个Beta（距Beta 4约一个月），~1.1GB；8项修复：设置App白屏/冻结、锁屏相机组件慢/黑屏、Phone底部悬浮栏错位、My Files最近文件空白、桌面1×1快捷方式、视频/照片编辑器预览错位闪烁、间歇性屏幕闪烁、Wi-Fi连接错误；含8月安全补丁(56项漏洞：38 Google+18 Samsung)；推送韩国/印度/波兰/德国/英国。⚠️ 修正：S26系列仍未转稳定版（上期"8月灰度推送"信息有误），继续Beta；One UI 9.5已在测试服务器出现，预计随Galaxy S27系列2027年初发布' },
      { ver:'One UI 9.5 开发泄露', date:'2026-08-17', note:'📱 基于Android 17的One UI 9.5早期固件现身Galaxy S26（S942BXXU4CZH9）与未发布S27 Ultra（AZH3）；新增原生AppLock应用锁（密码/生物识别锁定单App，无需安全文件夹）；玻璃质感视觉语言（悬浮标签栏/Now Brief更亮边框+投影）；多年未改的指纹注册界面重设计；相机UI打磨（弹出菜单圆角/模糊降级、S26基础款原生24MP模式开关）；电话App搜索移至底部悬浮栏；S26当前出厂One UI 8.5，One UI 9稳定版预计8月底向S26推送，9.5公开Beta可能年底面向S26' }
    ],
    links: [
      { label:'Samsung 官方 One UI 9', url:'https://www.samsung.com/us/apps/one-ui' },
      { label:'Beebom: 稳定版发布', url:'https://gadgets.beebom.com/news/samsung-officially-releases-stable-one-ui-9-update-with-galaxy-z-fold-8-series' },
      { label:'Beebom: 功能全解', url:'https://gadgets.beebom.com/guides/best-one-ui-9-features' },
      { label:'Samsung Newsroom', url:'https://news.samsung.com/za/galaxy-unpacked-july-2026-a-first-look-at-galaxy-z-fold8-ultra-galaxy-z-fold8-galaxy-z-flip8' },
      { label:'Android Authority 试用', url:'https://www.androidauthority.com/samsung-galaxy-z-fold-8-hands-on-3689281' },
      { label:'Samsung 官方公告', url:'https://www.samsungmobilepress.com/articles/one-ui-9-beta-launch-galaxy-s26-series' }
    ]
  },
  {
    id: 'apple-ios27', brand: 'apple', status: 'upcoming',
    title: 'iOS 27 · Siri AI 独立 App / Safari AI / Camera Siri 模式 / Gemini-killer Image Playground',
    appType: '系统级 Major Update', aiNote: 'Siri AI / Apple Intelligence 2.0',
    date: 'WWDC 宣布 (2026-06-08) → Developer Beta 5 (8/10) → 公测版3 (8/11) → 正式版 2026-09',
    verdict: 'good', label: '期待值高',
    gist: 'Siri AI 彻底重做（独立 App+屏幕感知），Safari/Mail/Calendar/Image Playground 全面 AI 增强',
    tags: [{t:'WWDC 宣布',c:'tag-upcoming'},{t:'Siri AI',c:'tag-ai'},{t:'Safari AI',c:'tag-ai'},{t:'Image Playground',c:'tag-ai'}],
    pros: [
      'Siri AI 独立 App：对话历史保留、跨设备续接、屏幕感知（看照片问位置→找消息→建路线）',
      'Camera Siri 模式：按快门后 Siri 可见你所见，下拉追问细节',
      'Safari AI 标签整理：按话题自动分组 + Notify Me 追踪网页更新',
      'Mail/Calendar 自然语言：截图建日程（iOS 26 功能强化）、邮件建议操作第三方 App',
      'Image Playground 照片级写实：改写现有照片风格、圈选修改局部、生成 Messages 背景/锁屏壁纸',
      'Photos Clean Up 升级：复杂场景填充更自然、Extend 扩展图、Spatial Reframing 空间重构',
      '【Beta 3 新增】Siri 语音自定义：语速+表达力独立调节各5级，同步 Maps/Safari',
      '【Beta 3 新增】Safari 分页自动建主题 + Notify Me 页面变更追踪 + 自定义扩展创建',
      '【Beta 3 新增】Wallet 扫 QR 码生成数字通行证（会员卡/活动票/积分卡）',
      '【Beta 3 新增】Find My 临时冻结/隐藏位置共享，不通知对方',
      '【Beta 3 新增】备忘录自然语言建提醒（"今晚6点接爸爸"自动提取日期时间）',
      '【Beta 3 新增】信息长按回复特定 Android 消息（绿泡泡）',
      '【Beta 4 新增】AirPods 自适应模式强度滑块：控制中心可手动调节通透/降噪平衡档位',
      '【Beta 4 新增】Wi-Fi 每网络独立连接助理：可针对不同Wi-Fi分别设置智能切换蜂窝',
      '【Beta 4 新增】照片缩放填充(Zoom Photos to Fill)：自动放大接近屏幕比例的照片消除黑边',
      '【Beta 4 新增】相机 ProRes Log 2 格式：保留更多画面信息，后期调色宽容度显著提升（仅Pro系列）',
      '【Beta 4 新增】Apple TV 自动追剧下载：Continue Watching自动预下载后续2集，看完自动删除',
      '【Beta 4 新增】Siri 启动欢迎界面 + 预览长度可调（最多5行或关闭）',
      '【Beta 4 新增】高级本地听写(Advanced Dictation)：设备端运算不上云，识别准确率提升，支持长文本',
      '【Beta 4 新增】Always Show Request：Siri回答同时以文字形式显示在屏幕（辅助功能）',
      '【Beta 4 修复】通知中心完整汉化修复（Beta 3大面积英文问题解决）；锁屏底部控件恢复白色图标；音量条液态玻璃质感升级',
      '【Beta 4 发现】代码中出现双电池iPhone引用("The batteries in this iPhone are performing as expected")——暗示折叠屏iPhone Ultra双电池设计',
      '【Beta 5 新增】锁屏时钟可缩小并移至顶部小组件行，释放壁纸展示空间',
      '【Beta 5 新增】AI 扩展壁纸：照片比例不匹配时自动建议 Extend 补齐边缘，设置壁纸时一键修正',
      '【Beta 5 新增】Image Playground 生成壁纸：壁纸选择器内置入口，从照片库生成"复古插画""动画"等风格壁纸，或纯文字描述从零生成',
      '【Beta 5 新增】锁屏"正在播放"小组件可滑动移除，音频继续播放不中断',
      '【Beta 5 新增】Safari 紧凑工具栏恢复"所有标签页"图标（取代 iOS 26 三点菜单）+ 新标签页顶部恢复书签/阅读列表/历史图标 + 标签页自动按类别分类整理',
      '【Beta 5 新增】全局透明度滑块：替代非黑即白的"清晰/着色"切换，可在不透明到全透明间自由调节液态玻璃效果',
      '【Beta 5 新增】闹钟音量与铃声解绑：闹钟音量不再跟随铃声音量，独立调节',
      '【Beta 5 新增】AirPods 自定义 EQ：控制中心可针对 AirPods 设置均衡器',
      '【Beta 5 新增】信息"返回"按钮可隐藏：避免误触返回上一条消息',
      '【Beta 5 新增】通话上下文：拨打近期联系过的商家时自动显示从邮件提取的航班号/订单号（本地运行不监听音频，支持 Apple Watch）',
      '【Beta 5 新增】Screen Time 重设计：实时查看子女使用情况 + Time Allowances 分类限时 + Ask to Buy/Browse 每次确认 + Communication Safety 模糊暴力内容',
      '【Beta 5 新增】Write with Siri：系统级写作辅助，可匹配个人写作风格、按描述调整语气（休闲/正式）',
      '【Beta 5 新增】Visual Intelligence 扩展：餐食照片→营养成分、传单→多个日历事件、收据→分账、名片→联系人',
      '【Beta 5 新增】性能 80+ 项改进：App 启动快 30%、AirDrop 快 80%、动画/键盘/主屏/App 资源库加载优化，覆盖 iPhone 11+'
    ],
    cons: [
      'Siri AI EU 不上线：因监管原因欧洲首发无此功能',
      '需 iPhone 17 Pro+：完整 AI 能力仅新芯片可用',
      'Siri 语音自定义仅 iPhone 17 Pro/Air 可用：旧机型不支持',
      'Image Playground 有每日用量限制',
      '正式版需等 ~1 个月（当前 Developer Beta 5 / 公测版3）'
    ],
    quotes: [],
    monthly: [
      { ver:'Beta 3 (24A5380h)', date:'2026-07-07', note:'Siri语音自定义激活（语速+表达力各5级，仅iPhone 17 Pro/Air）、Safari分页自动分组+Notify Me、Wallet QR通行证、Find My位置隐藏、备忘录自然语言建提醒、信息回复Android消息、RAW 9引擎、照片评分、控制中心蜂窝状态显示、壁纸动画、AirPods自适应滑块；公测版预计7月中旬发布' },
      { ver:'Beta 4 (24A5390f)', date:'2026-07-21', note:'AirPods自适应强度滑块、Wi-Fi每网络独立连接助理、照片缩放填充、ProRes Log 2格式、Apple TV自动追剧下载、Siri启动欢迎界面+预览长度可调、高级本地听写、Always Show Request辅助功能；通知中心完整汉化修复、锁屏控件恢复白色、音量条液态玻璃升级、移除Beta3通知中心壁纸景深特效并修复Bug；代码发现双电池iPhone引用（折叠屏暗示）；公测版同步推送' },
      { ver:'Beta 5 (24A5400x)', date:'2026-08-03', note:'相机界面支持自定义快捷开关/Widget（曝光、对焦、滤镜、风格、定时器等可自由排列）、音量HUD与控制中心进一步液态玻璃化、主屏幕支持撤销/重做、Health新增AI血糖追踪与摄像头健身监测、Siri接入ChatGPT/Gemini双模型、性能与电池效率优化；后续进入每周一更节奏，公测版Beta 3预计8月5日推送' },
      { ver:'Beta 5 锁屏/Safari/性能', date:'2026-08-06', note:'锁屏时钟可缩小移至顶部小组件行+AI扩展壁纸+Image Playground生成壁纸+正在播放可滑动移除；Safari紧凑工具栏恢复所有标签页图标+书签/阅读列表/历史图标+标签页自动分类；全局透明度滑块替代清晰/着色切换；闹钟音量与铃声解绑；AirPods自定义EQ；信息返回按钮可隐藏；通话上下文（本地显示航班/订单号）；Screen Time重设计+Time Allowances+Ask to Buy/Browse；Write with Siri系统级写作；Visual Intelligence扩展（餐食营养/传单日历/收据分账/名片联系人）；80+项性能改进（App启动快30%/AirDrop快80%）' },
      { ver:'Developer Beta 5', date:'2026-08-10', note:'Siri 界面配色弱化调整；继续功能打磨与Bug修复；⚠️ 修正：本版并非"功能冻结"（后续公测版3仍有新功能加入）' },
      { ver:'公测版3', date:'2026-08-11', note:'🎉 第三个公测版发布（对应 Developer Beta 5，距公测版2约两周）；Siri AI（ChatGPT/Claude式对话、独立App、屏幕感知、跨App操作）；Liquid Glass 透明度滑块；Visual Intelligence 移入相机（餐食营养/账单分账）；Write with Siri 写作辅助；Safari 标签自动分组；AirPods 自定义EQ；儿童安全（Ask to Browse / Communication Safety / Time Allowances）；多款App图标刷新（Safari/Siri/Remote/Preview）；Siri增强语音新增英式英语；性能：App启动快30%、照片加载快70%、AirDrop快80%；支持 iPhone 11 及以上' },
      { ver:'Beta 6 / 公测版4 (24A5418b)', date:'2026-08-17', note:'🎉 iOS 27 Beta 6（构建24A5418b）8月17日推送，同日发布公测版4，进入每周一更收尾阶段；修复Beta 5置顶信息(Pinned Messages)显示异常；录屏新增3秒倒计时+控制中心录制指示自动清除；通知横幅新增morph动画（交互后融入通知中心指示）；相机自动夜景模式显示A标识区分手动/自动；Siri图标继续替换Apple Intelligence标识；高级本地听写预览(Advanced Dictation Preview)可在设置开启；AirPlay家庭影院PIN修复、部分Apple Intelligence与神经引擎模型加载修复、CarPlay/相机人像模糊/时钟锁屏等修复；已知问题降至14类、已解决升至74类；RC预计8月底、正式版9月随新iPhone推送' }
    ],
    links: [
      { label:'PhoneArena 全文', url:'https://www.phonearena.com/ios-27-release-date-features-news-compatible-iphones' },
      { label:'Apple iOS 27 官方', url:'https://www.apple.com/os/ios/' },
      { label:'EU 限制报道', url:'https://www.phonearena.com/news/apple-says-siri-ai-will-be-delayed-in-the-european-union-because-of-regulations_id180959' },
      { label:'MacRumors iOS 27 追踪', url:'https://www.macrumors.com/roundup/ios-27' },
      { label:'锁屏四项自定义', url:'https://www.163.com/dy/article/L3O5VC9A0553TAZH.html' }
    ]
  },
  {
    id: 'google-android17', brand: 'google', status: 'upcoming',
    title: 'Android 17 · 底层性能调度 / 搜索即时索引 / Pixel Feature Drop',
    appType: '系统级 Major Update (Beta 4 收尾)', aiNote: '',
    date: 'QPR1 Beta 8 (8/2) → QPR2 Beta 3 (8/14) → 稳定版 2026-09 Pixel Feature Drop',
    verdict: 'mixed', label: '待验证',
    gist: 'Android 17 QPR1 Beta 8 收尾，修复音频/指纹/NFC/平板底座问题；稳定版预计9月以 Pixel Feature Drop 形式推送',
    tags: [{t:'Beta 收尾',c:'tag-upcoming'},{t:'性能优化',c:'tag-app'},{t:'搜索重构',c:'tag-app'}],
    pros: [
      'CPU 调度器升级：旧机型任务管理效率提升',
      '搜索即时索引：新内容几乎秒索引',
      'Wi-Fi→蜂窝切换更平滑：弱网环境体验提升',
      '发送指示器：不稳定网络传输图片时显示进度'
    ],
    cons: [
      '具体系统 App 更新清单尚未公开（随稳定版公布）',
      'Pixel Feature Drop 内容未完全披露',
      '非 Pixel 设备落地取决于 OEM 适配'
    ],
    quotes: [],
    monthly: [
      { ver:'QPR1 Beta 8 (CP31.260623.010)', date:'2026-08-02', note:'修复音频底噪、屏下指纹响应、NFC支付偶发失败、Pixel Tablet 磁吸底座识别问题；稳定版预计9月以 Pixel Feature Drop 形式推送' },
      { ver:'8月安全更新 (CP2A.260805.005)', date:'2026-08-05', note:'🎉 Pixel 8/8Pro/8a/9全系/9a/10全系/10a 获推送；⚠️ Pixel 6/6Pro/6a/7/7Pro/7a 本月被排除！修补CVE-2026-0163(Video Processing Unit高严重提权漏洞)；Pixel 10专属修复：游戏崩溃/GPU性能/触屏无响应；QPR2 Beta 1同步推进：修复蓝牙自动重连/Gemini崩溃/通知消失/UI模糊重置' },
      { ver:'QPR2 Beta 3 (CP41.260731.005)', date:'2026-08-14', note:'🔒 新增反通话呼叫转移诈骗安全限制：sendUssdRequest() API 无法再用 CALL_PHONE 权限执行呼叫转移码（后台被拦截返回 USSD_ERROR_NOT_ALLOWED），系统拨号器手动拨打时新增系统级确认弹窗；修复通知栏/快捷设置视觉损坏+意外重启(Issue #535249652/#543124160)、Device Health 误报电池容量衰减警告；覆盖 Pixel 6a–10 系列（Pixel 11 系列预购期暂不包含）' },
      { ver:'QPR2 Beta 2', date:'2026-08-19', note:'🎉 Android 16 QPR2 Beta 2达平台稳定性(Platform Stability)；含9月安全补丁；新增开发者验证(Developer Verification，2026-09起部分地区仅限已验证开发者发布App方可安装)、SMS OTP保护(含retriever hash短信延迟≤3小时)、自定义App图标形状+文件夹预览、Health Connect自动步数追踪+运动数据扩展；垃圾回收优化；覆盖Pixel 6至10系列' }
    ],
    links: [
      { label:'Android 17 Release Notes', url:'https://developer.android.com/about/versions/17/release-notes' },
      { label:'Android 17 Beta Devices', url:'https://developer.android.com/about/versions/17/devices' },
      { label:'9to5Google 追踪', url:'https://9to5google.com/guides/android-17/' },
      { label:'Beebom: 8月Pixel更新', url:'https://gadgets.beebom.com/news/google-releases-august-2026-pixel-update-security-patch-pixel-10-bug-fixes' }
    ]
  },
  // ====== 新增系统App追踪 (2026-07) ======
  {
    id: 'xiaomi-gallery', status: 'released', brand: 'xiaomi',
    title: '小米相册 · 5.0.7.0 浏览性能与AI修图重构',
    appType: '相册 · 浏览/编辑/AI修图', aiNote: 'AI扩图 / 魔法消除 / 魔法换天 / 人像优化',
    date: '2026-07-01 灰度推送',
    verdict: 'good', label: '好评主导',
    gist: '底层加载逻辑重构，AI工具统一入口，批量编辑+双保存模式，千元机也受益；灰度分批推送中',
    tags: [{t:'相册',c:'tag-app'},{t:'AI修图',c:'tag-ai'},{t:'浏览性能',c:'tag-app'},{t:'月更追踪',c:'tag-month'}],
    pros: [
      '浏览性能大幅升级：缩略图缓存机制优化，高分辨率图片秒预览，后台资源占用降低',
      'AI修图统一入口：AI扩图/魔法消除/魔法换天/人像优化集中收纳在独立AI功能栏',
      '批量编辑效率提升：单张调好参数可复制粘贴到多张照片，旅行/探店批量调色大幅提速',
      '双保存模式：覆盖原图保留原始数据，可一键恢复；另存副本不影响原图',
      '浅色模式：编辑页面支持深色/浅色/跟随系统三种模式，户外强光修图更友好',
      '老机型适配：千元入门机也能获得流畅度提升，非旗舰专属',
      '标记功能整合：文字/签名/马赛克/贴纸/涂鸦一站式操作，工作截图标注更便捷'
    ],
    cons: [
      '灰度推送分批发放：部分用户需等待数日才能收到更新',
      '高端AI人像仍有硬件限制：入门机型无法使用部分AI人像功能',
      '批量编辑数量上限：一次性可选图片数量有限，几百张批量处理效率一般',
      '海外深度评测缺：主要功能级反馈来自国内用户，Reddit/XDA 讨论稀缺（信息缺口）'
    ],
    quotes: [],
    monthly: [
      { ver:'v5.0.7.0-0618-R', date:'2026-07-01', note:'底层加载重构、AI工具统一入口、批量编辑、浅色模式、动态照片编辑保留动态效果、大量Bug修复' }
    ],
    links: [
      { label:'HyperOS Gallery APK', url:'https://memeosupdates.com/apps/com.miui.gallery/5000700' },
      { label:'HyperOS App Updates', url:'https://hyperosupdates.com/latest-apps' },
      { label:'NokiaMob HyperOS 3', url:'https://nokiamob.net/2025/09/24/hyperos-3-global-released-new-ui-ai-tools-and-cross-device-features/' }
    ]
  }
];

/* sort dates (YYYY-MM / YYYY-MM-DD) for reverse-chronological ordering */
const DATE_MAP = {
  'samsung-voice-recorder': '2026-07',
  'samsung-my-files': '2026-05',
  'samsung-oneui-bugs': '2026-07',
  'samsung-galaxy-themes': '2025-10',
  'apple-writing-tools': '2026-02',
  'apple-mail-ai': '2026-02',
  'apple-math-notes': '2025-09',
  'apple-calendar': '2026-03',
  'apple-ios266': '2026-07-28',
  'google-recorder': '2025-07',
  'google-play-system': '2026-08',
  'xiaomi-hyperos3': '2026-08',
  'xiaomi-gallery': '2026-07',
  'oppo-coloros16': '2026-08',
  'honor-yoyo': '2026-08',
  'vivo-originos': '2025-10-15',
  'samsung-oneui9-beta': '2026-08',
  'apple-ios27': '2026-08',
  'google-android17': '2026-08'
};
entries.forEach(e => { e.sortDate = DATE_MAP[e.id] || '2025-01'; });

function monthKeyOf(d){ return d.slice(0,7); }
function monthLabelOf(k){
  const parts = k.split('-');
  return parts[0] + ' 年 ' + parseInt(parts[1],10) + ' 月';
}

/* ---------- helpers ---------- */
function tagsHtml(tags) {
  return tags.map(t => `<span class="tag ${t.c}">${t.t}</span>`).join('');
}
function prosHtml(pros) {
  return `<div class="pc-col pc-good"><div class="pc-head">👍 好用</div><ul>${pros.map(p => `<li>${p}</li>`).join('')}</ul></div>`;
}
function consHtml(cons) {
  return `<div class="pc-col pc-bad"><div class="pc-head">👎 不好用</div><ul>${cons.map(c => `<li>${c}</li>`).join('')}</ul></div>`;
}
function quotesHtml(quotes) {
  if (!quotes || !quotes.length) return '';
  const items = quotes.map(q => `
        <div class="quote quote-${q.kind}">
          <div class="quote-top">${q.top}</div>
          <p>${q.text}</p>
          <a class="quote-source" href="${q.src}" target="_blank">— ${q.name} ↗</a>
        </div>`).join('');
  return `\n      <div class="block-title">代表性反馈摘录</div>\n      <div class="quotes">${items}\n      </div>`;
}
function monthlyHtml(monthly) {
  if (!monthly || !monthly.length) return '';
  const rows = monthly.map(m => `<div class="monthly-row"><span class="monthly-ver">${m.ver}</span><span class="monthly-date">${m.date}</span><span class="monthly-note">${m.note}</span></div>`).join('');
  return `\n      <div class="monthly">\n        <div class="monthly-title">📅 月度更新追踪 (Galaxy Store / 应用商店)</div>\n        ${rows}\n      </div>`;
}
function tableHtml(table) {
  if (!table) return '';
  const head = `<tr>${table.head.map(h => `<th>${h}</th>`).join('')}</tr>`;
  const rows = table.rows.map(r => `<tr>${r.map(c => `<td class="${c.cls}">${c.t}</td>`).join('')}</tr>`).join('');
  return `\n      <div class="mini-wrap">\n        <div class="monthly-title">📊 横向对比 · 关键发现</div>\n        <table class="mini-table"><thead>${head}</thead><tbody>${rows}</tbody></table>\n      </div>`;
}
function linksHtml(links) {
  const items = links.map(l => `<a class="link-btn" href="${l.url}" target="_blank">${svgExt}${l.label}</a>`).join('');
  return `\n      <div class="links">${items}\n      </div>`;
}

/* ---------- LIST PAGE ---------- */
function renderList() {
  const bm = brandMeta;
  // cards grouped by month (reverse-chronological timeline)
  const sorted = [...entries].sort((a,b)=> b.sortDate.localeCompare(a.sortDate));
  const groups = {};
  sorted.forEach(e => { const k = monthKeyOf(e.sortDate); (groups[k] = groups[k]||[]).push(e); });
  const monthKeys = Object.keys(groups).sort((a,b)=> b.localeCompare(a));
  let cardsHtml = '';
  monthKeys.forEach(k => {
    const list = groups[k];
    cardsHtml += `
  <div class="section-header">
    <span class="timeline-dot"></span>
    <span class="section-title">${monthLabelOf(k)}</span>
    <div class="section-line"></div>
    <span class="section-count">${list.length} 条更新</span>
  </div>`;
    list.forEach(e => {
      cardsHtml += `
  <div class="card" data-brand="${e.brand}" data-status="${e.status}" style="--brand-accent: ${bm[e.brand].accent}">
    <div class="brand-icon"><img src="${bm[e.brand].logo}" alt="${bm[e.brand].name}"></div>
    <div class="card-body">
      <div class="card-top">
        <span class="card-date-badge">${monthLabelOf(monthKeyOf(e.sortDate))}</span>
        <span class="card-brand-pill" style="color:${bm[e.brand].accent}">${bm[e.brand].name}</span>
      </div>
      <h3>${e.title}</h3>
      <div class="card-meta">
        <span>🧩 ${e.appType}</span>
      </div>
      <div class="tags">
        <span class="tag ${vTag[e.verdict]}">${e.label}</span>
        ${tagsHtml(e.tags)}
      </div>
      <div class="card-gist">${e.gist}</div>
      ${e.status === 'released' ? `<div class="links">
        <a class="report-btn" target="_blank" href="updates/${e.id}.html">${svgDoc}报告</a>
      </div>` : ''}
    </div>
  </div>`;
    });
  });

  return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>系统应用更新与利弊 · 海外功能级追踪 2026</title>
<link rel="stylesheet" href="assets/style.css">
</head>
<body>

<nav class="section-switch">
  <a href="index.html">📱 发布会追踪</a>
  <a href="system-updates.html" class="active">🔍 系统更新日志</a>
</nav>

<section class="hero">
  <div class="hero-badge"><span class="dot"></span>海外功能级深度追踪</div>
  <h1>系统应用<em>更新与利弊</em></h1>
  <p class="hero-desc">⏱️ 按时间倒序 · 每个条目深挖一个具体功能：上线了什么 · 哪里好用 · 哪里不好用<br>来源：Reddit · Samsung Community · MacRumors · XDA · Tom’s Guide · 9to5 · Android Authority</p>
  <div class="hero-stats">
    <div class="hero-stat"><div class="num">7</div><div class="label">品牌系统</div></div>
    <div class="hero-stat"><div class="num">${entries.filter(e=>e.status==='released').length}</div><div class="label">已发布 / 已分析</div></div>
    <div class="hero-stat"><div class="num">${entries.filter(e=>e.status==='upcoming').length}</div><div class="label">即将发布</div></div>
    <div class="hero-stat"><div class="num">${entries.length}</div><div class="label">份深度报告</div></div>
  </div>
</section>

<div class="main-wrap">

  <nav class="filter-bar">
    <button class="filter-btn active" data-filter="all">全部</button>
    <button class="filter-btn" data-filter="released">已发布</button>
    <button class="filter-btn" data-filter="upcoming">即将发布</button>
  </nav>

  <div class="legend">
    <span class="legend-item"><span class="legend-chip" style="background:var(--good)"></span>已发布 = 已上线 + 有海外用户反馈</span>
    <span class="legend-item"><span class="legend-chip" style="background:var(--upcoming)"></span>即将发布 = 已官宣 / Beta 中，待稳定版落地</span>
  </div>

${cardsHtml}
  <div class="update-hint">
    <strong>数据来源</strong>：Samsung EU/US Community · MacRumors · XDA · Tom’s Guide · PCMag · TechCabal · 9to5 · 9to5Mac · Android Authority · SammyGuru · NokiaMob · HuaweiCentral<br>
    <strong>信息缺口</strong>：小米/荣耀/vivo/OPPO 的海外 AI 功能深度吐槽远少于三星/苹果，标记为「争议/待验证」，后续持续挖掘 Reddit/YouTube/XDA<br>
    <strong>月度更新</strong>：三星系统应用经 Galaxy Store 独立更新；Google 经 Play System 月度公开；其他品牌月更日志获取渠道有限<br>
    <strong>更新频率</strong>：2026 年 7 月起持续追踪 · 每月更新
  </div>

</div>

<script>
(function(){
  const filterBtns = document.querySelectorAll('.filter-bar .filter-btn');
  const cards = document.querySelectorAll('.card');
  const sections = document.querySelectorAll('.section-header');
  let currentFilter = 'all';
  function apply() {
    cards.forEach(c => {
      const ok = (currentFilter === 'all' || c.dataset.status === currentFilter);
      c.classList.toggle('hidden', !ok);
    });
    sections.forEach(s => {
      let next = s.nextElementSibling;
      let hasVisible = false;
      while (next && !next.classList.contains('section-header')) {
        if (next.classList.contains('card') && !next.classList.contains('hidden')) { hasVisible = true; break; }
        next = next.nextElementSibling;
      }
      s.classList.toggle('hidden', !hasVisible);
    });
  }
  filterBtns.forEach(btn => btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active'); currentFilter = btn.dataset.filter; apply();
  }));
})();
</script>
</body>
</html>`;
}

/* ---------- DETAIL PAGE ---------- */
function renderDetail(e) {
  const bm = brandMeta[e.brand];
  const aiChip = e.aiNote ? `<span class="ai"> · ${e.aiNote}</span>` : '';
  return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${e.title} · 系统应用深度分析</title>
<link rel="stylesheet" href="../assets/style.css">
</head>
<body>

<nav class="section-switch">
  <a href="../index.html">📱 发布会追踪</a>
  <a href="../system-updates.html" class="active">🔍 系统更新日志</a>
</nav>

<div class="detail-wrap">
  <a class="back-link" href="../system-updates.html">← 返回系统更新列表</a>

  <div class="detail-head">
    <div class="brand-icon"><img src="../${bm.logo}" alt="${bm.name}"></div>
    <div>
      <div class="detail-app">${bm.name} · ${e.appType}${aiChip}</div>
      <h1 class="detail-h1">${e.title}</h1>
      <div class="detail-meta"><span>📅 ${e.date}</span></div>
      <div class="tags detail-tags">
        <span class="tag ${vTag[e.verdict]}">${e.label}</span>
        ${tagsHtml(e.tags)}
      </div>
    </div>
  </div>

  <div class="verdict-banner ${vBanner[e.verdict]}">
    <span class="vb-icon">${vIcon[e.verdict]}</span>
    <div>
      <div class="vb-title">${e.label}</div>
      <div class="vb-sub">${e.gist}</div>
    </div>
  </div>

  <div class="block-title">更新了什么 & 用户怎么看</div>
  <div class="proscons">
    ${prosHtml(e.pros)}
    ${consHtml(e.cons)}
  </div>
${quotesHtml(e.quotes)}
${monthlyHtml(e.monthly)}
${tableHtml(e.table)}
${linksHtml(e.links)}

  <div class="update-hint">
    <strong>来源</strong>：${e.links.map(l => l.label).join(' · ')}<br>
    <strong>信息说明</strong>：以上利弊基于海外社区与媒体实测反馈整理；标记为「争议/待验证」的条目后续将持续补充 Reddit / YouTube / XDA 真实用户讨论。
  </div>
</div>

</body>
</html>`;
}

/* ---------- write ---------- */
const listPath = path.join(ROOT, 'system-updates.html');
fs.writeFileSync(listPath, renderList(), 'utf8');
console.log('wrote', listPath);

entries.forEach(e => {
  const p = path.join(OUT_DIR, e.id + '.html');
  fs.writeFileSync(p, renderDetail(e), 'utf8');
  console.log('wrote', p);
});
console.log('DONE. total entries:', entries.length);
