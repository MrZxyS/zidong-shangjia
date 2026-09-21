# 自动上架

用于 Mercado Libre 商品授权、批量整理和自动发布的 Node.js 工具。

## 下载

- 直接下载：[ZIP 压缩包](https://github.com/MrZxyS/zidong-shangjia/archive/refs/heads/main.zip)
- 使用 Git 克隆：

```bash
git clone https://github.com/MrZxyS/zidong-shangjia.git
```

## 安装

需要 Node.js 18 或更高版本。

```bash
npm install
```

复制 `.env.example` 为 `.env`，并填写自己的 Mercado Libre 应用信息：

```env
MELI_CLIENT_ID=your_value_here
MELI_CLIENT_SECRET=your_value_here
MELI_REDIRECT_URI=your_value_here
```

## 常用命令

```bash
npm run auth
npm run publish
npm test
```

仓库不包含本机访问令牌、登录数据、业务 Excel、运行输出及依赖目录。使用者需要配置自己的 Mercado Libre 开发者凭据。
