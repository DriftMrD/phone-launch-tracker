// 生成系统应用分类模块的本地配图 SVG（images/apps/*.svg）
const fs = require('fs');
const path = require('path');

const OUT = path.join(__dirname, 'images', 'apps');
fs.mkdirSync(OUT, { recursive: true });

const APPS = [
  { id: 'recorder', name: '录音机',  en: 'Recorder',      color: '#f43f5e' },
  { id: 'files',    name: '文件管理', en: 'File Manager',  color: '#f59e0b' },
  { id: 'player',   name: '播放器',   en: 'Media Player',  color: '#8b5cf6' },
  { id: 'notes',    name: '记事本',   en: 'Notes',         color: '#22c55e' },
  { id: 'calendar', name: '日历',     en: 'Calendar',      color: '#3b82f6' },
  { id: 'clock',    name: '时钟',     en: 'Clock',         color: '#06b6d4' },
  { id: 'calc',     name: '计算器',   en: 'Calculator',    color: '#94a3b8' },
  { id: 'scan',     name: '扫一扫',   en: 'Scanner',       color: '#14b8a6' },
  { id: 'theme',    name: '主题商城', en: 'Theme Store',   color: '#ec4899' },
  { id: 'labs',     name: '玩机',     en: 'Game & Labs',   color: '#ef4444' },
  { id: 'clone',    name: '换机',     en: 'Phone Clone',   color: '#a855f7' },
  { id: 'browser',  name: '浏览器',   en: 'Browser',       color: '#0ea5e9' },
  { id: 'gallery',  name: '相册',     en: 'Gallery',       color: '#f97316' },
  { id: 'assistant',name: 'AI 助手',  en: 'AI Assistant',  color: '#6366f1' }
];

const W = 400, H = 260;

APPS.forEach((a, i) => {
  const c = a.color;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img" aria-label="${a.name}">
  <defs>
    <linearGradient id="bg${i}" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#12141a"/>
      <stop offset="100%" stop-color="#08090c"/>
    </linearGradient>
    <radialGradient id="glow${i}" cx="50%" cy="42%" r="60%">
      <stop offset="0%" stop-color="${c}" stop-opacity=".55"/>
      <stop offset="60%" stop-color="${c}" stop-opacity=".12"/>
      <stop offset="100%" stop-color="${c}" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="bar${i}" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="${c}" stop-opacity=".9"/>
      <stop offset="100%" stop-color="${c}" stop-opacity=".15"/>
    </linearGradient>
  </defs>

  <rect width="${W}" height="${H}" fill="url(#bg${i})"/>
  <rect width="${W}" height="${H}" fill="url(#glow${i})"/>

  <!-- 背景网格 -->
  <g stroke="${c}" stroke-opacity=".08" stroke-width="1">
    ${Array.from({ length: 9 }, (_, k) => `<line x1="0" y1="${k * 32 + 16}" x2="${W}" y2="${k * 32 + 16}"/>`).join('\n    ')}
    ${Array.from({ length: 13 }, (_, k) => `<line x1="${k * 32 + 16}" y1="0" x2="${k * 32 + 16}" y2="${H}"/>`).join('\n    ')}
  </g>

  <!-- 主图形：圆角方 + 内嵌圆 -->
  <rect x="140" y="52" width="120" height="120" rx="30" fill="none" stroke="${c}" stroke-opacity=".85" stroke-width="3"/>
  <circle cx="200" cy="112" r="34" fill="${c}" fill-opacity=".22" stroke="${c}" stroke-opacity=".9" stroke-width="2.5"/>
  <circle cx="200" cy="112" r="11" fill="${c}"/>

  <!-- 底部色条 -->
  <rect x="120" y="200" width="160" height="4" rx="2" fill="url(#bar${i})"/>

  <!-- 文字 -->
  <text x="200" y="232" text-anchor="middle" font-family="-apple-system,BlinkMacSystemFont,'PingFang SC','Microsoft YaHei',sans-serif" font-size="26" font-weight="700" fill="#f2f3f7">${a.name}</text>
  <text x="200" y="34" text-anchor="middle" font-family="-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif" font-size="12" letter-spacing="3" fill="${c}" fill-opacity=".9">${a.en.toUpperCase()}</text>
</svg>
`;
  fs.writeFileSync(path.join(OUT, a.id + '.svg'), svg, 'utf8');
  console.log('✓', a.id + '.svg');
});
console.log('共生成', APPS.length, '张配图 →', OUT);
