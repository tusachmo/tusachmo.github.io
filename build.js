// Dựng trang Tủ Sách Mở: đọc src/ và content/, ghi kết quả vào docs/ (thư mục GitHub Pages phục vụ).
// Chạy: npm run build
const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');
const { marked } = require('marked');

const ROOT = __dirname;
const SRC = path.join(ROOT, 'src');
const CONTENT = path.join(ROOT, 'content');
const OUT = path.join(ROOT, 'docs');

const SITE = {
  title: 'Tủ Sách Mở',
  description: 'Sách y khoa, toán và khoa học có giấy phép mở, dịch sang tiếng Việt.',
};

const NAV = [
  { href: 'y-van-mo/', label: 'Y Văn Mở' },
  { href: 'toan-khoa-hoc/', label: 'Toán và Khoa học' },
  { href: 'bai-viet/', label: 'Bài viết' },
  { href: 'on-thi/', label: 'Ôn thi nội trú' },
];

const esc = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

// root: đường dẫn tương đối về gốc trang ('' ở trang chủ, '../' ở trang con), để trang chạy được
// cả ở ten.github.io/tusachmo/ lẫn tên miền riêng.
function layout({ title, description, root, current, body }) {
  const nav = NAV.map((n) => {
    const here = current && current.startsWith(n.href) ? ' aria-current="page"' : '';
    return `<a href="${root}${n.href}"${here}>${esc(n.label)}</a>`;
  }).join('\n        ');
  const fullTitle = title ? `${title} | ${SITE.title}` : SITE.title;
  return `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${esc(fullTitle)}</title>
  <meta name="description" content="${esc(description || SITE.description)}">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@400;500;600;800&family=Lora:ital,wght@0,500;0,600;1,500&display=swap">
  <link rel="stylesheet" href="${root}assets/style.css">
</head>
<body>
  <header class="site-header">
    <div class="wrap">
      <a class="brand" href="${root || './'}">${esc(SITE.title)}</a>
      <nav class="site-nav" aria-label="Chuyên mục">
        ${nav}
      </nav>
    </div>
  </header>
  <main>
${body}
  </main>
  <footer class="site-footer">
    <div class="wrap">
      <span>${esc(SITE.title)}. Nội dung từng cuốn theo giấy phép ghi trên trang sách đó.</span>
      <span>Tên và logo của nhà xuất bản gốc thuộc về chủ sở hữu tương ứng.</span>
    </div>
  </footer>
</body>
</html>
`;
}

// Khối ghi nguồn cho chương sách dịch, lấy từ phần khai báo đầu file Markdown.
function sourceBox(d) {
  if (!d.ban_goc) return '';
  const rows = [`<strong>Bản gốc: ${esc(d.ban_goc)}</strong>`];
  if (d.tac_gia) rows.push(`<span>Tác giả: ${esc(d.tac_gia)}</span>`);
  if (d.giay_phep) rows.push(`<span>Giấy phép: ${esc(d.giay_phep)}</span>`);
  if (d.nguon) rows.push(`<span>Nguồn: <a href="${esc(d.nguon)}">${esc(d.nguon)}</a></span>`);
  if (d.thay_doi) rows.push(`<span>Thay đổi so với bản gốc: ${esc(d.thay_doi)}</span>`);
  return `<aside class="source-box" aria-label="Nguồn và giấy phép">${rows.join('')}</aside>`;
}

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const p = path.join(dir, e.name);
    return e.isDirectory() ? walk(p) : e.name.endsWith('.md') ? [p] : [];
  });
}

function write(file, text) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, text);
}

fs.rmSync(OUT, { recursive: true, force: true });
write(path.join(OUT, '.nojekyll'), '');
write(path.join(OUT, 'assets', 'style.css'), fs.readFileSync(path.join(SRC, 'style.css'), 'utf8'));

// Trang chủ
write(
  path.join(OUT, 'index.html'),
  layout({ title: '', root: '', current: '', body: fs.readFileSync(path.join(SRC, 'home.html'), 'utf8') })
);

// Các trang Markdown: content/a/b.md -> docs/a/b/index.html, content/a/index.md -> docs/a/index.html
let count = 0;
for (const file of walk(CONTENT)) {
  const rel = path.relative(CONTENT, file).split(path.sep).join('/');
  const slug = rel.replace(/(^|\/)index\.md$/, '$1').replace(/\.md$/, '/');
  const depth = slug.split('/').filter(Boolean).length;
  const root = '../'.repeat(depth);
  const { data, content } = matter(fs.readFileSync(file, 'utf8'));
  const html = marked
    .parse(content)
    .replace(/<table>/g, '<div class="table-scroll"><table>')
    .replace(/<\/table>/g, '</table></div>');
  const top = slug.split('/')[0] + '/';
  const section = NAV.find((n) => n.href === top);
  const crumbs =
    `<p class="crumbs"><a href="${root || './'}">Trang chủ</a>` +
    (section && slug !== top ? ` / <a href="${root}${section.href}">${esc(section.label)}</a>` : '') +
    `</p>`;
  const body = `    <div class="wrap page">
      ${crumbs}
      <article class="prose">
        <h1>${esc(data.title || 'Chưa đặt tiêu đề')}</h1>
        ${sourceBox(data)}
        ${html}
      </article>
    </div>`;
  write(
    path.join(OUT, slug, 'index.html'),
    layout({ title: data.title, description: data.description, root, current: slug, body })
  );
  count++;
}

console.log(`Đã dựng trang chủ và ${count} trang nội dung vào docs/`);
