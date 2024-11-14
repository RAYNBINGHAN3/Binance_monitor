# Binance 新币上线监控机器人

一个用于监控 Binance 交易所新币上线公告并通过 Telegram 机器人发送通知的自动化工具。

## 功能特点

- 自动监控 Binance 新币上线公告
- 实时通过 Telegram 推送通知
- 可配置的监控时间间隔
- 日志记录功能

## 环境要求

- Node.js (v14.0.0 或更高版本)
- npm 或 yarn

## 快速开始

- 克隆项目

```bash
git clone https://github.com/RAYNBINGHAN3/Binance_monitor.git
```

- 安装依赖

```bash
npm install
```

## 配置环境变量

在项目根目录下创建一个 `.env` 文件，并添加以下内容：

```bash
TELEGRAM_BOT_TOKEN=你的电报机器人TOKEN
TELEGRAM_CHAT_ID=你的电报机器人ID
MONITOR_INTERVAL=5000
```

## 运行项目

```bash
node index.js
```
## 常见问题 

- 如果遇到 `node-telegram-bot-api` 的错误，请尝试使用 `npm install node-telegram-bot-api` 安装。
- Telegram 机器人 Token 是否正确
- Chat ID 是否正确
- 机器人是否已被添加到目标群组
- 网络连接是否正常 