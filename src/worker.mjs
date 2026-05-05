const html = String.raw`<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Dev Toolbox</title>
    <meta
      name="description"
      content="一个面向开发辅助场景的轻量工具合集，包含 JSON 格式化、时间戳转换、编码转换、哈希生成等常用能力。"
    />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500&family=Space+Grotesk:wght@400;500;700&display=swap"
      rel="stylesheet"
    />
    <style>
      :root {
        --bg: #f5f0e8;
        --bg-soft: rgba(255, 255, 255, 0.6);
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
        --radius-md: 14px;
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

      .hero-actions {
        margin-top: 24px;
        display: flex;
        flex-wrap: wrap;
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

      .stat-card {
        padding: 18px 18px 16px;
        border-radius: 22px;
        background: rgba(255, 255, 255, 0.7);
        border: 1px solid rgba(30, 40, 48, 0.08);
      }

      .stat-card strong {
        display: block;
        font-size: 30px;
        line-height: 1;
        margin-bottom: 10px;
      }

      .stat-card span {
        display: block;
        color: var(--muted);
        font-size: 14px;
        line-height: 1.6;
      }

      .toolbar {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: space-between;
        gap: 16px;
        margin: 28px 0 18px;
      }

      .toolbar h2 {
        margin: 0;
        font-size: 20px;
        letter-spacing: -0.03em;
      }

      .toolbar p {
        margin: 5px 0 0;
        color: var(--muted);
      }

      .chips {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
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
        display: grid;
        grid-template-columns: repeat(12, minmax(0, 1fr));
        gap: 18px;
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

      .tool-grid {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 14px;
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

      .controls {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
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

      .inline-grid {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 12px;
      }

      .mini-grid {
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        gap: 12px;
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
        .mini-grid {
          grid-template-columns: 1fr;
        }

        .page {
          width: min(100% - 20px, 1240px);
          padding-top: 18px;
        }

        .hero,
        .tool {
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
      <section class="hero">
        <div class="hero-grid">
          <div>
            <div class="badge">Developer Utilities • Quick Actions</div>
            <h1>Dev Toolbox</h1>
            <p>
              一个面向开发辅助场景的轻量工具合集。打开即用，覆盖 JSON 处理、时间戳转换、编码解码、JWT 查看、哈希生成、命名格式转换等高频操作。
            </p>
            <div class="hero-actions">
              <a class="button button-primary" href="#tools">开始使用</a>
              <button class="button button-secondary" id="fill-samples">填充示例</button>
            </div>
          </div>
          <div class="hero-stats">
            <div class="stat-card">
              <strong>8</strong>
              <span>内置工具，全部在浏览器端完成计算，不依赖服务端状态。</span>
            </div>
            <div class="stat-card">
              <strong>5</strong>
              <span>按使用场景分类展示，适合快速切换和重复使用。</span>
            </div>
            <div class="stat-card">
              <strong>0</strong>
              <span>额外服务端依赖，静态页面即可直接访问和使用。</span>
            </div>
          </div>
        </div>
      </section>

      <section id="tools">
        <div class="toolbar">
          <div>
            <h2>工具分类</h2>
            <p>按场景筛选常用功能，减少页面信息密度。</p>
          </div>
          <div class="chips" id="filters">
            <button class="chip active" data-filter="all">全部</button>
            <button class="chip" data-filter="data">数据</button>
            <button class="chip" data-filter="time">时间</button>
            <button class="chip" data-filter="encoding">编码</button>
            <button class="chip" data-filter="security">安全</button>
            <button class="chip" data-filter="text">文本</button>
          </div>
        </div>

        <div class="cards" id="cards">
          <article class="tool" data-category="data" data-span="full">
            <div class="tool-head">
              <div>
                <h3>JSON 格式化</h3>
                <p>校验 JSON 合法性，并在格式化、压缩之间快速切换。</p>
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

          <article class="tool" data-category="time">
            <div class="tool-head">
              <div>
                <h3>时间戳转换</h3>
                <p>支持 Unix 秒、毫秒、本地时间和 ISO 时间互转。</p>
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
                <p>按 UTF-8 文本处理，适合中文和多语言字符串。</p>
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
                <p>快速处理 query 参数、回调地址或嵌套链接片段。</p>
              </div>
              <span class="tool-tag">Encoding</span>
            </div>
            <div class="tool-body">
              <label for="url-input">输入</label>
              <textarea id="url-input" spellcheck="false" placeholder="https://example.com?q=cloudflare workers"></textarea>
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

          <article class="tool" data-category="data">
            <div class="tool-head">
              <div>
                <h3>JWT 解析</h3>
                <p>本地解码 Header 和 Payload，适合快速查看 claims。</p>
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
                <p>使用浏览器内置 Web Crypto API 生成常见摘要。</p>
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
                <p>基于 Web Crypto 生成随机 UUID，支持批量输出。</p>
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
                <p>在 snake_case、camelCase、PascalCase、kebab-case 之间快速切换。</p>
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
        setValue("url-input", "https://example.com/callback?from=dev toolbox&lang=zh-CN");
        setValue("hash-input", "workers-toolbox");
        setValue("case-input", "user_profile_name");
        setValue("jwt-input", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiRGV2IFRvb2xib3giLCJyb2xlIjoiZGV2ZWxvcGVyIiwiaWF0IjoxNzE0ODk2MDAwfQ.signature");
        $("ts-now").click();
      }

      $("fill-samples").addEventListener("click", fillSamples);

      fillSamples();
      $("json-format").click();
      $("uuid-generate").click();
      $("hash-generate").click();
    </script>
  </body>
</html>
`;

export default {
  async fetch(request) {
    const url = new URL(request.url);
    if (url.pathname === "/health") {
      return new Response("ok", {
        headers: {
          "content-type": "text/plain; charset=UTF-8"
        }
      });
    }

    return new Response(html, {
      headers: {
        "content-type": "text/html; charset=UTF-8",
        "cache-control": "public, max-age=300",
        "x-content-type-options": "nosniff",
        "referrer-policy": "strict-origin-when-cross-origin"
      }
    });
  }
};
