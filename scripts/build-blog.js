const fs = require("fs");
const path = require("path");
const { marked } = require("marked");

const POSTS_DIR = path.join("content", "posts");
const BLOG_DIR = "blog";
const POST_TEMPLATE_PATH = path.join("templates", "post.html");
const BLOG_INDEX_TEMPLATE_PATH = path.join("templates", "blog-index.html");

function parseFrontmatter(raw) {
  const m = raw.match(/^---\s*([\s\S]*?)\s*---\s*([\s\S]*)$/);
  if (!m) return { meta: {}, body: raw };

  const fm = m[1].trim();
  const body = m[2].trim();

  const meta = {};
  for (const line of fm.split("\n")) {
    const idx = line.indexOf(":");
    if (idx === -1) continue;
    const key = line.slice(0, idx).trim();
    const val = line.slice(idx + 1).trim();
    meta[key] = val;
  }
  return { meta, body };
}

function slugFromFilename(filename) {
  return filename
    .replace(/^\d{4}-\d{2}-\d{2}-/, "")
    .replace(/\.md$/i, "")
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function ensureDir(p) {
  fs.mkdirSync(p, { recursive: true });
}

function main() {
  console.log("== Blog build starting ==");

  ensureDir(BLOG_DIR);

  if (!fs.existsSync(POSTS_DIR)) {
    console.log(`No posts directory found at: ${POSTS_DIR}`);
    process.exit(0);
  }

  const postTemplate = fs.readFileSync(POST_TEMPLATE_PATH, "utf8");
  const blogIndexTemplate = fs.readFileSync(BLOG_INDEX_TEMPLATE_PATH, "utf8");

  const files = fs.readdirSync(POSTS_DIR).filter(f => f.toLowerCase().endsWith(".md"));
  console.log(`Found ${files.length} markdown post(s) in ${POSTS_DIR}`);

  const posts = [];

  for (const file of files) {
    const raw = fs.readFileSync(path.join(POSTS_DIR, file), "utf8");
    const { meta, body } = parseFrontmatter(raw);

    const title = meta.title || "Untitled";
    const date = meta.date || "";
    const slug = slugFromFilename(file);

    const outDir = path.join(BLOG_DIR, slug);
    ensureDir(outDir);

    const contentHtml = marked.parse(body);

    const html = postTemplate
      .split("{{TITLE}}").join(title)
      .split("{{DATE}}").join(date)
      .replace("{{CONTENT}}", contentHtml);

    fs.writeFileSync(path.join(outDir, "index.html"), html);
    console.log(`Built: /blog/${slug}/`);

     posts.push({ title, date, slug, description: meta.description || "" });

  }

  // newest first (works well with YYYY-MM-DD)
  posts.sort((a, b) => (b.date || "").localeCompare(a.date || ""));

 const postsHtml =
  posts.length === 0
    ? `<div class="post"><div style="color: rgba(243,234,219,0.78);">No posts yet.</div></div>`
    : posts
        .map(
          p => `
<div class="post">
  <div><a href="/blog/${p.slug}/">${escapeHtml(p.title)}</a></div>
  <div class="meta">${escapeHtml(p.date || "")}</div>
  ${p.description ? `<div class="desc">${escapeHtml(p.description)}</div>` : ""}
</div>`.trim()
        )
        .join("\n");


  const blogIndexHtml = blogIndexTemplate.replace("{{POSTS}}", postsHtml);
  fs.writeFileSync(path.join(BLOG_DIR, "index.html"), blogIndexHtml);
  console.log("Built: /blog/ (index)");

  console.log("== Blog build complete ==");
}

function escapeHtml(s) {
  return String(s)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

main();
