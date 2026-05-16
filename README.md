# Dev Toolbox for Cloudflare Workers

[中文](#中文说明) | [English](#english)

一个可以部署到 Cloudflare Workers 的开发辅助工具合集页面，打开即用，适合作为轻量工具站或个人开发导航页。

This is a developer-oriented toolbox page built for Cloudflare Workers. It is designed to be lightweight, visually clean, and ready to deploy as a small utility site.

## 中文说明

### 项目简介

`Dev Toolbox` 是一个单页工具合集，主要面向开发辅助场景。当前版本使用 Cloudflare Worker 直接返回 HTML，所有工具逻辑都运行在浏览器端，不依赖数据库或后端接口。

适合以下场景：

- 作为个人常用开发工具站
- 作为团队内部轻量工具页
- 作为 Cloudflare Workers 的页面类项目模板
- 在此基础上继续扩展 KV、D1、R2 或外部 API

### 功能列表

当前内置 8 个开发辅助工具：

- JSON 格式化、压缩、校验
- Unix 时间戳与本地时间互转
- Base64 编码 / 解码
- URL 编码 / 解码
- JWT 本地解析
- 哈希生成（SHA-1 / SHA-256 / SHA-384 / SHA-512）
- UUID 批量生成
- 命名格式转换（camelCase、PascalCase、snake_case、kebab-case、UPPER_CASE）

### 技术实现

- Cloudflare Workers
- 原生 HTML / CSS / JavaScript
- Web Crypto API
- 无前端框架依赖
- 无构建产物依赖

### 项目特点

- 部署简单，适合直接发布到 Cloudflare Workers
- 页面简洁，带分类筛选和响应式布局
- 所有工具都在本地浏览器执行，使用成本低
- 后续扩展成本小，适合继续演进

### 本地开发

先确保你的环境中已安装 Node.js。

```bash
npm install
npm run dev
```

默认会通过 Wrangler 启动本地开发服务。

### 部署到 Cloudflare Workers

首次部署前先登录 Cloudflare：

```bash
npx wrangler login
```

然后执行部署：

```bash
npm install
npm run deploy
```

### 健康检查

项目内置了一个简单的健康检查接口：

```text
/health
```

返回值为：

```text
ok
```

### 项目结构

```text
.
├─ src/
│  └─ worker.mjs
├─ .gitignore
├─ package.json
├─ README.md
└─ wrangler.toml
```

### 主要文件说明

- `src/worker.mjs`: Worker 入口，返回完整页面并处理 `/health`
- `wrangler.toml`: Cloudflare Workers 部署配置
- `package.json`: 项目脚本和依赖
- `.gitignore`: Git 忽略规则

### 可扩展方向

如果你后续想把它做成更完整的工具站，可以继续增加：

- Markdown 预览
- 正则测试
- Cron 表达式解析
- JWT 签名校验
- SQL / XML 格式化
- 颜色转换
- 文本 Diff
- 历史记录或收藏功能

## English

### Overview

`Dev Toolbox` is a single-page utility collection for common developer workflows. The current version uses a Cloudflare Worker to serve the page directly, while all tool logic runs in the browser with no database or backend API required.

Good use cases:

- A personal developer utility site
- A lightweight internal team tools page
- A starter template for page-based Cloudflare Workers projects
- A foundation for future KV, D1, R2, or external API integrations

### Features

The project currently includes 9 developer utilities:

- JSON format / minify / validate
- Java Bean 转 JSON
- Unix timestamp and local datetime conversion
- Base64 encode / decode
- URL encode / decode
- JWT local decoder
- Hash generator with SHA-1 / SHA-256 / SHA-384 / SHA-512
- Batch UUID generator
- Case converter for camelCase, PascalCase, snake_case, kebab-case, and UPPER_CASE

### Tech Stack

- Cloudflare Workers
- Plain HTML / CSS / JavaScript
- Web Crypto API
- No frontend framework
- No build output dependency

### Highlights

- Simple deployment to Cloudflare Workers
- Clean UI with category filters and responsive layout
- Browser-side processing for all utilities
- Easy to extend into a larger toolbox site

### Local Development

Make sure Node.js is installed first.

```bash
npm install
npm run dev
```

This starts a local development server through Wrangler.

### Deploy to Cloudflare Workers

Log in to Cloudflare before your first deployment:

```bash
npx wrangler login
```

Then deploy with:

```bash
npm install
npm run deploy
```

### Health Check

The project exposes a minimal health endpoint:

```text
/health
```

It returns:

```text
ok
```

### Project Structure

```text
.
├─ src/
│  └─ worker.mjs
├─ .gitignore
├─ package.json
├─ README.md
└─ wrangler.toml
```

### Key Files

- `src/worker.mjs`: Worker entry that serves the HTML page and handles `/health`
- `wrangler.toml`: Cloudflare Workers configuration
- `package.json`: scripts and dependencies
- `.gitignore`: Git ignore rules

### Possible Extensions

You can evolve this into a more complete toolbox by adding:

- Markdown preview
- Regex tester
- Cron expression parser
- JWT signature verification
- SQL / XML formatter
- Color converters
- Text diff tools
- History or favorites

## License

You can choose any license that fits your repository. If you want, I can also help you add an MIT `LICENSE` file.
