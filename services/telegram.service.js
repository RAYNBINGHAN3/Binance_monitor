import TelegramBot from 'node-telegram-bot-api';

class TelegramService {
    constructor(logger) {
        this.logger = logger;

        // 验证必要的环境变量
        if (!process.env.TELEGRAM_BOT_TOKEN) {
            throw new Error('TELEGRAM_BOT_TOKEN 环境变量未设置');
        }
        if (!process.env.TELEGRAM_CHAT_ID) {
            throw new Error('TELEGRAM_CHAT_ID 环境变量未设置');
        }

        this.bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN);
        this.chatId = process.env.TELEGRAM_CHAT_ID;
    }

    async sendNotification(title) {
        try {
            const message = `🔔 发现新公告！\n\n📢 ${title}`;
            await this.bot.sendMessage(this.chatId, message, {
                parse_mode: 'HTML'
            });
            this.logger.log(`Telegram 通知发送成功: ${title}`);
        } catch (error) {
            this.logger.error('发送 Telegram 通知失败:', error.message);
        }
    }
}

export { TelegramService };