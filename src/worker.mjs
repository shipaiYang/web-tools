const SITE_NAME = "Dev Toolbox";
const SITE_TITLE = "Dev Toolbox - 开发辅助工具合集";
const SITE_DESCRIPTION =
  "Dev Toolbox 是一个面向开发者的在线工具合集，提供 JSON 格式化、时间戳转换、Base64 编解码、URL 编解码、JWT 解析、哈希生成、UUID 生成和命名格式转换。";
const SITE_KEYWORDS =
  "开发工具,在线工具,JSON格式化,时间戳转换,Base64,URL编码,JWT解析,哈希生成,UUID生成,命名格式转换,developer tools,json formatter,timestamp converter";
const DEPLOYED_AT = "2026-05-05";
const CONTACT_EMAIL = "openai@paiai.ccwu.cc";
const ADS_TXT = "google.com, pub-7928012653439229, DIRECT, f08c47fec0942fa0";

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function createStructuredData(origin) {
  return JSON.stringify(
    {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "WebSite",
          "@id": `${origin}/#website`,
          url: `${origin}/`,
          name: SITE_NAME,
          inLanguage: "zh-CN",
          description: SITE_DESCRIPTION,
          potentialAction: {
            "@type": "SearchAction",
            target: `${origin}/#tools`,
            "query-input": "required name=tool"
          }
        },
        {
          "@type": "WebPage",
          "@id": `${origin}/#webpage`,
          url: `${origin}/`,
          name: SITE_TITLE,
          isPartOf: {
            "@id": `${origin}/#website`
          },
          about: [
            "JSON formatter",
            "timestamp converter",
            "Base64 encoder",
            "JWT decoder"
          ],
          datePublished: DEPLOYED_AT,
          dateModified: DEPLOYED_AT,
          inLanguage: "zh-CN",
          description: SITE_DESCRIPTION
        },
        {
          "@type": "SoftwareApplication",
          name: SITE_NAME,
          applicationCategory: "DeveloperApplication",
          operatingSystem: "Web",
          offers: {
            "@type": "Offer",
            price: "0",
            priceCurrency: "USD"
          },
          description: SITE_DESCRIPTION,
          url: `${origin}/`,
          featureList: [
            "JSON 格式化、压缩、校验",
            "Unix 时间戳和本地时间互转",
            "Base64 编解码",
            "URL 编解码",
            "JWT 本地解析",
            "哈希生成",
            "UUID 批量生成",
            "命名格式转换"
          ]
        },
        {
          "@type": "FAQPage",
          mainEntity: [
            {
              "@type": "Question",
              name: "这个工具站适合做什么？",
              acceptedAnswer: {
                "@type": "Answer",
                text: "适合处理开发中高频出现的 JSON、时间戳、JWT、编码转换和文本格式转换等任务。"
              }
            },
            {
              "@type": "Question",
              name: "工具是否需要登录或上传文件？",
              acceptedAnswer: {
                "@type": "Answer",
                text: "不需要。当前版本的工具都在浏览器端执行，打开页面即可直接使用。"
              }
            },
            {
              "@type": "Question",
              name: "这个页面包含哪些开发工具？",
              acceptedAnswer: {
                "@type": "Answer",
                text: "当前包含 JSON 格式化、时间戳转换、Base64 编解码、URL 编解码、JWT 解析、哈希生成、UUID 生成和命名格式转换。"
              }
            }
          ]
        }
      ]
    },
    null,
    0
  );
}

function renderPageHead(options) {
  const canonicalUrl = `${options.origin}${options.path}`;
  const ogImageUrl = `${options.origin}/og.svg`;
  const keywords = options.keywords || SITE_KEYWORDS;
  const structuredData = escapeHtml(
    JSON.stringify(
      {
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: options.title,
        url: canonicalUrl,
        description: options.description,
        inLanguage: "zh-CN",
        datePublished: DEPLOYED_AT,
        dateModified: DEPLOYED_AT,
        isPartOf: {
          "@type": "WebSite",
          name: SITE_NAME,
          url: `${options.origin}/`
        }
      },
      null,
      0
    )
  );

  return `<meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${options.title}</title>
    <meta name="description" content="${options.description}" />
    <meta name="keywords" content="${keywords}" />
    <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
    <meta name="author" content="${SITE_NAME}" />
    <meta name="theme-color" content="#f5f0e8" />
    <link rel="canonical" href="${canonicalUrl}" />
    <link rel="alternate" hreflang="zh-CN" href="${canonicalUrl}" />
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="${SITE_NAME}" />
    <meta property="og:title" content="${options.title}" />
    <meta property="og:description" content="${options.description}" />
    <meta property="og:url" content="${canonicalUrl}" />
    <meta property="og:locale" content="zh_CN" />
    <meta property="og:image" content="${ogImageUrl}" />
    <meta property="og:image:type" content="image/svg+xml" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${options.title}" />
    <meta name="twitter:description" content="${options.description}" />
    <meta name="twitter:image" content="${ogImageUrl}" />
    <script type="application/ld+json">${structuredData}</script>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500&family=Space+Grotesk:wght@400;500;700&display=swap"
      rel="stylesheet"
    />`;
}

function renderInfoPage(origin, options) {
  const sections = options.sections
    .map(function (section) {
      const items = section.items
        .map(function (item) {
          return `<li>${item}</li>`;
        })
        .join("");

      return `<section class="info-card">
        <h2>${section.title}</h2>
        ${section.paragraphs.map(function (paragraph) {
          return `<p>${paragraph}</p>`;
        }).join("")}
        ${items ? `<ul>${items}</ul>` : ""}
      </section>`;
    })
    .join("");

  return `<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    ${renderPageHead({
      origin: origin,
      path: options.path,
      title: options.title,
      description: options.description,
      keywords: options.keywords
    })}
    <style>
      :root {
        --text: #1e2830;
        --muted: #5c6a73;
        --accent: #0f766e;
        --line: rgba(30, 40, 48, 0.1);
        --shadow: 0 20px 60px rgba(47, 55, 64, 0.12);
        --sans: "Space Grotesk", "Segoe UI", sans-serif;
        --mono: "IBM Plex Mono", "SFMono-Regular", Consolas, monospace;
      }

      * {
        box-sizing: border-box;
      }

      body {
        margin: 0;
        font-family: var(--sans);
        color: var(--text);
        background:
          radial-gradient(circle at top left, rgba(240, 138, 36, 0.18), transparent 30%),
          radial-gradient(circle at top right, rgba(15, 118, 110, 0.16), transparent 26%),
          linear-gradient(180deg, #f8f4ec 0%, #f3ede3 100%);
      }

      .page {
        width: min(960px, calc(100% - 24px));
        margin: 0 auto;
        padding: 28px 0 56px;
      }

      .hero,
      .info-card {
        border-radius: 28px;
        border: 1px solid var(--line);
        background: rgba(255, 255, 255, 0.8);
        box-shadow: var(--shadow);
      }

      .hero {
        padding: 28px;
        margin-bottom: 18px;
      }

      .eyebrow {
        display: inline-flex;
        align-items: center;
        gap: 10px;
        padding: 8px 14px;
        border-radius: 999px;
        background: rgba(255, 255, 255, 0.85);
        border: 1px solid var(--line);
        color: var(--muted);
        font-size: 12px;
        text-transform: uppercase;
        letter-spacing: 0.04em;
      }

      .eyebrow::before {
        content: "";
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background: var(--accent);
      }

      h1 {
        margin: 18px 0 10px;
        font-size: clamp(34px, 6vw, 56px);
        line-height: 1;
        letter-spacing: -0.04em;
      }

      p {
        margin: 0;
        line-height: 1.8;
        color: var(--muted);
      }

      .page-nav {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
        margin-top: 22px;
      }

      .page-nav a {
        text-decoration: none;
        color: var(--text);
        background: rgba(255, 255, 255, 0.86);
        border: 1px solid var(--line);
        padding: 10px 14px;
        border-radius: 999px;
        font-size: 14px;
      }

      .info-grid {
        display: grid;
        gap: 16px;
      }

      .info-card {
        padding: 22px;
      }

      .info-card h2 {
        margin: 0 0 10px;
        font-size: 22px;
        letter-spacing: -0.03em;
      }

      .info-card p + p {
        margin-top: 10px;
      }

      .info-card ul {
        margin: 14px 0 0;
        padding-left: 20px;
        color: var(--muted);
        line-height: 1.8;
      }

      .mono {
        font-family: var(--mono);
        color: var(--text);
      }

      @media (max-width: 900px) {
        .page {
          width: min(100% - 18px, 960px);
          padding-top: 18px;
        }

        .hero,
        .info-card {
          padding: 18px;
        }
      }
    </style>
  </head>
  <body>
    <main class="page">
      <header class="hero">
        <div class="eyebrow">${options.eyebrow}</div>
        <h1>${options.heading}</h1>
        <p>${options.lead}</p>
        <nav class="page-nav" aria-label="站点页面">
          <a href="/">首页</a>
          <a href="/about.html">About</a>
          <a href="/privacy.html">Privacy</a>
          <a href="/terms.html">Terms</a>
          <a href="/contact.html">Contact</a>
        </nav>
      </header>
      <div class="info-grid">
        ${sections}
      </div>
    </main>
  </body>
</html>`;
}

function renderHtml(origin) {
  const canonicalUrl = `${origin}/`;
  const ogImageUrl = `${origin}/og.svg`;
  const structuredData = escapeHtml(createStructuredData(origin));

  return String.raw`<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${SITE_TITLE}</title>
    <meta name="description" content="${SITE_DESCRIPTION}" />
    <meta name="keywords" content="${SITE_KEYWORDS}" />
    <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
    <meta name="author" content="${SITE_NAME}" />
    <meta name="theme-color" content="#f5f0e8" />
    <link rel="canonical" href="${canonicalUrl}" />
    <link rel="alternate" hreflang="zh-CN" href="${canonicalUrl}" />

    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="${SITE_NAME}" />
    <meta property="og:title" content="${SITE_TITLE}" />
    <meta property="og:description" content="${SITE_DESCRIPTION}" />
    <meta property="og:url" content="${canonicalUrl}" />
    <meta property="og:locale" content="zh_CN" />
    <meta property="og:image" content="${ogImageUrl}" />
    <meta property="og:image:type" content="image/svg+xml" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />

    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${SITE_TITLE}" />
    <meta name="twitter:description" content="${SITE_DESCRIPTION}" />
    <meta name="twitter:image" content="${ogImageUrl}" />

    <script type="application/ld+json">${structuredData}</script>

    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500&family=Space+Grotesk:wght@400;500;700&display=swap"
      rel="stylesheet"
    />
    <style>
      :root {
        --bg: #f5f0e8;
        --card: rgba(255, 251, 247, 0.9);
        --card-strong: rgba(255, 248, 241, 0.98);
        --line: rgba(45, 61, 73, 0.12);
        --text: #1e2830;
        --muted: #5c6a73;
        --accent: #0f766e;
        --accent-strong: #0b5d57;
        --accent-soft: rgba(15, 118, 110, 0.12);
        --warm: #f08a24;
        --warm-soft: rgba(240, 138, 36, 0.16);
        --shadow: 0 20px 60px rgba(47, 55, 64, 0.12);
        --radius-xl: 28px;
        --radius-lg: 20px;
        --mono: "IBM Plex Mono", "SFMono-Regular", Consolas, monospace;
        --sans: "Space Grotesk", "Segoe UI", sans-serif;
      }

      * {
        box-sizing: border-box;
      }

      html {
        scroll-behavior: smooth;
      }

      body {
        margin: 0;
        font-family: var(--sans);
        color: var(--text);
        background:
          radial-gradient(circle at top left, rgba(240, 138, 36, 0.2), transparent 32%),
          radial-gradient(circle at top right, rgba(15, 118, 110, 0.18), transparent 28%),
          linear-gradient(180deg, #f8f4ec 0%, #f3ede3 100%);
        min-height: 100vh;
      }

      body::before {
        content: "";
        position: fixed;
        inset: 0;
        pointer-events: none;
        background-image:
          linear-gradient(rgba(30, 40, 48, 0.035) 1px, transparent 1px),
          linear-gradient(90deg, rgba(30, 40, 48, 0.035) 1px, transparent 1px);
        background-size: 28px 28px;
        mask-image: linear-gradient(180deg, rgba(0, 0, 0, 0.42), transparent 82%);
      }

      a {
        color: inherit;
      }

      .page {
        width: min(1240px, calc(100% - 32px));
        margin: 0 auto;
        padding: 28px 0 56px;
      }

      .hero {
        position: relative;
        overflow: hidden;
        border: 1px solid rgba(30, 40, 48, 0.08);
        border-radius: 32px;
        padding: 28px;
        background:
          linear-gradient(135deg, rgba(255, 252, 248, 0.9), rgba(252, 247, 241, 0.8)),
          linear-gradient(180deg, rgba(255, 255, 255, 0.68), rgba(255, 255, 255, 0.36));
        box-shadow: var(--shadow);
        backdrop-filter: blur(12px);
      }

      .hero::after {
        content: "";
        position: absolute;
        right: -40px;
        top: -48px;
        width: 240px;
        height: 240px;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(15, 118, 110, 0.18), transparent 70%);
      }

      .hero-grid {
        position: relative;
        display: grid;
        grid-template-columns: minmax(0, 1.6fr) minmax(280px, 0.9fr);
        gap: 24px;
        align-items: end;
      }

      .badge {
        display: inline-flex;
        align-items: center;
        gap: 10px;
        padding: 8px 14px;
        border-radius: 999px;
        background: rgba(255, 255, 255, 0.74);
        border: 1px solid rgba(30, 40, 48, 0.08);
        color: var(--muted);
        font-size: 13px;
        letter-spacing: 0.04em;
        text-transform: uppercase;
      }

      .badge::before {
        content: "";
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background: linear-gradient(135deg, var(--accent), var(--warm));
        box-shadow: 0 0 0 6px rgba(15, 118, 110, 0.12);
      }

      h1 {
        margin: 18px 0 14px;
        font-size: clamp(40px, 6vw, 68px);
        line-height: 0.98;
        letter-spacing: -0.05em;
      }

      .hero p {
        max-width: 680px;
        margin: 0;
        font-size: 17px;
        line-height: 1.7;
        color: var(--muted);
      }

      .hero-actions,
      .quick-links,
      .controls,
      .chips {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
      }

      .hero-actions {
        margin-top: 24px;
        gap: 12px;
      }

      .button,
      button,
      .chip {
        border: 0;
        outline: 0;
        cursor: pointer;
        font-family: inherit;
      }

      .button {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        padding: 12px 16px;
        border-radius: 14px;
        font-size: 14px;
        transition: transform 160ms ease, box-shadow 160ms ease, background 160ms ease;
        text-decoration: none;
      }

      .button:hover,
      button:hover,
      .chip:hover {
        transform: translateY(-1px);
      }

      .button-primary {
        color: white;
        background: linear-gradient(135deg, var(--accent), var(--accent-strong));
        box-shadow: 0 16px 30px rgba(15, 118, 110, 0.22);
      }

      .button-secondary {
        color: var(--text);
        background: rgba(255, 255, 255, 0.72);
        border: 1px solid rgba(30, 40, 48, 0.1);
      }

      .hero-stats {
        display: grid;
        gap: 12px;
      }

      .hero-panel,
      .faq-item {
        padding: 18px;
        border-radius: 22px;
        background: rgba(255, 255, 255, 0.7);
        border: 1px solid rgba(30, 40, 48, 0.08);
      }

      .hero-panel p,
      .faq-item p,
      .toolbar p {
        display: block;
        color: var(--muted);
        font-size: 14px;
        line-height: 1.7;
        margin: 0;
      }

      .section-block {
        margin-top: 28px;
      }

      .cards,
      .faq-grid {
        display: grid;
        gap: 18px;
      }

      .hero-panel h2,
      .toolbar h2,
      .faq-header h2 {
        margin: 0 0 8px;
        font-size: 20px;
        letter-spacing: -0.03em;
      }

      .quick-links {
        margin-top: 14px;
      }

      .quick-links a {
        padding: 10px 14px;
        border-radius: 999px;
        border: 1px solid rgba(30, 40, 48, 0.08);
        background: rgba(255, 255, 255, 0.72);
        text-decoration: none;
        font-size: 13px;
        color: var(--muted);
      }

      .toolbar {
        align-items: center;
        justify-content: space-between;
        gap: 16px;
        margin: 32px 0 18px;
      }

      .chip {
        padding: 10px 14px;
        border-radius: 999px;
        font-size: 13px;
        background: rgba(255, 255, 255, 0.68);
        color: var(--muted);
        border: 1px solid rgba(30, 40, 48, 0.08);
      }

      .chip.active {
        background: var(--accent);
        color: white;
        box-shadow: 0 10px 24px rgba(15, 118, 110, 0.22);
      }

      .cards {
        grid-template-columns: repeat(12, minmax(0, 1fr));
      }

      .tool {
        grid-column: span 6;
        padding: 20px;
        border-radius: var(--radius-xl);
        background: var(--card);
        border: 1px solid rgba(30, 40, 48, 0.09);
        box-shadow: var(--shadow);
        backdrop-filter: blur(10px);
      }

      .tool[data-span="full"] {
        grid-column: span 12;
      }

      .tool.hidden {
        display: none;
      }

      .tool-head {
        display: flex;
        justify-content: space-between;
        gap: 18px;
        margin-bottom: 14px;
      }

      .tool-head h3 {
        margin: 0 0 6px;
        font-size: 21px;
        letter-spacing: -0.03em;
      }

      .tool-head p {
        margin: 0;
        color: var(--muted);
        font-size: 14px;
        line-height: 1.65;
      }

      .tool-tag {
        flex: none;
        align-self: start;
        padding: 8px 10px;
        border-radius: 999px;
        background: var(--accent-soft);
        color: var(--accent-strong);
        font-size: 12px;
        font-weight: 700;
        letter-spacing: 0.04em;
        text-transform: uppercase;
      }

      .tool:nth-child(3n) .tool-tag,
      .tool:nth-child(4n) .tool-tag {
        background: var(--warm-soft);
        color: #9a5208;
      }

      .tool-body {
        display: grid;
        gap: 14px;
      }

      .tool-grid,
      .inline-grid {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 14px;
      }

      .mini-grid,
      .faq-grid {
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        gap: 12px;
      }

      label {
        display: block;
        margin-bottom: 8px;
        font-size: 12px;
        letter-spacing: 0.05em;
        text-transform: uppercase;
        color: var(--muted);
      }

      textarea,
      input,
      select,
      pre,
      .result-box {
        width: 100%;
        border-radius: 18px;
        border: 1px solid rgba(30, 40, 48, 0.1);
        background: var(--card-strong);
        color: var(--text);
        font-family: var(--mono);
        font-size: 13px;
        line-height: 1.6;
      }

      textarea,
      input,
      select {
        padding: 14px 15px;
      }

      textarea {
        min-height: 170px;
        resize: vertical;
      }

      input,
      select {
        min-height: 48px;
      }

      textarea:focus,
      input:focus,
      select:focus {
        border-color: rgba(15, 118, 110, 0.4);
        box-shadow: 0 0 0 4px rgba(15, 118, 110, 0.12);
      }

      .controls button,
      .copy-button {
        padding: 10px 14px;
        border-radius: 12px;
        background: white;
        border: 1px solid rgba(30, 40, 48, 0.1);
        color: var(--text);
        font-size: 13px;
      }

      .controls button.primary {
        background: var(--accent);
        color: white;
        border-color: transparent;
      }

      .copy-button {
        align-self: start;
      }

      .split-head {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 12px;
      }

      pre,
      .result-box {
        margin: 0;
        padding: 14px 15px;
        min-height: 170px;
        overflow: auto;
        white-space: pre-wrap;
        word-break: break-word;
      }

      .metric {
        padding: 14px;
        border-radius: 18px;
        background: rgba(255, 255, 255, 0.7);
        border: 1px solid rgba(30, 40, 48, 0.08);
      }

      .metric span {
        display: block;
        font-size: 12px;
        color: var(--muted);
        text-transform: uppercase;
        letter-spacing: 0.04em;
        margin-bottom: 8px;
      }

      .metric strong {
        display: block;
        font-family: var(--mono);
        font-size: 14px;
        line-height: 1.5;
      }

      .faq-header {
        margin-bottom: 18px;
      }

      .faq-item h3 {
        margin: 0 0 8px;
        font-size: 16px;
      }

      .toast {
        position: fixed;
        right: 18px;
        bottom: 18px;
        padding: 12px 16px;
        border-radius: 14px;
        background: rgba(30, 40, 48, 0.92);
        color: white;
        font-size: 13px;
        opacity: 0;
        transform: translateY(12px);
        transition: opacity 180ms ease, transform 180ms ease;
        pointer-events: none;
      }

      .toast.visible {
        opacity: 1;
        transform: translateY(0);
      }

      @media (max-width: 1120px) {
        .hero-grid {
          grid-template-columns: 1fr;
        }

        .tool,
        .tool[data-span="full"] {
          grid-column: span 12;
        }
      }

      @media (max-width: 900px) {
        .tool-grid,
        .inline-grid,
        .mini-grid,
        .faq-grid {
          grid-template-columns: 1fr;
        }

        .page {
          width: min(100% - 20px, 1240px);
          padding-top: 18px;
        }

        .hero,
        .tool,
        .hero-panel,
        .faq-item {
          padding: 18px;
        }

        .tool-head {
          flex-direction: column;
        }
      }

      @media (prefers-reduced-motion: reduce) {
        *,
        *::before,
        *::after {
          animation: none !important;
          transition: none !important;
          scroll-behavior: auto !important;
        }
      }
    </style>
  </head>
  <body>
    <main class="page">
      <header class="hero">
        <div class="hero-grid">
          <div>
            <div class="badge">Developer Utilities • Quick Actions</div>
            <h1>Dev Toolbox</h1>
            <p>
              一个面向开发辅助场景的轻量工具合集，覆盖 JSON 处理、时间戳转换、编码解码、JWT 查看、哈希生成、UUID 生成和命名格式转换等高频操作。
            </p>
            <nav class="hero-actions" aria-label="页面导航">
              <a class="button button-primary" href="#tools">开始使用</a>
              <a class="button button-secondary" href="#faq">查看常见问题</a>
              <button class="button button-secondary" id="fill-samples">填充示例</button>
            </nav>
          </div>
          <div class="hero-stats" aria-label="快速跳转">
            <div class="hero-panel">
              <h2>快速跳转</h2>
              <div class="quick-links">
                <a href="#json-tool">JSON 格式化</a>
                <a href="#timestamp-tool">时间戳转换</a>
                <a href="#jwt-tool">JWT 解析</a>
                <a href="#java-bean-tool">Java Bean 转 JSON</a>
                <a href="#faq">FAQ</a>
                <a href="/about.html">About</a>
                <a href="/privacy.html">Privacy</a>
              </div>
            </div>
          </div>
        </div>
      </header>

      <section class="section-block" id="tools" aria-labelledby="tools-title">
        <div class="toolbar">
          <div>
            <h2 id="tools-title">开发辅助工具分类</h2>
            <p>按场景筛选常用功能，减少页面信息密度，同时保留足够的可索引文本说明。</p>
          </div>
          <div class="chips" id="filters" aria-label="工具筛选">
            <button class="chip active" data-filter="all">全部</button>
            <button class="chip" data-filter="data">数据</button>
            <button class="chip" data-filter="time">时间</button>
            <button class="chip" data-filter="encoding">编码</button>
            <button class="chip" data-filter="security">安全</button>
            <button class="chip" data-filter="text">文本</button>
          </div>
        </div>

        <div class="cards" id="cards">
          <article class="tool" id="json-tool" data-category="data" data-span="full">
            <div class="tool-head">
              <div>
                <h3>JSON 格式化</h3>
                <p>支持 JSON 格式化、压缩和合法性校验，适合接口调试、配置检查和数据整理。</p>
              </div>
              <span class="tool-tag">Data</span>
            </div>
            <div class="tool-body">
              <div class="tool-grid">
                <div>
                  <label for="json-input">输入</label>
                  <textarea id="json-input" spellcheck="false" placeholder='{"name":"toolbox","enabled":true}'></textarea>
                </div>
                <div>
                  <div class="split-head">
                    <label for="json-output">输出</label>
                    <button class="copy-button" data-copy="json-output">复制结果</button>
                  </div>
                  <textarea id="json-output" spellcheck="false" readonly></textarea>
                </div>
              </div>
              <div class="controls">
                <button class="primary" id="json-format">格式化</button>
                <button id="json-minify">压缩</button>
                <button id="json-validate">校验</button>
                <button id="json-clear">清空</button>
              </div>
            </div>
          </article>

          <article class="tool" id="java-bean-tool" data-category="data" data-span="full">
            <div class="tool-head">
              <div>
                <h3>Java Bean 转 JSON</h3>
                <p>支持 Java 类字段定义，以及常见的 <code>toString()</code> 或调试输出，例如 <code>User(id=1, name="Alice")</code>。</p>
              </div>
              <span class="tool-tag">Data</span>
            </div>
            <div class="tool-body">
              <div class="tool-grid">
                <div>
                  <label for="bean-input">输入</label>
                  <textarea id="bean-input" spellcheck="false" placeholder='public class User {
  private Long id;
  private String name;
  private List&lt;String&gt; tags;
}'></textarea>
                </div>
                <div>
                  <div class="split-head">
                    <label for="bean-output">输出</label>
                    <button class="copy-button" data-copy="bean-output">复制结果</button>
                  </div>
                  <textarea id="bean-output" spellcheck="false" readonly></textarea>
                </div>
              </div>
              <div class="controls">
                <button class="primary" id="bean-convert">转换</button>
                <button id="bean-clear">清空</button>
              </div>
            </div>
          </article>

          <article class="tool" id="timestamp-tool" data-category="time">
            <div class="tool-head">
              <div>
                <h3>时间戳转换</h3>
                <p>支持 Unix 秒、毫秒、本地时间和 ISO 时间互转，适合日志排查和后端联调。</p>
              </div>
              <span class="tool-tag">Time</span>
            </div>
            <div class="tool-body">
              <div class="inline-grid">
                <div>
                  <label for="ts-input">Unix 时间戳</label>
                  <input id="ts-input" placeholder="1714896000 或 1714896000000" />
                </div>
                <div>
                  <label for="dt-input">本地时间</label>
                  <input id="dt-input" type="datetime-local" />
                </div>
              </div>
              <div class="controls">
                <button class="primary" id="ts-parse">时间戳转时间</button>
                <button id="dt-parse">时间转时间戳</button>
                <button id="ts-now">填入当前时间</button>
              </div>
              <div class="mini-grid">
                <div class="metric">
                  <span>秒</span>
                  <strong id="ts-seconds">-</strong>
                </div>
                <div class="metric">
                  <span>毫秒</span>
                  <strong id="ts-milliseconds">-</strong>
                </div>
                <div class="metric">
                  <span>ISO</span>
                  <strong id="ts-iso">-</strong>
                </div>
              </div>
              <div class="metric">
                <span>本地时间</span>
                <strong id="ts-local">-</strong>
              </div>
            </div>
          </article>

          <article class="tool" data-category="encoding">
            <div class="tool-head">
              <div>
                <h3>Base64 编解码</h3>
                <p>按 UTF-8 文本处理，适合中文和多语言字符串，适用于接口调试和数据转换。</p>
              </div>
              <span class="tool-tag">Encoding</span>
            </div>
            <div class="tool-body">
              <label for="base64-input">输入</label>
              <textarea id="base64-input" spellcheck="false" placeholder="hello world"></textarea>
              <div class="controls">
                <button class="primary" id="base64-encode">编码</button>
                <button id="base64-decode">解码</button>
                <button class="copy-button" data-copy="base64-output">复制结果</button>
              </div>
              <div>
                <label for="base64-output">结果</label>
                <textarea id="base64-output" spellcheck="false" readonly></textarea>
              </div>
            </div>
          </article>

          <article class="tool" data-category="encoding">
            <div class="tool-head">
              <div>
                <h3>URL 编解码</h3>
                <p>快速处理 query 参数、回调地址或嵌套链接片段，是常用的在线 URL encode 和 decode 工具。</p>
              </div>
              <span class="tool-tag">Encoding</span>
            </div>
            <div class="tool-body">
              <label for="url-input">输入</label>
              <textarea id="url-input" spellcheck="false" placeholder="https://example.com?q=developer tools"></textarea>
              <div class="controls">
                <button class="primary" id="url-encode">编码</button>
                <button id="url-decode">解码</button>
                <button class="copy-button" data-copy="url-output">复制结果</button>
              </div>
              <div>
                <label for="url-output">结果</label>
                <textarea id="url-output" spellcheck="false" readonly></textarea>
              </div>
            </div>
          </article>

          <article class="tool" id="jwt-tool" data-category="data">
            <div class="tool-head">
              <div>
                <h3>JWT 解析</h3>
                <p>本地解码 Header 和 Payload，适合快速查看 claims，用于调试认证、权限和令牌内容。</p>
              </div>
              <span class="tool-tag">Data</span>
            </div>
            <div class="tool-body">
              <label for="jwt-input">Token</label>
              <textarea id="jwt-input" spellcheck="false" placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."></textarea>
              <div class="controls">
                <button class="primary" id="jwt-decode">解析</button>
                <button class="copy-button" data-copy="jwt-output">复制结果</button>
              </div>
              <div>
                <label for="jwt-output">结果</label>
                <pre id="jwt-output" class="result-box"></pre>
              </div>
            </div>
          </article>

          <article class="tool" data-category="security">
            <div class="tool-head">
              <div>
                <h3>哈希生成</h3>
                <p>基于 Web Crypto API 生成常见摘要，支持 SHA-1、SHA-256、SHA-384 和 SHA-512。</p>
              </div>
              <span class="tool-tag">Security</span>
            </div>
            <div class="tool-body">
              <div class="inline-grid">
                <div>
                  <label for="hash-input">输入</label>
                  <textarea id="hash-input" spellcheck="false" placeholder="hash me"></textarea>
                </div>
                <div>
                  <label for="hash-algo">算法</label>
                  <select id="hash-algo">
                    <option value="SHA-256">SHA-256</option>
                    <option value="SHA-1">SHA-1</option>
                    <option value="SHA-384">SHA-384</option>
                    <option value="SHA-512">SHA-512</option>
                  </select>
                  <div style="height: 12px"></div>
                  <div class="split-head">
                    <label for="hash-output">结果</label>
                    <button class="copy-button" data-copy="hash-output">复制结果</button>
                  </div>
                  <pre id="hash-output" class="result-box"></pre>
                </div>
              </div>
              <div class="controls">
                <button class="primary" id="hash-generate">生成哈希</button>
              </div>
            </div>
          </article>

          <article class="tool" data-category="security">
            <div class="tool-head">
              <div>
                <h3>UUID 生成</h3>
                <p>基于 Web Crypto 生成随机 UUID，支持批量输出，适合测试数据和主键模拟。</p>
              </div>
              <span class="tool-tag">Security</span>
            </div>
            <div class="tool-body">
              <div class="inline-grid">
                <div>
                  <label for="uuid-count">生成数量</label>
                  <input id="uuid-count" type="number" min="1" max="20" value="5" />
                </div>
                <div>
                  <div class="split-head">
                    <label for="uuid-output">结果</label>
                    <button class="copy-button" data-copy="uuid-output">复制结果</button>
                  </div>
                  <pre id="uuid-output" class="result-box"></pre>
                </div>
              </div>
              <div class="controls">
                <button class="primary" id="uuid-generate">生成 UUID</button>
              </div>
            </div>
          </article>

          <article class="tool" data-category="text">
            <div class="tool-head">
              <div>
                <h3>命名格式转换</h3>
                <p>在 snake_case、camelCase、PascalCase、kebab-case 和 UPPER_CASE 之间快速切换。</p>
              </div>
              <span class="tool-tag">Text</span>
            </div>
            <div class="tool-body">
              <label for="case-input">输入文本</label>
              <input id="case-input" placeholder="user_profile_name" />
              <div class="controls">
                <button class="primary" data-case="camel">camelCase</button>
                <button data-case="pascal">PascalCase</button>
                <button data-case="snake">snake_case</button>
                <button data-case="kebab">kebab-case</button>
                <button data-case="upper">UPPER_CASE</button>
              </div>
              <div>
                <div class="split-head">
                  <label for="case-output">结果</label>
                  <button class="copy-button" data-copy="case-output">复制结果</button>
                </div>
                <input id="case-output" readonly />
              </div>
            </div>
          </article>
        </div>
      </section>

      <section class="section-block" id="faq" aria-labelledby="faq-title">
        <div class="faq-header">
          <h2 id="faq-title">常见问题</h2>
        </div>
        <div class="faq-grid">
          <article class="faq-item">
            <h3>这个页面适合什么人使用？</h3>
            <p>适合前端、后端、测试、运维以及需要临时处理开发数据的用户。</p>
          </article>
          <article class="faq-item">
            <h3>数据会上传到服务器吗？</h3>
            <p>当前页面里的工具主要在浏览器端执行，适合快速本地处理常见文本和数据。</p>
          </article>
        </div>
      </section>
    </main>

    <div class="toast" id="toast"></div>

    <script>
      const $ = function (id) {
        return document.getElementById(id);
      };

      const toast = $("toast");
      let toastTimer = null;

      function showToast(message) {
        toast.textContent = message;
        toast.classList.add("visible");
        clearTimeout(toastTimer);
        toastTimer = setTimeout(function () {
          toast.classList.remove("visible");
        }, 1800);
      }

      async function copyFromTarget(id) {
        const node = $(id);
        const value = "value" in node ? node.value : node.textContent;
        if (!value) {
          showToast("没有可复制的内容");
          return;
        }
        await navigator.clipboard.writeText(value);
        showToast("已复制到剪贴板");
      }

      document.querySelectorAll("[data-copy]").forEach(function (button) {
        button.addEventListener("click", function () {
          copyFromTarget(button.getAttribute("data-copy")).catch(function () {
            showToast("复制失败，请检查浏览器权限");
          });
        });
      });

      $("filters").addEventListener("click", function (event) {
        const button = event.target.closest(".chip");
        if (!button) {
          return;
        }
        const filter = button.getAttribute("data-filter");
        document.querySelectorAll(".chip").forEach(function (chip) {
          chip.classList.toggle("active", chip === button);
        });
        document.querySelectorAll(".tool").forEach(function (card) {
          const category = card.getAttribute("data-category");
          const visible = filter === "all" || category === filter;
          card.classList.toggle("hidden", !visible);
        });
      });

      function setValue(id, value) {
        $(id).value = value;
      }

      function setText(id, value) {
        $(id).textContent = value;
      }

      function formatJson(space) {
        const source = $("json-input").value.trim();
        if (!source) {
          setValue("json-output", "");
          showToast("请输入 JSON 内容");
          return;
        }
        try {
          const parsed = JSON.parse(source);
          setValue("json-output", JSON.stringify(parsed, null, space));
          showToast(space ? "JSON 已格式化" : "JSON 已压缩");
        } catch (error) {
          setValue("json-output", String(error.message || error));
          showToast("JSON 解析失败");
        }
      }

      $("json-format").addEventListener("click", function () {
        formatJson(2);
      });

      $("json-minify").addEventListener("click", function () {
        formatJson(0);
      });

      $("json-validate").addEventListener("click", function () {
        const source = $("json-input").value.trim();
        if (!source) {
          showToast("请输入 JSON 内容");
          return;
        }
        try {
          JSON.parse(source);
          setValue("json-output", "JSON 校验通过");
          showToast("JSON 合法");
        } catch (error) {
          setValue("json-output", String(error.message || error));
          showToast("JSON 不合法");
        }
      });

      $("json-clear").addEventListener("click", function () {
        setValue("json-input", "");
        setValue("json-output", "");
      });

      function stripJavaComments(input) {
        return input
          .replace(/\/\*[\s\S]*?\*\//g, "")
          .replace(/\/\/.*$/gm, "");
      }

      function defaultValueForJavaType(rawType) {
        const normalized = rawType.replace(/\s+/g, "");
        const simpleType = normalized
          .split(".")
          .pop()
          .replace(/<.*>/, "");

        if (/\[\]$/.test(normalized)) {
          return [];
        }
        if (/^(String|CharSequence|Character|char|LocalDate|LocalDateTime|LocalTime|OffsetDateTime|ZonedDateTime|Instant|Date|Timestamp|UUID|URI|URL)$/.test(simpleType)) {
          return "";
        }
        if (/^(boolean|Boolean)$/.test(simpleType)) {
          return false;
        }
        if (/^(byte|Byte|short|Short|int|Integer|long|Long|float|Float|double|Double|BigDecimal|BigInteger)$/.test(simpleType)) {
          return 0;
        }
        if (/^(List|ArrayList|LinkedList|Set|HashSet|LinkedHashSet|Collection|Iterable|Deque|Queue|Vector)$/.test(simpleType)) {
          return [];
        }
        if (/^(Map|HashMap|LinkedHashMap|TreeMap|ConcurrentHashMap|Hashtable|Properties)$/.test(simpleType)) {
          return {};
        }
        if (/^Optional$/.test(simpleType)) {
          return null;
        }
        return {};
      }

      function parseJavaBeanDefinition(source) {
        const fieldObject = {};
        const lines = stripJavaComments(source).split(/\r?\n/);

        lines.forEach(function (line) {
          const trimmed = line.trim();
          if (
            !trimmed ||
            trimmed.startsWith("@") ||
            /\b(class|interface|enum|record)\b/.test(trimmed) ||
            /\b(static|native|synchronized|abstract)\b/.test(trimmed) ||
            trimmed.indexOf("(") !== -1
          ) {
            return;
          }

          const match = trimmed.match(/^(?:(?:public|protected|private)\s+)?(?:(?:final|transient|volatile)\s+)*(?<type>[\w$.<>\[\], ?]+?)\s+(?<names>[A-Za-z_]\w*(?:\s*=\s*[^,;]+)?(?:\s*,\s*[A-Za-z_]\w*(?:\s*=\s*[^,;]+)?)*)\s*;$/);
          if (!match || !match.groups) {
            return;
          }

          const type = match.groups.type.trim();
          match.groups.names.split(",").forEach(function (namePart) {
            const fieldName = namePart.split("=")[0].trim();
            if (!fieldName || fieldName === "serialVersionUID") {
              return;
            }
            fieldObject[fieldName] = defaultValueForJavaType(type);
          });
        });

        return Object.keys(fieldObject).length ? fieldObject : null;
      }

      function readBeanWhitespace(state) {
        let hadNewline = false;
        while (state.index < state.input.length) {
          const char = state.input[state.index];
          if (!/\s/.test(char)) {
            break;
          }
          if (char === "\n" || char === "\r") {
            hadNewline = true;
          }
          state.index += 1;
        }
        return hadNewline;
      }

      function beanError(state, message) {
        return new Error(message + " at position " + state.index);
      }

      function isBeanNameStart(char) {
        return /[A-Za-z_$]/.test(char || "");
      }

      function isBeanNameChar(char) {
        return /[A-Za-z0-9_.$]/.test(char || "");
      }

      function scanBeanNamedObject(state) {
        const input = state.input;
        let cursor = state.index;
        if (!isBeanNameStart(input[cursor])) {
          return null;
        }
        cursor += 1;
        while (cursor < input.length && isBeanNameChar(input[cursor])) {
          cursor += 1;
        }
        const name = input.slice(state.index, cursor);
        while (cursor < input.length && /\s/.test(input[cursor])) {
          cursor += 1;
        }
        const open = input[cursor];
        if (open !== "(" && open !== "{") {
          return null;
        }
        return {
          name: name,
          afterName: cursor,
          close: open === "(" ? ")" : "}"
        };
      }

      function looksLikeBeanEntries(state, closeChar) {
        const input = state.input;
        let cursor = state.index;
        let quote = "";
        let depth = 0;

        while (cursor < input.length) {
          const char = input[cursor];
          if (quote) {
            if (char === "\\") {
              cursor += 2;
              continue;
            }
            if (char === quote) {
              quote = "";
            }
            cursor += 1;
            continue;
          }

          if (char === '"' || char === "'") {
            quote = char;
            cursor += 1;
            continue;
          }

          if (char === "[" || char === "{" || char === "(") {
            depth += 1;
            cursor += 1;
            continue;
          }

          if (char === "]" || char === "}" || char === ")") {
            if (depth === 0) {
              break;
            }
            depth -= 1;
            cursor += 1;
            continue;
          }

          if (depth === 0 && (char === "=" || char === ":")) {
            if (char === ":" && input.slice(cursor, cursor + 3) === "://") {
              return false;
            }
            return true;
          }

          if (
            depth === 0 &&
            (char === "," || char === "\n" || char === "\r" || (closeChar && char === closeChar))
          ) {
            return false;
          }

          cursor += 1;
        }

        return false;
      }

      function parseBeanQuotedString(state) {
        const quote = state.input[state.index];
        let value = "";
        state.index += 1;

        while (state.index < state.input.length) {
          const char = state.input[state.index];
          if (char === "\\") {
            const next = state.input[state.index + 1];
            if (next === "n") {
              value += "\n";
            } else if (next === "r") {
              value += "\r";
            } else if (next === "t") {
              value += "\t";
            } else if (next === "b") {
              value += "\b";
            } else if (next === "f") {
              value += "\f";
            } else if (next === "u" && /^[0-9a-fA-F]{4}$/.test(state.input.slice(state.index + 2, state.index + 6))) {
              value += String.fromCharCode(parseInt(state.input.slice(state.index + 2, state.index + 6), 16));
              state.index += 4;
            } else {
              value += next || "";
            }
            state.index += 2;
            continue;
          }
          if (char === quote) {
            state.index += 1;
            return value;
          }
          value += char;
          state.index += 1;
        }

        throw beanError(state, "Unterminated string");
      }

      function coerceBeanToken(token) {
        if (!token) {
          return "";
        }
        if (/^null$/i.test(token)) {
          return null;
        }
        if (/^true$/i.test(token)) {
          return true;
        }
        if (/^false$/i.test(token)) {
          return false;
        }
        if (/^[+-]?\d+[lL]$/.test(token)) {
          return Number(token.slice(0, -1));
        }
        if (/^[+-]?(?:\d+\.?\d*|\.\d+)(?:[eE][+-]?\d+)?[dDfF]?$/.test(token)) {
          return Number(token.replace(/[dDfF]$/, ""));
        }
        return token;
      }

      function parseBeanBareToken(state, terminators) {
        const start = state.index;
        let quote = "";
        let depth = 0;

        while (state.index < state.input.length) {
          const char = state.input[state.index];
          if (quote) {
            if (char === "\\") {
              state.index += 2;
              continue;
            }
            if (char === quote) {
              quote = "";
            }
            state.index += 1;
            continue;
          }

          if (char === '"' || char === "'") {
            quote = char;
            state.index += 1;
            continue;
          }

          if (char === "[" || char === "{" || char === "(") {
            depth += 1;
            state.index += 1;
            continue;
          }

          if (char === "]" || char === "}" || char === ")") {
            if (depth === 0 && terminators.indexOf(char) !== -1) {
              break;
            }
            depth = Math.max(depth - 1, 0);
            state.index += 1;
            continue;
          }

          if (depth === 0 && terminators.indexOf(char) !== -1) {
            break;
          }

          state.index += 1;
        }

        return coerceBeanToken(state.input.slice(start, state.index).trim());
      }

      function parseBeanKey(state, closeChar) {
        readBeanWhitespace(state);
        if (state.input[state.index] === '"' || state.input[state.index] === "'") {
          return parseBeanQuotedString(state);
        }

        const start = state.index;
        while (state.index < state.input.length) {
          const char = state.input[state.index];
          if (
            char === "=" ||
            char === ":" ||
            char === "," ||
            char === "\n" ||
            char === "\r" ||
            (closeChar && char === closeChar)
          ) {
            break;
          }
          state.index += 1;
        }

        const key = state.input.slice(start, state.index).trim();
        if (!key) {
          throw beanError(state, "Invalid key");
        }
        return key;
      }

      function parseBeanEntry(state, closeChar) {
        const key = parseBeanKey(state, closeChar);
        readBeanWhitespace(state);
        const separator = state.input[state.index];
        if (separator !== "=" && separator !== ":") {
          throw beanError(state, "Expected '=' or ':'");
        }
        state.index += 1;
        return {
          key: key,
          value: parseBeanValue(state, closeChar)
        };
      }

      function parseBeanEntries(state, closeChar) {
        const result = {};
        readBeanWhitespace(state);

        if (closeChar && state.input[state.index] === closeChar) {
          state.index += 1;
          return result;
        }

        while (state.index < state.input.length) {
          const entry = parseBeanEntry(state, closeChar);
          result[entry.key] = entry.value;

          const hadNewline = readBeanWhitespace(state);
          const next = state.input[state.index];

          if (next === ",") {
            state.index += 1;
            readBeanWhitespace(state);
            if (closeChar && state.input[state.index] === closeChar) {
              state.index += 1;
              return result;
            }
            continue;
          }

          if (closeChar && next === closeChar) {
            state.index += 1;
            return result;
          }

          if (!closeChar && state.index >= state.input.length) {
            return result;
          }

          if (hadNewline) {
            continue;
          }

          throw beanError(state, "Expected a separator");
        }

        if (closeChar) {
          throw beanError(state, "Missing closing '" + closeChar + "'");
        }
        return result;
      }

      function parseBeanList(state, closeChar) {
        const values = [];
        readBeanWhitespace(state);

        if (state.input[state.index] === closeChar) {
          state.index += 1;
          return values;
        }

        while (state.index < state.input.length) {
          values.push(parseBeanValue(state, closeChar));

          const hadNewline = readBeanWhitespace(state);
          const next = state.input[state.index];

          if (next === ",") {
            state.index += 1;
            readBeanWhitespace(state);
            if (state.input[state.index] === closeChar) {
              state.index += 1;
              return values;
            }
            continue;
          }

          if (next === closeChar) {
            state.index += 1;
            return values;
          }

          if (hadNewline) {
            continue;
          }

          throw beanError(state, "Expected a separator");
        }

        throw beanError(state, "Missing closing '" + closeChar + "'");
      }

      function parseBeanValue(state, closeChar) {
        readBeanWhitespace(state);
        const char = state.input[state.index];

        if (!char) {
          throw beanError(state, "Unexpected end of input");
        }
        if (char === '"' || char === "'") {
          return parseBeanQuotedString(state);
        }
        if (char === "[") {
          state.index += 1;
          return parseBeanList(state, "]");
        }
        if (char === "{") {
          state.index += 1;
          if (looksLikeBeanEntries(state, "}")) {
            return parseBeanEntries(state, "}");
          }
          return parseBeanList(state, "}");
        }

        const namedObject = scanBeanNamedObject(state);
        if (namedObject) {
          state.index = namedObject.afterName + 1;
          return parseBeanEntries(state, namedObject.close);
        }

        const terminators = closeChar ? [",", closeChar, "\n", "\r"] : [",", "\n", "\r"];
        return parseBeanBareToken(state, terminators);
      }

      function parseBeanText(source) {
        const state = {
          input: source.trim(),
          index: 0
        };

        if (!state.input) {
          throw new Error("请输入 Java Bean 文本");
        }

        let result;
        readBeanWhitespace(state);

        if (state.input[state.index] === "[") {
          state.index += 1;
          result = parseBeanList(state, "]");
        } else if (state.input[state.index] === "{") {
          state.index += 1;
          result = looksLikeBeanEntries(state, "}") ? parseBeanEntries(state, "}") : parseBeanList(state, "}");
        } else if (scanBeanNamedObject(state)) {
          const namedObject = scanBeanNamedObject(state);
          state.index = namedObject.afterName + 1;
          result = parseBeanEntries(state, namedObject.close);
        } else if (looksLikeBeanEntries(state, null)) {
          result = parseBeanEntries(state, null);
        } else {
          result = parseBeanBareToken(state, []);
        }

        readBeanWhitespace(state);
        if (state.index !== state.input.length) {
          throw beanError(state, "Unexpected token");
        }
        return result;
      }

      function convertJavaBeanToJson() {
        const source = $("bean-input").value.trim();
        if (!source) {
          setValue("bean-output", "");
          showToast("请输入 Java Bean 内容");
          return;
        }

        try {
          const fromDefinition = parseJavaBeanDefinition(source);
          const result = fromDefinition || parseBeanText(source);
          setValue("bean-output", JSON.stringify(result, null, 2));
          showToast("转换完成");
        } catch (error) {
          setValue("bean-output", String(error.message || error));
          showToast("转换失败");
        }
      }

      $("bean-convert").addEventListener("click", convertJavaBeanToJson);

      $("bean-clear").addEventListener("click", function () {
        setValue("bean-input", "");
        setValue("bean-output", "");
      });

      function dateToLocalInput(date) {
        const offset = date.getTimezoneOffset() * 60000;
        const local = new Date(date.getTime() - offset);
        return local.toISOString().slice(0, 16);
      }

      function updateTimestampOutput(date) {
        const time = date.getTime();
        setText("ts-seconds", String(Math.floor(time / 1000)));
        setText("ts-milliseconds", String(time));
        setText("ts-iso", date.toISOString());
        setText("ts-local", date.toLocaleString("zh-CN", { hour12: false }));
        setValue("dt-input", dateToLocalInput(date));
      }

      $("ts-parse").addEventListener("click", function () {
        const raw = $("ts-input").value.trim();
        if (!raw) {
          showToast("请输入时间戳");
          return;
        }
        if (!/^-?\d+$/.test(raw)) {
          showToast("时间戳应为纯数字");
          return;
        }
        const numeric = Number(raw);
        const ms = raw.length <= 10 ? numeric * 1000 : numeric;
        const date = new Date(ms);
        if (Number.isNaN(date.getTime())) {
          showToast("时间戳无效");
          return;
        }
        updateTimestampOutput(date);
        showToast("转换完成");
      });

      $("dt-parse").addEventListener("click", function () {
        const raw = $("dt-input").value;
        if (!raw) {
          showToast("请选择时间");
          return;
        }
        const date = new Date(raw);
        if (Number.isNaN(date.getTime())) {
          showToast("时间无效");
          return;
        }
        $("ts-input").value = String(date.getTime());
        updateTimestampOutput(date);
        showToast("转换完成");
      });

      $("ts-now").addEventListener("click", function () {
        const now = new Date();
        $("ts-input").value = String(now.getTime());
        updateTimestampOutput(now);
        showToast("已填入当前时间");
      });

      function utf8ToBase64(input) {
        const bytes = new TextEncoder().encode(input);
        let binary = "";
        bytes.forEach(function (byte) {
          binary += String.fromCharCode(byte);
        });
        return btoa(binary);
      }

      function base64ToUtf8(input) {
        const binary = atob(input);
        const bytes = Uint8Array.from(binary, function (char) {
          return char.charCodeAt(0);
        });
        return new TextDecoder().decode(bytes);
      }

      $("base64-encode").addEventListener("click", function () {
        try {
          setValue("base64-output", utf8ToBase64($("base64-input").value));
          showToast("编码完成");
        } catch (error) {
          setValue("base64-output", String(error.message || error));
          showToast("编码失败");
        }
      });

      $("base64-decode").addEventListener("click", function () {
        try {
          setValue("base64-output", base64ToUtf8($("base64-input").value.trim()));
          showToast("解码完成");
        } catch (error) {
          setValue("base64-output", String(error.message || error));
          showToast("解码失败");
        }
      });

      $("url-encode").addEventListener("click", function () {
        setValue("url-output", encodeURIComponent($("url-input").value));
        showToast("URL 已编码");
      });

      $("url-decode").addEventListener("click", function () {
        try {
          setValue("url-output", decodeURIComponent($("url-input").value));
          showToast("URL 已解码");
        } catch (error) {
          setValue("url-output", String(error.message || error));
          showToast("URL 解码失败");
        }
      });

      function base64UrlToUtf8(input) {
        const padded = input.replace(/-/g, "+").replace(/_/g, "/").padEnd(Math.ceil(input.length / 4) * 4, "=");
        return base64ToUtf8(padded);
      }

      $("jwt-decode").addEventListener("click", function () {
        const token = $("jwt-input").value.trim();
        if (!token) {
          showToast("请输入 JWT");
          return;
        }
        const parts = token.split(".");
        if (parts.length < 2) {
          setText("jwt-output", "Token 格式无效");
          showToast("JWT 格式无效");
          return;
        }
        try {
          const header = JSON.parse(base64UrlToUtf8(parts[0]));
          const payload = JSON.parse(base64UrlToUtf8(parts[1]));
          const summary = {
            header: header,
            payload: payload,
            signature: parts[2] || ""
          };
          setText("jwt-output", JSON.stringify(summary, null, 2));
          showToast("JWT 已解析");
        } catch (error) {
          setText("jwt-output", String(error.message || error));
          showToast("JWT 解析失败");
        }
      });

      async function digestText(text, algorithm) {
        const bytes = new TextEncoder().encode(text);
        const hash = await crypto.subtle.digest(algorithm, bytes);
        const view = Array.from(new Uint8Array(hash));
        return view.map(function (byte) {
          return byte.toString(16).padStart(2, "0");
        }).join("");
      }

      $("hash-generate").addEventListener("click", function () {
        const input = $("hash-input").value;
        const algorithm = $("hash-algo").value;
        digestText(input, algorithm)
          .then(function (hash) {
            setText("hash-output", hash);
            showToast("哈希已生成");
          })
          .catch(function (error) {
            setText("hash-output", String(error.message || error));
            showToast("哈希生成失败");
          });
      });

      $("uuid-generate").addEventListener("click", function () {
        const count = Math.min(Math.max(Number($("uuid-count").value) || 1, 1), 20);
        const values = [];
        for (let index = 0; index < count; index += 1) {
          values.push(crypto.randomUUID());
        }
        setText("uuid-output", values.join("\n"));
        showToast("UUID 已生成");
      });

      function splitWords(input) {
        return input
          .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
          .replace(/[_\-\s]+/g, " ")
          .trim()
          .split(/\s+/)
          .filter(Boolean)
          .map(function (part) {
            return part.toLowerCase();
          });
      }

      function toPascal(words) {
        return words.map(function (word) {
          return word.charAt(0).toUpperCase() + word.slice(1);
        }).join("");
      }

      document.querySelectorAll("[data-case]").forEach(function (button) {
        button.addEventListener("click", function () {
          const words = splitWords($("case-input").value);
          if (!words.length) {
            setValue("case-output", "");
            showToast("请输入文本");
            return;
          }
          const mode = button.getAttribute("data-case");
          let result = "";
          if (mode === "camel") {
            result = words[0] + toPascal(words.slice(1));
          } else if (mode === "pascal") {
            result = toPascal(words);
          } else if (mode === "snake") {
            result = words.join("_");
          } else if (mode === "kebab") {
            result = words.join("-");
          } else if (mode === "upper") {
            result = words.join("_").toUpperCase();
          }
          setValue("case-output", result);
          showToast("格式转换完成");
        });
      });

      function fillSamples() {
        setValue("json-input", JSON.stringify({
          name: "dev-toolbox",
          tags: ["json", "timestamp", "jwt"],
          enabled: true,
          count: 8
        }));
        setValue("base64-input", "开发辅助工具页");
        setValue("bean-input", [
          "public class UserProfile {",
          "  private Long id;",
          "  private String name;",
          "  private Boolean active;",
          "  private List<String> tags;",
          "  private Address address;",
          "}"
        ].join("\n"));
        setValue("url-input", "https://example.com/callback?from=dev toolbox&lang=zh-CN");
        setValue("hash-input", "dev-toolbox");
        setValue("case-input", "user_profile_name");
        setValue("jwt-input", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiRGV2IFRvb2xib3giLCJyb2xlIjoiZGV2ZWxvcGVyIiwiaWF0IjoxNzE0ODk2MDAwfQ.signature");
        $("ts-now").click();
      }

      $("fill-samples").addEventListener("click", fillSamples);

      fillSamples();
      $("json-format").click();
      $("bean-convert").click();
      $("uuid-generate").click();
      $("hash-generate").click();
    </script>
  </body>
</html>`;
}

function renderAboutPage(origin) {
  return renderInfoPage(origin, {
    path: "/about.html",
    title: "About - Dev Toolbox",
    description: "了解 Dev Toolbox 的定位、工具范围、适用场景和站点目标。",
    keywords: "about dev toolbox,在线开发工具,工具站介绍",
    eyebrow: "About Dev Toolbox",
    heading: "关于这个工具站",
    lead:
      "Dev Toolbox 是一个面向开发者和技术工作者的在线工具合集，目标是用尽可能简洁的方式解决开发中的高频小任务。",
    sections: [
      {
        title: "站点定位",
        paragraphs: [
          "这个站点主要提供轻量、即开即用的开发辅助工具，例如 JSON 格式化、时间戳转换、Base64 编解码、JWT 解析、哈希生成和命名格式转换。",
          "页面设计重点是访问速度、操作效率和低学习成本，适合在开发、联调、排障和日常数据处理时快速使用。"
        ],
        items: []
      },
      {
        title: "适用人群",
        paragraphs: [
          "适合前端工程师、后端工程师、测试工程师、运维工程师，以及需要频繁处理结构化文本和编码转换的用户。"
        ],
        items: [
          "接口调试和返回值检查",
          "日志排查和时间换算",
          "Token 查看和字段验证",
          "常见编码、命名格式和哈希处理"
        ]
      },
      {
        title: "内容原则",
        paragraphs: [
          "站点会优先提供通用、稳定、能够在浏览器端完成的工具能力。",
          "如果后续接入广告、统计或第三方服务，相关信息会同步更新到隐私政策页面。"
        ],
        items: []
      }
    ]
  });
}

function renderPrivacyPage(origin) {
  return renderInfoPage(origin, {
    path: "/privacy.html",
    title: "Privacy Policy - Dev Toolbox",
    description: "Dev Toolbox 的隐私政策，包含基础访问数据、Cookies、广告服务和第三方内容说明。",
    keywords: "privacy policy,隐私政策,adsense 隐私政策,网站 cookies",
    eyebrow: "Privacy Policy",
    heading: "隐私政策",
    lead:
      "本页面用于说明站点在用户访问、功能使用、统计分析和广告展示过程中可能涉及的信息处理方式。接入 AdSense 前后，都建议保留并持续更新本页面。",
    sections: [
      {
        title: "我们收集的信息",
        paragraphs: [
          "当前站点的工具功能主要在浏览器端运行。通常情况下，用户输入的文本不会因为工具本身而被提交到远程数据库。",
          "为了保障站点稳定性，服务器或托管平台可能会记录基础访问日志，例如访问时间、请求路径、浏览器类型、设备信息和匿名 IP 相关数据。"
        ],
        items: []
      },
      {
        title: "Cookies 与本地存储",
        paragraphs: [
          "站点本身未来可能会使用 Cookies 或本地存储来改善体验，例如记录显示偏好、最近使用状态或统计匿名访问数据。",
          "如果接入第三方广告服务，这些服务也可能使用 Cookies 来展示更相关的广告内容、限制重复展示或衡量广告效果。"
        ],
        items: []
      },
      {
        title: "Google AdSense 与第三方广告",
        paragraphs: [
          "本网站后续可能接入 Google AdSense 或其他第三方广告服务。第三方供应商可能会使用 Cookies 来根据用户此前访问本站或其他网站的情况投放广告。",
          "Google 及其合作伙伴可能会使用广告 Cookie 来根据用户访问本站和互联网上其他网站的情况展示个性化广告。"
        ],
        items: [
          "用户可以访问 Google Ads Settings 管理个性化广告设置。",
          "如果站点启用了非个性化广告，广告展示逻辑也可能依赖基础上下文和设备信息。",
          "如果你面向特定地区用户，还应根据当地法律要求补充 Cookie 同意和数据处理说明。"
        ]
      },
      {
        title: "第三方链接与第三方服务",
        paragraphs: [
          "本站可能包含指向第三方网站、文档、代码托管平台或广告服务的链接。这些站点拥有各自独立的隐私政策，本站不对第三方内容和处理方式负责。"
        ],
        items: []
      },
      {
        title: "政策更新",
        paragraphs: [
          "如果站点功能、统计方案或广告策略发生变化，本隐私政策会随之更新。建议用户定期查看本页面以了解最新说明。"
        ],
        items: []
      }
    ]
  });
}

function renderTermsPage(origin) {
  return renderInfoPage(origin, {
    path: "/terms.html",
    title: "Terms of Use - Dev Toolbox",
    description: "Dev Toolbox 的使用条款，说明工具使用范围、责任限制和内容约束。",
    keywords: "terms of use,使用条款,在线工具使用说明",
    eyebrow: "Terms Of Use",
    heading: "使用条款",
    lead:
      "访问和使用本网站，即表示你同意遵守以下使用条款。如果你不同意这些条款，建议停止访问或使用本站服务。",
    sections: [
      {
        title: "服务说明",
        paragraphs: [
          "本站提供在线开发辅助工具，旨在帮助用户完成常见的文本、数据、编码和格式转换任务。",
          "站点会尽力保持功能稳定，但不保证所有服务在任何时间都持续可用、完全无误或满足特定业务需求。"
        ],
        items: []
      },
      {
        title: "用户责任",
        paragraphs: [
          "用户应自行判断输入内容是否包含敏感信息，并对自己的使用行为负责。",
          "不应利用本站从事违法、滥用、攻击、欺诈或侵犯第三方权益的行为。"
        ],
        items: [
          "不得使用本站传播恶意代码或非法内容",
          "不得尝试破坏站点稳定性或规避正常访问限制",
          "不得将本站结果视为法律、财务或安全方面的专业意见"
        ]
      },
      {
        title: "免责声明",
        paragraphs: [
          "本站按“现状”提供服务。对于因使用或无法使用本站而产生的直接或间接损失，站点运营者不承担保证责任。",
          "用户应在自己的环境中再次核对关键结果，尤其是在生产、支付、安全、身份认证和合规场景下。"
        ],
        items: []
      }
    ]
  });
}

function renderContactPage(origin) {
  return renderInfoPage(origin, {
    path: "/contact.html",
    title: "Contact - Dev Toolbox",
    description: "Dev Toolbox 联系页面，可用于站点反馈、问题报告、合作咨询和版权沟通。",
    keywords: "contact dev toolbox,联系页面,广告合作,反馈建议",
    eyebrow: "Contact",
    heading: "联系与反馈",
    lead:
      "如果你希望反馈问题、提出新工具建议、处理版权内容或联系站点运营者，可以通过本页面提供的方式进行沟通。",
    sections: [
      {
        title: "联系邮箱",
        paragraphs: [
          `当前联系邮箱占位为：<span class="mono">${CONTACT_EMAIL}</span>`,
          "上线前建议将该邮箱替换为你自己的真实邮箱，以满足用户联系和广告平台审核需求。"
        ],
        items: []
      },
      {
        title: "适合通过本页处理的事项",
        paragraphs: [
          "为了提高沟通效率，建议在邮件中尽量说明页面路径、问题描述、复现步骤和设备环境。"
        ],
        items: [
          "站点问题反馈和功能异常",
          "工具建议和内容改进意见",
          "广告合作和商务咨询",
          "版权、隐私或合规相关沟通"
        ]
      }
    ]
  });
}

function renderSitemap(origin) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${origin}/</loc>
    <lastmod>${DEPLOYED_AT}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${origin}/about.html</loc>
    <lastmod>${DEPLOYED_AT}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  <url>
    <loc>${origin}/privacy.html</loc>
    <lastmod>${DEPLOYED_AT}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>${origin}/terms.html</loc>
    <lastmod>${DEPLOYED_AT}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>
  <url>
    <loc>${origin}/contact.html</loc>
    <lastmod>${DEPLOYED_AT}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
</urlset>`;
}

function renderRobots(origin) {
  return `User-agent: *
Allow: /

Sitemap: ${origin}/sitemap.xml`;
}

function renderOgSvg() {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630" role="img" aria-label="${SITE_TITLE}">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#f8f4ec" />
      <stop offset="100%" stop-color="#f0e4d3" />
    </linearGradient>
    <linearGradient id="accent" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0f766e" />
      <stop offset="100%" stop-color="#f08a24" />
    </linearGradient>
  </defs>
  <rect width="1200" height="630" rx="36" fill="url(#bg)" />
  <circle cx="1030" cy="110" r="140" fill="#0f766e" opacity="0.12" />
  <circle cx="170" cy="540" r="180" fill="#f08a24" opacity="0.12" />
  <rect x="70" y="72" width="260" height="44" rx="22" fill="white" opacity="0.86" />
  <circle cx="104" cy="94" r="8" fill="url(#accent)" />
  <text x="126" y="101" fill="#5c6a73" font-size="20" font-family="Space Grotesk, Arial, sans-serif">Developer Utilities</text>
  <text x="70" y="224" fill="#1e2830" font-size="82" font-weight="700" font-family="Space Grotesk, Arial, sans-serif">Dev Toolbox</text>
  <text x="70" y="288" fill="#5c6a73" font-size="30" font-family="Space Grotesk, Arial, sans-serif">JSON formatter, timestamp converter, JWT decoder,</text>
  <text x="70" y="328" fill="#5c6a73" font-size="30" font-family="Space Grotesk, Arial, sans-serif">Base64 tools, URL encode/decode, hash generator.</text>
  <rect x="70" y="404" width="180" height="66" rx="18" fill="#ffffff" opacity="0.9" />
  <rect x="270" y="404" width="180" height="66" rx="18" fill="#ffffff" opacity="0.9" />
  <rect x="470" y="404" width="180" height="66" rx="18" fill="#ffffff" opacity="0.9" />
  <text x="108" y="447" fill="#1e2830" font-size="28" font-family="IBM Plex Mono, monospace">9 tools</text>
  <text x="302" y="447" fill="#1e2830" font-size="28" font-family="IBM Plex Mono, monospace">5 groups</text>
  <text x="510" y="447" fill="#1e2830" font-size="28" font-family="IBM Plex Mono, monospace">0 login</text>
</svg>`;
}

function responseHeaders(contentType, extra = {}) {
  return {
    "content-type": contentType,
    "cache-control": "public, max-age=300",
    "x-content-type-options": "nosniff",
    "referrer-policy": "strict-origin-when-cross-origin",
    ...extra
  };
}

export default {
  async fetch(request) {
    const url = new URL(request.url);
    const origin = url.origin;

    if (url.pathname === "/health") {
      return new Response("ok", {
        headers: responseHeaders("text/plain; charset=UTF-8")
      });
    }

    if (url.pathname === "/robots.txt") {
      return new Response(renderRobots(origin), {
        headers: responseHeaders("text/plain; charset=UTF-8")
      });
    }

    if (url.pathname === "/ads.txt") {
      return new Response(ADS_TXT, {
        headers: responseHeaders("text/plain; charset=UTF-8")
      });
    }

    if (url.pathname === "/sitemap.xml") {
      return new Response(renderSitemap(origin), {
        headers: responseHeaders("application/xml; charset=UTF-8")
      });
    }

    if (url.pathname === "/og.svg") {
      return new Response(renderOgSvg(), {
        headers: responseHeaders("image/svg+xml; charset=UTF-8")
      });
    }

    if (url.pathname === "/about.html") {
      return new Response(renderAboutPage(origin), {
        headers: responseHeaders("text/html; charset=UTF-8")
      });
    }

    if (url.pathname === "/privacy.html") {
      return new Response(renderPrivacyPage(origin), {
        headers: responseHeaders("text/html; charset=UTF-8")
      });
    }

    if (url.pathname === "/terms.html") {
      return new Response(renderTermsPage(origin), {
        headers: responseHeaders("text/html; charset=UTF-8")
      });
    }

    if (url.pathname === "/contact.html") {
      return new Response(renderContactPage(origin), {
        headers: responseHeaders("text/html; charset=UTF-8")
      });
    }

    return new Response(renderHtml(origin), {
      headers: responseHeaders("text/html; charset=UTF-8")
    });
  }
};
