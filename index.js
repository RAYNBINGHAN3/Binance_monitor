import dotenv from 'dotenv';
import { MonitorService } from './services/monitor.service.js';
import { TelegramService } from './services/telegram.service.js';
import { BinanceService } from './services/binance.service.js';
import { Logger } from './utils/logger.js';

dotenv.config();
async function bootstrap() {
    try {
        const logger = new Logger();
        const telegramService = new TelegramService(logger);
        const binanceService = new BinanceService(logger);
        const monitorService = new MonitorService(
            binanceService,
            telegramService,
            logger
        );

        logger.log('启动币安公告监控服务...');
        await monitorService.startMonitoring();
    } catch (error) {
        console.error('程序启动失败:', error);
        process.exit(1);
    }
}

bootstrap();